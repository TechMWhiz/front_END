import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Calendar,
  Clock, 
  Search,
  Filter,
  Bell,
  Pin,
  Users,
  GraduationCap,
  AlertCircle,
  ChevronRight
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  targetAudience: string;
  publishDate: string;
  expiryDate?: string;
  author: string;
  isPinned: boolean;
  tags: string[];
}

// Mock data that would normally come from the admin-created announcements
const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Registration for Second Semester 2024 Now Open",
    content: "Online registration for the second semester of Academic Year 2023-2024 is now open. Students can access the registration portal through the student information system. Please ensure all academic and financial requirements are settled before registering.",
    type: "Academic",
    priority: "High",
    targetAudience: "All Students",
    publishDate: "2024-01-15",
    expiryDate: "2024-02-15",
    author: "Office of the Registrar",
    isPinned: true,
    tags: ["Registration", "Academic", "Deadline"]
  },
  {
    id: "2", 
    title: "SorSU-Bulan Research Symposium 2024",
    content: "The College of Engineering and Technology invites all students and faculty to participate in the annual Research Symposium. This year's theme is 'Innovation for Sustainable Development'. Registration deadline is February 20, 2024.",
    type: "Event",
    priority: "Medium",
    targetAudience: "Students",
    publishDate: "2024-01-10",
    expiryDate: "2024-03-01",
    author: "College of Engineering and Technology",
    isPinned: false,
    tags: ["Research", "Symposium", "Innovation"]
  },
  {
    id: "4",
    title: "Scholarship Application Deadline Extended",
    content: "The deadline for scholarship applications for the Academic Year 2024-2025 has been extended to February 29, 2024. Complete application requirements and submit to the Student Affairs Office.",
    type: "Academic",
    priority: "High",
    targetAudience: "All Students",
    publishDate: "2024-01-18",
    expiryDate: "2024-02-29",
    author: "Student Affairs Office",
    isPinned: true,
    tags: ["Scholarship", "Financial Aid", "Deadline"]
  },
  {
    id: "5",
    title: "Campus Network Maintenance Schedule",
    content: "The IT Services will conduct scheduled network maintenance on January 25, 2024, from 11:00 PM to 3:00 AM. Internet connectivity may be intermittent during this period. We apologize for any inconvenience.",
    type: "General",
    priority: "Low",
    targetAudience: "All",
    publishDate: "2024-01-20",
    author: "IT Services",
    isPinned: false,
    tags: ["Maintenance", "Network", "IT"]
  }
];

const categories = ["All", "Academic", "Event", "General", "Administrative"];
const priorities = ["All", "High", "Medium", "Low"];

export default function AnnouncementsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [expandedAnnouncements, setExpandedAnnouncements] = useState<string[]>([]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Academic":
        return <GraduationCap className="w-4 h-4" />;
      case "Event":
        return <Calendar className="w-4 h-4" />;
      case "General":
        return <Bell className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const toggleExpanded = (id: string) => {
    setExpandedAnnouncements(prev => 
      prev.includes(id) 
        ? prev.filter(announcementId => announcementId !== id)
        : [...prev, id]
    );
  };

  const filteredAnnouncements = mockAnnouncements
    .filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           announcement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === "All" || announcement.type === filterCategory;
      const matchesPriority = filterPriority === "All" || announcement.priority === filterPriority;
      
      return matchesSearch && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      // Sort by: pinned first, then by priority (High > Medium > Low), then by date
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
      
      if (aPriority !== bPriority) return bPriority - aPriority;
      
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.isPinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.isPinned);

  return (
    <section id="announcements" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">University Announcements</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest news and updates from Sorsogon State University - Bulan Campus
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(priority => (
                  <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Pinned Announcements */}
          {pinnedAnnouncements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Pin className="w-5 h-5 text-primary" />
                Pinned Announcements
              </h3>
              <div className="space-y-4">
                {pinnedAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(announcement.type)}
                            <CardTitle className="text-lg">{announcement.title}</CardTitle>
                            <Pin className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(announcement.publishDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{announcement.targetAudience}</span>
                            </div>
                            <span className="text-sm">{announcement.author}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                          {announcement.expiryDate && (
                            <div className="text-xs text-muted-foreground">
                              Expires: {formatDate(announcement.expiryDate)}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-muted-foreground ${
                        expandedAnnouncements.includes(announcement.id) ? '' : 'line-clamp-2'
                      }`}>
                        {announcement.content}
                      </p>
                      {announcement.content.length > 150 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleExpanded(announcement.id)}
                          className="mt-2 p-0 h-auto text-primary"
                        >
                          {expandedAnnouncements.includes(announcement.id) ? 'Show Less' : 'Read More'}
                          <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${
                            expandedAnnouncements.includes(announcement.id) ? 'rotate-90' : ''
                          }`} />
                        </Button>
                      )}
                      {announcement.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {announcement.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Announcements */}
          {regularAnnouncements.length > 0 && (
            <div>
              {pinnedAnnouncements.length > 0 && (
                <h3 className="text-lg font-semibold mb-4">Recent Announcements</h3>
              )}
              <div className="space-y-4">
                {regularAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className={isExpired(announcement.expiryDate) ? "opacity-60" : ""}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(announcement.type)}
                            <CardTitle className="text-lg">{announcement.title}</CardTitle>
                            {isExpired(announcement.expiryDate) && (
                              <Badge variant="secondary" className="text-xs">Expired</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(announcement.publishDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{announcement.targetAudience}</span>
                            </div>
                            <span className="text-sm">{announcement.author}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                          {announcement.expiryDate && (
                            <div className="text-xs text-muted-foreground">
                              Expires: {formatDate(announcement.expiryDate)}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-muted-foreground ${
                        expandedAnnouncements.includes(announcement.id) ? '' : 'line-clamp-2'
                      }`}>
                        {announcement.content}
                      </p>
                      {announcement.content.length > 150 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleExpanded(announcement.id)}
                          className="mt-2 p-0 h-auto text-primary"
                        >
                          {expandedAnnouncements.includes(announcement.id) ? 'Show Less' : 'Read More'}
                          <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${
                            expandedAnnouncements.includes(announcement.id) ? 'rotate-90' : ''
                          }`} />
                        </Button>
                      )}
                      {announcement.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {announcement.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No announcements found</h3>
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