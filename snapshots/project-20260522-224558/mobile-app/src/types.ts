export type Caregiver = {
  id: string;
  name: string;
  rating: number;
  price: number;
  availability: string;
  distance: string;
  location: string;
  bio: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  children: string;
  preferences: string;
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Reservation: { caregiver: Caregiver };
};
