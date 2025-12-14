import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import UniversityHeader from "./components/UniversityHeader";
import HeroSection from "./components/HeroSection";
import ProgramsSection from "./components/ProgramsSection";
import CampusSection from "./components/CampusSection";
import DepartmentsSection from "./components/DepartmentsSection";
import FacultySection from "./components/FacultySection";
import AnnouncementsSection from "./components/AnnouncementsSection";
import EventsSection from "./components/EventsSection";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import FacultyDashboard from "./components/FacultyDashboard";
import UnifiedLogin from "./components/UnifiedLogin";
import FAQChatbot from "./components/FAQChatbot";
import { Toaster } from "./components/ui/sonner";
import React from "react";
import { FacultyProvider } from "./context/FacultyContext";
import { AnnouncementProvider } from "./context/AnnouncementContext";
import { EventProvider } from "./context/EventContext";
import { CalendarProvider } from "./context/CalendarContext";

// Check for existing auth token on initial load
const checkAuth = () => {
  const token = localStorage.getItem('auth_token');
  const userRole = localStorage.getItem('user_role') as 'admin' | 'faculty' | null;
  const userName = localStorage.getItem('user_name');
  
  return {
    isAuthenticated: !!token,
    userRole,
    userName: userName || undefined
  };
};

// Protected Route component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'admin' | 'faculty' }) => {
  const auth = checkAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // Store the current location they were trying to go to
    sessionStorage.setItem('redirect_after_login', location.pathname + location.search);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && auth.userRole !== requiredRole) {
    // Redirect to appropriate dashboard or home if user doesn't have required role
    const redirectTo = auth.userRole === 'admin' ? '/admin/dashboard' : '/faculty/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// Public Layout Component
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <UniversityHeader />
    <main>{children}</main>
    <Footer />
    <FAQChatbot />
  </>
);

// Main App Component
export default function App() {
  const [authState, setAuthState] = useState(() => {
    // Clear any stored redirect on app initialization
    sessionStorage.removeItem('redirect_after_login');
    return checkAuth();
  });
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginToggle = () => {
    if (authState.isAuthenticated) {
      // Logout
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_name');
      setAuthState({ isAuthenticated: false, userRole: null, userName: undefined });
      navigate('/');
    } else {
      // Show login
      navigate('/login');
    }
  };

  const handleLogin = (success: boolean, type: 'admin' | 'faculty', data?: any) => {
    if (success) {
      const newAuthState = {
        isAuthenticated: true,
        userRole: type,
        userName: data?.name
      };
      setAuthState(newAuthState);
      
      // Redirect to intended URL or dashboard
      const redirectPath = sessionStorage.getItem('redirect_after_login') || 
                         (type === 'admin' ? '/admin/dashboard' : '/faculty/dashboard');
      sessionStorage.removeItem('redirect_after_login');
      navigate(redirectPath);
    }
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  // Main app content with React Router
  return (
    <FacultyProvider>
      <AnnouncementProvider>
        <EventProvider>
          <CalendarProvider>
            <div className="min-h-screen bg-white">
              <Routes>
                {/* Public Routes - No authentication required */}
                <Route path="/login" element={
                  authState.isAuthenticated ? (
                    <Navigate to={authState.userRole === 'admin' ? '/admin/dashboard' : '/faculty/dashboard'} replace />
                  ) : (
                    <UnifiedLogin onLogin={handleLogin} onBack={handleBackToSite} />
                  )
                } />
                
                <Route path="/" element={
                  <PublicLayout>
                    <>
                      <HeroSection />
                      <ProgramsSection />
                      <CampusSection />
                      <DepartmentsSection />
                      <FacultySection />
                      <AnnouncementsSection />
                      <EventsSection />
                    </>
                  </PublicLayout>
                } />

                {/* Admin Protected Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requiredRole="admin">
                    <UniversityHeader
                      onLoginToggle={handleLoginToggle}
                      isLoggedIn={authState.isAuthenticated}
                      userType={authState.userRole || undefined}
                      userName={authState.userName}
                    />
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                {/* Faculty Protected Routes */}
                <Route path="/faculty/dashboard" element={
                  <ProtectedRoute requiredRole="faculty">
                    <UniversityHeader
                      onLoginToggle={handleLoginToggle}
                      isLoggedIn={authState.isAuthenticated}
                      userType={authState.userRole || undefined}
                      userName={authState.userName}
                    />
                    <FacultyDashboard userData={{ name: authState.userName }} />
                  </ProtectedRoute>
                } />

                {/* Catch all other routes - redirect to home */}
                <Route path="*" element={
                  <Navigate to="/" replace />
                } />
              </Routes>
              
              <Toaster />
            </div>
          </CalendarProvider>
        </EventProvider>
      </AnnouncementProvider>
    </FacultyProvider>
  );
}
