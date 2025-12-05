// import { useEffect } from "react";
import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Search,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Award,
  Building,
  User,
  Users
} from "lucide-react";

interface Faculty {
  id: string;
  name: string;
  position: string;
  department: string;
  specialization: string[];
  education: string;
  email: string;
  phone?: string;
  officeLocation?: string;
  profileImage?: string;
  bio?: string;
  achievements: string[];
  researchInterests: string[];
  yearsOfExperience: number;
  employmentStatus: string;
}

// Mock faculty data that would normally come from the admin-created faculty records
// const [faculty, setFaculty] = useState<Faculty[]>([]);
const mockFaculty: Faculty[] = [
  {
    id: "1",
    name: "Dr. Maria Elena Santos",
    position: "Dean",
    department: "College of Engineering and Technology",
    specialization: ["Civil Engineering", "Structural Engineering", "Project Management"],
    education: "Ph.D. in Civil Engineering, University of the Philippines Diliman",
    email: "me.santos@sorsu-bulan.edu.ph",
    phone: "+63 917 123 4567",
    officeLocation: "Engineering Building, Room 201",
    profileImage: "/api/placeholder/150/150",
    bio: "Dr. Santos has over 20 years of experience in civil engineering and academia. She has led numerous infrastructure projects in Bicol Region and is passionate about sustainable engineering practices.",
    achievements: [
      "Outstanding Engineering Educator Award 2022",
      "Best Research Paper in Structural Engineering 2021",
      "CHED Outstanding Faculty Award 2020"
    ],
    researchInterests: ["Earthquake-resistant structures", "Sustainable building materials", "Infrastructure development"],
    yearsOfExperience: 20,
    employmentStatus: "Regular"
  },
  {
    id: "2",
    name: "Prof. Roberto dela Cruz",
    position: "Program Chair",
    department: "College of Engineering and Technology",
    specialization: ["Computer Science", "Software Engineering", "Artificial Intelligence"],
    education: "M.S. in Computer Science, Ateneo de Manila University",
    email: "r.delacruz@sorsu-bulan.edu.ph",
    phone: "+63 918 234 5678",
    officeLocation: "Engineering Building, Room 105",
    bio: "Prof. dela Cruz is a technology enthusiast with expertise in software development and AI. He has mentored hundreds of students in programming and system development.",
    achievements: [
      "Best IT Faculty Award 2023",
      "Innovation in Teaching Award 2022",
      "Outstanding Alumni Award - Ateneo de Manila 2021"
    ],
    researchInterests: ["Machine Learning", "Web Development", "Mobile Applications", "Database Systems"],
    yearsOfExperience: 15,
    employmentStatus: "Regular"
  },
  {
    id: "3",
    name: "Dr. Carmen Villanueva",
    position: "Associate Professor",
    department: "College of Arts and Sciences",
    specialization: ["Mathematics", "Statistics", "Data Science"],
    education: "Ph.D. in Mathematics, University of Santo Tomas",
    email: "c.villanueva@sorsu-bulan.edu.ph",
    officeLocation: "Academic Building, Room 302",
    bio: "Dr. Villanueva specializes in applied mathematics and statistical analysis. She has published numerous research papers in international journals.",
    achievements: [
      "Best Mathematics Educator 2023",
      "Research Excellence Award 2022",
      "International Conference Best Paper Award 2021"
    ],
    researchInterests: ["Applied Statistics", "Mathematical Modeling", "Data Analytics", "Probability Theory"],
    yearsOfExperience: 12,
    employmentStatus: "Regular"
  },
  {
    id: "4",
    name: "Prof. Jennifer Aquino",
    position: "Assistant Professor",
    department: "College of Teacher Education",
    specialization: ["Elementary Education", "Curriculum Development", "Educational Psychology"],
    education: "M.Ed. in Elementary Education, Philippine Normal University",
    email: "j.aquino@sorsu-bulan.edu.ph",
    phone: "+63 919 345 6789",
    officeLocation: "Teacher Education Building, Room 101",
    bio: "Prof. Aquino is dedicated to improving elementary education practices and developing innovative teaching methodologies for young learners.",
    achievements: [
      "Outstanding Teacher Educator 2023",
      "Curriculum Innovation Award 2022",
      "Best Practices in Education Award 2021"
    ],
    researchInterests: ["Child Development", "Learning Strategies", "Educational Technology", "Inclusive Education"],
    yearsOfExperience: 8,
    employmentStatus: "Regular"
  },
  {
    id: "5",
    name: "Dr. Antonio Mercado",
    position: "Professor",
    department: "College of Business and Management",
    specialization: ["Business Administration", "Marketing", "Entrepreneurship"],
    education: "Ph.D. in Business Administration, De La Salle University",
    email: "a.mercado@sorsu-bulan.edu.ph",
    officeLocation: "Business Building, Room 201",
    bio: "Dr. Mercado brings extensive industry experience to academia, having worked in various multinational corporations before joining SorSU-Bulan.",
    achievements: [
      "Business Excellence Award 2023",
      "Outstanding Research in Marketing 2022",
      "Industry-Academia Collaboration Award 2021"
    ],
    researchInterests: ["Digital Marketing", "Small Business Development", "Consumer Behavior", "E-commerce"],
    yearsOfExperience: 18,
    employmentStatus: "Regular"
  },
  {
    id: "6",
    name: "Ms. Sarah Gonzales",
    position: "Instructor",
    department: "College of Arts and Sciences",
    specialization: ["English Literature", "Creative Writing", "Communication"],
    education: "M.A. in English Literature, University of the Philippines Los Baños",
    email: "s.gonzales@sorsu-bulan.edu.ph",
    officeLocation: "Academic Building, Room 205",
    bio: "Ms. Gonzales is passionate about literature and creative writing. She actively promotes Filipino literature and encourages students to express themselves through writing.",
    achievements: [
      "Creative Writing Excellence Award 2023",
      "Literary Publication Award 2022",
      "Student Choice Award - Best English Teacher 2021"
    ],
    researchInterests: ["Philippine Literature", "Creative Writing Pedagogy", "Language Acquisition", "Literary Criticism"],
    yearsOfExperience: 6,
    employmentStatus: "Contractual"
  }
];

