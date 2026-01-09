import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Ruchers from "./pages/Ruchers";
import Ruches from "./pages/Ruches";
import Visites from "./pages/Visites";
import Miellerie from "./pages/Miellerie";
import Atelier from "./pages/Atelier";
import Inventaire from "./pages/Inventaire";
import Parrainage from "./pages/Parrainage";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";

// Layout
import MainLayout from "./components/Layout/MainLayout";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      {/* Admin Route - Special Layout */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ruchers" element={<Ruchers />} />
        <Route path="/ruches" element={<Ruches />} />
        <Route path="/visites" element={<Visites />} />
        <Route path="/miellerie" element={<Miellerie />} />
        <Route path="/atelier" element={<Atelier />} />
        <Route path="/inventaire" element={<Inventaire />} />
        <Route path="/parrainage" element={<Parrainage />} />
        <Route path="/parametres" element={<Settings />} />
        <Route path="/rapports" element={<Dashboard />} />
        <Route path="/evenements" element={<Dashboard />} />
      </Route>
      
      {/* Redirect root to dashboard or login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
