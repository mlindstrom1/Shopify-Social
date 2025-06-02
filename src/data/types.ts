export type UserRole = 'Admin' | 'Moderator' | 'Member' | 'Non-Member';
export type UserPrivacy = 'Public' | 'Members Only' | 'Private';
export type ActivityType = 'EventAttendance' | 'EventComment' | 'GroupJoin' | 'GroupComment' | 'EventPhoto' | 'GroupPost';

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  location: string;
  joinDate: string;
  privacy: UserPrivacy;
  bio?: string;
  interests?: string[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  location: string;
  meetingFrequency: string;
  members: string[]; // User IDs
  admins: string[]; // User IDs
  moderators: string[]; // User IDs
  events: string[]; // Event IDs
  guidelines: string[];
  privacy: UserPrivacy;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  venue: {
    name: string;
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  type: string;
  image: string;
  attendees: string[]; // User IDs
  maxAttendees?: number;
  organizer: string; // User ID
  price: string;
  groupId?: string; // Optional Group ID if associated with a group
  guidelines?: string[];
  topics?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  targetId: string; // Event ID or Group ID
  content?: string;
  photos?: string[];
  createdAt: string;
  visibility: UserPrivacy;
  reactions: {
    userId: string;
    type: 'like' | 'heart' | 'laugh' | 'wow' | 'sad' | 'angry';
  }[];
  comments?: {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
    reactions: {
      userId: string;
      type: 'like' | 'heart' | 'laugh' | 'wow' | 'sad' | 'angry';
    }[];
  }[];
}

export interface LeaveGroupFeedback {
  reason: 'No time to participate' | 'Interests have changed' | 'Relocated from area' | 'Group is not active enough' | 'Other';
  comment?: string; // Optional, max 300 characters
  userId: string;
  groupId: string;
  createdAt: string;
} 