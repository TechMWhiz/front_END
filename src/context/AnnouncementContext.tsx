import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  target_audience: string;
  publish_date?: string;
  expiry_date?: string;
  is_pinned: boolean;
  views: number;
  status: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  // Frontend compatibility fields
  category?: string;
  audience?: string;
  publishDate?: string;
  expiryDate?: string;
  targetAudience?: string;
  isPinned?: boolean;
  author?: string;
  tags?: string[];
}

interface AnnouncementContextType {
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => Promise<Announcement>;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => Promise<Announcement>;
  deleteAnnouncement: (id: string) => Promise<void>;
  getAnnouncementById: (id: string) => Announcement | undefined;
  incrementViews: (id: string) => void;
  refreshAnnouncements: () => Promise<void>;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

const defaultAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Fall 2024 Registration Now Open",
    content: "Registration for Fall 2024 semester is now open. Please log into your student portal to register for classes. Early registration ends September 15th.",
    type: "Academic",
    priority: "High",
    target_audience: "All Students",
    publish_date: "2024-08-15",
    expiry_date: "2024-09-30",
    is_pinned: true,
    views: 1247,
    status: "Published",
    created_by: 1,
    created_at: "2024-08-15T00:00:00Z",
    updated_at: "2024-08-15T00:00:00Z",
    // Frontend compatibility fields
    category: "Academic",
    audience: "Students",
    publishDate: "2024-08-15",
    expiryDate: "2024-09-30",
    targetAudience: "All Students",
    isPinned: true,
    author: "Registrar Office",
    tags: ["Registration", "Academic", "Deadline"]
  },
  {
    id: "2",
    title: "Library Hours Extended During Finals",
    content: "The Central Library will be open 24/7 during finals week (December 16-22) to support students during their exam preparation.",
    type: "General",
    priority: "Medium",
    target_audience: "All Students",
    publish_date: "2024-12-10",
    expiry_date: "2024-12-25",
    is_pinned: false,
    views: 456,
    status: "Published",
    created_by: 1,
    created_at: "2024-12-10T00:00:00Z",
    updated_at: "2024-12-10T00:00:00Z",
    // Frontend compatibility fields
    category: "Services",
    audience: "Students",
    publishDate: "2024-12-10",
    expiryDate: "2024-12-25",
    targetAudience: "All Students",
    isPinned: false,
    author: "Library Services",
    tags: ["Library", "Schedule", "Midterms"]
  },
  {
    id: "3",
    title: "SorSU-Bulan Research Symposium 2024",
    content: "The College of Engineering and Technology invites all students and faculty to participate in the annual Research Symposium. This year's theme is 'Innovation for Sustainable Development'. Registration deadline is February 20, 2024.",
    type: "Event",
    priority: "Medium",
    target_audience: "Students",
    publish_date: "2024-01-10",
    expiry_date: "2024-03-01",
    is_pinned: false,
    views: 892,
    status: "Published",
    created_by: 1,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
    // Frontend compatibility fields
    category: "Events",
    audience: "Students",
    publishDate: "2024-01-10",
    expiryDate: "2024-03-01",
    targetAudience: "Students",
    isPinned: false,
    author: "College of Engineering and Technology",
    tags: ["Research", "Symposium", "Innovation"]
  }
];

