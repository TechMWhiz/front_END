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
  Search,
  Computer,
  Scale,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Building
} from "lucide-react";
import { Input } from "./ui/input";

interface Club {
  id: string;
  name: string;
  category: 'academic' | 'cultural' | 'sports' | 'service' | 'professional' | 'faith' | 'leadership' | 'leadership';
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
    name: 'College Red Cross Youth Council (CRCYC)',
    category: 'service',
    icon: <Heart className="w-5 h-5" />,
    description: 'A community of tech enthusiasts focused on programming, software development, and emerging technologies.',
    president: 'Luigi Miguel Gaspi',
    members: 120,
    established: '2023',
    meetingSchedule: 'Every Friday, 3:00 PM - 5:00 PM',
    contactEmail: 'crcyc@sorsu-bulan.edu.ph',
    activities: ['First Aid & Basic Life Support Training', 'Blood Donation Drives', 'Community Outreach Programs', 'Health Awareness Campaigns', 'Volunteer Service in Local Events'],
    requirements: ['Must be a bona fide SorSU student', 'Commitment to humanitarian service', 'Attendance in training and meetings'],
    benefits: ['Certified First Aid & BLS Training', 'Leadership and teamwork development', 'Recognition for community service', 'Opportunities to serve in local and national Red Cross events']
  },
  {
    id: 'business-club',
    name: 'KAAGAPAY',
    category: 'service',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'A student-led support group focused on peer assistance, guidance, and community outreach programs.',
    president: 'Ray Jr. B. Del Castillo',
    members: 72,
    established: '2016',
    meetingSchedule: 'Every Wednesday, 4:00 PM - 6:00 PM',
    contactEmail: 'kaagapay@sorsu-bulan.edu.ph',
    activities: ['Peer Mentoring Sessions', 'Community Service Projects', 'Mental Health Awareness Campaigns', 'Mental Health Awareness Campaigns'],
    requirements: ['SorSU student', 'Commitment to service activities', 'Attendance in meetings'],
    benefits: ['Leadership Skills', 'Community involvement', 'Recognition for service']
  },
  {
    id: 'cultural-dance',
    name: 'SorSU Theater Arts N Dance (STAND)',
    category: 'cultural',
    icon: <Music className="w-5 h-5" />,
    description: 'A creative community showcasing talent in theater, dance, and performance arts, fostering cultural appreciation.',
    president: 'Mattheo Gicaro',
    members: 70,
    established: '2015',
    meetingSchedule: 'Every Friday, 2:00 PM - 5:00 PM',
    contactEmail: 'stand@sorsu-bulan.edu.ph',
    activities: ['Cultural Performances', 'Stage Plays', 'Dance Performances', 'Cultural Showcases', 'Acting & Dance Workshops'],
    requirements: ['Passion for Dance', 'SorSU student', 'Passion for performing arts', 'Attendance in rehearsals' ],
    benefits: ['Artistic expression', 'Performance opportunities', 'Cultural appreciation','Cultural Pride']
  },
  {
    id: 'volleyball-team',
    name: 'SorSU-Sports Kinetics Club (SKC)',
    category: 'sports',
    icon: <Volleyball className="w-5 h-5" />,
    description: 'An athletic organization promoting physical fitness, sportsmanship, and competitive training across various disciplines.',
    president: 'Rassel L. De Asis',
    members: 100,
    established: '2014',
    meetingSchedule: 'Every Monday & Thursday, 7:00 PM - 6:00 PM',
    contactEmail: 'kc@sorsu-bulan.edu.ph',
    activities: ['Intramural Sports','Fitness Training Sessions','Sports Clinics','Inter-campus Competitions'],
    requirements: ['SorSU student', 'Interest in sports/fitness', 'Commitment to training', 'Sportsmanship'],
    benefits: ['Physical Fitness', 'Team Work Skills', 'Competition Experience', 'Athletic Scholarships']
  },
  {
    id: 'red-cross',
    name: 'Computing Society (COMSOC)',
    category: 'academic',
    icon: <Computer className="w-5 h-5" />,
    description: 'A community of tech enthusiasts focused on programming, software development, and emerging technologies.',
    president: 'Jenice Mae G. Gerero ',
    members: 85,
    established: '2017',
    meetingSchedule: 'Every Friday, 2:00 PM - 4:00 PM',
    contactEmail: 'cs.society@sorsu-bulan.edu.ph',
    activities: ['Coding Workshops',  'Hackathons', 'Tech Talks', 'Programming Contests', 'Industry Visits'],
    requirements: ['CS/IT student', 'Basic programming knowledge', 'Commitment to meetings'],
    benefits: ['Skill development', 'Industry connections',  'Certification opportunities', 'Project collaboration']
  },
  {
    id: 'photography-club',
    name: 'Scholars League',
    category: 'academic',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'An organization dedicated to academic excellence, peer mentoring, and scholarship support for students.',
    president: 'Emelson B. Gipa',
    members: 68,
    established: '2019',
    meetingSchedule: 'Every Wednesday, 3:00 PM - 5:00 PM',
    contactEmail: 'scholarsleague@sorsu-bulan.edu.ph',
    activities: ['Study Groups', 'Scholarship Guidance', 'Academic compititions', 'Peer Mentoring'],
    requirements: ['SorSU student', 'Strong academic interest', 'Commitment to studies'],
    benefits: ['Academic support', 'Scholarship opportunities', 'Peer collaboration', 'Leadership skills']
  },
  {
    id: 'theater-guild',
    name: 'Junior Philippine Institute of Accountants (JPIA)',
    category: 'academic',
    icon: <Scale className="w-5 h-5" />,
    description: 'A professional student organization for accountancy majors, providing training, networking, and industry exposure.',
    president: 'Niemer Gibaga ',
    members: 42,
    established: '2014',
    meetingSchedule: 'Tuesdays & Fridays, 6:00 PM - 8:00 PM',
    contactEmail: 'jpia@sorsu-bulan.edu.ph',
    activities: ['Accounting Seminars', 'CPA Review Sesion', 'Industry Talks', 'Academic Competitions'],
    requirements: ['Accountancy student', 'Interest in accounting profession', 'Active participation'],
    benefits: ['Professional Development', 'Networking Opportunities', 'Industry Exposure', 'Skill Enhancement']
  },
  {
    id: 'environmental-club',
    name: 'Young Entrepreneur Society (YES)',
    category: 'academic',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'A dynamic group fostering entrepreneurial skills, innovation, and business leadership among students.',
    president: 'Kevin Hugh L. Hernandez ',
    members: 75,
    established: '2016',
    meetingSchedule: 'Every Thursday, 3:30 PM - 5:30 PM',
    contactEmail: 'green.earth@sorsu-bulan.edu.ph',
    activities: ['Business Plan Compititions', 'Entrepreneurshio Workshops', 'Industry Networking Events', 'Startup Showcases'],
    requirements: ['SorSU students', 'Interest in entrepreneurship', 'Active Participation'],
    benefits: ['Business skills development', 'Industry connection', 'Startup oppotunities']
  },
  {
    id: 'environmental-club',
    name: 'Union of Public Servants (UPS)',
    category: 'service',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'A student group dedicated to leadership, governance, and public service initiatives within the campus and community.',
    president: 'Faye Estabaya',
    members: 75,
    established: '2016',
    meetingSchedule: 'Every Monday, 3:30 PM - 5:30 PM',
    contactEmail: 'ups@sorsu-bulan.edu.ph',
    activities: ['Leadership Training', 'Public Service Projecs', 'Campus Governance Forums', 'Community Outreach'],
    requirements: ['SorSU student', 'Interest in leadership and service', 'Commitment to meetings'],
    benefits: ['Leadership development', 'Civic engagement', 'Recognition for service']
  },
  {
    id: 'sacto',
    name: 'SorSU BC Alliance of Communicators (SACTO)',
    category: 'academic',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'A community of aspiring communicators focused on journalism, media, and public relations.',
    president: 'Diana Rose B. Grajo',
    members: 70,
    established: '2015',
    meetingSchedule: 'Every Thursday, 2:00 PM - 4:00 PM',
    contactEmail: 'sacto@sorsu-bulan.edu.ph',
    activities: ['Campus Journalism', 'Media Workshops', 'Public Speaking Training', 'Communication Campaigns'],
    requirements: ['SorSU student', 'Interest in communication/media', 'Commitment to meetings'],
    benefits: ['Media skills development', 'Public speaking confidence', 'Networking opportunities']
  },
  {
    id: 'ssc',
    name: 'Supreme Student Council (SSC)',
    category: 'leadership',
    icon: <Building className="w-5 h-5" />,
    description: 'The highest student governing body representing the student population in campus affairs.',
    president: 'Janna S. Grabillo',
    members: 30,
    established: '2000',
    meetingSchedule: 'Weekly, Friday 1:00 PM - 3:00 PM',
    contactEmail: 'ssc@sorsu-bulan.edu.ph',
    activities: ['Student Representation', 'Campus Policy Advocacy', 'Leadership Training', 'Student Assemblies'],
    requirements: ['Elected student leader', 'Commitment to governance duties'],
    benefits: ['Leadership experience', 'Policy-making involvement', 'Recognition as student leader']
  },
  {
    id: 's4c',
    name: 'Students for Christ (S4C)',
    category: 'faith',
    icon: <Heart className="w-5 h-5" />,
    description: 'A Christian fellowship group promoting spiritual growth, worship, and service.',
    president: 'Jhellian Gerero',
    members: 60,
    established: '2010',
    meetingSchedule: 'Every Wednesday, 5:00 PM - 7:00 PM',
    contactEmail: 's4c@sorsu-bulan.edu.ph',
    activities: ['Bible Studies', 'Worship Nights', 'Community Service', 'Spiritual Retreats'],
    requirements: ['SorSU student', 'Commitment to faith-based activities'],
    benefits: ['Spiritual growth', 'Fellowship and community', 'Service opportunities']
  },
  {
    id: 'cbi',
    name: 'Christian Brotherhood International (CBI)',
    category: 'faith',
    icon: <Users className="w-5 h-5" />,
    description: 'A Christian brotherhood fostering unity, service, and spiritual development.',
    president: 'Alfie Dyne L. Castro',
    members: 50,
    established: '2008',
    meetingSchedule: 'Every Saturday, 2:00 PM - 4:00 PM',
    contactEmail: 'cbi@sorsu-bulan.edu.ph',
    activities: ['Bible Studies', 'Brotherhood Gatherings', 'Community Service', 'Faith-Based Outreach'],
    requirements: ['SorSU student', 'Commitment to Christian fellowship'],
    benefits: ['Brotherhood and unity', 'Spiritual enrichment', 'Service opportunities']
  },
  {
    id: 'freethinker',
    name: 'The Freethinker',
    category: 'academic',
    icon: <Lightbulb className="w-5 h-5" />,
    description: 'A student group encouraging critical thinking, open dialogue, and intellectual exploration.',
    president: 'Jason B. Geraldino',
    members: 40,
    established: '2019',
    meetingSchedule: 'Every Tuesday, 4:00 PM - 6:00 PM',
    contactEmail: 'freethinker@sorsu-bulan.edu.ph',
    activities: ['Debates', 'Open Forums', 'Critical Thinking Workshops', 'Intellectual Discussions'],
    requirements: ['SorSU student', 'Interest in philosophy and dialogue'],
    benefits: ['Critical thinking skills', 'Confidence in public speaking', 'Intellectual growth']
  },
  {
    id: 'fmgt',
    name: 'Future Mentors Guild Technology (FMGT)',
    category: 'academic',
    icon: <GraduationCap className="w-5 h-5" />,
    description: 'A guild of aspiring educators and mentors in technology, preparing for future teaching careers.',
    president: 'Mariel Angela G. Rodrigo',
    members: 65,
    established: '2017',
    meetingSchedule: 'Every Friday, 9:00 AM - 11:00 AM',
    contactEmail: 'fmgt@sorsu-bulan.edu.ph',
    activities: ['Teaching Workshops', 'Educational Technology Training', 'Peer Mentoring', 'Community Teaching Outreach'],
    requirements: ['SorSU student (Education/Technology major)', 'Commitment to teaching and mentoring'],
    benefits: ['Teaching skills development', 'Professional preparation', 'Mentorship opportunities']
  }  
];

const CATEGORY_COLORS = {
  academic: 'bg-blue-100 text-blue-700 border-blue-200',
  cultural: 'bg-purple-100 text-purple-700 border-purple-200',
  sports: 'bg-green-100 text-green-700 border-green-200',
  service: 'bg-red-100 text-red-700 border-red-200',
  faith: 'bg-orange-100 text-orange-700 border-orange-200',
  leadership: 'bg-pink-100 text-pink-700 border-pink-200'
};

const CATEGORY_LABELS = {
  academic: 'Academic',
  cultural: 'Cultural',
  sports: 'Sports',
  service: 'Service',
  faith: 'Faith-Based',
  leadership: 'Leadership'
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
    <section id="student-clubs" className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
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