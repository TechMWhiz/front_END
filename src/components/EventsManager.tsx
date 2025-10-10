import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxAttendees: number;
  currentAttendees: number;
  status: string;
  organizer: string;
  registrationRequired: boolean;
  isPublic: boolean;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Graduate Research Symposium",
    description: "Annual showcase of graduate student research across all departments. Presentations, posters, and networking opportunities.",
    date: "2024-11-15",
    time: "09:00",
    location: "Student Center Auditorium",
    category: "Academic",
    maxAttendees: 200,
    currentAttendees: 156,
    status: "Published",
    organizer: "Graduate School",
    registrationRequired: true,
    isPublic: true
  },
  {
    id: "2",
    title: "Career Fair - Technology Sector",
    description: "Meet with leading technology companies for internship and full-time opportunities. Bring your resume and dress professionally.",
    date: "2024-10-25",
    time: "10:00",
    location: "Recreation Center Gymnasium",
    category: "Career",
    maxAttendees: 500,
    currentAttendees: 423,
    status: "Published",
    organizer: "Career Services",
    registrationRequired: false,
    isPublic: true
  },
  {
    id: "3",
    title: "Faculty Development Workshop",
    description: "Workshop on integrating AI tools in curriculum design and delivery. For faculty and staff only.",
    date: "2024-11-08",
    time: "14:00",
    location: "Faculty Lounge, Main Building",
    category: "Professional Development",
    maxAttendees: 50,
    currentAttendees: 32,
    status: "Draft",
    organizer: "Faculty Development Center",
    registrationRequired: true,
    isPublic: false
  }
];

const categories = ["Academic", "Career", "Social", "Cultural", "Sports", "Professional Development", "Student Life"];
const statuses = ["Draft", "Published", "Cancelled", "Completed"];

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    maxAttendees: "",
    organizer: "",
    registrationRequired: false,
    isPublic: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === editingEvent.id 
          ? { 
              ...event, 
              ...formData, 
              maxAttendees: parseInt(formData.maxAttendees),
              status: "Published" 
            }
          : event
      );
      setEvents(updatedEvents);
      toast.success("Event updated successfully!");
    } else {
      // Create new event
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData,
        maxAttendees: parseInt(formData.maxAttendees),
        currentAttendees: 0,
        status: "Published"
      };
      setEvents([newEvent, ...events]);
      toast.success("Event created successfully!");
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      maxAttendees: "",
      organizer: "",
      registrationRequired: false,
      isPublic: true
    });
    setEditingEvent(null);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      maxAttendees: event.maxAttendees.toString(),
      organizer: event.organizer,
      registrationRequired: event.registrationRequired,
      isPublic: event.isPublic
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success("Event deleted successfully!");
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
    toast.success(`Event status updated to ${newStatus}!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAttendanceStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return "bg-red-100 text-red-800";
    if (percentage >= 70) return "bg-orange-100 text-orange-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Events Management</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maxAttendees">Max Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => setFormData({...formData, maxAttendees: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="organizer">Organizer</Label>
                <Input
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="registrationRequired"
                    aria-label="registrationRequired"
                    checked={formData.registrationRequired}
                    onChange={(e) => setFormData({...formData, registrationRequired: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="registrationRequired">Registration Required</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    aria-label="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="isPublic">Public Event</Label>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? "Update" : "Create"} Event
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                    <Badge variant="outline">{event.category}</Badge>
                    {!event.isPublic && (
                      <Badge variant="secondary">Private</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select onValueChange={(value) => handleStatusChange(event.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className={getAttendanceStatus(event.currentAttendees, event.maxAttendees)}>
                    {event.currentAttendees}/{event.maxAttendees} attendees
                  </Badge>
                  {event.registrationRequired && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Registration Required
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round((event.currentAttendees / event.maxAttendees) * 100)}% capacity
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}