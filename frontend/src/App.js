import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Ruchers from "./pages/Ruchers";
import Ruches from "./pages/Ruches";
import Recoltes from "./pages/Recoltes";
import Sanitaire from "./pages/Sanitaire";
import Stocks from "./pages/Stocks";
import Calendrier from "./pages/Calendrier";
import Rapports from "./pages/Rapports";
import Settings from "./pages/Settings";

// Layout
import MainLayout from "./components/Layout/MainLayout";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
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
        <Route path="/recoltes" element={<Recoltes />} />
        <Route path="/sanitaire" element={<Sanitaire />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/calendrier" element={<Calendrier />} />
        <Route path="/rapports" element={<Rapports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Dashboard />} />
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
