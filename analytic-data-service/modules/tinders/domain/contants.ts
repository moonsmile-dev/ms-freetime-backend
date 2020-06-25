export const GENDER_MALE = 0;
export const GENDER_FEMALE = 1;

export const PHOTO_STATUS_NORMAL = 0;
export const PHOTO_STATUS_LIKE = 1;
export const PHOTO_STATUS_HIDE = 2;
export const PHOTO_STATUS_HATE = -1;

export const USER_STATUS_DRAFT = 0;
export const USER_STATUS_SYNCED = 1;
export const USER_STATUS_ERROR = -1;

export interface Location {
  lat: number;
  lon: number;
  name: string;
}

export const availableLocations: Array<Location> = [
  { // Hanoi
    "lat": 21.0250802,
    "lon": 105.8314253,
    "name": "Hanoi",
  },
  { // Ho Chi Minh
    "lat": 10.8686146,
    "lon": 106.7941121,
    "name": "Ho Chi Minh",
  },
  { // Hong Kong
    "lat": 22.4743124,
    "lon": 114.0560775,
    "name": "Hong Kong",
  },
  { // Shang Hai
    "lat": 31.1153834,
    "lon": 121.3567003,
    "name": "Shang Hai",
  },
];
