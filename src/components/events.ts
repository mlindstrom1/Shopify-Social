import { EventPrivacy, EventStatus } from '../types/Event'

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
  privacy: EventPrivacy;
  status: EventStatus;
  image?: string;
  attendees: number;
  maxAttendees?: number;
  currentAttendees: number;
  organizer: string;
  price?: {
    amount: number;
    currency: string;
    refundPolicy?: string;
  };
  topics?: string[];
  guidelines?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Helper function to determine if an event is past
export const isEventPast = (event: Event): boolean => {
  const eventDate = new Date(event.date);
  return eventDate < new Date();
}

// Past events
export const pastEvents: Event[] = [
  {
    id: "p1",
    title: "Tech Meetup: AI & Machine Learning",
    description: "Join us for an evening of discussions about the latest in AI and Machine Learning. Network with fellow tech enthusiasts!",
    date: "2024-03-15T18:30:00Z",
    endDate: "2024-03-15T21:30:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Innovation Hub",
      address: "456 Tech Avenue",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6532,
        lng: -79.3832
      }
    },
    type: "Technology",
    privacy: "public",
    status: "past",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
    attendees: 85,
    maxAttendees: 100,
    currentAttendees: 85,
    organizer: "Sarah Chen",
    topics: ["AI", "Machine Learning", "Technology"],
    tags: ["Tech", "AI", "ML", "Networking"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-16T10:00:00Z"
  },
  {
    id: "p2",
    title: "Photography Workshop: Urban Landscapes",
    description: "Learn the art of urban photography in this hands-on workshop. Bring your camera and creativity!",
    date: "2024-03-20T14:00:00Z",
    endDate: "2024-03-20T17:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Downtown Arts Center",
      address: "789 Creative Street",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6542,
        lng: -79.3842
      }
    },
    type: "Arts",
    privacy: "public",
    status: "past",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
    attendees: 20,
    maxAttendees: 20,
    currentAttendees: 20,
    organizer: "Chris Lee",
    price: {
      amount: 45,
      currency: "USD",
      refundPolicy: "No refunds for past events"
    },
    topics: ["Photography", "Urban", "Creative Arts"],
    tags: ["Photography", "Urban", "Creative", "Workshop"],
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-03-02T10:00:00Z"
  },
  {
    id: "p3",
    title: "Startup Networking Mixer",
    description: "Connect with fellow entrepreneurs and investors in Toronto's startup ecosystem.",
    date: "2024-03-25T18:00:00Z",
    endDate: "2024-03-25T21:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "The Startup Hub",
      address: "101 Innovation Drive",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6552,
        lng: -79.3852
      }
    },
    type: "Business",
    privacy: "public",
    status: "past",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    attendees: 120,
    maxAttendees: 150,
    currentAttendees: 120,
    organizer: "Mark Johnson",
    price: {
      amount: 25,
      currency: "USD",
      refundPolicy: "No refunds for past events"
    },
    topics: ["Startups", "Networking", "Business"],
    tags: ["Business", "Networking", "Startups", "Tech"],
    createdAt: "2024-02-10T10:00:00Z",
    updatedAt: "2024-03-11T10:00:00Z"
  }
];

