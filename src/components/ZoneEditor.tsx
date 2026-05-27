import { useEffect, useState } from 'react';
import type { Zone } from '../types/zone';

interface ZoneEditorProps {
  zone: Zone | null;
  saving: boolean;
  onSave: (hasColor: number, assignedTo: string) => void;
}

export function ZoneEditor({ zone, saving, onSave }: ZoneEditorProps) {
  const [hasColor, setHasColor] = useState(0);
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    if (zone) {
      setHasColor(zone.hasColor);
      setAssignedTo(zone.assignedTo);
    }
  }, [zone]);

  if (!zone) {
    return (
      <div className="text-center text-gray-500 py-10">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        กรุณาคลิกเลือกโซนบนรูปภาพ
        <br />
        เพื่อกรอกข้อมูล
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400">โซนที่เลือก:</span>
        <span className="text-2xl font-bold text-blue-400 px-3 py-1 bg-blue-900/30 rounded-lg">
          {zone.id}
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-4">{zone.level}</div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">ติดสีแล้ว ใส่เลข 1 (ตัวเลข)</label>
        <input
          type="number"
          min={0}
          max={1}
          placeholder="0 หรือ 1"
          value={hasColor}
          onChange={(e) => setHasColor(Number(e.target.value))}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Assign แล้ว (ระบุชื่อ)</label>
        <input
          type="text"
          placeholder="ระบุชื่อผู้รับผิดชอบ..."
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
      </div>

      <button
        type="button"
        disabled={saving}
        onClick={() => onSave(hasColor, assignedTo)}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition shadow-lg shadow-blue-900/50"
      >
        {saving ? 'กำลังบันทึก...' : 'อัปเดตข้อมูลโซนนี้'}
      </button>
    </div>
  );
}
