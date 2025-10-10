import { useState } from "react";
import UniversityHeader from "./components/UniversityHeader";
import HeroSection from "./components/HeroSection";
import ProgramsSection from "./components/ProgramsSection";
import CampusSection from "./components/CampusSection";
import StudentClubsSection from "./components/StudentClubsSection";
import DepartmentsSection from "./components/DepartmentsSection";
import FacultySection from "./components/FacultySection";
import AnnouncementsSection from "./components/AnnouncementsSection";
import EventsSection from "./components/EventsSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import FacultyDashboard from "./components/FacultyDashboard";
import UnifiedLogin from "./components/UnifiedLogin";
import FAQChatbot from "./components/FAQChatbot";
import { Toaster } from "./components/ui/sonner";
import React from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'faculty' | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleLoginToggle = () => {
    if (isLoggedIn) {
      // Logout
      setIsLoggedIn(false);
      setUserType(null);
      setUserData(null);
      setShowLogin(false);
    } else {
      // Show login page
      setShowLogin(true);
    }
  };

  const handleLogin = (success: boolean, type: 'admin' | 'faculty', data?: any) => {
    if (success) {
      setIsLoggedIn(true);
      setUserType(type);
      setUserData(data);
      setShowLogin(false);
    }
  };

  const handleBackToSite = () => {
    setShowLogin(false);
  };

  // Show login page when requested
  if (showLogin && !isLoggedIn) {
    return (
      <>
        <UnifiedLogin onLogin={handleLogin} onBack={handleBackToSite} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <UniversityHeader 
        onLoginToggle={handleLoginToggle}
        isLoggedIn={isLoggedIn}
        userType={userType || undefined}
        userName={userData?.name}
      />
      <main>
        {isLoggedIn && userType === 'admin' ? (
          <AdminDashboard />
        ) : isLoggedIn && userType === 'faculty' ? (
          <FacultyDashboard />
        ) : (
          <>
            <HeroSection />
            <ProgramsSection />
            <CampusSection />
            <StudentClubsSection />
            <DepartmentsSection />
            <FacultySection />
            <AnnouncementsSection />
            <EventsSection />
            <FAQSection />
          </>
        )}
      </main>
      {!isLoggedIn && <Footer />}
      {!isLoggedIn && <FAQChatbot />}
      <Toaster />
    </div>
  );
}