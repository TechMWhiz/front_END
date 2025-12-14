import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
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
import { useEvents, type Event } from "../context/EventContext";

const categories = ["Academic", "Career", "Social", "Cultural", "Sports", "Professional Development", "Student Life"];
const statuses = ["active", "inactive", "cancelled"];

export default function EventsManager() {
  const { events, addEvent, updateEvent, deleteEvent, updateEventStatus, refreshEvents } = useEvents();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    endDate: "",
    endTime: "",
    location: "",
    category: "",
    maxAttendees: "",
    organizer: "",
    registrationRequired: false,
    registrationDeadline: "",
    contactEmail: "",
    website: "",
    tags: "",
    featured: false,
    isPublic: true
  });

  // Refresh events data when component mounts
  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        // Update existing event
        const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [];
        const updatedEvent = {
          title: formData.title,
          description: formData.description,
          start_date: formData.date,
          end_date: formData.endDate || undefined,
          location: formData.location,
          organizer: formData.organizer,
          type: formData.category,
          category: formData.category,
          max_attendees: parseInt(formData.maxAttendees),
          is_public: formData.isPublic,
          registration_required: formData.registrationRequired,
          registration_deadline: formData.registrationDeadline || undefined,
          tags: tagsArray,
          status: editingEvent.status // Add the status field to the updated event
        };
        await updateEvent(editingEvent.id, updatedEvent);
        toast.success("Event updated successfully!");
      } else {
        // Create new event
        const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [];
        const newEvent = {
          title: formData.title,
          description: formData.description,
          start_date: formData.date,
          end_date: formData.endDate || undefined,
          location: formData.location,
          organizer: formData.organizer,
          type: formData.category,
          category: formData.category,
          max_attendees: parseInt(formData.maxAttendees),
          is_public: formData.isPublic,
          registration_required: formData.registrationRequired,
          registration_deadline: formData.registrationDeadline || undefined,
          tags: tagsArray,
          status: "active"
        };
        console.log('Creating new event:', newEvent);
        await addEvent(newEvent);
        toast.success("Event created successfully!");
      }
      
      resetForm();
    } catch (error) {
      console.error("Full error object:", error);
      
      // Type guard for error handling
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as any;
        console.error("Error response data:", axiosError.response?.data);
        console.error("Error status:", axiosError.response?.status);
        console.error("Error headers:", axiosError.response?.headers);
        toast.error(`Failed to save event: ${axiosError.response?.data?.message || 'Unknown error'}`);
      } else if (error instanceof Error) {
        console.error("Error message:", error.message);
        toast.error(`Failed to save event: ${error.message}`);
      } else {
        console.error("Unknown error type:", error);
        toast.error("Failed to save event: Unknown error occurred");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      endDate: "",
      endTime: "",
      location: "",
      category: "",
      maxAttendees: "",
      organizer: "",
      registrationRequired: false,
      registrationDeadline: "",
      contactEmail: "",
      website: "",
      tags: "",
      featured: false,
      isPublic: true
    });
    setEditingEvent(null);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (event: Event) => {
    console.log('Editing event:', event);
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.start_date || event.date || event.startDate || "",
      time: event.time || event.startTime || "",
      endDate: event.end_date || event.endDate || "",
      endTime: event.endTime || "",
      location: event.location,
      category: event.category,
      maxAttendees: (event.max_attendees || event.maxAttendees || 0).toString(),
      organizer: event.organizer,
      registrationRequired: event.registration_required || event.registrationRequired || false,
      registrationDeadline: event.registration_deadline || event.registrationDeadline || "",
      contactEmail: event.contactEmail || "",
      website: event.website || "",
      tags: event.tags ? event.tags.join(', ') : "",
      featured: event.featured || false,
      isPublic: event.is_public || event.isPublic || true
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setDeleteConfirmId(null);
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateEventStatus(id, newStatus);
    toast.success(`Event status updated to ${newStatus}!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
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
                  <Label htmlFor="date">Start Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Start Time</Label>
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
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time (Optional)</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organizer">Organizer</Label>
                  <Input
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
                {formData.registrationRequired && (
                  <div>
                    <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                    <Input
                      id="registrationDeadline"
                      type="date"
                      value={formData.registrationDeadline}
                      onChange={(e) => setFormData({...formData, registrationDeadline: e.target.value})}
                    />
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="Academic, Research, Workshop"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="registrationRequired"
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
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="isPublic">Public Event</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Event</Label>
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
        {events && events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{event.title || 'Untitled Event'}</CardTitle>
                      <Badge className={getStatusColor(event.status || 'active')}>
                        {event.status || 'active'}
                      </Badge>
                      <Badge variant="outline">{event.category || 'Uncategorized'}</Badge>
                      {!(event.is_public || event.isPublic) && (
                        <Badge variant="secondary">Private</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.start_date || event.date || event.startDate ? new Date(event.start_date || event.date || event.startDate!).toLocaleDateString() : 'Date not set'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time || event.startTime || "All day"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location || 'Location not set'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{event.organizer || 'Organizer not set'}</span>
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
                    <AlertDialog open={deleteConfirmId === event.id} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setDeleteConfirmId(event.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Event</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{event.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(event.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{event.description || 'No description available'}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge className={getAttendanceStatus(event.current_attendees || event.currentAttendees || 0, event.max_attendees || event.maxAttendees || 0)}>
                      {event.current_attendees || event.currentAttendees || 0}/{event.max_attendees || event.maxAttendees || 0} attendees
                    </Badge>
                    {(event.registration_required || event.registrationRequired) && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Registration Required
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round(((event.current_attendees || event.currentAttendees || 0) / (event.max_attendees || event.maxAttendees || 1)) * 100)}% capacity
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No events found. Create your first event to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}