import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  Camera, 
  HelpCircle,
  Plus,
  Trash2,
  Edit3
} from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FacultyProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  bio: string;
  office: string;
  photo: string;
  specialization: string[];
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  createdBy: string;
  lastModified: string;
}

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState<FacultyProfile>({
    id: "FAC001",
    name: "Dr. Juan Dela Cruz",
    email: "j.delacruz@sorsu-bulan.edu.ph",
    phone: "+63 917 123 4567",
    department: "Computer Science",
    position: "Associate Professor",
    bio: "Dr. Juan Dela Cruz is an Associate Professor in the Computer Science Department with over 10 years of teaching experience. He specializes in Data Structures, Algorithms, and Machine Learning.",
    office: "CS Building, Room 201",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specialization: ["Data Structures", "Algorithms", "Machine Learning", "Database Systems"]
  });

  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: 1,
      question: "What are the prerequisites for Advanced Database Systems?",
      answer: "Students must have completed Database Fundamentals (CS 201) and Data Structures (CS 102) with a grade of B or higher.",
      category: "Academic",
      createdBy: "Dr. Juan Dela Cruz",
      lastModified: "2024-01-15"
    },
    {
      id: 2,
      question: "Are there any programming assignments in Machine Learning course?",
      answer: "Yes, the course includes 5 programming assignments using Python and TensorFlow. Students will work on real-world datasets.",
      category: "Academic",
      createdBy: "Dr. Juan Dela Cruz",
      lastModified: "2024-01-10"
    }
  ]);

  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
    category: "Academic"
  });

  const [editingFAQ, setEditingFAQ] = useState<number | null>(null);

  const handleProfileUpdate = () => {
    if (isEditing) {
      // Save the profile
      toast.success("Profile updated successfully!");
      setIsEditing(false);
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

  const addSpecialization = (spec: string) => {
    if (spec.trim() && !profile.specialization.includes(spec.trim())) {
      setProfile(prev => ({
        ...prev,
        specialization: [...prev.specialization, spec.trim()]
      }));
    }
  };

  const removeSpecialization = (spec: string) => {
    setProfile(prev => ({
      ...prev,
      specialization: prev.specialization.filter(s => s !== spec)
    }));
  };

  const handleAddFAQ = () => {
    if (newFAQ.question.trim() && newFAQ.answer.trim()) {
      const newItem: FAQItem = {
        id: Date.now(),
        question: newFAQ.question,
        answer: newFAQ.answer,
        category: newFAQ.category,
        createdBy: profile.name,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setFaqItems(prev => [...prev, newItem]);
      setNewFAQ({ question: "", answer: "", category: "Academic" });
      toast.success("FAQ added successfully!");
    }
  };

  const handleEditFAQ = (id: number) => {
    setEditingFAQ(id);
  };

  const handleSaveFAQ = (id: number, updatedFAQ: Partial<FAQItem>) => {
    setFaqItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, ...updatedFAQ, lastModified: new Date().toISOString().split('T')[0] }
        : item
    ));
    setEditingFAQ(null);
    toast.success("FAQ updated successfully!");
  };

  const handleDeleteFAQ = (id: number) => {
    setFaqItems(prev => prev.filter(item => item.id !== id));
    toast.success("FAQ deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your profile and course-related content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              My Profile
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Manage FAQs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
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
                      <AvatarImage src={profile.photo} alt={profile.name} />
                      <AvatarFallback className="text-2xl">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Change Photo
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => handleProfileChange("name", e.target.value)}
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
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={profile.position}
                        onChange={(e) => handleProfileChange("position", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="office">Office</Label>
                      <Input
                        id="office"
                        value={profile.office}
                        onChange={(e) => handleProfileChange("office", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
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
                    {profile.specialization.map((spec, index) => (
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
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSpecialization(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          addSpecialization(input.value);
                          input.value = '';
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New FAQ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="faq-question">Question</Label>
                    <Input
                      id="faq-question"
                      placeholder="Enter the frequently asked question"
                      value={newFAQ.question}
                      onChange={(e) => setNewFAQ(prev => ({ ...prev, question: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faq-category">Category</Label>
                    <select
                      aria-label="faq-category"
                      id="faq-category"
                      className="w-full h-10 px-3 border border-input bg-background rounded-md"
                      value={newFAQ.category}
                      onChange={(e) => setNewFAQ(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="Academic">Academic</option>
                      <option value="General">General</option>
                      <option value="Course">Course</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faq-answer">Answer</Label>
                  <Textarea
                    id="faq-answer"
                    placeholder="Enter the detailed answer"
                    value={newFAQ.answer}
                    onChange={(e) => setNewFAQ(prev => ({ ...prev, answer: e.target.value }))}
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddFAQ} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add FAQ
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  My FAQs ({faqItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      {editingFAQ === item.id ? (
                        <EditFAQForm
                          item={item}
                          onSave={(updatedFAQ) => handleSaveFAQ(item.id, updatedFAQ)}
                          onCancel={() => setEditingFAQ(null)}
                        />
                      ) : (
                        <>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{item.category}</Badge>
                                <span className="text-xs text-gray-500">
                                  Modified: {item.lastModified}
                                </span>
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                              <p className="text-gray-700 text-sm">{item.answer}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditFAQ(item.id)}
                                className="flex items-center gap-1"
                              >
                                <Edit3 className="w-3 h-3" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteFAQ(item.id)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {faqItems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No FAQs created yet. Add your first FAQ above.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EditFAQForm({ 
  item, 
  onSave, 
  onCancel 
}: { 
  item: FAQItem; 
  onSave: (updatedFAQ: Partial<FAQItem>) => void; 
  onCancel: () => void;
}) {
  const [editedItem, setEditedItem] = useState({
    question: item.question,
    answer: item.answer,
    category: item.category
  });

  const handleSave = () => {
    onSave(editedItem);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label>Question</Label>
          <Input
            value={editedItem.question}
            onChange={(e) => setEditedItem(prev => ({ ...prev, question: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label  htmlFor="category">Category</Label>
          <select
            aria-label="category"
            className="w-full h-10 px-3 border border-input bg-background rounded-md"
            value={editedItem.category}
            onChange={(e) => setEditedItem(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="Academic">Academic</option>
            <option value="General">General</option>
            <option value="Course">Course</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Answer</Label>
        <Textarea
          value={editedItem.answer}
          onChange={(e) => setEditedItem(prev => ({ ...prev, answer: e.target.value }))}
          rows={3}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave} size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" onClick={onCancel} size="sm">
          Cancel
        </Button>
      </div>
    </div>
  );
}