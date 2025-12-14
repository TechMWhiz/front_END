import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  Users, 
  Calendar, 
  Mail, 
  MapPin, 
  Trophy,
  BookOpen,
  Palette,
  Music,
  Heart,
  Globe,
  Code,
  Briefcase,
  Camera,
  Volleyball,
  Drama,
  Search
} from "lucide-react";
import { Input } from "./ui/input";

interface Club {
  id: string;
  name: string;
  category: 'academic' | 'cultural' | 'sports' | 'service' | 'professional' | 'special-interest';
  icon: React.ReactNode;
  description: string;
  president: string;
  members: number;
  established: string;
  meetingSchedule: string;
  contactEmail: string;
  activities: string[];
  requirements: string[];
  benefits: string[];
}

const STUDENT_CLUBS: Club[] = [
  {
    id: 'cs-society',
    name: 'Computer Science Society',
    category: 'academic',
    icon: <Code className="w-5 h-5" />,
    description: 'A community of tech enthusiasts focused on programming, software development, and emerging technologies.',
    president: 'John Patrick Santos',
    members: 85,
    established: '2018',
    meetingSchedule: 'Every Friday, 3:00 PM - 5:00 PM',
    contactEmail: 'cs.society@sorsu-bulan.edu.ph',
    activities: ['Coding Workshops', 'Hackathons', 'Tech Talks', 'Programming Contests', 'Industry Visits'],
    requirements: ['CS/IT Student', 'Basic Programming Knowledge', 'Commitment to Meetings'],
    benefits: ['Skill Development', 'Industry Connections', 'Certification Opportunities', 'Project Collaboration']
  },
  {
    id: 'business-club',
    name: 'Future Business Leaders',
    category: 'professional',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Developing entrepreneurial skills and business acumen through hands-on experiences and networking.',
    president: 'Maria Isabella Cruz',
    members: 72,
    established: '2019',
    meetingSchedule: 'Every Wednesday, 4:00 PM - 6:00 PM',
    contactEmail: 'business.club@sorsu-bulan.edu.ph',
    activities: ['Business Plan Competitions', 'Entrepreneurship Workshops', 'Company Visits', 'Case Study Discussions'],
    requirements: ['Business Program Student', 'Interest in Entrepreneurship', 'Active Participation'],
    benefits: ['Leadership Skills', 'Business Network', 'Mentorship Programs', 'Internship Opportunities']
  },
  {
    id: 'cultural-dance',
    name: 'Sorsogon Cultural Dance Troupe',
    category: 'cultural',
    icon: <Music className="w-5 h-5" />,
    description: 'Preserving and showcasing the rich cultural heritage of Sorsogon through traditional dances and performances.',
    president: 'Angela Marie Dela Cruz',
    members: 45,
    established: '2015',
    meetingSchedule: 'Tuesdays & Thursdays, 5:00 PM - 7:00 PM',
    contactEmail: 'cultural.dance@sorsu-bulan.edu.ph',
    activities: ['Cultural Performances', 'Festival Participations', 'Dance Workshops', 'Cultural Exchange'],
    requirements: ['Passion for Dance', 'Cultural Appreciation', 'Regular Practice Attendance'],
    benefits: ['Cultural Preservation', 'Performance Skills', 'Travel Opportunities', 'Cultural Pride']
  },
  {
    id: 'volleyball-team',
    name: 'SorSU-Bulan Volleyball Club',
    category: 'sports',
    icon: <Volleyball className="w-5 h-5" />,
    description: 'Competitive volleyball team representing the university in inter-school competitions and tournaments.',
    president: 'Mark Anthony Reyes',
    members: 30,
    established: '2016',
    meetingSchedule: 'Monday, Wednesday, Friday - 6:00 AM - 8:00 AM',
    contactEmail: 'volleyball@sorsu-bulan.edu.ph',
    activities: ['Training Sessions', 'Inter-school Competitions', 'Team Building', 'Skills Workshops'],
    requirements: ['Physical Fitness', 'Team Commitment', 'Training Attendance', 'Sportsmanship'],
    benefits: ['Physical Fitness', 'Team Work Skills', 'Competition Experience', 'Athletic Scholarships']
  },
  {
    id: 'red-cross',
    name: 'Philippine Red Cross Youth',
    category: 'service',
    icon: <Heart className="w-5 h-5" />,
    description: 'Community service organization focused on humanitarian activities and disaster response training.',
    president: 'Catherine Joy Flores',
    members: 65,
    established: '2017',
    meetingSchedule: 'Every Saturday, 2:00 PM - 4:00 PM',
    contactEmail: 'redcross.youth@sorsu-bulan.edu.ph',
    activities: ['Blood Donation Drives', 'First Aid Training', 'Community Outreach', 'Disaster Preparedness'],
    requirements: ['Willingness to Serve', 'Community Spirit', 'Training Participation'],
    benefits: ['Service Learning', 'Leadership Development', 'First Aid Certification', 'Community Impact']
  },
  {
    id: 'photography-club',
    name: 'SorSU-Bulan Photography Club',
    category: 'special-interest',
    icon: <Camera className="w-5 h-5" />,
    description: 'Creative community for photography enthusiasts to develop skills and showcase artistic vision.',
    president: 'Joshua Miguel Torres',
    members: 38,
    established: '2020',
    meetingSchedule: 'Every Sunday, 1:00 PM - 4:00 PM',
    contactEmail: 'photography@sorsu-bulan.edu.ph',
    activities: ['Photo Walks', 'Exhibitions', 'Workshops', 'Photo Contests', 'Equipment Sharing'],
    requirements: ['Interest in Photography', 'Basic Camera Knowledge', 'Creative Spirit'],
    benefits: ['Skill Development', 'Equipment Access', 'Portfolio Building', 'Creative Network']
  },
  {
    id: 'theater-guild',
    name: 'University Theater Guild',
    category: 'cultural',
    icon: <Drama className="w-5 h-5" />,
    description: 'Dramatic arts organization producing theatrical performances and developing performing arts skills.',
    president: 'Sophia Marie Gonzales',
    members: 42,
    established: '2014',
    meetingSchedule: 'Tuesdays & Fridays, 6:00 PM - 8:00 PM',
    contactEmail: 'theater@sorsu-bulan.edu.ph',
    activities: ['Stage Productions', 'Acting Workshops', 'Script Writing', 'Costume & Set Design'],
    requirements: ['Performance Interest', 'Creativity', 'Commitment to Rehearsals'],
    benefits: ['Performance Skills', 'Creative Expression', 'Confidence Building', 'Artistic Development']
  },
  {
    id: 'environmental-club',
    name: 'Green Earth Environmental Club',
    category: 'service',
    icon: <Globe className="w-5 h-5" />,
    description: 'Environmental advocacy group promoting sustainability and environmental awareness on campus and community.',
    president: 'Carlos Eduardo Santos',
    members: 55,
    established: '2019',
    meetingSchedule: 'Every Thursday, 3:30 PM - 5:30 PM',
    contactEmail: 'green.earth@sorsu-bulan.edu.ph',
    activities: ['Tree Planting', 'Waste Management Programs', 'Environmental Campaigns', 'Recycling Drives'],
    requirements: ['Environmental Passion', 'Community Service Spirit', 'Active Participation'],
    benefits: ['Environmental Awareness', 'Community Impact', 'Leadership Skills', 'Sustainability Knowledge']
  }
];

