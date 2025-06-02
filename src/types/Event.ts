import { User } from './User'
import { Group } from './Group'
import { Location } from './Location'

export type EventPrivacy = 'public' | 'members-only' | 'private'
export type EventStatus = 'upcoming' | 'ongoing' | 'past' | 'cancelled'
export type EventType = 
  | 'social'
  | 'workshop'
  | 'professional'
  | 'games'
  | 'sports'
  | 'arts'
  | 'crafts'
  | 'food'
  | 'music'
  | 'outdoors'
  | 'wellness'

export interface EventVenue {
  name: string
  address: string
  city: string
  coordinates: {
    lat: number
    lng: number
  }
  capacity?: number
  amenities?: string[]
}

export interface EventMedia {
  type: 'photo' | 'video'
  url: string
  thumbnail?: string
  uploadedBy: User
  timestamp: string
  description?: string
}

export interface EventAttendee {
  user: User
  status: 'going' | 'interested' | 'not-going'
  rsvpDate: string
  checkedIn?: boolean
  role: 'host' | 'co-host' | 'attendee'
}

export interface EventGuidelines {
  requirements?: string[]
  restrictions?: string[]
  recommendations?: string[]
  covid?: string[]
}

export interface Event {
  id: string
  title: string
  description: string
  type: EventType
  privacy: EventPrivacy
  status: EventStatus
  date: string
  endDate?: string
  venue: EventVenue
  location: Location
  organizer: User
  coHosts?: User[]
  associatedGroup?: Group
  maxAttendees?: number
  currentAttendees: number
  price?: {
    amount: number
    currency: string
    refundPolicy?: string
  }
  media: EventMedia[]
  attendees: EventAttendee[]
  tags: string[]
  guidelines: EventGuidelines
  createdAt: string
  updatedAt: string
  image?: string
  topics?: string[]
} 