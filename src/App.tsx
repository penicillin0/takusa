import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Index from './pages/index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewHabit from './pages/NewHabit';
import Settings from './pages/Settings';
import EditHabit from './pages/EditHabit';
import { UserProvider } from './contexts/UserContext';
import { SettingsProvider } from './contexts/SettingsContext';
import type { User } from '@supabase/supabase-js';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <UserProvider value={{ user, setUser }}>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/habits/new"
              element={user ? <NewHabit /> : <Navigate to="/" />}
            />
            <Route
              path="/habits/:id/edit"
              element={user ? <EditHabit /> : <Navigate to="/" />}
            />
            <Route
              path="/settings"
              element={user ? <Settings /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Index />}
            />
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </UserProvider>
  );
};

export default App;
