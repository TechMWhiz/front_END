import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import * as React from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar as CalendarIcon, 
  Clock, 
  BookOpen,
  GraduationCap,
  Users,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface CalendarItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  type: string;
  isRecurring: boolean;
  recurringPattern?: string;
  affectedGroups: string[];
  priority: string;
  color: string;
}

const mockCalendarItems: CalendarItem[] = [
  {
    id: "1",
    title: "Fall Semester Classes Begin",
    description: "First day of classes for Fall 2024 semester",
    startDate: "2024-08-26",
    endDate: "2024-08-26",
    category: "Academic",
    type: "Milestone",
    isRecurring: false,
    affectedGroups: ["Students", "Faculty"],
    priority: "High",
    color: "blue"
  },
  {
    id: "2",
    title: "Thanksgiving Break",
    description: "University closed for Thanksgiving holiday",
    startDate: "2024-11-28",
    endDate: "2024-11-29",
    category: "Holiday",
    type: "Break",
    isRecurring: true,
    recurringPattern: "Yearly",
    affectedGroups: ["All"],
    priority: "High",
    color: "orange"
  },
  {
    id: "3",
    title: "Final Exams Week",
    description: "Final examinations for Fall 2024 semester",
    startDate: "2024-12-16",
    endDate: "2024-12-22",
    category: "Academic",
    type: "Exam Period",
    isRecurring: true,
    recurringPattern: "Semester",
    affectedGroups: ["Students", "Faculty"],
    priority: "Critical",
    color: "red"
  },
  {
    id: "4",
    title: "Spring Registration Opens",
    description: "Registration period begins for Spring 2025 semester",
    startDate: "2024-11-01",
    endDate: "2024-11-15",
    category: "Registration",
    type: "Period",
    isRecurring: true,
    recurringPattern: "Semester",
    affectedGroups: ["Students"],
    priority: "High",
    color: "green"
  }
];

const categories = ["Academic", "Holiday", "Registration", "Events", "Administrative", "Campus"];
const types = ["Milestone", "Period", "Break", "Exam Period", "Deadline", "Event"];
const priorities = ["Low", "Medium", "High", "Critical"];
const groups = ["Students", "Faculty", "Staff", "All", "Undergraduate", "Graduate"];
const colors = ["blue", "green", "red", "orange", "purple", "teal"];
const recurringPatterns = ["Daily", "Weekly", "Monthly", "Semester", "Yearly"];

export default function CalendarManager() {
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>(mockCalendarItems);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CalendarItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    category: "",
    type: "",
    isRecurring: false,
    recurringPattern: "",
    affectedGroups: [] as string[],
    priority: "Medium",
    color: "blue"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      const updatedItems = calendarItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      );
      setCalendarItems(updatedItems);
      toast.success("Calendar item updated successfully!");
    } else {
      // Create new item
      const newItem: CalendarItem = {
        id: Date.now().toString(),
        ...formData
      };
      setCalendarItems([newItem, ...calendarItems]);
      toast.success("Calendar item created successfully!");
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      category: "",
      type: "",
      isRecurring: false,
      recurringPattern: "",
      affectedGroups: [],
      priority: "Medium",
      color: "blue"
    });
    setEditingItem(null);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (item: CalendarItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate,
      category: item.category,
      type: item.type,
      isRecurring: item.isRecurring,
      recurringPattern: item.recurringPattern || "",
      affectedGroups: item.affectedGroups,
      priority: item.priority,
      color: item.color
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCalendarItems(calendarItems.filter(item => item.id !== id));
    toast.success("Calendar item deleted successfully!");
  };

  const handleGroupToggle = (group: string) => {
    const updatedGroups = formData.affectedGroups.includes(group)
      ? formData.affectedGroups.filter(g => g !== group)
      : [...formData.affectedGroups, group];
    setFormData({...formData, affectedGroups: updatedGroups});
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

  const getColorVariant = (color: string) => {
    const variants: Record<string, string> = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      red: "bg-red-100 text-red-800 border-red-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      teal: "bg-teal-100 text-teal-800 border-teal-200"
    };
    return variants[color] || variants.blue;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Exam Period":
        return <BookOpen className="w-4 h-4" />;
      case "Milestone":
        return <GraduationCap className="w-4 h-4" />;
      case "Break":
        return <Clock className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const upcomingItems = calendarItems
    .filter(item => new Date(item.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Campus Calendar Management</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Calendar Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Calendar Item" : "Add New Calendar Item"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="color">Color</Label>
                  <Select value={formData.color} onValueChange={(value) => setFormData({...formData, color: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map(color => (
                        <SelectItem key={color} value={color} className="capitalize">{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    aria-label="isRecurring"
                    type="checkbox"
                    id="isRecurring"
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData({...formData, isRecurring: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="isRecurring">Recurring Event</Label>
                </div>
                {formData.isRecurring && (
                  <Select value={formData.recurringPattern} onValueChange={(value) => setFormData({...formData, recurringPattern: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recurring pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      {recurringPatterns.map(pattern => (
                        <SelectItem key={pattern} value={pattern}>{pattern}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div>
                <Label>Affected Groups</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {groups.map(group => (
                    <div key={group} className="flex items-center space-x-2">
                      <input
                        aria-label="group"
                        type="checkbox"
                        id={group}
                        checked={formData.affectedGroups.includes(group)}
                        onChange={() => handleGroupToggle(group)}
                        className="rounded"
                      />
                      <Label htmlFor={group} className="text-sm">{group}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? "Update" : "Add"} Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Calendar Items List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">All Calendar Items</h3>
            {calendarItems.map((item) => (
              <Card key={item.id} className={`border-l-4 ${getColorVariant(item.color).split(' ')[2]}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(item.type)}
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        {item.isRecurring && (
                          <Badge variant="outline">Recurring</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{item.category}</span>
                        <span>{item.type}</span>
                        <span>{new Date(item.startDate).toLocaleDateString()}</span>
                        {item.startDate !== item.endDate && (
                          <span>to {new Date(item.endDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Affects:</span>
                    {item.affectedGroups.map(group => (
                      <Badge key={group} variant="secondary" className="text-xs">
                        {group}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Upcoming Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingItems.map((item) => (
                <div key={item.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(item.type)}
                    <h4 className="font-medium text-sm">{item.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(item.startDate).toLocaleDateString()}
                  </p>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Items</span>
                <span className="font-semibold">{calendarItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Recurring Events</span>
                <span className="font-semibold">{calendarItems.filter(item => item.isRecurring).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">High Priority</span>
                <span className="font-semibold">{calendarItems.filter(item => item.priority === "High" || item.priority === "Critical").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-semibold">
                  {calendarItems.filter(item => {
                    const itemDate = new Date(item.startDate);
                    const now = new Date();
                    return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
                  }).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}