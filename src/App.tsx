import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useParams, Link } from "react-router-dom";
import { Search, Heart, MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { events } from "./data/event";
import type { Event, EventCategory } from "./types/event";

const categories: ("All" | EventCategory)[] = [
  "All",
  "Hackathon",
  "Workshop",
  "Conference",
  "Meetup",
];

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | EventCategory>("All");
  const [favourites, setFavourites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("devboard-favourites") || "[]");
  });

  const toggleFavourite = (id: string) => {
    const updated = favourites.includes(id)
      ? favourites.filter((item) => item !== id)
      : [...favourites, id];

    setFavourites(updated);
    localStorage.setItem("devboard-favourites", JSON.stringify(updated));
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold">
              D
            </div>
            <span className="text-xl font-bold">DevBoard</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Heart size={18} />
            {favourites.length} saved
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="mx-auto max-w-7xl px-5 py-12">
        <section className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Discover • Build • Connect
          </p>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Discover what's happening in tech.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-zinc-400">
            Find hackathons, workshops, conferences and developer events in
            one place.
          </p>
        </section>

        {/* SEARCH */}
        <section className="mb-8">
          <div className="relative max-w-2xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={20}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 py-4 pl-12 pr-4 outline-none transition focus:border-blue-500"
            />
          </div>
        </section>

        {/* FILTERS */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                category === item
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* RESULTS */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {category === "All" ? "Upcoming events" : category + "s"}
          </h2>

          <span className="text-sm text-zinc-500">
            {filteredEvents.length} events
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-zinc-900 p-12 text-center">
            <h3 className="text-xl font-semibold">No events found</h3>
            <p className="mt-2 text-zinc-400">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                favourite={favourites.includes(event.id)}
                onFavourite={() => toggleFavourite(event.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

interface EventCardProps {
  event: Event;
  favourite: boolean;
  onFavourite: () => void;
}

function EventCard({
  event,
  favourite,
  onFavourite,
}: EventCardProps) {
  const date = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition hover:-translate-y-1 hover:border-blue-500/40">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold">
          {event.category}
        </span>

        <button
          onClick={onFavourite}
          aria-label="Toggle favourite"
          className="absolute right-4 top-4 rounded-full bg-black/60 p-2 backdrop-blur"
        >
          <Heart
            size={18}
            className={favourite ? "fill-red-500 text-red-500" : "text-white"}
          />
        </button>
      </div>

      <div className="p-5">
        <p className="text-sm text-blue-400">{event.organizer}</p>

        <h3 className="mt-2 text-xl font-bold">{event.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
          {event.description}
        </p>

        <div className="mt-5 space-y-2 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {date}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {event.location}
          </div>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-semibold transition hover:bg-white/15"
        >
          View details
            <ArrowRight size={16} />
          </Link>
      </div>
    </article>
  );
}
function EventDetails() {
  const { id } = useParams();

  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-zinc-950 p-10 text-white">
        <h1 className="text-3xl font-bold">Event not found</h1>

        <Link
          to="/"
          className="mt-5 inline-block text-blue-400 hover:underline"
        >
          ← Back to events
        </Link>
      </div>
    );
  }

  const date = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="mx-auto max-w-5xl px-5 py-10">
        <Link
          to="/"
          className="mb-8 inline-block text-sm text-zinc-400 hover:text-white"
        >
          ← Back to events
        </Link>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
          <img
            src={event.image}
            alt={event.title}
            className="h-64 w-full object-cover sm:h-96"
          />

          <div className="p-6 sm:p-10">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold">
              {event.category}
            </span>

            <h1 className="mt-5 text-3xl font-bold sm:text-5xl">
              {event.title}
            </h1>

            <p className="mt-3 text-blue-400">{event.organizer}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/5 p-4">
                📅
                <p className="mt-2 text-sm text-zinc-400">Date</p>
                <p className="font-medium">{date}</p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                📍
                <p className="mt-2 text-sm text-zinc-400">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold">About this event</h2>

              <p className="mt-4 leading-8 text-zinc-400">
                {event.description}
              </p>
            </div>

            <a
              href={event.registrationUrl}
              className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
            >
              Register for event →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;