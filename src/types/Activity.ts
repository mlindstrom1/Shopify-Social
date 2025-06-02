import { User } from './User'

export type ActivityPrivacy = 'public' | 'members-only' | 'private'
export type ActivityType = 'event-join' | 'group-join' | 'post' | 'event-comment' | 'event-photo' | 'event-video' | 'group-leave' | 'group-post' | 'user-update' | 'general-post'

export type UserRole = 'admin' | 'moderator' | 'member' | 'non-member'

export interface ActivityBase {
  id: string
  type: ActivityType
  user: User
  timestamp: string
  privacy: ActivityPrivacy
  userRole?: UserRole
  likes?: number
  comments?: ActivityComment[]
}

export interface ActivityComment {
  id: string
  user: User
  content: string
  timestamp: string
  userRole?: UserRole
}

export interface EventActivity extends ActivityBase {
  event: {
    title: string
    description: string
    type: string
    image?: string
    location: {
      city: string
      country: string
    }
    date: string
    price?: {
      amount: number
      currency: string
    }
  }
  content?: string
  media?: {
    type: 'photo' | 'video'
    url: string
    thumbnail?: string
  }[]
}

export interface GroupActivity extends ActivityBase {
  group: {
    name: string
    description: string
    category: string
    image: string
    location: {
      city: string
      country: string
    }
  }
  content?: string
  reason?: string // For leave group feedback
}

export interface UserActivity extends ActivityBase {
  content: string
  targetUser?: User // For user mentions/tags
}

export interface PostActivity extends ActivityBase {
  type: 'post'
  link?: string
}

export type Activity = EventActivity | GroupActivity | UserActivity | PostActivity

export interface ActivityFilters {
  types?: ActivityType[]
  privacy?: ActivityPrivacy[]
  dateRange?: {
    start: string
    end: string
  }
  userRole?: UserRole[]
  searchTerm?: string
} 