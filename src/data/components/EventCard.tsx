import { ArrowRight, CalendarDays, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Event } from "../../types/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold">
          {event.category}
        </span>

        <button
          type="button"
          aria-label={`Add ${event.title} to favourites`}
          className="absolute right-4 top-4 rounded-full bg-black/50 p-2 backdrop-blur transition hover:bg-black/80"
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="p-5">
        <p className="text-sm font-medium text-blue-400">
          {event.organizer}
        </p>

        <h2 className="mt-2 text-xl font-bold text-white">
          {event.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
          {event.description}
        </p>

        <div className="mt-5 space-y-2 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {formattedDate}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {event.location}
          </div>
        </div>

        <Link
            to={`/events/${event.id}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15"
        >
            View details
            <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}