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
import * as React from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Users, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { useAnnouncements, type Announcement } from "../context/AnnouncementContext";

const categories = ["Academic", "Services", "Campus", "Events", "Emergency"];
const priorities = ["Low", "Medium", "High", "Critical"];
const audiences = ["Students", "Faculty & Staff", "Public", "All"];
const statuses = ["Draft", "Scheduled", "Published", "Expired"];

export default function AnnouncementManager() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, refreshAnnouncements } = useAnnouncements();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
    priority: "Medium",
    target_audience: "",
    publish_date: "",
    expiry_date: "",
    is_pinned: false
  });

  // Refresh announcements data when component mounts
  useEffect(() => {
    refreshAnnouncements();
  }, [refreshAnnouncements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAnnouncement) {
        // Update existing announcement
        await updateAnnouncement(editingAnnouncement.id, {
          title: formData.title,
          content: formData.content,
          type: formData.type,
          priority: formData.priority,
          target_audience: formData.target_audience,
          publish_date: formData.publish_date || undefined,
          expiry_date: formData.expiry_date || undefined,
          is_pinned: formData.is_pinned,
          status: editingAnnouncement.status || "Published" // Use "Published" as default
        });
        toast.success("Announcement updated successfully!");
      } else {
        // Create new announcement
        const newAnnouncement = {
          title: formData.title,
          content: formData.content,
          type: formData.type,
          priority: formData.priority,
          target_audience: formData.target_audience,
          publish_date: formData.publish_date || new Date().toISOString().split('T')[0],
          expiry_date: formData.expiry_date || undefined,
          is_pinned: formData.is_pinned,
          status: "Published", // Use "Published" instead of "active"
          views: 0,
          created_by: 1, // Use user ID 1 (admin)
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        await addAnnouncement(newAnnouncement);
        toast.success("Announcement created successfully!");
      }
      
      // Refresh announcements data to show changes
      await refreshAnnouncements();
      resetForm();
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast.error("Failed to save announcement. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      type: "",
      priority: "Medium",
      target_audience: "",
      publish_date: "",
      expiry_date: "",
      is_pinned: false
    });
    setEditingAnnouncement(null);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type || announcement.category || "",
      priority: announcement.priority,
      target_audience: announcement.target_audience || announcement.audience || "",
      publish_date: announcement.publish_date || announcement.publishDate || "",
      expiry_date: announcement.expiry_date || announcement.expiryDate || "",
      is_pinned: announcement.is_pinned || announcement.isPinned || false
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAnnouncement(id);
      setDeleteConfirmId(null);
      toast.success("Announcement deleted successfully!");
      // Refresh announcements data to show changes
      await refreshAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error("Failed to delete announcement. Please try again.");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Published":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Draft":
        return <Edit className="w-4 h-4 text-gray-600" />;
      case "Scheduled":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Announcement Management</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAnnouncement ? "Edit Announcement" : "Create New Announcement"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
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
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(priority => (
                        <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target_audience">Audience</Label>
                  <Select value={formData.target_audience} onValueChange={(value) => setFormData({...formData, target_audience: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      {audiences.map(audience => (
                        <SelectItem key={audience} value={audience}>{audience}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="publish_date">Publish Date</Label>
                  <Input
                    id="publish_date"
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({...formData, publish_date: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry_date">Expiry Date (Optional)</Label>
                  <Input
                    id="expiry_date"
                    type="date"
                    value={formData.expiry_date}
                    onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                  />
                </div>
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_pinned"
                      checked={formData.is_pinned}
                      onChange={(e) => setFormData({...formData, is_pinned: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="is_pinned">Pin to top</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAnnouncement ? "Update" : "Create"} Announcement
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(announcement.status)}
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Type: {announcement.type || announcement.category}</span>
                    <span>Audience: {announcement.target_audience || announcement.audience}</span>
                    <span>Author: {announcement.author || "Admin"}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(announcement)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog open={deleteConfirmId === announcement.id} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setDeleteConfirmId(announcement.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{announcement.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(announcement.id)} className="bg-red-600 hover:bg-red-700">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{announcement.content}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Published: {new Date(announcement.publish_date || announcement.publishDate || announcement.created_at).toLocaleDateString()}
                  </span>
                  {(announcement.expiry_date || announcement.expiryDate) && (
                    <span>
                      Expires: {new Date(announcement.expiry_date || announcement.expiryDate || '').toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{announcement.views} views</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
