import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { User, Caregiver, Reservation, Notification, Role } from '../types';
import { users as initialUsers, caregivers as initialCaregivers, reservations as initialReservations, notifications as initialNotifications } from '../data/mockData';

type AuthContextType = {
  currentUser: User | null;
  caregivers: Caregiver[];
  reservations: Reservation[];
  notifications: Notification[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (user: Omit<User, 'id'>) => boolean;
  updateUser: (user: User) => void;
  createReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>, reminderDate: string) => void;
  respondReservation: (reservationId: string, status: Reservation['status']) => void;
  updateReservation: (reservation: Reservation) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'date'>) => void;
};

const AppContext = createContext<AuthContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [caregivers, setCaregivers] = useState<Caregiver[]>(initialCaregivers);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!user) {
      return false;
    }
    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (user: Omit<User, 'id'>) => {
    const exists = users.some((item) => item.email.toLowerCase() === user.email.toLowerCase());
    if (exists) {
      return false;
    }
    const newUser: User = { id: `u_${Date.now()}`, ...user };
    setUsers((prev) => [...prev, newUser]);
    if (newUser.role === 'Cuidador') {
      setCaregivers((prev) => [
        ...prev,
        {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          rating: 0,
          price: Number(newUser.rate) || 12,
          availability: newUser.availability || 'Disponible',
          distance: 'Desconocido',
          location: 'No definida',
          bio: newUser.bio || '',
          experience: newUser.experience || '',
          certifications: newUser.certifications || '',
          capabilities: newUser.capabilities || '',
        },
      ]);
    }
    setCurrentUser(newUser);
    return true;
  };

  const updateUser = (user: User) => {
    setUsers((prev) => prev.map((item) => (item.id === user.id ? user : item)));
    setCurrentUser(user);
    if (user.role === 'Cuidador') {
      setCaregivers((prev) =>
        prev.map((caregiver) =>
          caregiver.email === user.email
            ? {
                ...caregiver,
                name: user.name,
                email: user.email,
                price: Number(user.rate) || caregiver.price,
                availability: user.availability || caregiver.availability,
                bio: user.bio || caregiver.bio,
                experience: user.experience || caregiver.experience,
                certifications: user.certifications || caregiver.certifications,
                capabilities: user.capabilities || caregiver.capabilities,
              }
            : caregiver,
        ),
      );
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'date'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `n_${Date.now()}`,
      date: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const createReservation = (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>, reminderDate: string) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `r_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newReservation, ...prev]);
    addNotification({ recipientId: reservation.caregiverId, text: `Nueva solicitud de reserva para el ${reservation.date}.`, type: 'booking' });
    addNotification({ recipientId: reservation.tutorId, text: `Tu reserva para el ${reservation.date} se ha creado. Se enviará recordatorio el ${reminderDate}.`, type: 'reminder' });
  };

  const respondReservation = (reservationId: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((item) =>
        item.id === reservationId
          ? { ...item, status }
          : item,
      ),
    );
    const reservation = reservations.find((item) => item.id === reservationId);
    if (reservation) {
      addNotification({ recipientId: reservation.tutorId, text: `Tu reserva para el ${reservation.date} ha sido ${status}.`, type: 'booking' });
      addNotification({ recipientId: reservation.caregiverId, text: `Has ${status} la solicitud del ${reservation.date}.`, type: 'message' });
    }
  };

  const updateReservation = (updated: Reservation) => {
    setReservations((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const contextValue = useMemo(
    () => ({
      currentUser,
      caregivers,
      reservations,
      notifications,
      login,
      logout,
      register,
      updateUser,
      createReservation,
      respondReservation,
      updateReservation,
      addNotification,
    }),
    [currentUser, caregivers, reservations, notifications],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
}
