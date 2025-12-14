import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface CalendarItem {
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

interface CalendarContextType {
  calendarItems: CalendarItem[];
  addCalendarItem: (item: CalendarItem) => void;
  updateCalendarItem: (id: string, item: Partial<CalendarItem>) => void;
  deleteCalendarItem: (id: string) => void;
  getCalendarItemById: (id: string) => CalendarItem | undefined;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

const defaultCalendarItems: CalendarItem[] = [
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

const STORAGE_KEY = 'university_calendar_data';

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading calendar items from localStorage:', error);
    }
    return defaultCalendarItems;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(calendarItems));
    } catch (error) {
      console.error('Error saving calendar items to localStorage:', error);
    }
  }, [calendarItems]);

  const addCalendarItem = async (newItem: CalendarItem) => {
    try {
      const response = await axios.post<CalendarItem>('http://localhost:8000/api/calendar', newItem);
      setCalendarItems(prev => [response.data, ...prev]);
    } catch (error) {
      console.error('Error adding calendar item:', error);
    }
  };

  const updateCalendarItem = async (id: string, updatedData: Partial<CalendarItem>) => {
    try {
      const response = await axios.put<CalendarItem>(`http://localhost:8000/api/calendar/${id}`, updatedData);
      setCalendarItems(prev => prev.map(item => item.id === id ? response.data : item));
    } catch (error) {
      console.error('Error updating calendar item:', error);
    }
  };

  const deleteCalendarItem = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/calendar/${id}`);
      setCalendarItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting calendar item:', error);
    }
  };

  const getCalendarItemById = (id: string) => {
    return calendarItems.find(item => item.id === id);
  };

  return (
    <CalendarContext.Provider value={{ 
      calendarItems, 
      addCalendarItem, 
      updateCalendarItem, 
      deleteCalendarItem, 
      getCalendarItemById 
    }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}

