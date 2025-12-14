import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Briefcase, Laptop, FlaskConical, Brush, Calculator, Heart, Scale, Building2, BookOpen, Users, GraduationCap, Clock, CheckCircle2 } from "lucide-react";

interface Program {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  type: string;
  description: string;
  fullDescription?: string;
  careers: string[];
  color: string;
  objectives?: string[];
  curriculum?: string[];
  admissionRequirements?: string[];
}

const programs: Program[] = [
  {
    title: "Bachelor of Science in Computer Science",
    icon: Laptop,
    duration: "4 years",
    type: "Bachelor's",
    description: "A comprehensive program that delves into algorithms, software development, and computational theory to prepare students for careers in technology.",
    fullDescription: "This program provides a deep understanding of computer science fundamentals, including programming, data structures, algorithms, and software engineering. Students explore advanced topics like artificial intelligence, machine learning, and cybersecurity, equipping them to innovate and solve complex problems in the digital world.",
    careers: ["Software Engineer", "Data Scientist", "AI Researcher", "Systems Analyst", "Cybersecurity Analyst", "Tech Entrepreneur"],
    color: "blue",
    objectives: [
      "Master fundamental computer science concepts and algorithms",
      "Develop skills in software design, development, and testing",
      "Understand computational theory and computer systems",
      "Foster analytical thinking and problem-solving abilities"
    ],
    curriculum: ["Data Structures and Algorithms", "Software Engineering", "Computer Architecture", "Artificial Intelligence", "Database Systems", "Operating Systems"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Strong Mathematics Background", "Basic Programming Knowledge"]
  },
  {
    title: "Bachelor of Science in Information Technology",
    icon: Laptop,
    duration: "4 years",
    type: "Bachelor's",
    description: "Focuses on information technology practices, including software development, network management, and cybersecurity.",
    fullDescription: "This program covers essential IT skills such as programming, database management, network administration, and cybersecurity. Students learn to design, implement, and maintain IT systems, preparing them for diverse roles in the technology industry.",
    careers: ["Software Developer", "IT Consultant", "Network Engineer", "Database Administrator", "Cybersecurity Specialist", "Systems Analyst"],
    color: "blue",
    objectives: [
      "Gain proficiency in programming and software development",
      "Learn network and system administration",
      "Master database design and management",
      "Understand cybersecurity principles"
    ],
    curriculum: ["Programming Fundamentals", "Network Administration", "Database Systems", "Cybersecurity", "Web Development", "IT Project Management"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Mathematics Proficiency", "Basic Computer Skills"]
  },
  {
    title: "Bachelor of Science in Information Systems",
    icon: Laptop,
    duration: "4 years",
    type: "Bachelor's",
    description: "Integrates information technology with business processes to manage and analyze data effectively.",
    fullDescription: "This program combines IT knowledge with business acumen, teaching students to design information systems that support organizational goals. Topics include systems analysis, database management, project management, and enterprise software.",
    careers: ["Systems Analyst", "IT Manager", "Business Analyst", "Project Manager", "Data Analyst", "Information Systems Consultant"],
    color: "blue",
    objectives: [
      "Understand information systems design and implementation",
      "Learn business process analysis",
      "Develop skills in database and data management",
      "Master project management in IT contexts"
    ],
    curriculum: ["Systems Analysis and Design", "Database Management", "Business Process Modeling", "Enterprise Systems", "IT Project Management", "Data Analytics"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Mathematics and Business Background", "Computer Literacy"]
  },
  {
    title: "Bachelor of Science in Accountancy",
    icon: Calculator,
    duration: "4 years",
    type: "Bachelor's",
    description: "Prepares students for professional accounting careers with a focus on financial reporting, auditing, and taxation.",
    fullDescription: "This program provides comprehensive training in accounting principles, financial analysis, auditing, and taxation. Students learn to prepare financial statements, conduct audits, and advise on financial matters, preparing them for CPA licensure and accounting roles.",
    careers: ["Certified Public Accountant", "Financial Analyst", "Auditor", "Tax Consultant", "Accounting Manager", "Controller"],
    color: "green",
    objectives: [
      "Master accounting principles and standards",
      "Develop skills in financial reporting and analysis",
      "Learn auditing and assurance techniques",
      "Understand taxation and regulatory compliance"
    ],
    curriculum: ["Financial Accounting", "Managerial Accounting", "Auditing", "Taxation", "Financial Management", "Accounting Information Systems"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Strong Mathematics Background", "Good Analytical Skills"]
  },
  {
    title: "Bachelor of Science in Accounting Information System",
    icon: Calculator,
    duration: "4 years",
    type: "Bachelor's",
    description: "Combines accounting knowledge with information technology for modern financial systems management.",
    fullDescription: "This program integrates accounting with IT, teaching students to design and manage accounting information systems. Topics include financial software, data security, ERP systems, and IT auditing.",
    careers: ["Accounting Systems Analyst", "IT Auditor", "Financial Systems Manager", "ERP Consultant", "Data Analyst", "Compliance Specialist"],
    color: "green",
    objectives: [
      "Integrate accounting and IT knowledge",
      "Design and implement accounting information systems",
      "Ensure data security and compliance",
      "Develop skills in financial software and ERP"
    ],
    curriculum: ["Accounting Principles", "Information Systems", "Database Design", "IT Auditing", "ERP Systems", "Financial Analytics"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Mathematics and Computer Background", "Analytical Skills"]
  },
  {
    title: "Bachelor in Public Administration",
    icon: Building2,
    duration: "4 years",
    type: "Bachelor's",
    description: "Trains students in public administration, policy development, and government management.",
    fullDescription: "This program focuses on public sector management, policy analysis, and administrative processes. Students learn about governance, public finance, and organizational behavior in government and non-profit settings.",
    careers: ["Public Administrator", "Policy Analyst", "Government Manager", "NGO Director", "Program Coordinator", "Civil Servant"],
    color: "teal",
    objectives: [
      "Understand public administration principles",
      "Learn policy development and analysis",
      "Develop management skills for public organizations",
      "Foster ethical decision-making in governance"
    ],
    curriculum: ["Public Administration", "Policy Analysis", "Public Finance", "Organizational Behavior", "Governance and Ethics", "Public Management"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Good Communication Skills", "Interest in Public Service"]
  },
  {
    title: "Bachelor of Science in Entrepreneurship",
    icon: Briefcase,
    duration: "4 years",
    type: "Bachelor's",
    description: "Develops entrepreneurial skills and business acumen for starting and managing ventures.",
    fullDescription: "This program equips students with the knowledge and skills to start and manage their own businesses. Topics include business planning, marketing, finance, and innovation, preparing students for entrepreneurial careers.",
    careers: ["Entrepreneur", "Business Owner", "Startup Founder", "Business Consultant", "Product Manager", "Marketing Manager"],
    color: "purple",
    objectives: [
      "Develop entrepreneurial mindset and skills",
      "Learn business planning and strategy",
      "Understand financial management for startups",
      "Foster innovation and creativity"
    ],
    curriculum: ["Entrepreneurship Fundamentals", "Business Planning", "Marketing Management", "Financial Management", "Innovation and Design", "Operations Management"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Creative Thinking", "Basic Business Knowledge"]
  },
  {
    title: "Bachelor of Technical Vocational Teacher Education major in Computer System Servicing",
    icon: Laptop,
    duration: "4 years",
    type: "Bachelor's",
    description: "Prepares students to teach technical vocational courses in computer system servicing and maintenance.",
    fullDescription: "This program trains future teachers in technical vocational education, specializing in computer system servicing. Students learn teaching methodologies, computer hardware/software, and maintenance techniques to educate vocational students.",
    careers: ["Vocational Teacher", "Computer Technician", "IT Trainer", "Technical Instructor", "Lab Coordinator", "Maintenance Specialist"],
    color: "blue",
    objectives: [
      "Master teaching methods for technical education",
      "Develop expertise in computer system servicing",
      "Learn curriculum development for vocational courses",
      "Foster practical skills in hardware and software maintenance"
    ],
    curriculum: ["Teaching Methodology", "Computer Hardware", "Software Installation", "Network Servicing", "Maintenance Techniques", "Vocational Education Principles"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Technical Aptitude", "Teaching Interest"]
  }
];

// Additional programs for "View All Programs"
const allPrograms: Program[] = [...programs];

const colorVariants: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  pink: "bg-pink-100 text-pink-600",
  orange: "bg-orange-100 text-orange-600",
  teal: "bg-teal-100 text-teal-600"
};

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  const openProgramDialog = (program: Program) => {
    setSelectedProgram(program);
  };

  return (
    <section id="programs" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Academic Programs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of undergraduate and graduate programs designed to prepare you for success in your chosen field.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorVariants[program.color]}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{program.type}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{program.duration}</p>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{program.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Career Opportunities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.careers.slice(0, 3).map((career, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {career}
                        </Badge>
                      ))}
                      {program.careers.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{program.careers.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => openProgramDialog(program)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" onClick={() => setShowAllPrograms(true)}>
            View All Programs
          </Button>
        </div>
      </div>

      {/* Learn More Dialog */}
      <Dialog open={selectedProgram !== null} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProgram && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorVariants[selectedProgram.color]}`}>
                    <selectedProgram.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedProgram.title}</DialogTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{selectedProgram.type}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{selectedProgram.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">About the Program</h3>
                  <p className="text-muted-foreground">
                    {selectedProgram.fullDescription || selectedProgram.description}
                  </p>
                </div>

                {selectedProgram.objectives && selectedProgram.objectives.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Program Objectives</h3>
                    <ul className="space-y-2">
                      {selectedProgram.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProgram.curriculum && selectedProgram.curriculum.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Courses</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProgram.curriculum.map((course, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span className="text-sm">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProgram.admissionRequirements && selectedProgram.admissionRequirements.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Admission Requirements</h3>
                    <ul className="space-y-2">
                      {selectedProgram.admissionRequirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg mb-3">Career Opportunities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.careers.map((career, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* View All Programs Dialog */}
      <Dialog open={showAllPrograms} onOpenChange={setShowAllPrograms}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl">All Academic Programs</DialogTitle>
            <DialogDescription>
              Explore our complete range of undergraduate and graduate programs designed to prepare you for success.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {allPrograms.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorVariants[program.color]}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{program.type}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">{program.duration}</p>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{program.fullDescription || program.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Career Opportunities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.careers.slice(0, 4).map((career, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {career}
                          </Badge>
                        ))}
                        {program.careers.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{program.careers.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setShowAllPrograms(false);
                        setTimeout(() => openProgramDialog(program), 100);
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Why Choose SorSU-Bulan?</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Accredited programs recognized by national and international bodies</li>
              <li>• Experienced faculty with industry expertise</li>
              <li>• Modern facilities and state-of-the-art laboratories</li>
              <li>• Strong industry partnerships for internships and job placements</li>
              <li>• Comprehensive student support services</li>
              <li>• Affordable tuition fees with scholarship opportunities</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}