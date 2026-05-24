export type Role = 'Tutor' | 'Cuidador';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
  photoUrl?: string;
  avatarUrl?: string;
  children?: string;
  needs?: string;
  experience?: string;
  certifications?: string;
  capabilities?: string;
  availability?: string;
  rate?: string;
  bio?: string;
};

export type Caregiver = {
  id: string;
  name: string;
  email: string;
  rating: number;
  price: number;
  availability: string;
  distance: string;
  location: string;
  bio: string;
  experience: string;
  certifications: string;
  capabilities: string;
};

export type ReservationStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export type Reservation = {
  id: string;
  tutorId: string;
  caregiverId: string;
  date: string;
  hours: string;
  notes: string;
  status: ReservationStatus;
  createdAt: string;
  tutorRating?: number;
  tutorReview?: string;
  caregiverNotes?: string;
};

export type NotificationType = 'booking' | 'reminder' | 'message' | 'payment';

export type Notification = {
  id: string;
  recipientId: string;
  text: string;
  date: string;
  type: NotificationType;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Reservation: { caregiver: Caregiver };
  Calendar: undefined;
  Rules: undefined;
  Notifications: undefined;
};
