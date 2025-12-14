import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Eye, EyeOff, Lock, User, Shield, GraduationCap, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useFaculty } from "../context/FacultyContext";
import { auth } from "../api";

interface UnifiedLoginProps {
  onLogin: (success: boolean, userType: 'admin' | 'faculty', userData?: any) => void;
  onBack: () => void;
}

interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  token_type: string;
  message?: string;
}

interface ApiErrorResponse {
  response?: {
    data: {
      message: string;
    };
  };
  message: string;
  data: {
    message: string;
  };
}

export default function UnifiedLogin({ onLogin, onBack }: UnifiedLoginProps) {
  const { faculty } = useFaculty();
  const [formData, setFormData] = useState({
    userType: "" as 'admin' | 'faculty' | '',
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.userType) {
      setError("Please select your user type");
      setIsLoading(false);
      return;
    }

    // Clear any existing auth data to prevent conflicts
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    sessionStorage.removeItem('redirect_after_login');

    try {
      console.log('Attempting login with:', {
        email: formData.username,
        userType: formData.userType
      });

      console.log('Making API call to:', 'http://127.0.0.1:8000/api/login');

      // First test if we can reach the backend at all
      try {
        const healthCheck = await fetch('http://127.0.0.1:8000/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
        console.log('Health check response:', healthCheck);
      } catch (healthError) {
        console.log('Health check failed:', healthError);
      }

      // Test with a simple fetch call first
      const testResponse = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: formData.username.trim().toLowerCase(),
          password: formData.password,
          user_type: formData.userType
        })
      });

      console.log('Fetch response:', testResponse);
      
      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        console.log('Error response text:', errorText);
        throw new Error(`HTTP error! status: ${testResponse.status} - ${errorText}`);
      }

      const testData = await testResponse.json();
      console.log('Fetch response data:', testData);

      // If fetch worked, use that data directly instead of axios
      if (testData && testData.success && testData.user && testData.token) {
        const { user, token, success, message } = testData;
        
        // Store the token and user data
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_role', user.role);
        localStorage.setItem('user_name', user.name);
        
        console.log('Login successful via fetch:', { user, role: user.role });
        
        toast.success(message || `Welcome, ${user.name}!`);
        onLogin(true, user.role as 'admin' | 'faculty', user);
        return;
      }

      const response = await auth.login(
        formData.username.trim().toLowerCase(),
        formData.password,
        formData.userType
      ) as { data: LoginResponse };

      console.log('Login response received:', response);
      console.log('Response data:', response.data);
      
      if (!response.data) {
        throw new Error('No response data from server');
      }

      const { user, token, success, message } = response.data;
      
      if (!success || !user || !token) {
        throw new Error(message || 'Login failed');
      }
      
      // Store the token and user data
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_role', user.role);
      localStorage.setItem('user_name', user.name);
      
      console.log('Login successful:', { user, role: user.role });
      
      // Determine the appropriate redirect path
      let redirectPath = '/'; // Default fallback
      
      if (user.role === 'admin') {
        redirectPath = '/admin/dashboard';
      } else if (user.role === 'faculty') {
        redirectPath = '/faculty/dashboard';
      }
      
      // Get the redirect URL from sessionStorage if it exists
      const storedRedirect = sessionStorage.getItem('redirect_after_login');
      if (storedRedirect) {
        redirectPath = storedRedirect;
        sessionStorage.removeItem('redirect_after_login');
      }
      
      // Show welcome message and notify parent component
      toast.success(message || `Welcome, ${user.name}!`);
      onLogin(true, user.role as 'admin' | 'faculty', user);
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = "An error occurred. Please try again later.";
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          errorMessage = error.response.data?.message || "Invalid email or password. Please try again.";
        } else if (error.response.status === 404) {
          errorMessage = "API endpoint not found. Please check your network connection.";
        } else if (error.response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your network connection.";
      } else {
        // Something happened in setting up the request
        errorMessage = error.message || "An error occurred. Please try again.";
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev, 
      [field]: field === 'userType' ? (value as 'admin' | 'faculty') : value
    }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const getUserTypeIcon = () => {
    switch (formData.userType) {
      case 'admin':
        return <Shield className="w-8 h-8 text-white" />;
      case 'faculty':
        return <GraduationCap className="w-8 h-8 text-white" />;
      default:
        return <User className="w-8 h-8 text-white" />;
    }
  };

  const getUserTypeGradient = () => {
    switch (formData.userType) {
      case 'admin':
        return "from-blue-600 to-green-600";
      case 'faculty':
        return "from-purple-600 to-blue-600";
      default:
        return "from-gray-600 to-gray-700";
    }
  };

  const getButtonGradient = () => {
    switch (formData.userType) {
      case 'admin':
        return "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700";
      case 'faculty':
        return "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campus Explorer
        </Button>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${getUserTypeGradient()} rounded-full flex items-center justify-center mb-4`}>
              {getUserTypeIcon()}
            </div>
            <CardTitle className="text-2xl">
              {formData.userType === 'admin' ? 'Admin Login' : 
               formData.userType === 'faculty' ? 'Faculty Login' : 
               'System Login'}
            </CardTitle>
            <p className="text-muted-foreground">
              CampusView: SorSU-Bulan
            </p>
            <p className="text-sm text-muted-foreground">
              Sorsogon State University - Bulan Campus
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value: string) => handleInputChange("userType", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Administrator
                      </div>
                    </SelectItem>
                    <SelectItem value="faculty">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Faculty Member
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">
                  {formData.userType === 'faculty' ? 'Faculty ID / Username' : 'Username'}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type={formData.userType === 'faculty' ? 'email' : 'text'}
                    placeholder=""
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder=""
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                    autoComplete="off"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className={`w-full ${getButtonGradient()}`}
                disabled={isLoading || !formData.userType}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                © 2024 Sorsogon State University - Bulan Campus
              </p>
              <p className="text-xs text-muted-foreground">
                Authorized access only
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}