// Future/Upcoming events
export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Board Game Night",
    description: "Join us at The Dice Box Cafe for our regular board game night! Come out to play games, meet fellow gamers, and build connections in Toronto's gaming community.",
    date: "2025-06-20T19:00:00Z",
    endDate: "2025-06-20T22:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "The Dice Box Cafe",
      address: "123 Gaming Street",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6532,
        lng: -79.3832
      }
    },
    type: "Games",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800",
    attendees: 30,
    maxAttendees: 50,
    currentAttendees: 30,
    organizer: "Mike Chen",
    price: {
      amount: 0,
      currency: "USD",
      refundPolicy: "Full refund up to 24 hours before the event"
    },
    topics: ["Board Games", "Strategy Games", "Social Gaming"],
    guidelines: ["Fair Play", "Respect All Players", "Have Fun"],
    tags: ["Board Games", "Strategy Games", "Social Gaming", "Card Games"],
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Social Volleyball Meetup",
    description: "Join us for a fun evening of volleyball! All skill levels welcome. We'll have multiple courts set up for different skill levels.",
    date: "2025-06-25T18:00:00Z",
    endDate: "2025-06-25T20:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Beach Volleyball Courts",
      address: "456 Beach Street",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6472,
        lng: -79.3822
      }
    },
    type: "Sports",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800",
    attendees: 24,
    maxAttendees: 40,
    currentAttendees: 24,
    organizer: "Sarah Martinez",
    price: {
      amount: 5,
      currency: "USD",
      refundPolicy: "Full refund up to 24 hours before the event"
    },
    topics: ["Sports", "Volleyball", "Social Sports"],
    guidelines: ["Bring indoor shoes", "All skill levels welcome", "Be respectful"],
    tags: ["Sports", "Volleyball", "Active", "Social Sports"],
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z"
  },
  {
    id: "3",
    title: "Paint & Sip Social",
    description: "Unleash your creativity while enjoying some wine! Our instructor will guide you through creating your own masterpiece.",
    date: "2025-06-28T19:00:00Z",
    endDate: "2025-06-28T21:30:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Creative Studio",
      address: "789 Art Avenue",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6552,
        lng: -79.3842
      }
    },
    type: "Arts",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    attendees: 15,
    maxAttendees: 20,
    currentAttendees: 15,
    organizer: "Emily Brooks",
    price: {
      amount: 35,
      currency: "USD",
      refundPolicy: "Full refund up to 48 hours before the event"
    },
    topics: ["Art", "Painting", "Social", "Wine"],
    guidelines: ["Must be 19+", "All materials provided", "No experience needed"],
    tags: ["Art", "Painting", "Wine", "Social"],
    createdAt: "2024-03-18T10:00:00Z",
    updatedAt: "2024-03-18T10:00:00Z"
  },
  {
    id: "4",
    title: "Mindful Meditation Session",
    description: "Join us for a guided meditation session focused on mindfulness and stress reduction. Perfect for beginners!",
    date: "2025-07-02T08:00:00Z",
    endDate: "2025-07-02T09:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Zen Garden Studio",
      address: "101 Peace Street",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6562,
        lng: -79.3852
      }
    },
    type: "Wellness",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    attendees: 12,
    maxAttendees: 15,
    currentAttendees: 12,
    organizer: "Lisa Chang",
    price: {
      amount: 10,
      currency: "USD",
      refundPolicy: "Full refund up to 24 hours before the event"
    },
    topics: ["Meditation", "Mindfulness", "Wellness"],
    guidelines: ["Bring a mat or cushion", "Wear comfortable clothing", "Arrive 10 minutes early"],
    tags: ["Meditation", "Mindfulness", "Wellness", "Morning"],
    createdAt: "2024-03-25T10:00:00Z",
    updatedAt: "2024-03-25T10:00:00Z"
  },
  {
    id: "5",
    title: "Cooking Workshop: Italian Pasta",
    description: "Learn to make authentic Italian pasta from scratch! We'll cover different pasta shapes and classic sauces.",
    date: "2025-07-05T18:30:00Z",
    endDate: "2025-07-05T21:30:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Culinary Studio",
      address: "202 Kitchen Lane",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6572,
        lng: -79.3862
      }
    },
    type: "Food",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    attendees: 10,
    maxAttendees: 12,
    currentAttendees: 10,
    organizer: "Marco Rossi",
    price: {
      amount: 75,
      currency: "USD",
      refundPolicy: "Full refund up to 48 hours before the event"
    },
    topics: ["Cooking", "Italian Cuisine", "Pasta Making"],
    guidelines: ["No experience needed", "All ingredients provided", "Bring an apron"],
    tags: ["Cooking", "Italian", "Food", "Workshop"],
    createdAt: "2024-03-22T10:00:00Z",
    updatedAt: "2024-03-22T10:00:00Z"
  },
  {
    id: "6",
    title: "Web Development Workshop: React & TypeScript",
    description: "Dive deep into modern web development with React and TypeScript. Perfect for intermediate developers looking to level up their skills.",
    date: "2025-07-10T09:00:00Z",
    endDate: "2025-07-10T17:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Code Academy",
      address: "303 Developer Lane",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6582,
        lng: -79.3872
      }
    },
    type: "Technology",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    attendees: 25,
    maxAttendees: 30,
    currentAttendees: 25,
    organizer: "Alex Rivera",
    price: {
      amount: 150,
      currency: "USD",
      refundPolicy: "Full refund up to 7 days before the event"
    },
    topics: ["Web Development", "React", "TypeScript"],
    guidelines: ["Bring your laptop", "Basic JavaScript knowledge required", "Install Node.js beforehand"],
    tags: ["Web Dev", "React", "TypeScript", "Workshop"],
    createdAt: "2024-03-28T10:00:00Z",
    updatedAt: "2024-03-28T10:00:00Z"
  },
  {
    id: "7",
    title: "Summer Yoga in the Park",
    description: "Start your weekend with an energizing outdoor yoga session. All levels welcome!",
    date: "2025-07-12T08:00:00Z",
    endDate: "2025-07-12T09:30:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Trinity Bellwoods Park",
      address: "790 Queen Street West",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6592,
        lng: -79.3882
      }
    },
    type: "Wellness",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800",
    attendees: 40,
    maxAttendees: 50,
    currentAttendees: 40,
    organizer: "Emma Davis",
    price: {
      amount: 15,
      currency: "USD",
      refundPolicy: "Full refund up to 24 hours before the event"
    },
    topics: ["Yoga", "Outdoor Activities", "Wellness"],
    guidelines: ["Bring your own mat", "Arrive 10 minutes early", "Weather dependent"],
    tags: ["Yoga", "Outdoor", "Wellness", "Morning"],
    createdAt: "2024-03-29T10:00:00Z",
    updatedAt: "2024-03-29T10:00:00Z"
  },
  {
    id: "8",
    title: "Music Production Workshop",
    description: "Learn the basics of music production using industry-standard software. From beat-making to mixing and mastering.",
    date: "2025-07-15T18:00:00Z",
    endDate: "2025-07-15T21:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Sound Studio TO",
      address: "404 Music Avenue",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6602,
        lng: -79.3892
      }
    },
    type: "Arts",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    attendees: 15,
    maxAttendees: 20,
    currentAttendees: 15,
    organizer: "David Kim",
    price: {
      amount: 80,
      currency: "USD",
      refundPolicy: "Full refund up to 48 hours before the event"
    },
    topics: ["Music Production", "Audio Engineering", "Creative Arts"],
    guidelines: ["Bring headphones", "Laptop required", "Software will be provided"],
    tags: ["Music", "Production", "Creative", "Workshop"],
    createdAt: "2024-03-30T10:00:00Z",
    updatedAt: "2024-03-30T10:00:00Z"
  },
  {
    id: "9",
    title: "Blockchain & Web3 Meetup",
    description: "Discuss the latest developments in blockchain technology and Web3. Network with crypto enthusiasts and developers.",
    date: "2025-07-18T18:30:00Z",
    endDate: "2025-07-18T21:30:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Crypto Hub",
      address: "505 Blockchain Boulevard",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6612,
        lng: -79.3902
      }
    },
    type: "Technology",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800",
    attendees: 60,
    maxAttendees: 80,
    currentAttendees: 60,
    organizer: "Mike Zhang",
    price: {
      amount: 0,
      currency: "USD",
      refundPolicy: "Free event"
    },
    topics: ["Blockchain", "Web3", "Cryptocurrency"],
    guidelines: ["All skill levels welcome", "Bring questions", "Network responsibly"],
    tags: ["Blockchain", "Web3", "Crypto", "Tech"],
    createdAt: "2024-03-31T10:00:00Z",
    updatedAt: "2024-03-31T10:00:00Z"
  }
];

// Export all events combined
export const allEvents = [...upcomingEvents, ...pastEvents];

// Export events for My Events section (include both upcoming and past events)
export const myEvents = [
  // Some upcoming events
  upcomingEvents[0],
  upcomingEvents[1],
  // Some past events
  pastEvents[0],
  pastEvents[1]
]; 