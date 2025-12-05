import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog"; 
import { Briefcase, Laptop, FlaskConical, Brush, Calculator, Heart, Scale, Building2, BookOpen, Users, Icon } from "lucide-react";

const programs = [
  {
    title: "Bachelor of Science in Computer Science",
    icon: FlaskConical,
    duration: "4 years",
    type: "Bachelor's",
    description: "The program includes the study of computing concepts and theories, algorithmic foundations and new developments in computing. It prepares students to design and create algorithmically complex software and develop new and effective algorithms for solving computing problems. The program also includes the study of the standards and practices in Software Engineering. It prepares students to acquire skills and disciplines required for designing, writing and modifying software components, modules and applications that comprise software solutions.",
    careers: ["Mobile App Developer", "Cybersecurity Specialist", "Web Developer"],
    color: "green"
  },
  {
    title: "Bachelor of Science in Information Technology",
    icon: Laptop,
    duration: "4 years",
    type: "Bachelor's",
    description: "The program includes the study of the utilization of both hardware and software technologies. It involves planning, installing, customizing, operating, managing and administering and maintaining information technology infrastructure that provides computing solutions to address the needs of an organization. It prepares graduates to address various user needs involving the selection, development, application, integration and management of computing technologies within an organization.",
    careers: ["Software Developer", "System Administrator", "IT Consultant"],
    color: "blue"
  },
  {
    title: "Bachelor of Science Information Systems",
    icon: BookOpen,
    duration: "4 years",
    type: "Bachelor's",
    description: "The program includes the study of application and effect of information technology to organizations. Graduates of the program should be able to implement an information system, which considers complex technological and organizational factors affecting it. These include components, tools, techniques, strategies and methodologies. Also, graduates should be able to help an organization determine how information and technology-enabled business processes can be used as strategic tools to achieve a competitive advantage. As a result, IS professionals require a sound understanding of organizational principles and practices so that they can serve as an effective bridge between the technical and management/user communities within an organization. This enables them to ensure that the organization has the information and the systems it needs to support its operations.",
    careers: ["Business Analyst", "Systems Analyst", "IT Project Manager"],
    color: "teal"
  },
  {
    title: "Bachelor of Science in Accountancy",
    icon: Calculator,
    duration: "4 years",
    type: "Bachelor's",
    description: "This program provides general accounting education to students wanting to pursue a professional career in accountancy and that qualifies someone to take the CPA Licensure Examinations pursuant to the Accountancy Act of 2004 (CMO No. 27, s. 2017)",
    careers: ["Certified Public Accountant", "Auditor", "Financial Analyst"],
    color: "purple"
  },
  {
    title: "Bachelor of Science in Accounting Information System",
    icon: Calculator,
    duration: "4 years",
    type: "Bachelor's",
    description: "The program provides general accounting education to students wanting to pursue a professional career in Accounting Information System. A profession that combines knowledge in business, accounting and computer systems. Graduates of this program qualify to take assessments leading to certifications in Accounting Information System given by global professional Accounting Information System organizations. (CMO No. 30, s. 2017)",
    careers: ["Accounting Systems Analyst", "Financial Systems Manager", "IT Auditor"],
    color: "pink"
  },
  {
    title: "Bachelor in Public Administration",
    icon: Building2,
    duration: "4 years",
    type: "Bachelor's",
    description: "TThis is a degree program that prepares people for careers in public administration and governance for the public interest. It is a formation course for students who want to devote their life to public service in government and civil society. It is also a good preparation for those interested in taking up law. Graduates can look forward to executive and policy-making positions in government, both elective and appointive, as well as executive and policy-making positions in civil society organizations. (CMO No. 06, s. 2010)",
    careers: ["Public Administrator", "Policy Analyst", "City Manager"],
    color: "orange"
  },
  {
    title: "Bachelor of Science in Entrepreneurship",
    icon: Users,
    duration: "4 years",
    type: "Bachelor's",
    description: "The program is a combination of classroom training and experiential learning that will help aspiring entrepreneurs acquire the skills, values and attitudes that will increase their chances of success. Graduates of this program should be able to set up and manage their own business or work in any organization where entrepreneurial competencies are required. They should also be able to pursue other careers such as Entrepreneurs, Business Development or Corporate Planning Development Staff/Assistant, Marketing Assistant or Staff (CMO No. 18, s. 2017).",
    careers: ["Startup Founder", "Business Consultant", "Venture Capitalist"],
    color: "green"
  },
  {
    title: "Bachelor of Technical Vocational Teacher Education (BTVTED) major in Computer System Servicing",
    icon: Briefcase,
    duration: "4 years",
    type: "Bachelor's",
    description: "This is the newest program in Bulan Campus to be offered in AY 2023-2024. The BTVTEd Major in Computer Hardware Servicing program aims to equip learners with adequate and relevant competencies to become teachers of ICT subjects in the technical-vocational track in senior high school of the Kto12 Curriculum",
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
  const [selectedProgram, setSelectedProgram] = React.useState(null);
  return (
    <section id="programs" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-maroon"> Academic Programs </h2>
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
                <p className="text-muted-foreground">
                        {program.description.split('. ')[0]}.
                      </p>
                  
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
                  
                  {/* Modal Trigger */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorVariants[program.color]}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          {program.title}
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-muted-foreground">
                        {program.description.split('. ')[0]}.
                      </p>

                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Career Opportunities</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {program.careers.map((career, idx) => (
                            <li key={idx}>{career}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 text-sm text-muted-foreground">
                        <strong>Duration:</strong> {program.duration} <br />
                        <strong>Type:</strong> {program.type}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* <div className="text-center mt-12">
          <Button size="lg">View All Programs</Button>
        </div> */}
      </div>
    </section>
  );
}