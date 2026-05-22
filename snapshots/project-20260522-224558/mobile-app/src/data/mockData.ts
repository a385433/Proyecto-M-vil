import { Caregiver, UserProfile } from '../types';

export const caregivers: Caregiver[] = [
  {
    id: '1',
    name: 'Lucía Pérez',
    rating: 4.9,
    price: 12,
    availability: 'Hoy disponible',
    distance: '1.2 km',
    location: 'Madrid Centro',
    bio: 'Cuidadora con 5 años de experiencia y especialidad en niños de 1 a 5 años.',
  },
  {
    id: '2',
    name: 'Ana Ramírez',
    rating: 4.7,
    price: 10,
    availability: 'Disponible mañana',
    distance: '3.4 km',
    location: 'Chamartín',
    bio: 'Apasionada por el cuidado temprano y el apoyo escolar básico.',
  },
  {
    id: '3',
    name: 'Marta Gómez',
    rating: 4.8,
    price: 14,
    availability: 'Disponible hoy y fin de semana',
    distance: '2.8 km',
    location: 'Retiro',
    bio: 'Experta en primeros auxilios y cuidado nocturno para bebés.',
  },
];

export const initialUserProfile: UserProfile = {
  name: 'María López',
  email: 'maria.lopez@example.com',
  phone: '+34 600 123 456',
  children: 'Luca, 4 años',
  preferences: 'Cuidadoras con experiencia en lenguaje inicial y juegos didácticos.',
};
