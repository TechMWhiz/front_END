import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Search,
  Building,
  Users,
  GraduationCap,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Award,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import React from "react";

interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  dean: string;
  establishedYear: number;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  programs: string[];
  facultyCount: number;
  studentCount: number;
  accreditation: string[];
  researchAreas: string[];
  facilities: string[];
  achievements: string[];
  mission: string;
  vision: string;
}

// Mock departments data
const mockDepartments: Department[] = [
  {
    id: "1",
    name: "College of Engineering and Technology",
    shortName: "CET",
    description: "The College of Engineering and Technology is committed to producing competent and globally competitive engineers and technologists. We offer comprehensive programs in various engineering disciplines with state-of-the-art facilities and experienced faculty.",
    dean: "Dr. Maria Elena Santos",
    establishedYear: 1995,
    location: "Engineering Building, SorSU-Bulan Campus",
    email: "cet@sorsu-bulan.edu.ph",
    phone: "+63 56 311 1234",
    website: "https://sorsu-bulan.edu.ph/cet",
    programs: [
      "Bachelor of Science in Civil Engineering",
      "Bachelor of Science in Computer Engineering", 
      "Bachelor of Science in Electrical Engineering",
      "Bachelor of Science in Electronics Engineering",
      "Bachelor of Science in Information Technology",
      "Bachelor of Science in Computer Science"
    ],
    facultyCount: 28,
    studentCount: 850,
    accreditation: ["AACCUP Level II", "PRC Accredited", "CHED Center of Excellence"],
    researchAreas: [
      "Sustainable Engineering",
      "Artificial Intelligence",
      "Renewable Energy Systems",
      "Smart Infrastructure",
      "Software Development"
    ],
    facilities: [
      "Computer Laboratories (5 units)",
      "Electronics Laboratory",
      "Physics Laboratory",
      "Engineering Drawing Room",
      "Fabrication Workshop",
      "Testing Laboratory"
    ],
    achievements: [
      "Best Engineering School in Bicol Region 2023",
      "Outstanding Graduate Performance in Board Exams",
      "Research Excellence Award 2022",
      "Industry Partnership Excellence 2021"
    ],
    mission: "To provide quality engineering and technology education that produces competent, innovative, and socially responsible professionals who contribute to national development.",
    vision: "To be a premier college of engineering and technology in the Philippines, recognized for academic excellence, research innovation, and community engagement."
  },
  {
    id: "2",
    name: "College of Arts and Sciences",
    shortName: "CAS",
    description: "The College of Arts and Sciences provides foundational education in liberal arts, sciences, and mathematics. We nurture critical thinking, creativity, and scientific inquiry among our students.",
    dean: "Dr. Carmen Villanueva",
    establishedYear: 1985,
    location: "Academic Building, SorSU-Bulan Campus",
    email: "cas@sorsu-bulan.edu.ph",
    phone: "+63 56 311 1235",
    programs: [
      "Bachelor of Science in Mathematics",
      "Bachelor of Science in Biology",
      "Bachelor of Science in Chemistry", 
      "Bachelor of Arts in English",
      "Bachelor of Arts in Filipino",
      "Bachelor of Science in Psychology"
    ],
    facultyCount: 22,
    studentCount: 650,
    accreditation: ["AACCUP Level I", "CHED Recognized"],
    researchAreas: [
      "Applied Mathematics",
      "Environmental Biology",
      "Chemical Analysis",
      "Language Studies",
      "Behavioral Psychology"
    ],
    facilities: [
      "Science Laboratories (4 units)",
      "Mathematics Learning Center",
      "Language Laboratory",
      "Psychology Laboratory",
      "Herbarium",
      "Research Center"
    ],
    achievements: [
      "Best Liberal Arts Program 2023",
      "Outstanding Research in Sciences 2022",
      "Excellence in Mathematics Education 2021",
      "Language Proficiency Awards 2020"
    ],
    mission: "To provide comprehensive liberal arts and sciences education that develops critical thinking, scientific literacy, and cultural appreciation.",
    vision: "To be a leading college of arts and sciences that produces well-rounded individuals capable of contributing to society through knowledge and service."
  },
  {
    id: "3",
    name: "College of Teacher Education",
    shortName: "CTE",
    description: "The College of Teacher Education is dedicated to preparing competent, caring, and reflective teachers who will shape the future of education in the Philippines.",
    dean: "Dr. Jennifer Aquino",
    establishedYear: 1980,
    location: "Teacher Education Building, SorSU-Bulan Campus",
    email: "cte@sorsu-bulan.edu.ph",
    phone: "+63 56 311 1236",
    programs: [
      "Bachelor of Elementary Education",
      "Bachelor of Secondary Education - Major in Mathematics",
      "Bachelor of Secondary Education - Major in English",
      "Bachelor of Secondary Education - Major in Science",
      "Bachelor of Secondary Education - Major in Filipino",
      "Bachelor of Physical Education"
    ],
    facultyCount: 18,
    studentCount: 500,
    accreditation: ["AACCUP Level II", "CHED Center of Development"],
    researchAreas: [
      "Curriculum Development",
      "Educational Technology",
      "Learning Assessment",
      "Teacher Professional Development",
      "Inclusive Education"
    ],
    facilities: [
      "Practice Teaching Rooms",
      "Educational Technology Center",
      "Demonstration School",
      "Learning Resource Center",
      "Sports Facility",
      "Music Room"
    ],
    achievements: [
      "Outstanding Teacher Education Program 2023",
      "Top Performing School in LET 2022",
      "Excellence in Practicum Program 2021",
      "Best Student Teachers Performance 2020"
    ],
    mission: "To develop competent, caring, and reflective teachers who are committed to lifelong learning and professional excellence.",
    vision: "To be the premier teacher education institution in the region, known for producing world-class educators."
  },
  {
    id: "4",
    name: "College of Business and Management",
    shortName: "CBM",
    description: "The College of Business and Management prepares future business leaders and entrepreneurs with strong ethical foundations and innovative mindsets for the global marketplace.",
    dean: "Dr. Antonio Mercado",
    establishedYear: 1990,
    location: "Business Building, SorSU-Bulan Campus",
    email: "cbm@sorsu-bulan.edu.ph",
    phone: "+63 56 311 1237",
    programs: [
      "Bachelor of Science in Business Administration",
      "Bachelor of Science in Accountancy",
      "Bachelor of Science in Entrepreneurship",
      "Bachelor of Science in Marketing Management",
      "Bachelor of Science in Financial Management",
      "Bachelor of Science in Human Resource Management"
    ],
    facultyCount: 20,
    studentCount: 750,
    accreditation: ["AACCUP Level I", "AACSB Candidate"],
    researchAreas: [
      "Digital Marketing",
      "Small Business Development",
      "Financial Analytics",
      "Organizational Behavior",
      "Sustainable Business Practices"
    ],
    facilities: [
      "Business Simulation Laboratory",
      "Accounting Laboratory",
      "Trading Floor Simulation Room",
      "Conference Rooms",
      "Business Incubation Center",
      "Library Resource Center"
    ],
    achievements: [
      "Top Business School in Bicol 2023",
      "Outstanding CPA Board Performance 2022",
      "Excellence in Entrepreneurship Education 2021",
      "Best Industry Partnership 2020"
    ],
    mission: "To develop ethical business leaders and entrepreneurs who contribute to economic development and social progress.",
    vision: "To be a premier business education institution recognized for academic excellence, research innovation, and industry relevance."
  },
  {
    id: "5",
    name: "College of Agriculture",
    shortName: "COA",
    description: "The College of Agriculture focuses on sustainable agricultural practices, food security, and rural development. We train the next generation of agricultural professionals and researchers.",
    dean: "Dr. Roberto Fernandez",
    establishedYear: 1988,
    location: "Agriculture Building, SorSU-Bulan Campus",
    email: "coa@sorsu-bulan.edu.ph",
    phone: "+63 56 311 1238",
    programs: [
      "Bachelor of Science in Agriculture",
      "Bachelor of Science in Agricultural Engineering",
      "Bachelor of Science in Animal Science",
      "Bachelor of Science in Food Technology",
      "Bachelor of Science in Agricultural Economics",
      "Bachelor of Science in Fisheries"
    ],
    facultyCount: 16,
    studentCount: 400,
    accreditation: ["AACCUP Level I", "DA Recognized"],
    researchAreas: [
      "Sustainable Agriculture",
      "Crop Science",
      "Animal Nutrition",
      "Food Processing",
      "Agricultural Economics",
      "Aquaculture"
    ],
    facilities: [
      "Demonstration Farm (50 hectares)",
      "Livestock Facility",
      "Food Processing Laboratory",
      "Soil Testing Laboratory",
      "Greenhouse Complex",
      "Fish Ponds"
    ],
    achievements: [
      "Best Agricultural Research 2023",
      "Outstanding Extension Program 2022",
      "Sustainable Farming Innovation Award 2021",
      "Community Impact Excellence 2020"
    ],
    mission: "To advance agricultural science and technology for sustainable food production and rural development.",
    vision: "To be the leading agricultural education and research institution in the region, contributing to food security and environmental sustainability."
  }
];

