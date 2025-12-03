import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Calendar,
  Clock, 
  MapPin,
  Search,
  Users,
  ExternalLink,
  Filter,
  CalendarDays,
  ChevronRight,
  BookOpen,
  Trophy,
  Heart
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  location: string;
  organizer: string;
  capacity?: number;
  registrationRequired: boolean;
  registrationDeadline?: string;
  contactEmail: string;
  website?: string;
  tags: string[];
  featured: boolean;
}

// Mock events data that would normally come from the admin-created events
const mockEvents: Event[] = [
  {
    id: "1",
    title: "SorSU-Bulan Research Symposium 2024",
    description: "Join us for the annual Research Symposium showcasing innovative research projects by our faculty and students. This year's theme focuses on 'Innovation for Sustainable Development' with presentations covering various fields including engineering, technology, agriculture, and social sciences.",
    type: "Academic",
    category: "Conference",
    startDate: "2024-02-15",
    endDate: "2024-02-16",
    startTime: "08:00",
    endTime: "17:00",
    location: "SorSU-Bulan Auditorium",
    organizer: "College of Engineering and Technology",
    capacity: 200,
    registrationRequired: true,
    registrationDeadline: "2024-02-10",
    contactEmail: "research@sorsu-bulan.edu.ph",
    website: "https://sorsu-bulan.edu.ph/symposium2024",
    tags: ["Research", "Innovation", "Academic", "Technology"],
    featured: true
  },
  {
    id: "2",
    title: "Engineering Week 2024",
    description: "A week-long celebration of engineering excellence featuring technical competitions, workshops, seminars, and networking opportunities. Open to all engineering students and professionals.",
    type: "Academic",
    category: "Festival",
    startDate: "2024-02-20",
    endDate: "2024-02-24",
    startTime: "08:00",
    endTime: "18:00",
    location: "Engineering Building",
    organizer: "Engineering Students Society",
    registrationRequired: false,
    contactEmail: "engineering@sorsu-bulan.edu.ph",
    tags: ["Engineering", "Competition", "Workshop", "Students"],
    featured: true
  },
  {
    id: "4",
    title: "Cultural Night: Celebrating Filipino Heritage",
    description: "An evening of Filipino culture featuring traditional dances, music performances, local cuisine, and art exhibitions. Showcase the rich cultural heritage of the Philippines.",
    type: "Cultural",
    category: "Performance",
    startDate: "2024-02-28",
    startTime: "18:00",
    endTime: "21:00",
    location: "University Plaza",
    organizer: "Cultural Affairs Office",
    registrationRequired: false,
    contactEmail: "culture@sorsu-bulan.edu.ph",
    tags: ["Culture", "Performance", "Filipino", "Arts"],
    featured: false
  },
  {
    id: "5",
    title: "Blood Donation Drive",
    description: "Help save lives by donating blood. The Philippine Red Cross will be conducting a blood donation drive on campus. All healthy individuals aged 18-60 are encouraged to participate.",
    type: "Community",
    category: "Service",
    startDate: "2024-02-22",
    startTime: "08:00",
    endTime: "15:00",
    location: "Student Center",
    organizer: "Student Government",
    registrationRequired: false,
    contactEmail: "studentgov@sorsu-bulan.edu.ph",
    tags: ["Community Service", "Health", "Donation", "Red Cross"],
    featured: false
  },
  {
    id: "6",
    title: "IT Workshop: Web Development Fundamentals",
    description: "Learn the basics of web development including HTML, CSS, and JavaScript. This hands-on workshop is perfect for beginners who want to start their journey in web development.",
    type: "Academic",
    category: "Workshop",
    startDate: "2024-03-12",
    startTime: "13:00",
    endTime: "17:00",
    location: "Computer Laboratory 1",
    organizer: "IT Department",
    capacity: 30,
    registrationRequired: true,
    registrationDeadline: "2024-03-08",
    contactEmail: "it@sorsu-bulan.edu.ph",
    tags: ["IT", "Web Development", "Programming", "Technology"],
    featured: false
  }
];

