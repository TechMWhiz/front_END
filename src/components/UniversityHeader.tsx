import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GraduationCap, MapPin, Users, Award, Settings, LogIn, LogOut, Shield } from "lucide-react";
import Logo from "../assets/sorsulogo.png";

interface UniversityHeaderProps {
  onLoginToggle?: () => void;
  isLoggedIn?: boolean;
  userType?: 'admin' | 'faculty';
  userName?: string;
}

export default function UniversityHeader({ 
  onLoginToggle, 
  isLoggedIn = false,
  userType,
  userName
}: UniversityHeaderProps) {
  const navigate = useNavigate();

  // Check authentication from localStorage if props not provided
  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem('user_role');
    const storedUserName = localStorage.getItem('user_name');
    return {
      isAuthenticated: !!token,
      userRole: userRole as 'admin' | 'faculty' | null,
      userName: storedUserName || undefined
    };
  };

  const authState = isLoggedIn && userType && userName ? 
    { isAuthenticated: true, userRole: userType, userName } : 
    checkAuth();

  const handleLoginToggle = () => {
    if (onLoginToggle) {
      onLoginToggle();
    } else {
      // Default navigation behavior
      if (authState.isAuthenticated) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_name');
        navigate('/');
      } else {
        navigate('/login');
      }
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full">
               <img src={Logo} alt="SorSU Logo" className="w-10 h-10 object-contain" />
             </div>
             <div>
              <h1 className="text-xl font-bold">SorSU-Bulan</h1>
              <p className="text-sm text-muted-foreground">Sorsogon State University - Bulan Campus</p>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="flex items-center gap-4">
            {!authState.isAuthenticated && (
              <>
                <a href="#programs" className="hover:text-primary transition-colors text-sm">Programs</a>
                <a href="#campus" className="hover:text-primary transition-colors text-sm">Campus</a>
                <a href="#departments" className="hover:text-primary transition-colors text-sm">Departments</a>
                <a href="#faculty" className="hover:text-primary transition-colors text-sm">Faculty</a>
                <a href="#announcements" className="hover:text-primary transition-colors text-sm">Announcements</a>
                <a href="#events" className="hover:text-primary transition-colors text-sm">Events</a>
              </>
            )}
            <div className="flex items-center gap-3">
              {authState.isAuthenticated && authState.userName && (
                <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                  {authState.userRole === 'admin' ? (
                    <Shield className="w-4 h-4 text-blue-600" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                  )}
                  <span className="text-sm font-medium">{authState.userName}</span>
                  <Badge variant="secondary" className="text-xs">
                    {authState.userRole === 'admin' ? 'Admin' : 'Faculty'}
                  </Badge>
                </div>
              )}
              <Button 
                variant={authState.isAuthenticated ? "default" : "outline"} 
                size="sm"
                onClick={handleLoginToggle}
                className="flex items-center gap-2"
              >
                {authState.isAuthenticated ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login
                  </>
                )}
              </Button>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Bulan, Sorsogon, Philippines</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>3,500+ Students</span>
          </div>
        </div>
      </div>
    </header>
  );
}