export default function DepartmentsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedDepartments(prev => 
      prev.includes(id) 
        ? prev.filter(deptId => deptId !== id)
        : [...prev, id]
    );
  };

  const filteredDepartments = mockDepartments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="departments" className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Academic Departments</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse academic departments and discover the programs that will shape your future
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search departments, programs, or specializations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="w-6 h-6 text-primary" />
                      <CardTitle className="text-2xl">{department.name}</CardTitle>
                      <Badge variant="secondary">{department.shortName}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {department.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>Dean: {department.dean}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{department.studentCount} Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{department.facultyCount} Faculty</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>Est. {department.establishedYear}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {department.accreditation.slice(0, 2).map((accred, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 border-green-200">
                        {accred}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Programs */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Academic Programs
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {department.programs.slice(0, 4).map((program, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-muted-foreground">{program}</span>
                        </li>
                      ))}
                      {department.programs.length > 4 && (
                        <li className="text-primary text-sm">
                          +{department.programs.length - 4} more programs
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Research Areas */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Research Areas
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {department.researchAreas.slice(0, 4).map((area, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                      {department.researchAreas.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{department.researchAreas.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Contact & Location */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${department.email}`} className="hover:text-primary">
                          {department.email}
                        </a>
                      </div>
                      {department.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{department.phone}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-3 h-3 mt-0.5" />
                        <span className="text-xs">{department.location}</span>
                      </div>
                      {department.website && (
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Visit Website
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                {expandedDepartments.includes(department.id) && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Mission & Vision */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Mission</h4>
                          <p className="text-sm text-muted-foreground">{department.mission}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Vision</h4>
                          <p className="text-sm text-muted-foreground">{department.vision}</p>
                        </div>
                      </div>

                      {/* Facilities & Achievements */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Key Facilities</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {department.facilities.slice(0, 4).map((facility, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full mt-2"></span>
                                {facility}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Recent Achievements</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {department.achievements.slice(0, 3).map((achievement, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Award className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div className="flex gap-2">
                    {department.accreditation.map((accred, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {accred}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleExpanded(department.id)}
                    className="text-primary"
                  >
                    {expandedDepartments.includes(department.id) ? 'Show Less' : 'Learn More'}
                    <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${
                      expandedDepartments.includes(department.id) ? 'rotate-90' : ''
                    }`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredDepartments.length === 0 && (
            <div className="text-center py-12">
              <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No departments found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}