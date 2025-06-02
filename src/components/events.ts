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

// Future/Upcoming events
const upcomingEvents: Event[] = [
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
    attendees: 8,
    maxAttendees: 12,
    currentAttendees: 8,
    organizer: "Marco Rossi",
    price: {
      amount: 75,
      currency: "USD",
      refundPolicy: "Full refund up to 72 hours before the event"
    },
    topics: ["Cooking", "Italian Food", "Pasta Making"],
    guidelines: ["No experience needed", "All ingredients provided", "Bring containers for leftovers"],
    tags: ["Cooking", "Italian", "Pasta", "Food"],
    createdAt: "2024-03-22T10:00:00Z",
    updatedAt: "2024-03-22T10:00:00Z"
  },
  {
    id: "6",
    title: "Jazz in the Park",
    description: "An evening of live jazz music in the park. Bring your blankets and picnic baskets for a relaxing evening under the stars.",
    date: "2025-07-10T18:00:00Z",
    endDate: "2025-07-10T21:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Trinity Bellwoods Park",
      address: "790 Queen Street West",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6468,
        lng: -79.4118
      }
    },
    type: "Music",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",
    attendees: 200,
    maxAttendees: 500,
    currentAttendees: 200,
    organizer: "Toronto Jazz Society",
    price: {
      amount: 0,
      currency: "USD",
      refundPolicy: "Free event"
    },
    topics: ["Jazz", "Live Music", "Outdoor Events"],
    guidelines: ["Bring seating", "No glass containers", "Family friendly"],
    tags: ["Music", "Jazz", "Outdoor", "Free"],
    createdAt: "2024-03-25T10:00:00Z",
    updatedAt: "2024-03-25T10:00:00Z"
  },
  {
    id: "7",
    title: "Photography Workshop: Urban Landscapes",
    description: "Learn the art of urban landscape photography. Perfect for beginners and intermediate photographers looking to improve their skills.",
    date: "2025-07-15T14:00:00Z",
    endDate: "2025-07-15T17:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Downtown Photography Studio",
      address: "456 King Street West",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6447,
        lng: -79.3955
      }
    },
    type: "Arts",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
    attendees: 15,
    maxAttendees: 20,
    currentAttendees: 15,
    organizer: "Toronto Photography Club",
    price: {
      amount: 45,
      currency: "USD",
      refundPolicy: "Full refund up to 48 hours before the event"
    },
    topics: ["Photography", "Urban Landscapes", "Creative Arts"],
    guidelines: ["Bring your camera", "Any skill level welcome", "Outdoor walking involved"],
    tags: ["Photography", "Workshop", "Arts", "Urban"],
    createdAt: "2024-03-26T10:00:00Z",
    updatedAt: "2024-03-26T10:00:00Z"
  },
  {
    id: "8",
    title: "Social Tennis Mixer",
    description: "Join us for a fun tennis mixer! All skill levels welcome. Meet new players and enjoy some friendly matches.",
    date: "2025-07-18T10:00:00Z",
    endDate: "2025-07-18T13:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "City Tennis Club",
      address: "789 Court Avenue",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6657,
        lng: -79.3845
      }
    },
    type: "Sports",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800",
    attendees: 20,
    maxAttendees: 24,
    currentAttendees: 20,
    organizer: "Toronto Tennis Club",
    price: {
      amount: 15,
      currency: "USD",
      refundPolicy: "Full refund up to 24 hours before the event"
    },
    topics: ["Tennis", "Social Sports", "Fitness"],
    guidelines: ["Bring your racquet", "Tennis shoes required", "All levels welcome"],
    tags: ["Tennis", "Sports", "Social", "Active"],
    createdAt: "2024-03-27T10:00:00Z",
    updatedAt: "2024-03-27T10:00:00Z"
  },
  {
    id: "9",
    title: "Sunset Yoga in the Park",
    description: "End your day with a relaxing yoga session in the park. Perfect for all skill levels, with amazing city views.",
    date: "2025-07-20T19:00:00Z",
    endDate: "2025-07-20T20:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "High Park",
      address: "1873 Bloor Street West",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6465,
        lng: -79.4637
      }
    },
    type: "Wellness",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    attendees: 25,
    maxAttendees: 30,
    currentAttendees: 25,
    organizer: "Mindful Movement TO",
    price: {
      amount: 10,
      currency: "USD",
      refundPolicy: "Full refund up to 24 hours before the event"
    },
    topics: ["Yoga", "Wellness", "Outdoor Fitness"],
    guidelines: ["Bring your mat", "Wear comfortable clothing", "All levels welcome"],
    tags: ["Yoga", "Wellness", "Outdoor", "Sunset"],
    createdAt: "2024-03-28T10:00:00Z",
    updatedAt: "2024-03-28T10:00:00Z"
  }
];

