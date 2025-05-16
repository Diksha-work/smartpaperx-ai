
# SmartQPX AI - AI-Powered Question Paper Generation Platform
---

## 📘 Project Overview

SmartQPX AI is an innovative, AI-powered educational platform designed to transform the question paper creation process by leveraging artificial intelligence to generate personalized educational content. The platform offers a range of features including question paper generation, content generation, quiz creation, study notes, flashcards, and diagram generation to support educators and students.

The core mission of SmartQPX AI is to make education more efficient and adaptive to individual learning needs. Through intelligent content generation, the platform helps students and educators create customized educational materials that align with specific learning objectives.

---

## 🧠 Technologies Used

### Frontend
- **React** – JavaScript library for building UI
- **TypeScript** – Static typing for enhanced code quality
- **React Router** – Page routing/navigation
- **Tailwind CSS** – Utility-first CSS framework
- **shadcn/ui** – Component library based on Radix UI
- **Lucide React** – Clean and modern icon library

### AI Integration
- **Google Gemini API** – Powers the AI features
- **OpenRouter API** – Additional AI capabilities
- **Local Question Paper API** – Custom API for question paper generation

### Document Generation
- **jsPDF** – PDF generation
- **html2canvas** – Capture HTML content for PDF

### State Management
- **React Query** – For efficient data fetching and caching

### Authentication
- **Firebase Authentication** – User authentication and management

### Build Tools
- **Vite** – Frontend build tool
- **SWC** – Fast JavaScript/TypeScript compiler

---

## ✨ Key Features

### 1. Question Paper Generator
Generates specialized question papers for Data Science, DBMS, and Computer Networks with configurable difficulty levels.

### 2. Content Generator
Creates structured educational content from a topic or prompt.

### 3. Quiz Generator
Builds custom quizzes with multiple question types based on learning goals.

### 4. E-learning Materials
Creates guided learning roadmaps and subject breakdowns.

### 5. AI Notes Generator
Summarizes complex content into clear, concise notes.

### 6. Flashcard Generator
Creates flashcards in Q&A format for easy review.

### 7. Diagram Generation
Creates visual diagrams using Mermaid syntax based on user descriptions.

### 8. PDF Export
Export all generated content in clean, downloadable PDFs.

---

## 🤖 How AI Integration Works

1. User submits a prompt/request
2. Request sent to appropriate AI API with specific parameters
3. AI generates content specific to the feature
4. Output is rendered and available for PDF download

Each tool uses a custom approach tailored for educational use cases.

---

## 📁 Folder Structure
```
smartqpx-ai/
├── public/                  # Static files
├── src/                     # Source code
│   ├── assets/              # Static assets/images
│   ├── components/          # Reusable UI components
│   │   ├── ai/              # AI-related components
│   │   ├── auth/            # Authentication components
│   │   ├── header/          # Header components
│   │   ├── ui/              # shadcn/ui components
│   │   └── ...              # Other custom components
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Feature and static pages
│   │   ├── ContentGenerator.tsx
│   │   ├── QuestionPaperGenerator.tsx
│   │   ├── NotesGenerator.tsx
│   │   ├── FlashcardGenerator.tsx
│   │   ├── ImageGeneration.tsx
│   │   ├── LearningMaterials.tsx
│   │   └── ...
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── vite.config.ts           # Vite config
├── tailwind.config.ts       # Tailwind config
└── tsconfig.json            # TypeScript config
```

---

## 🔐 Authentication

SmartQPX AI uses Firebase Authentication for user management, providing:
- Email/password registration and login
- Password reset functionality
- Protected routes for authenticated users

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps
```bash
# Clone the repository
git clone https://github.com/yourusername/smartqpx-ai.git

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
```

---

## 🙏 Acknowledgments
- Google Gemini API for AI capabilities
- OpenRouter for advanced content generation
- shadcn/ui for the component library
- Tailwind CSS for fast and responsive styling
- React & TypeScript communities for extensive docs
- All contributors who made this project possible

---

> © 2024 SmartQPX AI. All rights reserved.
