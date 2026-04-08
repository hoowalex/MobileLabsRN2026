import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

type Profile = {
  name: string;
  age: string;
  city: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loadProfile: () => Promise<Profile>;
  saveProfile: (profile: Profile) => Promise<void>;
  deleteAccount: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      name: '',
      age: '',
      city: '',
    });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const loadProfile = async (): Promise<Profile> => {
    if (!auth.currentUser) {
      throw new Error('Користувач не авторизований');
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      return { name: '', age: '', city: '' };
    }

    const data = snapshot.data();

    return {
      name: data.name ?? '',
      age: data.age ?? '',
      city: data.city ?? '',
    };
  };

  const saveProfile = async (profile: Profile) => {
    if (!auth.currentUser) {
      throw new Error('Користувач не авторизований');
    }

    await setDoc(
      doc(db, 'users', auth.currentUser.uid),
      {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        ...profile,
      },
      { merge: true }
    );
  };

  const deleteAccount = async (email: string, password: string) => {
    if (!auth.currentUser) {
      throw new Error('Користувач не авторизований');
    }

    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(auth.currentUser, credential);

    await deleteDoc(doc(db, 'users', auth.currentUser.uid));
    await deleteUser(auth.currentUser);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      register,
      login,
      logout,
      resetPassword,
      loadProfile,
      saveProfile,
      deleteAccount,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}