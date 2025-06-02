export interface UserSettings {
  profileVisibility: 'public' | 'private'
  activityVisibility: 'public' | 'members-only' | 'private'
  emailNotifications: {
    eventReminders: boolean
    groupUpdates: boolean
    mentions: boolean
    directMessages: boolean
  }
  pushNotifications: {
    eventInvites: boolean
    groupActivity: boolean
    nearbyEvents: boolean
  }
}

export interface UserProfile {
  bio: string
  location: string
  interests: string[]
  website?: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'user' | 'admin'
  joinDate: string
  lastActive: string
  profile: UserProfile
  settings: UserSettings
  groups: string[] // Group IDs
  events: {
    attending: string[] // Event IDs
    interested: string[]
    past: string[]
  }
} 