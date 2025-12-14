import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';

export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  location: string;
  category: string;
  max_attendees: number;
  current_attendees?: number;
  status: string;
  organizer: string;
  registration_required: boolean;
  is_public: boolean;
  type?: string;
  registration_deadline?: string;
  tags?: string[];
  created_by?: string;
  // Frontend compatibility fields (computed)
  date?: string;
  time?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  registrationRequired?: boolean;
  isPublic?: boolean;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  registrationDeadline?: string;
  contactEmail?: string;
  website?: string;
  featured?: boolean;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => Promise<Event>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
  getEventById: (id: string) => Event | undefined;
  updateEventStatus: (id: string, status: string) => void;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Graduate Research Symposium",
    description: "Annual showcase of graduate student research across all departments. Presentations, posters, and networking opportunities.",
    start_date: "2024-11-15",
    end_date: "2024-11-15",
    location: "Student Center Auditorium",
    category: "Academic",
    max_attendees: 200,
    current_attendees: 156,
    status: "active",
    organizer: "Graduate School",
    registration_required: true,
    is_public: true,
    type: "Academic",
    registration_deadline: "2024-11-10",
    tags: ["Research", "Innovation", "Academic", "Technology"],
    created_by: "Graduate School",
    // Frontend compatibility fields (computed)
    date: "2024-11-15",
    time: "09:00",
    maxAttendees: 200,
    currentAttendees: 156,
    registrationRequired: true,
    isPublic: true,
    startDate: "2024-11-15",
    endDate: "2024-11-15",
    startTime: "09:00",
    endTime: "17:00",
    capacity: 200,
    registrationDeadline: "2024-11-10",
    contactEmail: "research@sorsu-bulan.edu.ph",
    website: undefined,
    featured: true
  },
  {
    id: "2",
    title: "Career Fair - Technology Sector",
    description: "Meet with leading technology companies for internship and full-time opportunities. Bring your resume and dress professionally.",
    start_date: "2024-10-25",
    end_date: "2024-10-25",
    location: "Recreation Center Gymnasium",
    category: "Career",
    max_attendees: 500,
    current_attendees: 423,
    status: "active",
    organizer: "Career Services",
    registration_required: false,
    is_public: true,
    type: "Career",
    registration_deadline: undefined,
    tags: ["Career", "Jobs", "Networking", "Recruitment"],
    created_by: "Career Services",
    // Frontend compatibility fields (computed)
    date: "2024-10-25",
    time: "10:00",
    maxAttendees: 500,
    currentAttendees: 423,
    registrationRequired: false,
    isPublic: true,
    startDate: "2024-10-25",
    endDate: "2024-10-25",
    startTime: "10:00",
    endTime: "16:00",
    capacity: 500,
    registrationDeadline: undefined,
    contactEmail: "careers@sorsu-bulan.edu.ph",
    website: undefined,
    featured: true
  }
];

const STORAGE_KEY = 'university_events_data';

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Load events data from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get<Event[]>('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events data:', error);
        // Fallback to default data if API fails
        setEvents(defaultEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (newEvent: Omit<Event, 'id'>) => {
    try {
      console.log('Sending event data to API:', newEvent);
      const response = await api.post<Event>('/events', newEvent);
      const data = response.data;
      console.log('API response:', data);
      setEvents(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding event:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('Error response:', (error as any).response?.data);
      }
      throw error; // Let the component handle the error
    }
  };

  const updateEvent = async (id: string, updatedData: Partial<Event>) => {
    try {
      const response = await api.put<Event>(`/events/${id}`, updatedData);
      setEvents(prev => prev.map(e => e.id === id ? response.data : e));
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error; // Let the component handle the error
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error; // Let's component handle the error
    }
  };

  const getEventById = (id: string) => {
    return events.find(e => e.id === id);
  };

  const updateEventStatus = (id: string, status: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const refreshEvents = async () => {
    try {
      const response = await api.get<Event[]>('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error refreshing events data:', error);
      // Fallback to default data if API fails
      setEvents(defaultEvents);
    }
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      addEvent, 
      updateEvent, 
      deleteEvent, 
      getEventById,
      updateEventStatus,
      refreshEvents
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}

// Helper function to convert admin format to student view format
export function eventToStudentView(event: Event) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    type: event.type || event.category,
    category: event.category,
    startDate: event.start_date,
    endDate: event.end_date,
    startTime: event.start_date ? event.start_date.split('T')[1]?.substring(0, 5) : undefined,
    endTime: event.end_date ? event.end_date.split('T')[1]?.substring(0, 5) : undefined,
    location: event.location,
    organizer: event.organizer,
    capacity: event.max_attendees,
    registrationRequired: event.registration_required,
    registrationDeadline: event.registration_deadline,
    contactEmail: `${event.organizer.toLowerCase().replace(/\s+/g, '')}@sorsu-bulan.edu.ph`,
    website: undefined,
    tags: event.tags || [],
    featured: false
  };
}

