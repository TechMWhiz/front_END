import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Calendar, 
  Users, 
  AlertCircle,
  CheckCircle,
  Clock,
  Megaphone,
  ChevronRight,
  Pin
} from "lucide-react";
import { useAnnouncements, type Announcement } from "../context/AnnouncementContext";

export default function AnnouncementSection() {
  const { announcements, incrementViews } = useAnnouncements();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Listen for announcement updates
  useEffect(() => {
    const handleAnnouncementUpdate = () => {
      // Force re-render when announcements are updated
      setExpandedId(null);
    };
    
    window.addEventListener('announcementsUpdated', handleAnnouncementUpdate);
    return () => window.removeEventListener('announcementsUpdated', handleAnnouncementUpdate);
  }, []);

  // Sort announcements: pinned first, then by created_at date
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    // Pinned announcements come first
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    
    // Then sort by creation date (newest first)
    const dateA = new Date(a.created_at || a.publishDate || 0);
    const dateB = new Date(b.created_at || b.publishDate || 0);
    return dateB.getTime() - dateA.getTime();
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Published":
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Draft":
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
      case "Scheduled":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "academic":
        return "bg-purple-100 text-purple-800";
      case "services":
        return "bg-green-100 text-green-800";
      case "campus":
        return "bg-blue-100 text-blue-800";
      case "events":
        return "bg-pink-100 text-pink-800";
      case "emergency":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReadMore = (announcement: Announcement) => {
    // Increment views when user reads more
    incrementViews(announcement.id);
    setExpandedId(expandedId === announcement.id ? null : announcement.id);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "No date set";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Show only the latest 3 announcements, with option to expand
  const displayAnnouncements = expandedId ? sortedAnnouncements : sortedAnnouncements.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Latest Announcements</h2>
        </div>
        {sortedAnnouncements.length > 3 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setExpandedId(expandedId ? null : 'all')}
            className="flex items-center gap-1"
          >
            {expandedId ? 'Show Less' : 'View All'}
            <ChevronRight className={`w-4 h-4 transition-transform ${expandedId ? 'rotate-90' : ''}`} />
          </Button>
        )}
      </div>

      {announcements.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Megaphone className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Announcements</h3>
            <p className="text-gray-500 text-center">Check back later for the latest university announcements and updates.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {displayAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={`transition-all duration-200 hover:shadow-md ${announcement.is_pinned ? 'ring-2 ring-blue-200' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {announcement.is_pinned && (
                        <Pin className="w-4 h-4 text-blue-600" />
                      )}
                      {getStatusIcon(announcement.status)}
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className={getTypeColor(announcement.type || announcement.category || 'General')}>
                        {announcement.type || announcement.category || 'General'}
                      </Badge>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Target: {announcement.target_audience || announcement.audience || 'All'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <p className={`text-muted-foreground ${expandedId === announcement.id || expandedId === 'all' ? '' : 'line-clamp-3'}`}>
                    {announcement.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(announcement.publish_date || announcement.publishDate || announcement.created_at)}
                      </span>
                      {(announcement.expiry_date || announcement.expiryDate) && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Expires: {formatDate(announcement.expiry_date || announcement.expiryDate)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {announcement.views || 0} views
                      </span>
                      {(announcement.content.length > 200 || sortedAnnouncements.length > 3) && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReadMore(announcement)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {expandedId === announcement.id ? 'Show Less' : 'Read More'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
