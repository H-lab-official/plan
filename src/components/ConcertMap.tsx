import type { Zone } from '../types/zone';

interface ConcertMapProps {
  zones: Zone[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConcertMap({ zones, selectedId, onSelect }: ConcertMapProps) {
  return (
    <div className="map-container">
      <img src="/4EVE_concert_plan.jpg" alt="4EVE Concert Plan" />
      <div>
        {zones.map((zone) => {
          const isAssigned = zone.assignedTo.trim() !== '';
          const isSelected = zone.id === selectedId;
          const className = [
            'zone-btn',
            isSelected ? 'status-selected' : isAssigned ? 'status-assigned' : 'status-empty',
          ].join(' ');

          return (
            <button
              key={zone.id}
              type="button"
              className={className}
              style={{
                top: zone.top,
                left: zone.left,
                width: zone.width,
                height: zone.height,
              }}
              onClick={() => onSelect(zone.id)}
            >
              {zone.id}
              {isAssigned && (
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
