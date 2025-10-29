import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Briefcase, Laptop, FlaskConical, Brush, Calculator, Heart, Scale, Building2, BookOpen, Users, Icon } from "lucide-react";

const programs = [
  {
    title: "Bachelor of Science in Computer Science",
    icon: FlaskConical,
    duration: "4 years",
    type: "Bachelor's",
    description: "The program includes the study of computing concepts and theories, algorithmic foundations and new developments in computing. It",
    careers: ["Mobile App Developer", "Cybersecurity Specialist", "Web Developer"],
    color: "green"
  },
  {
    title: "Bachelor of Science in Information Technology",
    icon: Laptop,
    duration: "4 years",
    type: "Bachelor's",
    description: "Comprehensive IT program covering software development, network administration, and database management.",
    careers: ["Software Developer", "System Administrator", "IT Consultant"],
    color: "blue"
  },
  {
    title: "Bachelor of Science Information Systems",
    icon: BookOpen,
    duration: "4 years",
    type: "Bachelor's",
    description: "The program includes the study of application and effect of information technology to organizations.",
    careers: ["Business Analyst", "Systems Analyst", "IT Project Manager"],
    color: "teal"
  },
  {
    title: "Bachelor of Science in Accountancy",
    icon: Calculator,
    duration: "4 years",
    type: "Bachelor's",
    description: "Accounting program focusing on financial reporting, auditing, and taxation.",
    careers: ["Certified Public Accountant", "Auditor", "Financial Analyst"],
    color: "purple"
  },
  {
    title: "Bachelor of Science in Accounting Information System",
    icon: Calculator,
    duration: "4 years",
    type: "Bachelor's",
    description: "This program combines accounting principles with information systems to prepare students for careers in accounting technology.",
    careers: ["Accounting Systems Analyst", "Financial Systems Manager", "IT Auditor"],
    color: "pink"
  },
  {
    title: "Bachelor in Public Administration",
    icon: Building2,
    duration: "4 years",
    type: "Bachelor's",
    description: "This program prepares students for careers in public service and administration, focusing on governance, policy analysis, and public management.",
    careers: ["Public Administrator", "Policy Analyst", "City Manager"],
    color: "orange"
  },
  {
    title: "Bachelor of Science in Entrepreneurship",
    icon: Users,
    duration: "4 years",
    type: "Bachelor's",
    description: "Entrepreneurship program focusing on business creation, innovation, and management.",
    careers: ["Startup Founder", "Business Consultant", "Venture Capitalist"],
    color: "green"
  },
  {
    title: "Bachelor of Technical Vocational Teacher Education (BTVTED) major in Computer System Servicing",
    icon: Briefcase,
    duration: "4 years",
    type: "Bachelor's",
    description: "This is the newest program in Bulan Campus to be offered in AY 2023-2024. This program is designed to prepare students to become competent technical vocational teachers in the field of computer system servicing.",
    careers: ["Technical Vocational Teacher", "IT Trainer", "Computer Technician"],
    color: "blue"
  }
];

const colorVariants: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  pink: "bg-pink-100 text-pink-600",
  orange: "bg-orange-100 text-orange-600",
  teal: "bg-teal-100 text-teal-600"
};

export default function ProgramsSection() {
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
                      {program.careers.map((career, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg">View All Programs</Button>
        </div>
      </div>
    </section>
  );
}