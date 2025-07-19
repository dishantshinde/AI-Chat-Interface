🚀 AI Chat App (Next.js)
This is a Next.js project bootstrapped with create-next-app. It’s a fully-featured AI chat application with streaming capabilities and a dynamic user interface.

✨ Features
⚡ Real-time AI Responses using Server-Sent Events (SSE)

💬 Chat Conversations with persistent message history

➕ Create New Chats seamlessly

📂 View & Select Past Chats

♻️ Auto-refresh chat list

🧠 Dynamic Chat Interface with Markdown rendering

🧹 Clean & Organized File Structure

📱 Responsive & Accessible UI

🔄 Auto-scroll to latest messages

📁 Project Structure

/app  
├── /api  
│ ├── /chat → Create a new chat  
│ ├── /chats → Fetch all chats  
│ ├── /chats/[id] → Fetch a particular chat by ID  
│ ├── /chats/[id]/messages → Add a new message to a specific chat  
│ └── /ollama → Stream assistant response from Ollama

├── /components  
│ ├── ChatArea.tsx → Renders list of messages in current chat  
│ ├── InputBox.tsx → Input field + Send/Stop button  
│ ├── Message.tsx → Renders an individual message  
│ ├── Sidebar.tsx → Layout for chat navigation and "New Chat"  
│ └── ChatList.tsx → Displays chat previews in Sidebar

└── page.tsx → Main entry point (renders Sidebar + ChatArea)

🧪 Tech Stack
Next.js 14 (App Router)

React + TypeScript

Tailwind CSS

Streaming API with fetch + ReadableStream

React Markdown for rendering assistant messages

⚙️ Getting Started
Install dependencies:

npm install

# or

yarn install

# or

pnpm install

# or

bun install
Run the development server:

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
Open http://localhost:3000 in your browser.

🧰 Key Commands
npm run dev — Start development server

npm run build — Create production build

npm start — Start production server

🌐 Deployment
You can deploy this app on platforms like:

Vercel

Render

Netlify

Refer to the Next.js deployment docs for more details.

📚 Resources
Next.js Documentation

React Markdown

ReadableStream + fetch API

👨‍💻 Author
Dishant Shinde — Built with ❤️ for learning and showcasing AI chat functionality.
