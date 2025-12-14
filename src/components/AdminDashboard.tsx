import { useState } from "react";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import AnnouncementManager from "./AnnouncementManager";
import EventsManager from "./EventsManager";
import CalendarManager from "./CalendarManager";
import FacultyManager from "./FacultyManager";
import {
  Megaphone,
  Calendar,
  CalendarDays,
  Users,
  TrendingUp,
  FileText,
  Clock,
  AlertCircle,
} from "lucide-react";

const adminStats = [
  {
    title: "Active Announcements",
    value: "12",
    change: "+3 this week",
    icon: Megaphone,
    color: "blue",
  },
  {
    title: "Upcoming Events",
    value: "8",
    change: "Next 30 days",
    icon: Calendar,
    color: "green",
  },
  {
    title: "Faculty Profiles",
    value: "156",
    change: "5 pending updates",
    icon: Users,
    color: "purple",
  },
  {
    title: "Calendar Items",
    value: "24",
    change: "This month",
    icon: CalendarDays,
    color: "orange",
  },
];

const recentActivity = [
  {
    action: "New announcement posted",
    details: "Fall 2024 Registration Opens",
    time: "2 hours ago",
    type: "announcement",
  },
  {
    action: "Event scheduled",
    details: "Graduate Research Symposium",
    time: "4 hours ago",
    type: "event",
  },
  {
    action: "Faculty profile updated",
    details: "Dr. Sarah Johnson - Computer Science",
    time: "1 day ago",
    type: "profile",
  },
  {
    action: "Calendar item added",
    details: "Spring Break 2024",
    time: "2 days ago",
    type: "calendar",
  },
];

const colorVariants: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
};

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage university content and information
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${colorVariants[stat.color]}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs
            defaultValue="announcements"
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="announcements"
                className="flex items-center gap-2"
              >
                <Megaphone className="w-4 h-4" />
                Announcements
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Events
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger
                value="faculty"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Faculty
              </TabsTrigger>
            </TabsList>

            <TabsContent value="announcements">
              <AnnouncementManager />
            </TabsContent>

            <TabsContent value="events">
              <EventsManager />
            </TabsContent>

            <TabsContent value="calendar">
              <CalendarManager />
            </TabsContent>

            <TabsContent value="faculty">
              <FacultyManager />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Announcement
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Event
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
              >
                <Users className="w-4 h-4 mr-2" />
                Add Faculty Member
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Website</span>
                <Badge className="bg-green-100 text-green-800">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Student Portal</span>
                <Badge className="bg-green-100 text-green-800">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email System</span>
                <Badge className="bg-green-100 text-green-800">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge className="bg-green-100 text-green-800">
                  Online
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}