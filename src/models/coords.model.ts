export interface Coords {
  latitude: number;
  longitude: number;
  timestamp?: number;
}

export class InitialCoords {
  constructor(latitude = 0, longitude = 0, timestamp = 0) {}
}

export interface ArrCoordinates {
  coordinates: number[];
}