const departments = [
  "All Departments",
  "College of Engineering and Technology", 
  "College of Arts and Sciences",
  "College of Teacher Education",
  "College of Business and Management",
  "College of Agriculture"
];

const positions = [
  "All Positions",
  "Dean",
  "Associate Dean", 
  "Program Chair",
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Instructor"
];

export default function FacultySection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All Departments");
  const [filterPosition, setFilterPosition] = useState("All Positions");
  const [expandedFaculty, setExpandedFaculty] = useState<string[]>([]);
  // const [faculty, setFaculty] = useState<Faculty[]>([]);

  // Fetch faculty data from backend
  // uncomment na lng kapag meron nang backend
  {/*useEffect(() => {
    fetch("/api/faculty") // replace with your backend route
      .then((res) => res.json())
      .then((data) => setFaculty(data))
      .catch((err) => console.error("Error fetching faculty:", err));
  }, []);*/}

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Dean":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Associate Dean":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Program Chair":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Professor":
        return "bg-green-100 text-green-800 border-green-200";
      case "Associate Professor":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Assistant Professor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Instructor":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedFaculty(prev => 
      prev.includes(id) 
        ? prev.filter(facultyId => facultyId !== id)
        : [...prev, id]
    );
  };

  // const filteredFaculty = faculty
  const filteredFaculty = mockFaculty
    .filter(faculty => {
      const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faculty.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === "All Departments" || faculty.department === filterDepartment;
      const matchesPosition = filterPosition === "All Positions" || faculty.position === filterPosition;
      
      return matchesSearch && matchesDepartment && matchesPosition;
    })
    .sort((a, b) => {
      // Sort by position hierarchy, then by name
      const positionOrder = ["Dean", "Associate Dean", "Program Chair", "Professor", "Associate Professor", "Assistant Professor", "Instructor"];
      const aPos = positionOrder.indexOf(a.position);
      const bPos = positionOrder.indexOf(b.position);
      
      if (aPos !== bPos) return aPos - bPos;
      return a.name.localeCompare(b.name);
    });

  // Group faculty by department for better organization
  const facultyByDepartment = filteredFaculty.reduce((acc, faculty) => {
    if (!acc[faculty.department]) {
      acc[faculty.department] = [];
    }
    acc[faculty.department].push(faculty);
    return acc;
  }, {} as Record<string, Faculty[]>);

  return (
    <section id="faculty" className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Faculty</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet our dedicated educators and researchers who are committed to academic excellence at SorSU-Bulan
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty by name, specialization, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPosition} onValueChange={setFilterPosition}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                {positions.map(position => (
                  <SelectItem key={position} value={position}>{position}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {filterDepartment === "All Departments" ? (
            // Group by department when showing all
            Object.entries(facultyByDepartment).map(([department, facultyList]) => (
              <div key={department} className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Building className="w-6 h-6 text-primary" />
                  {department}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facultyList.map((faculty) => (
                    <Card key={faculty.id} className="h-fit">
                      <CardHeader className="text-center pb-4">
                        <Avatar className="w-24 h-24 mx-auto mb-4">
                          <AvatarImage src={faculty.profileImage} alt={faculty.name} />
                          <AvatarFallback className="text-lg">
                            {getInitials(faculty.name)}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{faculty.name}</CardTitle>
                        <Badge className={getPositionColor(faculty.position)}>
                          {faculty.position}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-2">
                          {faculty.department}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            Education
                          </h4>
                          <p className="text-sm text-muted-foreground">{faculty.education}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Specialization
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {faculty.specialization.slice(0, 3).map((spec, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                            {faculty.specialization.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{faculty.specialization.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {faculty.bio && (
                          <div>
                            <p className={`text-sm text-muted-foreground ${
                              expandedFaculty.includes(faculty.id) ? '' : 'line-clamp-3'
                            }`}>
                              {faculty.bio}
                            </p>
                            {faculty.bio.length > 100 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleExpanded(faculty.id)}
                                className="mt-2 p-0 h-auto text-primary text-xs"
                              >
                                {expandedFaculty.includes(faculty.id) ? 'Show Less' : 'Read More'}
                              </Button>
                            )}
                          </div>
                        )}

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${faculty.email}`} className="hover:text-primary">
                              {faculty.email}
                            </a>
                          </div>
                          {faculty.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              <span>{faculty.phone}</span>
                            </div>
                          )}
                          {faculty.officeLocation && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building className="w-3 h-3" />
                              <span>{faculty.officeLocation}</span>
                            </div>
                          )}
                        </div>

                        {faculty.achievements.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              Recent Achievements
                            </h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {faculty.achievements.slice(0, 2).map((achievement, index) => (
                                <li key={index} className="flex items-start gap-1">
                                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                  {achievement}
                                </li>
                              ))}
                              {faculty.achievements.length > 2 && (
                                <li className="text-primary">
                                  +{faculty.achievements.length - 2} more achievements
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                          <span>{faculty.yearsOfExperience} years experience</span>
                          <Badge variant="outline" className="text-xs">
                            {faculty.employmentStatus}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Show filtered results without grouping
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculty.map((faculty) => (
                <Card key={faculty.id} className="h-fit">
                  <CardHeader className="text-center pb-4">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={faculty.profileImage} alt={faculty.name} />
                      <AvatarFallback className="text-lg">
                        {getInitials(faculty.name)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{faculty.name}</CardTitle>
                    <Badge className={getPositionColor(faculty.position)}>
                      {faculty.position}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      {faculty.department}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Education
                      </h4>
                      <p className="text-sm text-muted-foreground">{faculty.education}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Specialization
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {faculty.specialization.slice(0, 3).map((spec, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                        {faculty.specialization.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{faculty.specialization.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${faculty.email}`} className="hover:text-primary">
                          {faculty.email}
                        </a>
                      </div>
                      {faculty.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{faculty.phone}</span>
                        </div>
                      )}
                      {faculty.officeLocation && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building className="w-3 h-3" />
                          <span>{faculty.officeLocation}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <span>{faculty.yearsOfExperience} years experience</span>
                      <Badge variant="outline" className="text-xs">
                        {faculty.employmentStatus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredFaculty.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No faculty members found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}