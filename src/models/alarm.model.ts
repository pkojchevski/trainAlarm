export interface Alarm {
  destination: {
    place: string;
    location: string;
    // house_number?: string;
    // road?: string;
    // country?: string;
    // city?: string;
    // state?: string;
    // address?: string;
    // description: string;
    // postcode?: string;
    radius: number;
  };
  coords: number[];
  isActive: boolean;
  ringtone: {
    name: string;
    url: string;
  };
  reminder: string;
}
