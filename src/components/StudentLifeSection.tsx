import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Users, Calendar, Trophy, Heart, Music, BookOpen, Gamepad2, Globe } from "lucide-react";

const activities = [
  {
    category: "Student Organizations",
    icon: Users,
    count: "100+",
    description: "Join clubs and organizations that match your interests and career goals",
    examples: ["Student Government", "Cultural Associations", "Professional Societies", "Volunteer Groups"],
    color: "blue"
  },
  {
    category: "Sports & Recreation",
    icon: Trophy,
    count: "25+",
    description: "Stay active with our comprehensive athletics and recreation programs",
    examples: ["Varsity Teams", "Intramural Sports", "Fitness Center", "Outdoor Adventures"],
    color: "green"
  },
  {
    category: "Arts & Culture",
    icon: Music,
    count: "15+",
    description: "Express your creativity through our vibrant arts and cultural programs",
    examples: ["Theater Productions", "Art Galleries", "Music Ensembles", "Film Society"],
    color: "purple"
  },
  {
    category: "Academic Support",
    icon: BookOpen,
    count: "24/7",
    description: "Get the support you need to succeed academically and personally",
    examples: ["Tutoring Center", "Writing Lab", "Career Services", "Counseling"],
    color: "orange"
  }
];

const events = [
  {
    title: "Welcome Week",
    date: "Aug 25-31",
    type: "Orientation",
    description: "New student orientation activities and campus tours"
  },
  {
    title: "Career Fair",
    date: "Sep 15",
    type: "Career",
    description: "Meet with employers and explore internship opportunities"
  },
  {
    title: "Homecoming",
    date: "Oct 12-14",
    type: "Celebration",
    description: "Alumni reunion and traditional homecoming festivities"
  },
  {
    title: "Research Symposium",
    date: "Nov 8",
    type: "Academic",
    description: "Showcase of student and faculty research projects"
  }
];

const colorVariants: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600"
};

export default function StudentLifeSection() {
  return (
    <section id="student-life" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Student Life</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your university experience extends far beyond the classroom. Discover the vibrant community and endless opportunities that await you.
          </p>
        </div>
        
        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 ${colorVariants[activity.color]}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {activity.count}
                    </Badge>
                    <CardTitle className="text-lg">{activity.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {activity.description}
                  </p>
                  <div className="space-y-2">
                    {activity.examples.map((example, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground border rounded px-2 py-1">
                        {example}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-slate-50 rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Upcoming Events</h3>
            <Button variant="outline">View All Events</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((event, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Student Support */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Student Support Services</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're committed to your success. Our comprehensive support services are here to help you thrive academically, personally, and professionally.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Health & Wellness</h4>
              <p className="text-sm text-muted-foreground">Medical services, mental health support, and wellness programs</p>
            </Card>
            
            <Card className="p-6">
              <Globe className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">International Services</h4>
              <p className="text-sm text-muted-foreground">Support for international students and study abroad programs</p>
            </Card>
            
            <Card className="p-6">
              <Gamepad2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Campus Technology</h4>
              <p className="text-sm text-muted-foreground">IT support, online learning platforms, and digital resources</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}