// Past events
const pastEvents: Event[] = [
  {
    id: "past-1",
    title: "Winter Board Game Championship",
    description: "Our winter board game championship was a huge success! Players competed in various strategy games and built great connections.",
    date: "2024-11-15T19:00:00Z",
    endDate: "2024-11-15T22:00:00Z",
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
    status: "past",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800",
    attendees: 45,
    maxAttendees: 50,
    currentAttendees: 45,
    organizer: "Mike Chen",
    price: {
      amount: 0,
      currency: "USD",
      refundPolicy: "Full refund up to 24 hours before the event"
    },
    topics: ["Board Games", "Strategy Games", "Social Gaming"],
    guidelines: ["Fair Play", "Respect All Players", "Have Fun"],
    tags: ["Board Games", "Strategy Games", "Social Gaming", "Card Games"],
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-03-16T10:00:00Z"
  },
  {
    id: "past-2",
    title: "Spring Hiking Adventure",
    description: "We explored the beautiful trails and enjoyed the spring weather together. A great day of outdoor activity and socializing!",
    date: "2024-11-10T09:00:00Z",
    endDate: "2024-11-10T13:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Rouge Valley Trail",
      address: "303 Valley Road",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6582,
        lng: -79.3872
      }
    },
    type: "Outdoors",
    privacy: "public",
    status: "past",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    attendees: 25,
    maxAttendees: 30,
    currentAttendees: 25,
    organizer: "Sarah Martinez",
    price: {
      amount: 0,
      currency: "USD",
      refundPolicy: "Full refund up to 24 hours before the event"
    },
    topics: ["Hiking", "Outdoors", "Nature"],
    guidelines: ["Wear proper footwear", "Bring water", "Be prepared for weather"],
    tags: ["Hiking", "Outdoors", "Nature", "Active"],
    createdAt: "2024-02-10T10:00:00Z",
    updatedAt: "2024-03-11T10:00:00Z"
  },
  {
    id: "past-3",
    title: "Creative Writing Workshop",
    description: "An engaging workshop where participants shared their writing and received constructive feedback from fellow writers.",
    date: "2024-11-05T18:30:00Z",
    endDate: "2024-11-05T20:30:00Z",
    location: "Toronto, ON",
    venue: {
      name: "City Library",
      address: "404 Book Street",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6592,
        lng: -79.3882
      }
    },
    type: "Arts",
    privacy: "public",
    status: "past",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    attendees: 15,
    maxAttendees: 15,
    currentAttendees: 15,
    organizer: "Emily Brooks",
    price: {
      amount: 20,
      currency: "USD",
      refundPolicy: "Full refund up to 48 hours before the event"
    },
    topics: ["Writing", "Creative", "Workshop"],
    guidelines: ["Bring writing materials", "Be ready to share", "Be supportive"],
    tags: ["Writing", "Creative", "Workshop", "Arts"],
    createdAt: "2024-02-05T10:00:00Z",
    updatedAt: "2024-03-06T10:00:00Z"
  }
];

// My events (includes both upcoming and past events)
const myEvents: Event[] = [
  {
    id: "my-1",
    title: "Tech Talk: Future of AI",
    description: "Join us for an engaging discussion about the future of AI and its impact on our daily lives. Industry experts will share their insights and predictions.",
    date: "2025-06-15T18:00:00Z",
    endDate: "2025-06-15T20:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Innovation Hub",
      address: "789 Tech Avenue",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6532,
        lng: -79.3832
      }
    },
    type: "Tech",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    attendees: 75,
    maxAttendees: 100,
    currentAttendees: 75,
    organizer: "Tech Community TO",
    price: {
      amount: 0,
      currency: "USD",
      refundPolicy: "Free event"
    },
    topics: ["Technology", "AI", "Innovation"],
    guidelines: ["Bring your questions", "Be respectful", "Network"],
    tags: ["Tech", "AI", "Professional", "Networking"],
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "my-2",
    title: "Community Garden Workshop",
    description: "Learn sustainable gardening practices and help maintain our community garden. Perfect for beginners and experienced gardeners alike!",
    date: "2025-06-22T10:00:00Z",
    endDate: "2025-06-22T12:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "Community Garden Center",
      address: "456 Green Street",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6472,
        lng: -79.3822
      }
    },
    type: "Workshop",
    privacy: "public",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800",
    attendees: 20,
    maxAttendees: 25,
    currentAttendees: 20,
    organizer: "Green TO",
    price: {
      amount: 10,
      currency: "USD",
      refundPolicy: "Full refund up to 24 hours before the event"
    },
    topics: ["Gardening", "Sustainability", "Community"],
    guidelines: ["Wear comfortable clothes", "Tools provided", "All levels welcome"],
    tags: ["Gardening", "Workshop", "Sustainability", "Community"],
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z"
  },
  {
    id: "my-past-1",
    title: "Photography Walk: Urban Architecture",
    description: "A successful photography walk through Toronto's most iconic architectural landmarks. Great shots and connections were made!",
    date: "2024-03-15T14:00:00Z",
    endDate: "2024-03-15T17:00:00Z",
    location: "Toronto, ON",
    venue: {
      name: "City Hall",
      address: "100 Queen Street West",
      city: "Toronto, ON",
      coordinates: {
        lat: 43.6532,
        lng: -79.3832
      }
    },
    type: "Arts",
    privacy: "public",
    status: "past",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    attendees: 30,
    maxAttendees: 35,
    currentAttendees: 30,
    organizer: "Toronto Photography Club",
    price: {
      amount: 0,
      currency: "USD",
      refundPolicy: "Free event"
    },
    topics: ["Photography", "Architecture", "Urban Exploration"],
    guidelines: ["Bring your camera", "Comfortable walking shoes", "All skill levels"],
    tags: ["Photography", "Architecture", "Arts", "Walking Tour"],
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-03-16T10:00:00Z"
  }
];

// Export all events arrays
export const allEvents: Event[] = [...upcomingEvents, ...pastEvents];
export { upcomingEvents, pastEvents, myEvents }; 