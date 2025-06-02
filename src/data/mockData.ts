import { faker } from '@faker-js/faker';
import { User, UserProfile, UserSettings } from '../types/User';
import { Event, EventType, EventPrivacy, EventVenue, EventGuidelines } from '../types/Event';
import { Group, GroupCategory, GroupGuidelines } from '../types/Group';
import { Location } from '../types/Location';
import { Activity, ActivityType, ActivityPrivacy, UserRole } from '../types/Activity';

// Generate a random location
const generateLocation = (): Location => {
  const cities = ['Toronto, ON', 'San Francisco, CA', 'New York, NY', 'London, UK', 'Dublin, Ireland'];
  const selectedCity = cities[Math.floor(Math.random() * cities.length)];
  const [city, state] = selectedCity.split(', ');

  return {
    address: faker.location.streetAddress(),
    city,
    state: state || undefined,
    country: faker.location.country(),
    postalCode: faker.location.zipCode(),
    coordinates: {
      lat: Number(faker.location.latitude()),
      lng: Number(faker.location.longitude())
    },
    timezone: faker.location.timeZone(),
    formattedAddress: faker.location.streetAddress(true)
  };
};

// Generate user settings
const generateUserSettings = (): UserSettings => ({
  profileVisibility: Math.random() > 0.3 ? 'public' : 'private',
  activityVisibility: ['public', 'members-only', 'private'][Math.floor(Math.random() * 3)] as ActivityPrivacy,
  emailNotifications: {
    eventReminders: Math.random() > 0.2,
    groupUpdates: Math.random() > 0.3,
    mentions: Math.random() > 0.1,
    directMessages: Math.random() > 0.1
  },
  pushNotifications: {
    eventInvites: Math.random() > 0.2,
    groupActivity: Math.random() > 0.3,
    nearbyEvents: Math.random() > 0.4
  }
});

// Generate user profile
const generateUserProfile = (): UserProfile => ({
  bio: faker.lorem.paragraph(),
  location: faker.location.city(),
  interests: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => faker.word.sample()),
  website: Math.random() > 0.7 ? faker.internet.url() : undefined,
  socialLinks: {
    twitter: Math.random() > 0.6 ? `https://twitter.com/${faker.internet.userName()}` : undefined,
    linkedin: Math.random() > 0.6 ? `https://linkedin.com/in/${faker.internet.userName()}` : undefined,
    github: Math.random() > 0.7 ? `https://github.com/${faker.internet.userName()}` : undefined
  }
});

// Generate users
export const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  
  for (let i = 0; i < count; i++) {
    const user: User = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      role: Math.random() > 0.95 ? 'admin' : 'user',
      joinDate: faker.date.past().toISOString(),
      lastActive: faker.date.recent().toISOString(),
      profile: generateUserProfile(),
      settings: generateUserSettings(),
      groups: [],
      events: {
        attending: [],
        interested: [],
        past: []
      }
    };
    users.push(user);
  }

  return users;
};

// Generate venue
const generateVenue = (): EventVenue => ({
  name: faker.company.name(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  coordinates: {
    lat: Number(faker.location.latitude()),
    lng: Number(faker.location.longitude())
  },
  capacity: Math.random() > 0.5 ? Math.floor(Math.random() * 200) + 50 : undefined,
  amenities: Math.random() > 0.5 ? Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => faker.word.sample()) : undefined
});

// Generate event guidelines
const generateEventGuidelines = (): EventGuidelines => ({
  requirements: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => faker.lorem.sentence()),
  restrictions: Math.random() > 0.5 ? Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => faker.lorem.sentence()) : undefined,
  recommendations: Math.random() > 0.5 ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => faker.lorem.sentence()) : undefined,
  covid: Math.random() > 0.7 ? Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => faker.lorem.sentence()) : undefined
});

// Generate events
export const generateEvents = (count: number, users: User[], groups: Group[]): Event[] => {
  const events: Event[] = [];
  const eventTypes: EventType[] = ['social', 'workshop', 'professional', 'games', 'sports', 'arts', 'crafts', 'food', 'music', 'outdoors', 'wellness'];
  
  for (let i = 0; i < count; i++) {
    const startDate = faker.date.future();
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + Math.floor(Math.random() * 8) + 1);

    const event: Event = {
      id: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraphs(2),
      type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      privacy: ['public', 'members-only', 'private'][Math.floor(Math.random() * 3)] as EventPrivacy,
      status: 'upcoming',
      date: startDate.toISOString(),
      endDate: endDate.toISOString(),
      venue: generateVenue(),
      location: generateLocation(),
      organizer: users[Math.floor(Math.random() * users.length)],
      coHosts: Math.random() > 0.7 ? Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => users[Math.floor(Math.random() * users.length)]) : undefined,
      associatedGroup: Math.random() > 0.5 ? groups[Math.floor(Math.random() * groups.length)] : undefined,
      maxAttendees: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 20 : undefined,
      currentAttendees: Math.floor(Math.random() * 20),
      price: Math.random() > 0.7 ? {
        amount: Math.floor(Math.random() * 100) + 10,
        currency: 'USD',
        refundPolicy: faker.lorem.sentence()
      } : undefined,
      media: [],
      attendees: [],
      tags: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => faker.word.sample()),
      guidelines: generateEventGuidelines(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString()
    };
    events.push(event);
  }

  return events;
};

