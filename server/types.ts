export interface ZoneRow {
  id: string;
  level: string;
  color: string;
  top: string;
  left_pos: string;
  width: string;
  height: string;
  has_color: number;
  assigned_to: string;
  box_location: string;
  box_count: number;
  updated_at: string;
}

export interface Zone {
  id: string;
  level: string;
  color: string;
  top: string;
  left: string;
  width: string;
  height: string;
  hasColor: number;
  assignedTo: string;
  boxLocation: string;
  boxCount: number;
  updatedAt: string;
}

export interface ZoneSeed {
  id: string;
  level: string;
  color: string;
  top: string;
  left: string;
  width: string;
  height: string;
  boxCount: number;
}

export interface UpdateZoneBody {
  hasColor?: number | string;
  assignedTo?: string;
  boxLocation?: string;
}
