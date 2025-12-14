import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import LibraryImg from "../assets/library.jpg";
import LaboratoryImg from "../assets/laboratory.jpg";
import StudentActivityImg from "../assets/Student Activity Center.jpg";
import { MapPin, Clock, Users, Wifi, Map } from "lucide-react";
import { useState } from "react";
import VirtualCampusMap from "./VirtualCampusMap";

const facilities = [
  {
    name: "SorSU-Bulan Library",
    image: LibraryImg,
    description: "Modern library facility with extensive collection of books, journals, and digital resources",
    features: ["Study Areas", "Computer Labs", "Internet Access", "Research Support"],
    hours: "Mon-Fri 7AM-8PM"
  },
  {
    name: "IT & Computer Laboratories",
    image: LaboratoryImg,
    description: "Well-equipped computer laboratories supporting IT and programming courses",
    features: ["Modern Computers", "Software Development Tools", "Network Labs", "Multimedia Systems"],
    hours: "Mon-Fri 7AM-7PM"
  },
  {
    name: "Student Activity Center",
    image: StudentActivityImg,
    description: "Central hub for student activities, events, and campus life",
    features: ["Cafeteria", "Meeting Rooms", "Audio-Visual Equipment", "Student Organizations"],
    hours: "Mon-Fri 6AM-9PM"
  }
];

const campusStats = [
  { label: "Campus Size", value: "8 hectares", icon: MapPin },
  { label: "Buildings", value: "12+", icon: Users },
  { label: "Classrooms", value: "45+", icon: Clock },
  { label: "WiFi Coverage", value: "Campus-wide", icon: Wifi }
];

export default function CampusSection() {
  const [showVirtualMap, setShowVirtualMap] = useState(false);

  return (
    <section id="campus" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Campus & Facilities</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Explore SorSU-Bulan's modern campus facilities designed to provide quality education and support student development in the heart of Sorsogon.
          </p>
          <Button
            onClick={() => setShowVirtualMap(!showVirtualMap)}
            className="flex items-center gap-2"
            variant={showVirtualMap ? "default" : "outline"}
          >
            <Map className="w-4 h-4" />
            {showVirtualMap ? "Hide Virtual Map" : "Explore Virtual Campus Map"}
          </Button>
        </div>

        {showVirtualMap && (
          <div className="mb-12">
            <VirtualCampusMap />
          </div>
        )}
        
        {/* Campus Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {campusStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mx-auto mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>
        
        {/* Facilities */}
        <div className="space-y-8">
          {facilities.map((facility, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <ImageWithFallback 
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{facility.name}</h3>
                    <p className="text-muted-foreground mb-6">{facility.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {facility.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Hours: {facility.hours}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}