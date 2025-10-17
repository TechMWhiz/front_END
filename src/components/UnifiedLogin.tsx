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
import Logo from "../assets/sorsulogo.png";

interface UnifiedLoginProps {
  onLogin: (success: boolean, userType: 'admin' | 'faculty', userData?: any) => void;
  onBack: () => void;
}

// Mock credentials - In a real app, this would be handled by a secure backend
const CREDENTIALS = {
  admin: {
    username: "admin",
    password: "sorsu2024",
    name: "System Administrator",
    role: "Administrator"
  },
  faculty: {
    username: "faculty",
    password: "faculty123",
    name: "Dr. Maria Santos",
    role: "Faculty Member",
    department: "Computer Science",
    employeeId: "FAC-2024-001"
  }
};

export default function UnifiedLogin({ onLogin, onBack }: UnifiedLoginProps) {
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

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const targetCredentials = CREDENTIALS[formData.userType];
    
    if (
      formData.username === targetCredentials.username &&
      formData.password === targetCredentials.password
    ) {
      const successMessage = formData.userType === 'admin' 
        ? "Welcome to the admin dashboard!" 
        : "Welcome to your faculty dashboard!";
      
      toast.success(successMessage);
      onLogin(true, formData.userType, targetCredentials);
    } else {
      setError("Invalid username or password. Please try again.");
      toast.error("Login failed. Please check your credentials.");
    }

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const getCredentialsDemo = () => {
    if (formData.userType === 'admin') {
      return (
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> sorsu2024</p>
        </div>
      );
    } else if (formData.userType === 'faculty') {
      return (
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Username:</strong> faculty</p>
          <p><strong>Password:</strong> faculty123</p>
        </div>
      );
    }
    return <p className="text-xs text-muted-foreground">Select user type to see demo credentials</p>;
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
            <div className="mx-auto w-16 h-16 rounded-full overflow-hidden mb-4">
              <img src={Logo} alt="SorSU Logo" className="w-full h-full object-contain" />
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
                  onValueChange={(value: 'admin' | 'faculty') => handleInputChange("userType", value)}
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
                    type="text"
                    placeholder={formData.userType === 'faculty' ? 'Enter your faculty ID' : 'Enter your username'}
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
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

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center mb-2">
                Demo Credentials:
              </p>
              {getCredentialsDemo()}
            </div>

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