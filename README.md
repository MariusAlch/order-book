## Order Book

### How to Run

Prerequisites:

- Node.js (LTS)
- npm

Steps:

1. Install dependencies:
   npm install

2. Start the dev server:
   npm run dev

3. Open in browser:
   http://localhost:5173/

Live version:
https://698765a74df2730008410b5b--melodic-kheer-59b025.netlify.app/

---

### Technology Stack

- React
- Vite
- TypeScript
- styled-components

**Notes on choices:**

- **Vite** was chosen for fast startup, efficient HMR, and a lightweight build setup.
- **styled-components** is used for component-scoped styling and easier maintenance of a visually detailed UI. Tailwind was considered but not selected for this task.

---

### Implementation Notes

- Consumes Binance order book data via WebSocket streams.
- WebSocket connections are opened and closed on market change to prevent stale subscriptions.
- Rendering is optimized for frequent updates by minimizing state changes and unnecessary re-renders.

---

### Bonus Challenges

Bonus features were not implemented due to time constraints. The focus was on delivering the core requirements within the suggested time frame.
