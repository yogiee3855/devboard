export type EventCategory =
  | "Hackathon"
  | "Workshop"
  | "Conference"
  | "Meetup";

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  location: string;
  description: string;
  image: string;
  organizer: string;
  registrationUrl: string;
}