const STORAGE_KEY = 'university_announcements_data';

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Load announcements data from API
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  const fetchAnnouncements = async () => {
    try {
      const response = await api.get<any[]>('/announcements');
      console.log('Announcements API response:', response.data);
      
      // Transform snake_case backend data to camelCase for frontend
      const transformedAnnouncements = response.data.map(announcement => ({
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        type: announcement.type,
        priority: announcement.priority,
        target_audience: announcement.target_audience,
        publish_date: announcement.publish_date,
        expiry_date: announcement.expiry_date,
        is_pinned: announcement.is_pinned,
        views: announcement.views,
        status: announcement.status,
        created_by: announcement.created_by,
        created_at: announcement.created_at,
        updated_at: announcement.updated_at,
        // Frontend compatibility fields
        category: announcement.type,
        audience: announcement.target_audience,
        publishDate: announcement.publish_date,
        expiryDate: announcement.expiry_date,
        targetAudience: announcement.target_audience,
        isPinned: announcement.is_pinned,
        author: "Admin", // Default author for now
        tags: []
      }));
      
      setAnnouncements(transformedAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements data:', error);
      // Fallback to default data if API fails
      setAnnouncements(defaultAnnouncements);
    } finally {
      setLoading(false);
    }
  };

  const addAnnouncement = async (newAnnouncement: Omit<Announcement, 'id'>) => {
    try {
      console.log('Sending announcement data to API:', newAnnouncement);
      
      // Transform camelCase to snake_case for backend
      const backendAnnouncement = {
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        type: newAnnouncement.type,
        priority: newAnnouncement.priority,
        target_audience: newAnnouncement.target_audience,
        publish_date: newAnnouncement.publish_date,
        expiry_date: newAnnouncement.expiry_date,
        is_pinned: newAnnouncement.is_pinned,
      };

      const response = await api.post<any>('/announcements', backendAnnouncement);
      console.log('API response:', response.data);
      
      // Transform the response data from snake_case to camelCase
      const transformedNewAnnouncement = {
        id: response.data.id,
        title: response.data.title,
        content: response.data.content,
        type: response.data.type,
        priority: response.data.priority,
        target_audience: response.data.target_audience,
        publish_date: response.data.publish_date,
        expiry_date: response.data.expiry_date,
        is_pinned: response.data.is_pinned,
        views: response.data.views,
        status: response.data.status,
        created_by: response.data.created_by,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
        // Frontend compatibility fields
        category: response.data.type,
        audience: response.data.target_audience,
        publishDate: response.data.publish_date,
        expiryDate: response.data.expiry_date,
        targetAudience: response.data.target_audience,
        isPinned: response.data.is_pinned,
        author: "Admin",
        tags: []
      };
      
      setAnnouncements(prev => [transformedNewAnnouncement, ...prev]);
      return transformedNewAnnouncement;
    } catch (error: any) {
      console.error('Error adding announcement:', error);
      console.error('Error response:', error.response?.data);
      
      // Provide more specific error messages
      if (error.response?.status === 401) {
        throw new Error('Your session has expired. Please log in again.');
      } else if (error.response?.status === 403) {
        throw new Error('Only administrators can create announcements. Please log in as an admin.');
      } else if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        const errorMessages = Object.values(validationErrors).flat();
        throw new Error(`Validation error: ${errorMessages.join(', ')}`);
      } else {
        throw error;
      }
    }
  };

  const updateAnnouncement = async (id: string, updatedData: Partial<Announcement>) => {
    try {
      console.log('Updating announcement:', id, updatedData);
      
      // Transform camelCase to snake_case for backend
      const backendData: any = {};
      if (updatedData.title) backendData.title = updatedData.title;
      if (updatedData.content) backendData.content = updatedData.content;
      if (updatedData.type) backendData.type = updatedData.type;
      if (updatedData.priority) backendData.priority = updatedData.priority;
      if (updatedData.target_audience) backendData.target_audience = updatedData.target_audience;
      if (updatedData.publish_date) backendData.publish_date = updatedData.publish_date;
      if (updatedData.expiry_date) backendData.expiry_date = updatedData.expiry_date;
      if (updatedData.is_pinned !== undefined) backendData.is_pinned = updatedData.is_pinned;
      if (updatedData.status) backendData.status = updatedData.status;

      const response = await api.put<any>(`/announcements/${id}`, backendData);
      console.log('Update API response:', response.data);
      
      // Transform response data from snake_case to camelCase
      const transformedAnnouncement = {
        id: response.data.id,
        title: response.data.title,
        content: response.data.content,
        type: response.data.type,
        priority: response.data.priority,
        target_audience: response.data.target_audience,
        publish_date: response.data.publish_date,
        expiry_date: response.data.expiry_date,
        is_pinned: response.data.is_pinned,
        views: response.data.views,
        status: response.data.status,
        created_by: response.data.created_by,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
        // Frontend compatibility fields
        category: response.data.type,
        audience: response.data.target_audience,
        publishDate: response.data.publish_date,
        expiryDate: response.data.expiry_date,
        targetAudience: response.data.target_audience,
        isPinned: response.data.is_pinned,
        author: "Admin",
        tags: []
      };
      
      setAnnouncements(prev => prev.map(a => a.id === id ? transformedAnnouncement : a));
      return transformedAnnouncement;
    } catch (error: any) {
      console.error('Error updating announcement:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      console.log('Deleting announcement:', id);
      await api.delete(`/announcements/${id}`);
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } catch (error: any) {
      console.error('Error deleting announcement:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  };

  const getAnnouncementById = (id: string) => {
    return announcements.find(a => a.id === id);
  };

  const incrementViews = (id: string) => {
    setAnnouncements(prev => prev.map(a => 
      a.id === id ? { ...a, views: a.views + 1 } : a
    ));
  };

  const refreshAnnouncements = async () => {
    try {
      const response = await api.get<any[]>('/announcements');
      console.log('Refresh announcements API response:', response.data);
      
      // Transform snake_case backend data to camelCase for frontend
      const transformedAnnouncements = response.data.map(announcement => ({
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        type: announcement.type,
        priority: announcement.priority,
        target_audience: announcement.target_audience,
        publish_date: announcement.publish_date,
        expiry_date: announcement.expiry_date,
        is_pinned: announcement.is_pinned,
        views: announcement.views,
        status: announcement.status,
        created_by: announcement.created_by,
        created_at: announcement.created_at,
        updated_at: announcement.updated_at,
        // Frontend compatibility fields
        category: announcement.type,
        audience: announcement.target_audience,
        publishDate: announcement.publish_date,
        expiryDate: announcement.expiry_date,
        targetAudience: announcement.target_audience,
        isPinned: announcement.is_pinned,
        author: "Admin", // Default author for now
        tags: []
      }));
      
      setAnnouncements(transformedAnnouncements);
    } catch (error) {
      console.error('Error refreshing announcements data:', error);
      // Fallback to default data if API fails
      setAnnouncements(defaultAnnouncements);
    }
  };

  return (
    <AnnouncementContext.Provider value={{ 
      announcements, 
      addAnnouncement, 
      updateAnnouncement, 
      deleteAnnouncement, 
      getAnnouncementById,
      incrementViews,
      refreshAnnouncements
    }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error('useAnnouncements must be used within an AnnouncementProvider');
  }
  return context;
}

// Helper function to convert admin format to student view format
export function announcementToStudentView(announcement: Announcement) {
  return {
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    type: announcement.type || announcement.category,
    priority: announcement.priority,
    targetAudience: announcement.targetAudience || announcement.audience,
    publishDate: announcement.publishDate,
    expiryDate: announcement.expiryDate,
    author: announcement.author,
    isPinned: announcement.isPinned || false,
    tags: announcement.tags || []
  };
}

