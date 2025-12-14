import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';

// Unified Faculty interface that works for both admin and student views
export interface Faculty {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  office: string;
  department: string;
  title: string;
  status: string;
  bio: string;
  specializations: string[];
  education: string[];
  awards: string[];
  profileImage?: string;
  officeHours: string;
  website?: string;
  // Additional fields for student view compatibility
  researchInterests?: string[];
  yearsOfExperience?: number;
}

interface FacultyContextType {
  faculty: Faculty[];
  loading: boolean;
  addFaculty: (faculty: Omit<Faculty, 'id'>) => Promise<Faculty>;
  updateFaculty: (id: string, faculty: Partial<Faculty>) => Promise<Faculty>;
  deleteFaculty: (id: string) => Promise<void>;
  getFacultyById: (id: string) => Faculty | undefined;
  refreshFaculty: () => Promise<void>;
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

// Default mock data - Initial faculty members
const defaultFaculty: Faculty[] = [
  {
    id: "1",
    firstName: "Kenneth",
    lastName: "Gisalan",
    email: "kenneth.gisalan@sorsu-bulan.edu.ph",
    phone: "+63 919 345 6789",
    office: "Engineering Building, Room 203",
    department: "Information Technology",
    title: "Assistant Professor",
    status: "Active",
    bio: "Prof. Gisalan is an IT expert specializing in cybersecurity, network administration, and software development. He brings industry experience to the classroom and is passionate about preparing students for the digital workforce.",
    specializations: ["Information Technology", "Cybersecurity", "Network Administration", "Software Development"],
    education: [
      "M.S. in Information Technology, University of the Philippines Diliman",
      "B.S. in Computer Science, Ateneo de Manila University"
    ],
    awards: [
      "Outstanding IT Educator Award 2023",
      "Best Cybersecurity Research Paper 2022"
    ],
    officeHours: "Tue/Thu 2-4 PM",
    researchInterests: ["Cybersecurity", "Network Security", "Cloud Computing", "Digital Forensics"],
    yearsOfExperience: 8
  },
  {
    id: "2",
    firstName: "Sean Martin",
    lastName: "Fulay",
    email: "sean.fulay@sorsu-bulan.edu.ph",
    phone: "+63 917 888 5566",
    office: "Engineering Building, Room 204",
    department: "Information Technology",
    title: "IT Specialist Instructor",
    status: "Active",
    bio: "Mr. Fulay is an IT specialist with strong expertise in software development, system administration, and emerging technologies. He is dedicated to helping students build practical technical skills aligned with industry standards.",
    specializations: [
      "Software Development",
      "IT Infrastructure",
      "Network Systems",
      "Database Management"
    ],
    education: [
      "B.S. in Information Technology, Sorsogon State University",
      "Cisco Networking Certification (CCNA)"
    ],
    awards: ["Excellence in IT Instruction Award 2024"],
    officeHours: "Mon/Wed/Fri 1-3 PM",
    researchInterests: [
      "IT Infrastructure",
      "Web Development",
      "Cloud Services",
      "Systems Administration"
    ],
    yearsOfExperience: 5
  }
];

const STORAGE_KEY = 'university_faculty_data';

export function FacultyProvider({ children }: { children: ReactNode }) {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  // Load faculty data from API
  const fetchFaculty = async () => {
    try {
      const response = await api.get<any[]>('/faculty'); // Use any[] for backend response
      console.log('Faculty API response:', response.data);
      
      // Transform snake_case backend data to camelCase for frontend
      const transformedFaculty = response.data.map(faculty => ({
        id: faculty.id,
        firstName: faculty.first_name || faculty.firstName,
        lastName: faculty.last_name || faculty.lastName,
        email: faculty.email,
        phone: faculty.phone,
        office: faculty.office,
        department: faculty.department,
        title: faculty.title,
        status: faculty.status,
        bio: faculty.bio,
        specializations: faculty.specializations || [],
        education: faculty.education || [],
        awards: faculty.awards || [],
        profileImage: faculty.profile_image || faculty.profileImage,
        officeHours: faculty.office_hours || faculty.officeHours,
        website: faculty.website,
        researchInterests: faculty.research_interests || faculty.researchInterests,
        yearsOfExperience: faculty.years_of_experience || faculty.yearsOfExperience,
      }));
      setFaculty(transformedFaculty);
      return transformedFaculty;
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      // Fallback to default data if API fails
      setFaculty(defaultFaculty);
      return defaultFaculty;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const addFaculty = async (newFaculty: Omit<Faculty, 'id'>) => {
    try {
      console.log('Sending faculty data to API:', newFaculty);
      
      // Transform camelCase to snake_case for backend
      const backendFaculty = {
        first_name: newFaculty.firstName,
        last_name: newFaculty.lastName,
        email: newFaculty.email,
        phone: newFaculty.phone,
        office: newFaculty.office,
        department: newFaculty.department,
        title: newFaculty.title,
        status: newFaculty.status,
        bio: newFaculty.bio,
        specializations: newFaculty.specializations,
        education: newFaculty.education,
        awards: newFaculty.awards,
        profile_image: newFaculty.profileImage,
        office_hours: newFaculty.officeHours,
        website: newFaculty.website,
        research_interests: newFaculty.researchInterests,
        years_of_experience: newFaculty.yearsOfExperience,
      };

      const response = await api.post<any>('/faculty', backendFaculty);
      console.log('API response:', response.data);
      
      // Transform the response data from snake_case to camelCase
      const transformedNewFaculty = {
        id: response.data.id,
        firstName: response.data.first_name || response.data.firstName,
        lastName: response.data.last_name || response.data.lastName,
        email: response.data.email,
        phone: response.data.phone,
        office: response.data.office,
        department: response.data.department,
        title: response.data.title,
        status: response.data.status,
        bio: response.data.bio,
        specializations: response.data.specializations || [],
        education: response.data.education || [],
        awards: response.data.awards || [],
        profileImage: response.data.profile_image || response.data.profileImage,
        officeHours: response.data.office_hours || response.data.officeHours,
        website: response.data.website,
        researchInterests: response.data.research_interests || response.data.researchInterests,
        yearsOfExperience: response.data.years_of_experience || response.data.yearsOfExperience,
      };
      
      setFaculty(prev => [transformedNewFaculty, ...prev]);
      return transformedNewFaculty;
    } catch (error: any) {
      console.error('Error adding faculty member:', error);
      console.error('Error response:', error.response?.data);
      
      // Provide more specific error messages
      if (error.response?.status === 401) {
        throw new Error('Your session has expired. Please log in again.');
      } else if (error.response?.status === 403) {
        throw new Error('Only administrators can create faculty profiles. Please log in as an admin.');
      } else if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        const errorMessages = Object.values(validationErrors).flat();
        throw new Error(`Validation error: ${errorMessages.join(', ')}`);
      } else {
        throw error;
      }
    }
  };

  const updateFaculty = async (id: string, updatedData: Partial<Faculty>) => {
    try {
      // Remove authentication checks since we're using cookie-based auth
      // The API will handle authentication through cookies

      // Transform camelCase to snake_case for backend
      const backendData: any = {};
      
      if (updatedData.firstName !== undefined) backendData.first_name = updatedData.firstName;
      if (updatedData.lastName !== undefined) backendData.last_name = updatedData.lastName;
      if (updatedData.email !== undefined) backendData.email = updatedData.email;
      if (updatedData.phone !== undefined) backendData.phone = updatedData.phone;
      if (updatedData.office !== undefined) backendData.office = updatedData.office;
      if (updatedData.department !== undefined) backendData.department = updatedData.department;
      if (updatedData.title !== undefined) backendData.title = updatedData.title;
      if (updatedData.status !== undefined) backendData.status = updatedData.status;
      if (updatedData.bio !== undefined) backendData.bio = updatedData.bio;
      if (updatedData.specializations !== undefined) backendData.specializations = updatedData.specializations;
      if (updatedData.education !== undefined) backendData.education = updatedData.education;
      if (updatedData.awards !== undefined) backendData.awards = updatedData.awards;
      if (updatedData.profileImage !== undefined) backendData.profile_image = updatedData.profileImage;
      if (updatedData.officeHours !== undefined) backendData.office_hours = updatedData.officeHours;
      if (updatedData.website !== undefined) backendData.website = updatedData.website;
      if (updatedData.researchInterests !== undefined) backendData.research_interests = updatedData.researchInterests;
      if (updatedData.yearsOfExperience !== undefined) backendData.years_of_experience = updatedData.yearsOfExperience;

      let transformedUpdatedFaculty;
      
      try {
        const response = await api.put<any>(`/faculty/${id}`, backendData); // Use any for backend response
        
        // Transform the response data from snake_case to camelCase
        transformedUpdatedFaculty = {
          id: response.data.id,
          firstName: response.data.first_name || response.data.firstName,
          lastName: response.data.last_name || response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
          office: response.data.office,
          department: response.data.department,
          title: response.data.title,
          status: response.data.status,
          bio: response.data.bio,
          specializations: response.data.specializations || [],
          education: response.data.education || [],
          awards: response.data.awards || [],
          profileImage: response.data.profile_image || response.data.profileImage,
          officeHours: response.data.office_hours || response.data.officeHours,
          website: response.data.website,
          researchInterests: response.data.research_interests || response.data.researchInterests,
          yearsOfExperience: response.data.years_of_experience || response.data.yearsOfExperience,
        };
      } catch (apiError) {
        // If API fails, update locally
        console.warn('API unavailable, updating faculty locally:', apiError);
        transformedUpdatedFaculty = {
          ...updatedData,
          id,
          researchInterests: updatedData.researchInterests || [],
          yearsOfExperience: updatedData.yearsOfExperience || 0,
        } as Faculty;
      }
      
      setFaculty(prev => {
        const updatedFaculty = prev.map(f => f.id === id ? { ...f, ...transformedUpdatedFaculty } : f);
        // Save to localStorage for persistence
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFaculty));
        return updatedFaculty;
      });
      
      return transformedUpdatedFaculty;
    } catch (error: any) {
      console.error('Error updating faculty member:', error);
      
      // Provide more specific error messages
      if (error.response?.status === 401) {
        throw new Error('Your session has expired. Please log in again.');
      } else if (error.response?.status === 403) {
        throw new Error('You do not have permission to update this faculty profile.');
      } else if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        const errorMessages = Object.values(validationErrors).flat();
        throw new Error(`Validation error: ${errorMessages.join(', ')}`);
      } else {
        throw error;
      }
    }
  };

  const deleteFaculty = async (id: string) => {
    try {
      await api.delete(`/faculty/${id}`);
      setFaculty(prev => {
        const updatedFaculty = prev.filter(f => f.id !== id);
        // Save to localStorage for persistence
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFaculty));
        return updatedFaculty;
      });
    } catch (error) {
      console.error('Error deleting faculty member:', error);
      // Even if API fails, delete locally but don't throw error
      setFaculty(prev => {
        const updatedFaculty = prev.filter(f => f.id !== id);
        // Save to localStorage for persistence
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFaculty));
        return updatedFaculty;
      });
      // Don't throw error - the deletion succeeded locally
    }
  };

  const getFacultyById = (id: string) => {
    return faculty.find(f => f.id === id);
  };

  const refreshFaculty = async () => {
    await fetchFaculty();
  };

  return (
    <FacultyContext.Provider value={{ faculty, loading, addFaculty, updateFaculty, deleteFaculty, getFacultyById, refreshFaculty }}>
      {children}
    </FacultyContext.Provider>
  );
}

export function useFaculty() {
  const context = useContext(FacultyContext);
  if (context === undefined) {
    throw new Error('useFaculty must be used within a FacultyProvider');
  }
  return context;
}

// Helper function to convert Faculty to student view format
export function facultyToStudentView(faculty: Faculty) {
  return {
    id: faculty.id,
    name: `${faculty.firstName} ${faculty.lastName}`,
    position: faculty.title,
    department: faculty.department,
    specialization: faculty.specializations || [],
    education: faculty.education ? faculty.education.join('; ') : '',
    email: faculty.email,
    phone: faculty.phone,
    officeLocation: faculty.office,
    profileImage: faculty.profileImage,
    bio: faculty.bio,
    achievements: faculty.awards || [],
    researchInterests: faculty.researchInterests || [],
    yearsOfExperience: faculty.yearsOfExperience || 5,
    employmentStatus: faculty.status === 'Active' ? 'Regular' : faculty.status
  };
}

