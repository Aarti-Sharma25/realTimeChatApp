# App Buzz 💬

A real-time chat application built on the MERN stack, featuring live messaging via Socket.io and AI-powered features for smart replies, semantic search, and conversation summarization.

**Live Demo:** https://realtimechatapp-egu5.onrender.com/
---

## Features

### Core Chat
- Real-time one-to-one messaging using Socket.io
- JWT-based authentication (httpOnly cookies)
- Image sharing in chats via Cloudinary
- Emoji picker
- Online/offline user status
- Responsive UI (desktop + mobile)

### AI-Powered Features
- **Smart Reply Suggestions** — Generates 3 contextual reply suggestions based on recent conversation history, powered by the Gemini LLM API.
- **Semantic Message Search** — Search past messages by meaning, not just keywords, using vector embeddings and MongoDB Atlas Vector Search.
- **Chat Summarization** — Summarizes a conversation into concise bullet points on demand, useful for catching up on long chat threads.

All AI features are triggered on-demand (button click) rather than automatically, to keep API usage and cost predictable.

---

## Tech Stack

**Frontend:** React , Redux Toolkit, React Router, Tailwind CSS, Socket.io-client, Axios

**Backend:** Node.js, Express , MongoDB (Mongoose), Socket.io, JWT, Multer, Cloudinary

**AI/ML:** Google Gemini API (`gemini-3.6-flash` for generation, `gemini-embedding-001` for embeddings), MongoDB Atlas Vector Search

**Deployment:** Render (backend), MongoDB Atlas (database)

---

## Architecture

```
backend/
  config/        → DB connection, Cloudinary config, JWT token helper, embedding helper
  controllers/    → Route handlers (auth, user, message, AI)
  middlewares/   → JWT auth verification, Multer file upload
  models/        → Mongoose schemas (User, Message, Conversation)
  routes/        → API route definitions
  socket/        → Socket.io connection and event handling

frontend/
  src/components/ → React components (chat UI, message area, sidebar)
  src/redux/      → Redux slices for user and message state
```

### AI Feature Flow

**Smart Replies:** Recent conversation messages → prompt sent to Gemini → 3 suggestions returned as JSON → rendered as clickable chips.

**Semantic Search:** Each message's text is embedded (via Gemini's embedding model) and stored alongside the message document. A search query is embedded the same way, then matched against stored embeddings using MongoDB Atlas's `$vectorSearch` aggregation stage (cosine similarity).

**Summarization:** The last 20 messages of a conversation are compiled into a prompt and sent to Gemini, which returns a 3-point bullet summary.

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account (with Vector Search enabled on the `messages` collection)
- Cloudinary account
- Google Gemini API key ([Google AI Studio](https://aistudio.google.com))

### Installation

1. Clone the repo
```bash
git clone https://github.com/Aarti-Sharma25/realTimeChatApp.git
cd realTimeChatApp
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables — create a `.env` file in `backend/` with:
```
PORT=8000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

5. Set up the MongoDB Atlas Vector Search index on the `messages` collection (index name: `message_vector_index`):
```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 3072,
      "similarity": "cosine"
    }
  ]
}
```

6. Run the backend
```bash
cd backend
npm run dev
```

7. Run the frontend
```bash
cd frontend
npm run dev
```

---


## Notes

- Deployed on Render's free tier — the service spins down after inactivity, so the first request after idle time may take up to ~50 seconds.
- Vector search requires a MongoDB Atlas cluster (not a local MongoDB instance).
