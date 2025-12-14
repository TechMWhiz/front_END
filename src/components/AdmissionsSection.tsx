import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle, Calendar, DollarSign, FileText, Users, Clock } from "lucide-react";
import * as React from "react";

const admissionSteps = [
  {
    step: 1,
    title: "Submit Application",
    description: "Complete our online application form with your personal and academic information",
    deadline: "Priority: Dec 1",
    icon: FileText
  },
  {
    step: 2,
    title: "Submit Documents",
    description: "Provide transcripts, test scores, and letters of recommendation",
    deadline: "By Jan 15",
    icon: CheckCircle
  },
  {
    step: 3,
    title: "Application Review",
    description: "Our admissions team will review all materials and make a decision",
    deadline: "Feb - Mar",
    icon: Users
  },
  {
    step: 4,
    title: "Decision & Enrollment",
    description: "Receive your decision and confirm your enrollment for fall semester",
    deadline: "By May 1",
    icon: Calendar
  }
];

const financialAid = [
  {
    type: "Merit Scholarships",
    amount: "Up to $20,000/year",
    description: "Based on academic achievement and test scores",
    eligibility: "High school GPA 3.5+"
  },
  {
    type: "Need-based Aid",
    amount: "Varies",
    description: "Federal and state grants, work-study programs",
    eligibility: "Complete FAFSA"
  },
  {
    type: "Program-specific",
    amount: "Up to $15,000/year", 
    description: "Scholarships for specific majors and programs",
    eligibility: "By program requirements"
  }
];

export default function AdmissionsSection() {
  return (
    <section id="admissions" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Admissions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to join our community? Learn about our admissions process, requirements, and financial aid opportunities.
          </p>
        </div>
        
        {/* Key Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center p-6 bg-white">
            <div className="text-3xl font-bold text-primary mb-2">75%</div>
            <p className="text-muted-foreground">Acceptance Rate</p>
          </Card>
          <Card className="text-center p-6 bg-white">
            <div className="text-3xl font-bold text-primary mb-2">1,200</div>
            <p className="text-muted-foreground">Average SAT Score</p>
          </Card>
          <Card className="text-center p-6 bg-white">
            <div className="text-3xl font-bold text-primary mb-2">$45,000</div>
            <p className="text-muted-foreground">Annual Tuition</p>
          </Card>
        </div>
        
        {/* Application Process */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Application Process</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="relative bg-white">
                  <CardHeader className="text-center pb-2">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mx-auto mt-4 mb-3">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.deadline}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Financial Aid */}
        <div className="bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Financial Aid & Scholarships</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe that financial constraints shouldn't limit your educational dreams. Explore our comprehensive financial aid options.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {financialAid.map((aid, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{aid.type}</CardTitle>
                    <div className="flex items-center gap-1 text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold text-sm">{aid.amount}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{aid.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {aid.eligibility}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-2">96% of students receive financial aid</h4>
              <p className="text-sm text-muted-foreground">Average aid package: $18,000/year</p>
            </div>
            <div className="space-x-4">
              <Button size="lg">Apply for Financial Aid</Button>
              <Button variant="outline" size="lg">Net Price Calculator</Button>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have chosen Metropolitan University to achieve their academic and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Start Application
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Schedule Campus Visit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}