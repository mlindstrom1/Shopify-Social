export interface Location {
  address: string
  city: string
  state?: string
  country: string
  postalCode: string
  coordinates: {
    lat: number
    lng: number
  }
  timezone: string
  formattedAddress: string
} 