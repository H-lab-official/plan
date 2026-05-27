import { useCallback, useEffect, useState } from 'react';
import { fetchZones, updateZoneApi } from './api/zones';
import { ConcertMap } from './components/ConcertMap';
import { ProgressSummary } from './components/ProgressSummary';
import { Toast } from './components/Toast';
import { ZoneEditor } from './components/ZoneEditor';
import type { Zone } from './types/zone';

function App() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState('กำลังโหลด...');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false, isError: false });

  const showToast = useCallback((message: string, isError = false) => {
    setToast({ message, visible: true, isError });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  const loadZones = useCallback(async () => {
    try {
      const data = await fetchZones();
      setZones(data);
      setSyncStatus(`อัปเดตล่าสุด ${new Date().toLocaleTimeString('th-TH')}`);
    } catch {
      setSyncStatus('เชื่อมต่อไม่ได้');
    }
  }, []);

  useEffect(() => {
    loadZones();
    const interval = setInterval(loadZones, 5000);
    return () => clearInterval(interval);
  }, [loadZones]);

  const selectedZone = zones.find((z) => z.id === selectedId) ?? null;

  const handleSave = async (hasColor: number, assignedTo: string) => {
    if (!selectedId) return;

    setSaving(true);
    try {
      await updateZoneApi(selectedId, hasColor, assignedTo);
      await loadZones();
      showToast(`อัปเดตโซน ${selectedId} เรียบร้อย!`);
    } catch {
      showToast('บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง', true);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`<pre>${JSON.stringify(zones, null, 2)}</pre>`);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-blue-400">4EVE Unchained Zone Manager</h1>
              <p className="text-gray-400 text-sm mt-1">คลิกที่โซนบนแผนผังเพื่อจัดการข้อมูล</p>
            </div>
            <span className="text-xs text-gray-500">{syncStatus}</span>
          </div>
          <ConcertMap zones={zones} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div className="w-full lg:w-96 space-y-4">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
              จัดการข้อมูลโซน
            </h2>
            <ZoneEditor zone={selectedZone} saving={saving} onSave={handleSave} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <ProgressSummary zones={zones} onExport={handleExport} />
          </div>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} isError={toast.isError} />
    </div>
  );
}

export default App;
