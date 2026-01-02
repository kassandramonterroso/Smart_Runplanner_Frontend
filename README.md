
---

# Smart Run Planner — Frontend

```md
# Smart Run Planner – Frontend

The Smart Run Planner frontend is a React application that allows users to receive personalized running suggestions based on their availability, goals, and daily readiness.

It serves as the user-facing layer for interacting with the Smart Run Planner backend.

---

## Features

- Request run suggestions from the backend
- Display daily recommendations
- Simple, focused UI for quick decision-making
- Designed to evolve into a full weekly planner dashboard

---

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- Fetch API
- CSS

---

## Backend Integration

The frontend communicates with the backend via REST APIs.

Example:
```js
fetch("http://localhost:8080/api/suggestion")
