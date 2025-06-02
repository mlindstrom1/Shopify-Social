import { User } from './User'
import { Location } from './Location'

export type GroupPrivacy = 'public' | 'private'
export type GroupCategory = 
  | 'technology'
  | 'professional'
  | 'social'
  | 'gaming'
  | 'sports'
  | 'arts'
  | 'education'
  | 'wellness'
  | 'food'
  | 'music'
  | 'outdoors'

export interface GroupMember {
  user: User
  role: 'admin' | 'moderator' | 'member'
  joinDate: string
  status: 'active' | 'inactive' | 'banned'
}

export interface GroupGuidelines {
  rules: string[]
  requirements?: string[]
  recommendations?: string[]
}

export interface Group {
  id: string
  name: string
  description: string
  category: GroupCategory
  privacy: GroupPrivacy
  location: Location
  image: string
  coverImage?: string
  members: GroupMember[]
  memberCount: number
  owner: User
  admins: User[]
  moderators: User[]
  guidelines: GroupGuidelines
  meetingFrequency?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  settings: {
    allowMemberEvents: boolean
    requireMemberApproval: boolean
    allowMemberPosts: boolean
    showInSearch: boolean
  }
} 