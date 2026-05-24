import { Caregiver, Notification, Reservation, User } from '../types';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Miguel Torres',
    email: 'miguel.torres@example.com',
    password: '123456',
    role: 'Tutor',
    phone: '+34 600 555 444',
    children: 'Luna, 5 años',
    needs: 'Apoyo con deberes y cuidado por las tardes',
  },
  {
    id: 'u2',
    name: 'Lucía Pérez',
    email: 'lucia.perez@example.com',
    password: '123456',
    role: 'Cuidador',
    phone: '+34 600 123 456',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    experience: '5 años de cuidado infantil y apoyo escolar.',
    certifications: 'Curso de primeros auxilios, formación Montessori.',
    capabilities: 'Cuidado de bebés, apoyo escolar, primeros auxilios',
    availability: 'Lunes a viernes por la mañana',
    rate: '14',
    bio: 'Cuidadora con amplia experiencia en atención personalizada y juegos educativos.',
  },
];

export const caregivers: Caregiver[] = [
  {
    id: 'u2',
    name: 'Lucía Pérez',
    email: 'lucia.perez@example.com',
    rating: 4.9,
    price: 14,
    availability: 'Lunes a viernes por la mañana',
    distance: '1.2 km',
    location: 'Madrid Centro',
    bio: 'Cuidadora con amplia experiencia en atención personalizada y juegos educativos.',
    experience: '5 años de cuidado infantil y apoyo escolar.',
    certifications: 'Curso de primeros auxilios, formación Montessori.',
    capabilities: 'Cuidado de bebés, apoyo escolar, primeros auxilios',
  },
  {
    id: 'c2',
    name: 'Ana Ramírez',
    email: 'ana.ramirez@example.com',
    rating: 4.7,
    price: 10,
    availability: 'Disponible mañana',
    distance: '3.4 km',
    location: 'Chamartín',
    bio: 'Apasionada por el cuidado temprano y el apoyo escolar básico.',
    experience: '3 años de experiencia con niños y apoyo creativo.',
    certifications: 'Certificado en primeros auxilios infantiles.',
    capabilities: 'Apoyo escolar, juegos creativos, cuidado en tardes',
  },
  {
    id: 'c3',
    name: 'Marta Gómez',
    email: 'marta.gomez@example.com',
    rating: 4.8,
    price: 16,
    availability: 'Disponible hoy y fin de semana',
    distance: '2.8 km',
    location: 'Retiro',
    bio: 'Experta en primeros auxilios y cuidado nocturno para bebés.',
    experience: '6 años de experiencia con bebés y niños pequeños.',
    certifications: 'Curso avanzado de primeros auxilios, manejo de alergias.',
    capabilities: 'Cuidado nocturno, primeros auxilios, bebés',
  },
];

export const reservations: Reservation[] = [
  {
    id: 'r1',
    tutorId: 'u1',
    caregiverId: 'u2',
    date: '2026-06-01',
    hours: '3',
    notes: 'Necesito apoyo con la cena y el baño.',
    status: 'accepted',
    createdAt: new Date().toISOString(),
  },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    recipientId: 'u1',
    text: 'Tu reserva con Lucía Pérez para el 2026-06-01 ha sido aceptada.',
    date: new Date().toISOString(),
    type: 'booking',
  },
];
