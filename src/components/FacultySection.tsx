import React from 'react';
import { useFaculty } from '../context/FacultyContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

const FacultySection = () => {
  const { faculty, loading } = useFaculty();

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

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading faculty information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faculty" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Faculty</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet our dedicated team of educators and researchers committed to excellence in teaching and innovation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((facultyMember) => (
            <Card key={facultyMember.id} className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16 flex-shrink-0">
                    <AvatarImage src={facultyMember.profileImage} />
                    <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold">
                      {getInitials(facultyMember.firstName, facultyMember.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1">
                      {facultyMember.firstName} {facultyMember.lastName}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">{facultyMember.title}</p>
                    <Badge className={`${getStatusColor(facultyMember.status)} text-xs`}>
                      {facultyMember.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span className="truncate">{facultyMember.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{facultyMember.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{facultyMember.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{facultyMember.office}</span>
                  </div>
                </div>
                
                {facultyMember.specializations.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {facultyMember.specializations.slice(0, 2).map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {facultyMember.specializations.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{facultyMember.specializations.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {facultyMember.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {faculty.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Faculty information will be available soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FacultySection;