const eventTypes = ["All", "Academic", "Cultural", "Career", "Community", "Sports"];
const categories = ["All", "Conference", "Workshop", "Festival", "Fair", "Performance", "Service"];

export default function EventsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Academic":
        return <BookOpen className="w-4 h-4" />;
      case "Career":
        return <Users className="w-4 h-4" />;
      case "Cultural":
        return <Heart className="w-4 h-4" />;
      case "Community":
        return <Users className="w-4 h-4" />;
      case "Sports":
        return <Trophy className="w-4 h-4" />;
      default:
        return <CalendarDays className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Academic":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Career":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cultural":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Community":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Sports":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isUpcoming = (startDate: string) => {
    return new Date(startDate) >= new Date();
  };

  const isPast = (startDate: string) => {
    return new Date(startDate) < new Date();
  };

  const toggleExpanded = (id: string) => {
    setExpandedEvents(prev => 
      prev.includes(id) 
        ? prev.filter(eventId => eventId !== id)
        : [...prev, id]
    );
  };

  const filteredEvents = mockEvents
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === "All" || event.type === filterType;
      const matchesCategory = filterCategory === "All" || event.category === filterCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by: featured first, then upcoming events, then by date
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      const aUpcoming = isUpcoming(a.startDate);
      const bUpcoming = isUpcoming(b.startDate);
      
      if (aUpcoming && !bUpcoming) return -1;
      if (!aUpcoming && bUpcoming) return 1;
      
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  const featuredEvents = filteredEvents.filter(e => e.featured);
  const upcomingEvents = filteredEvents.filter(e => !e.featured && isUpcoming(e.startDate));
  const pastEvents = filteredEvents.filter(e => !e.featured && isPast(e.startDate));

  return (
    <section id="events" className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Campus Events</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover exciting events, workshops, and activities happening at SorSU-Bulan Campus
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Featured Events
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredEvents.map((event) => (
                  <Card key={event.id} className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(event.type)}
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(event.startDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTime(event.startTime)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.organizer}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                          {event.featured && (
                            <Badge variant="secondary" className="text-xs">Featured</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-muted-foreground mb-4 ${
                        expandedEvents.includes(event.id) ? '' : 'line-clamp-3'
                      }`}>
                        {event.description}
                      </p>
                      
                      {event.description.length > 200 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleExpanded(event.id)}
                          className="mb-4 p-0 h-auto text-primary"
                        >
                          {expandedEvents.includes(event.id) ? 'Show Less' : 'Read More'}
                          <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${
                            expandedEvents.includes(event.id) ? 'rotate-90' : ''
                          }`} />
                        </Button>
                      )}

                      <div className="space-y-2 text-sm">
                        {event.registrationRequired && (
                          <div className="flex items-center gap-2 text-orange-600">
                            <Users className="w-3 h-3" />
                            <span>Registration Required</span>
                            {event.registrationDeadline && (
                              <span className="text-muted-foreground">
                                (Deadline: {formatDate(event.registrationDeadline)})
                              </span>
                            )}
                          </div>
                        )}
                        {event.capacity && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>Capacity: {event.capacity} participants</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3 mb-4">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Users className="w-3 h-3 mr-1" />
                          {event.registrationRequired ? 'Register' : 'More Info'}
                        </Button>
                        {event.website && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(event.type)}
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(event.startDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTime(event.startTime)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.organizer}</p>
                        </div>
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-muted-foreground mb-4 ${
                        expandedEvents.includes(event.id) ? '' : 'line-clamp-2'
                      }`}>
                        {event.description}
                      </p>
                      
                      {event.description.length > 150 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleExpanded(event.id)}
                          className="mb-4 p-0 h-auto text-primary"
                        >
                          {expandedEvents.includes(event.id) ? 'Show Less' : 'Read More'}
                          <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${
                            expandedEvents.includes(event.id) ? 'rotate-90' : ''
                          }`} />
                        </Button>
                      )}

                      <div className="flex flex-wrap gap-1 mt-3">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Past Events</h3>
              <div className="space-y-4 opacity-75">
                {pastEvents.slice(0, 3).map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(event.type)}
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs">Past</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(event.startDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}