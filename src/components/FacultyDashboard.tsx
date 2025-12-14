import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  User,
  Mail,
  Phone,
  Edit,
  Save,
  Camera,
  GraduationCap,
  Building
} from "lucide-react";
import { toast } from "sonner";
import { useFaculty } from "../context/FacultyContext";

interface FacultyProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  title: string;
  bio: string;
  office: string;
  photo: string;
  specializations: string[];
  officeHours: string;
  website?: string;
}

interface FacultyDashboardProps {
  userData?: any;
}

export default function FacultyDashboard({ userData }: FacultyDashboardProps) {
  const { faculty, updateFaculty, refreshFaculty } = useFaculty();
  const [isEditing, setIsEditing] = useState(false);

  // Find current faculty member from context or use userData
  const currentFaculty = faculty.find(f => 
    f.email === userData?.email || 
    f.id === userData?.id ||
    `${f.firstName} ${f.lastName}` === userData?.name
  );

  // Initialize profile from current faculty data or userData
  const [profile, setProfile] = useState<FacultyProfile>(() => {
    const source = currentFaculty || userData;
    if (source) {
      return {
        id: source.id || "FAC001",
        firstName: source.firstName || source.name?.split(' ')[0] || "Unknown",
        lastName: source.lastName || source.name?.split(' ')[1] || "User",
        email: source.email || "",
        phone: source.phone || "",
        department: source.department || "",
        title: source.title || source.position || "",
        bio: source.bio || `Welcome to ${source.firstName || source.name?.split(' ')[0] || "Faculty"}'s profile.`,
        office: source.office || source.officeLocation || "",
        photo: source.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        specializations: source.specializations || source.researchInterests || [],
        officeHours: source.officeHours || "",
        website: source.website || ""
      };
    }
    return {
      id: "FAC001",
      firstName: "Unknown",
      lastName: "User",
      email: "",
      phone: "",
      department: "",
      title: "",
      bio: "",
      office: "",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      specializations: [],
      officeHours: "",
      website: ""
    };
  });

  // Allow all faculty to edit their profiles (remove restriction to only Kenneth and Sean)
  const canEdit = true;

  const [newSpecialization, setNewSpecialization] = useState("");

  // Update profile state when faculty context data changes
  useEffect(() => {
    if (currentFaculty) {
      setProfile({
        id: currentFaculty.id,
        firstName: currentFaculty.firstName,
        lastName: currentFaculty.lastName,
        email: currentFaculty.email,
        phone: currentFaculty.phone,
        department: currentFaculty.department,
        title: currentFaculty.title,
        bio: currentFaculty.bio,
        office: currentFaculty.office,
        photo: currentFaculty.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        specializations: currentFaculty.specializations || [],
        officeHours: currentFaculty.officeHours,
        website: currentFaculty.website
      });
    }
  }, [currentFaculty]);

  const handleProfileUpdate = async () => {
    if (isEditing) {
      try {
        // Save the profile to the faculty context and database
        const updatedData = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          department: profile.department,
          title: profile.title,
          bio: profile.bio,
          office: profile.office,
          specializations: profile.specializations,
          officeHours: profile.officeHours,
          website: profile.website,
          profileImage: profile.photo
        };

        await updateFaculty(profile.id, updatedData);
        
        // Refresh faculty data to ensure we have the latest
        await refreshFaculty();
        
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleProfileChange = (field: keyof FacultyProfile, value: string | string[]) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSpecialization = () => {
    const spec = newSpecialization.trim();
    if (spec && !profile.specializations.includes(spec)) {
      setProfile(prev => ({
        ...prev,
        specializations: [...prev.specializations, spec]
      }));
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (spec: string) => {
    setProfile(prev => ({
      ...prev,
      specializations: prev.specializations.filter(s => s !== spec)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-600 mt-2">View and update your profile information</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <Button 
                onClick={handleProfileUpdate}
                variant={isEditing ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} />
                    <AvatarFallback className="text-2xl">
                      {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && canEdit && (
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleProfileChange("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleProfileChange("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => handleProfileChange("department", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Title/Position</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => handleProfileChange("title", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="office">Office Location</Label>
                    <Input
                      id="office"
                      value={profile.office}
                      onChange={(e) => handleProfileChange("office", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="officeHours">Office Hours</Label>
                    <Input
                      id="officeHours"
                      value={profile.officeHours}
                      onChange={(e) => handleProfileChange("officeHours", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Mon/Wed 2-4 PM"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      value={profile.website || ""}
                      onChange={(e) => handleProfileChange("website", e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Specializations</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {spec}
                      {isEditing && (
                        <button
                          onClick={() => removeSpecialization(spec)}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add specialization"
                      value={newSpecialization}
                      onChange={(e) => setNewSpecialization(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSpecialization();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addSpecialization}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span><strong>Department:</strong> {profile.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="w-4 h-4" />
                    <span><strong>Office:</strong> {profile.office}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span><strong>Email:</strong> {profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span><strong>Phone:</strong> {profile.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}