import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  GraduationCap,
  Award,
  Search
} from "lucide-react";
import { toast } from "sonner";
import { useFaculty, type Faculty } from "../context/FacultyContext";

const departments = [
  "Information Technology", "Computer Science", "Business Administration", "Psychology", "Engineering",
  "Mathematics", "English", "Biology", "Chemistry", "Physics", "Art", "Music"
];

const titles = [
  "Professor", "Associate Professor", "Assistant Professor", "Lecturer", 
  "Adjunct Professor", "Professor Emeritus", "Research Professor"
];

const statuses = ["Active", "On Leave", "Sabbatical", "Retired", "Inactive"];

export default function FacultyManager() {
  const { faculty, loading, addFaculty, updateFaculty, deleteFaculty, refreshFaculty, setFaculty } = useFaculty();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    office: "",
    department: "",
    title: "",
    status: "Active",
    bio: "",
    specializations: "",
    education: "",
    awards: "",
    officeHours: "",
    website: ""
  });

  // Refresh faculty data when component mounts
  useEffect(() => {
    refreshFaculty();
  }, [refreshFaculty]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const facultyData = {
      ...formData,
      specializations: formData.specializations.split(',').map(s => s.trim()).filter(s => s),
      education: formData.education.split('\n').filter(e => e.trim()),
      awards: formData.awards.split('\n').filter(a => a.trim())
    };

    try {
      if (editingFaculty) {
        // Optimistic update - update UI immediately
        const optimisticData = { ...editingFaculty, ...facultyData };
        setFaculty(prev => prev.map(f => f.id === editingFaculty.id ? optimisticData : f));
        
        try {
          const updateData: Partial<Faculty> = {
            firstName: facultyData.firstName,
            lastName: facultyData.lastName,
            email: facultyData.email,
            phone: facultyData.phone,
            office: facultyData.office,
            department: facultyData.department,
            title: facultyData.title,
            status: facultyData.status,
            bio: facultyData.bio,
            specializations: facultyData.specializations,
            education: facultyData.education,
            awards: facultyData.awards,
            officeHours: facultyData.officeHours,
            website: facultyData.website
          };
          await updateFaculty(editingFaculty.id, updateData);
          toast.success("Faculty profile updated successfully!");
        } catch (error) {
          // Revert optimistic update on error
          await refreshFaculty();
          throw error;
        }
      } else {
        // Optimistic update - add to UI immediately
        const tempId = `temp-${Date.now()}`;
        const optimisticFaculty: Faculty = {
          ...facultyData,
          id: tempId,
          researchInterests: [],
          yearsOfExperience: 0
        };
        setFaculty(prev => [optimisticFaculty, ...prev]);
        
        try {
          const result = await addFaculty(facultyData);
          // Replace temp entry with real data
          setFaculty(prev => prev.map(f => f.id === tempId ? result : f));
          toast.success("Faculty profile created successfully!");
        } catch (error) {
          // Remove optimistic entry on error
          setFaculty(prev => prev.filter(f => f.id !== tempId));
          throw error;
        }
      }
      
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving faculty:', error);
      toast.error("Failed to save faculty profile. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      office: "",
      department: "",
      title: "",
      status: "Active",
      bio: "",
      specializations: "",
      education: "",
      awards: "",
      officeHours: "",
      website: ""
    });
    setEditingFaculty(null);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (facultyMember: Faculty) => {
    setEditingFaculty(facultyMember);
    setFormData({
      firstName: facultyMember.firstName,
      lastName: facultyMember.lastName,
      email: facultyMember.email,
      phone: facultyMember.phone,
      office: facultyMember.office,
      department: facultyMember.department,
      title: facultyMember.title,
      status: facultyMember.status,
      bio: facultyMember.bio,
      specializations: facultyMember.specializations.join(', '),
      education: facultyMember.education.join('\n'),
      awards: facultyMember.awards.join('\n'),
      officeHours: facultyMember.officeHours,
      website: facultyMember.website || ""
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const originalFaculty = faculty.find(f => f.id === id);
    if (!originalFaculty) return;
    
    // Optimistic delete - remove from UI immediately
    setFaculty(prev => prev.filter(f => f.id !== id));
    setDeleteConfirmId(null);
    
    try {
      await deleteFaculty(id);
      toast.success("Faculty profile deleted successfully!");
    } catch (error) {
      // Revert optimistic delete on error
      setFaculty(prev => [...prev, originalFaculty]);
      console.error('Error deleting faculty:', error);
      toast.error("Failed to delete faculty profile. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-orange-100 text-orange-800";
      case "Sabbatical":
        return "bg-blue-100 text-blue-800";
      case "Retired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = `${f.firstName} ${f.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || filterDepartment === "all" || f.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departmentStats = departments.map(dept => ({
    name: dept,
    count: faculty.filter(f => f.department === dept).length
  })).filter(stat => stat.count > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Faculty & Staff Management</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Faculty Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingFaculty ? "Edit Faculty Profile" : "Add New Faculty Member"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Select value={formData.title} onValueChange={(value) => setFormData({...formData, title: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      {titles.map(title => (
                        <SelectItem key={title} value={title}>{title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="office">Office Location</Label>
                  <Input
                    id="office"
                    value={formData.office}
                    onChange={(e) => setFormData({...formData, office: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="officeHours">Office Hours</Label>
                  <Input
                    id="officeHours"
                    value={formData.officeHours}
                    onChange={(e) => setFormData({...formData, officeHours: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="specializations">Specializations (comma-separated)</Label>
                <Input
                  id="specializations"
                  value={formData.specializations}
                  onChange={(e) => setFormData({...formData, specializations: e.target.value})}
                  placeholder="AI, Machine Learning, Data Science"
                />
              </div>
              
              <div>
                <Label htmlFor="education">Education (one per line)</Label>
                <Textarea
                  id="education"
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  rows={3}
                  placeholder="Ph.D. Computer Science - MIT&#10;M.S. Computer Science - Stanford"
                />
              </div>
              
              <div>
                <Label htmlFor="awards">Awards & Recognition (one per line)</Label>
                <Textarea
                  id="awards"
                  value={formData.awards}
                  onChange={(e) => setFormData({...formData, awards: e.target.value})}
                  rows={2}
                  placeholder="Excellence in Teaching Award 2023&#10;Research Innovation Grant 2022"
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website (optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingFaculty ? "Update" : "Add"} Faculty Member
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search faculty by name, department, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Faculty List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredFaculty.map((facultyMember) => (
            <Card key={facultyMember.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={facultyMember.profileImage} />
                    <AvatarFallback>
                      {getInitials(facultyMember.firstName, facultyMember.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <CardTitle className="text-xl">
                          {facultyMember.firstName} {facultyMember.lastName}
                        </CardTitle>
                        <p className="text-muted-foreground">{facultyMember.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(facultyMember.status)}>
                          {facultyMember.status}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(facultyMember)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog open={deleteConfirmId === facultyMember.id} onOpenChange={(open) => {
                          if (open) {
                            setDeleteConfirmId(facultyMember.id);
                          } else {
                            setDeleteConfirmId(null);
                          }
                        }}>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Faculty Member</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {facultyMember.firstName} {facultyMember.lastName}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(facultyMember.id)} className="bg-red-600 hover:bg-red-700">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{facultyMember.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{facultyMember.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{facultyMember.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{facultyMember.office}</span>
                      </div>
                    </div>
                    {facultyMember.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {facultyMember.specializations.map((spec, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{facultyMember.bio}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {facultyMember.education.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        Education
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {facultyMember.education.map((edu, index) => (
                          <li key={index}>• {edu}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {facultyMember.awards.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Awards & Recognition
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {facultyMember.awards.map((award, index) => (
                          <li key={index}>• {award}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {facultyMember.officeHours && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <span className="font-semibold text-sm">Office Hours: </span>
                    <span className="text-sm">{facultyMember.officeHours}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Department Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {departmentStats.map((stat) => (
                <div key={stat.name} className="flex justify-between items-center">
                  <span className="text-sm">{stat.name}</span>
                  <Badge variant="secondary">{stat.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Faculty Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Faculty Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Faculty</span>
                <span className="font-semibold">{faculty.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active</span>
                <span className="font-semibold">{faculty.filter(f => f.status === "Active").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">On Leave</span>
                <span className="font-semibold">{faculty.filter(f => f.status === "On Leave" || f.status === "Sabbatical").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Professors</span>
                <span className="font-semibold">{faculty.filter(f => f.title.includes("Professor")).length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}