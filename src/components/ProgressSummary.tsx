import type { Zone } from '../types/zone';

const LEVELS = ['ชั้น 3', 'ชั้น 2', 'ชั้น 1'] as const;

const BAR_COLORS: Record<string, string> = {
  'ชั้น 1': 'bg-blue-500',
  'ชั้น 2': 'bg-yellow-500',
  'ชั้น 3': 'bg-red-500',
};

interface ProgressSummaryProps {
  zones: Zone[];
  onExport: () => void;
}

export function ProgressSummary({ zones, onExport }: ProgressSummaryProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">ภาพรวมความคืบหน้า</h2>
        <button
          type="button"
          onClick={onExport}
          className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded transition"
        >
          ดูข้อมูลดิบ
        </button>
      </div>
      <div className="space-y-4">
        {LEVELS.map((level) => {
          const levelZones = zones.filter((z) => z.level === level);
          const total = levelZones.length;
          const assignedCount = levelZones.filter((z) => z.assignedTo.trim() !== '').length;
          const percentage = total === 0 ? 0 : Math.round((assignedCount / total) * 100);

          return (
            <div key={level}>
              <div className="flex justify-between text-sm mb-1 text-gray-300">
                <span>{level}</span>
                <span>
                  {assignedCount} / {total} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`${BAR_COLORS[level]} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
