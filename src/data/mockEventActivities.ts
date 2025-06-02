import { faker } from '@faker-js/faker'

export interface Activity {
  id: string;
  type: 'join' | 'comment' | 'like' | 'share' | 'rsvp';
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content?: string;
  privacy: 'Public' | 'Members Only' | 'Private';
}

const activityTypes: Activity['type'][] = ['join', 'comment', 'like', 'share', 'rsvp']
const privacyTypes: Activity['privacy'][] = ['Public', 'Members Only', 'Private']

export const generateMockActivity = (): Activity => {
  const type = activityTypes[Math.floor(Math.random() * activityTypes.length)]
  const privacy = privacyTypes[Math.floor(Math.random() * privacyTypes.length)]

  return {
    id: faker.string.uuid(),
    type,
    user: {
      name: faker.person.fullName(),
      avatar: faker.image.avatar()
    },
    timestamp: faker.date.recent({ days: 7 }).toISOString(),
    content: type === 'comment' ? faker.lorem.sentence() : undefined,
    privacy
  }
}

export const generateMockActivities = (count: number): Activity[] => {
  return Array.from({ length: count }, generateMockActivity)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export const mockActivities = generateMockActivities(20) 