const CATEGORY_COLORS = {
  academic: 'bg-blue-100 text-blue-700 border-blue-200',
  cultural: 'bg-purple-100 text-purple-700 border-purple-200',
  sports: 'bg-green-100 text-green-700 border-green-200',
  service: 'bg-red-100 text-red-700 border-red-200',
  professional: 'bg-orange-100 text-orange-700 border-orange-200',
  'special-interest': 'bg-pink-100 text-pink-700 border-pink-200'
};

const CATEGORY_LABELS = {
  academic: 'Academic',
  cultural: 'Cultural',
  sports: 'Sports',
  service: 'Service',
  professional: 'Professional',
  'special-interest': 'Special Interest'
};

export default function StudentClubsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredClubs = STUDENT_CLUBS.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Student Clubs & Organizations</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with like-minded peers and explore your interests through our diverse range of student organizations.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs and organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            All Categories ({STUDENT_CLUBS.length})
          </Button>
          {categories.map(category => {
            const count = STUDENT_CLUBS.filter(club => club.category === category).length;
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {CATEGORY_LABELS[category]} ({count})
              </Button>
            );
          })}
        </div>

        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredClubs.map((club) => (
            <Card key={club.id} className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {club.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{club.name}</CardTitle>
                      <Badge className={`text-xs mt-1 ${CATEGORY_COLORS[club.category]}`}>
                        {CATEGORY_LABELS[club.category]}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {club.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{club.members} members</span>
                    </div>
                    <div className="text-muted-foreground">
                      Est. {club.established}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="line-clamp-1">{club.meetingSchedule}</span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          {club.icon}
                        </div>
                        {club.name}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div>
                        <Badge className={CATEGORY_COLORS[club.category]}>
                          {CATEGORY_LABELS[club.category]}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground">{club.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Club Information
                          </h4>
                          <div className="text-sm space-y-1">
                            <p><strong>President:</strong> {club.president}</p>
                            <p><strong>Members:</strong> {club.members}</p>
                            <p><strong>Established:</strong> {club.established}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Meeting Schedule
                          </h4>
                          <p className="text-sm">{club.meetingSchedule}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Activities & Programs</h4>
                        <div className="flex flex-wrap gap-2">
                          {club.activities.map((activity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold">Requirements</h4>
                          <ul className="text-sm space-y-1">
                            {club.requirements.map((req, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold">Benefits</h4>
                          <ul className="text-sm space-y-1">
                            {club.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Contact Information
                        </h4>
                        <p className="text-sm">
                          <strong>Email:</strong> 
                          <a href={`mailto:${club.contactEmail}`} className="text-primary hover:underline ml-1">
                            {club.contactEmail}
                          </a>
                        </p>
                        <p className="text-sm mt-1 text-muted-foreground">
                          Contact the club president or visit the Student Affairs Office for more information about joining.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No clubs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Involved?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join a club or organization today and make the most of your university experience. 
            Connect with peers, develop new skills, and create lasting memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Visit Student Affairs Office
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}