// Generate group guidelines
const generateGroupGuidelines = (): GroupGuidelines => ({
  rules: Array.from({ length: Math.floor(Math.random() * 5) + 2 }, () => faker.lorem.sentence()),
  requirements: Math.random() > 0.5 ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => faker.lorem.sentence()) : undefined,
  recommendations: Math.random() > 0.5 ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => faker.lorem.sentence()) : undefined
});

// Generate groups
export const generateGroups = (count: number, users: User[]): Group[] => {
  const groups: Group[] = [];
  const categories: GroupCategory[] = ['technology', 'professional', 'social', 'gaming', 'sports', 'arts', 'education', 'wellness', 'food', 'music', 'outdoors'];
  
  for (let i = 0; i < count; i++) {
    const owner = users[Math.floor(Math.random() * users.length)];
    const admins = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => users[Math.floor(Math.random() * users.length)]);
    const moderators = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => users[Math.floor(Math.random() * users.length)]);

    const group: Group = {
      id: faker.string.uuid(),
      name: faker.company.name(),
      description: faker.lorem.paragraphs(2),
      category: categories[Math.floor(Math.random() * categories.length)],
      privacy: Math.random() > 0.3 ? 'public' : 'private',
      location: generateLocation(),
      image: faker.image.url(),
      coverImage: Math.random() > 0.5 ? faker.image.url() : undefined,
      members: [],
      memberCount: Math.floor(Math.random() * 100) + 20,
      owner,
      admins,
      moderators,
      guidelines: generateGroupGuidelines(),
      meetingFrequency: ['Weekly', 'Bi-weekly', 'Monthly'][Math.floor(Math.random() * 3)],
      tags: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => faker.word.sample()),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      settings: {
        allowMemberEvents: Math.random() > 0.2,
        requireMemberApproval: Math.random() > 0.6,
        allowMemberPosts: Math.random() > 0.3,
        showInSearch: Math.random() > 0.1
      }
    };
    groups.push(group);
  }

  return groups;
};

// Generate activities
export const generateActivities = (count: number, users: User[], events: Event[], groups: Group[]): Activity[] => {
  const activities: Activity[] = [];
  const activityTypes: ActivityType[] = [
    'event-join', 'event-comment', 'event-photo', 'event-video',
    'group-join', 'group-leave', 'group-post', 'user-update', 'general-post'
  ];

  for (let i = 0; i < count; i++) {
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const privacy = user.settings.activityVisibility;

    const baseActivity = {
      id: faker.string.uuid(),
      type,
      user,
      timestamp: faker.date.recent().toISOString(),
      privacy,
      userRole: ['admin', 'moderator', 'member', 'non-member'][Math.floor(Math.random() * 4)] as UserRole,
      likes: Math.floor(Math.random() * 50),
      comments: Array.from({ length: Math.floor(Math.random() * 5) }, () => ({
        id: faker.string.uuid(),
        user: users[Math.floor(Math.random() * users.length)],
        content: faker.lorem.sentence(),
        timestamp: faker.date.recent().toISOString(),
        userRole: ['admin', 'moderator', 'member', 'non-member'][Math.floor(Math.random() * 4)] as UserRole
      }))
    };

    if (type.startsWith('event-')) {
      activities.push({
        ...baseActivity,
        event: events[Math.floor(Math.random() * events.length)],
        content: type === 'event-comment' ? faker.lorem.paragraph() : undefined,
        media: type.includes('photo') || type.includes('video') ? [{
          type: type.includes('photo') ? 'photo' : 'video',
          url: faker.image.url(),
          thumbnail: faker.image.url()
        }] : undefined
      });
    } else if (type.startsWith('group-')) {
      activities.push({
        ...baseActivity,
        group: groups[Math.floor(Math.random() * groups.length)],
        content: type === 'group-post' ? faker.lorem.paragraph() : undefined,
        reason: type === 'group-leave' ? [
          'No longer have time to commit to the group',
          'Moving to a different location',
          'Group interests have changed',
          'Other commitments',
          'Other'
        ][Math.floor(Math.random() * 5)] : undefined
      });
    } else {
      activities.push({
        ...baseActivity,
        content: faker.lorem.paragraph(),
        targetUser: Math.random() > 0.7 ? users[Math.floor(Math.random() * users.length)] : undefined
      });
    }
  }

  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate all mock data
export const generateMockData = () => {
  const users = generateUsers(100);
  const groups = generateGroups(20, users);
  const events = generateEvents(50, users, groups);
  const activities = generateActivities(30, users, events, groups);
  return { users, groups, events, activities };
};