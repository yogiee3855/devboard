
The application is divided into reusable components, event data, and TypeScript type definitions.

## 🔎 User Flow

1. Browse upcoming events
2. Search for an event or keyword
3. Select a category
4. Combine search and filtering
5. Save an event to favourites
6. Open an event to view its details

## 🧠 Technical Decisions

React and TypeScript provide a component-based and type-safe frontend architecture.

Vite provides a fast development and production workflow.

Tailwind CSS is used for responsive styling.

React Router handles event detail navigation.

localStorage keeps favourite events available after refreshing the page.

## 🚀 Run Locally

```bash
git clone https://github.com/yogiee3855/devboard.git
cd devboard
npm install
npm run dev
For a production build:

```bash
npm run build