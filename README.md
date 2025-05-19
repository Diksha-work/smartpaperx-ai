
# SmartQPX AI - AI-Powered Question Paper Generation Platform
---

## 📘 Project Overview

SmartQPX AI is an innovative, AI-powered educational platform designed to transform the question paper creation process by leveraging artificial intelligence to generate personalized educational content. The platform streamlines the traditionally time-consuming task of creating high-quality assessment materials, allowing educators to focus more on teaching and less on administrative work.

The core mission of SmartQPX AI is to make education more efficient and adaptive to individual learning needs. Through intelligent content generation, the platform helps students and educators create customized educational materials that align with specific learning objectives, curriculum standards, and difficulty levels.

The platform is particularly valuable for educational institutions, individual educators, and students preparing for exams who need reliable practice materials tailored to specific subjects and cognitive complexity levels.

---

## 🧠 Technologies Used

### Frontend
- **React** – JavaScript library for building user interfaces with component-based architecture
- **TypeScript** – Static typing for enhanced code quality and developer experience
- **React Router** – Declarative routing for navigation between different features
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development
- **shadcn/ui** – Component library based on Radix UI for accessible UI elements
- **Lucide React** – Clean and modern icon library for consistent visual elements

### AI Integration
- **DeepSeek Prover V2** – Advanced AI model optimized for academic content generation
- **OpenRouter API** – Gateway for accessing specialized AI models
- **Local Question Paper API** – Custom API for specialized question paper generation

### Document Generation
- **jsPDF** – PDF generation library for exporting educational materials
- **html2canvas** – Library to capture HTML content for high-fidelity PDF conversion

### State Management
- **React Query** – Data fetching, caching and state management library

### Authentication
- **Firebase Authentication** – User authentication and account management

### Build Tools
- **Vite** – Modern frontend build tool for faster development
- **SWC** – Fast JavaScript/TypeScript compiler for optimized builds

---

## ✨ Key Features

### 1. Question Paper Generator
Generates specialized question papers for various subjects with configurable parameters:
- **Subject Selection**: Choose from Data Science, DBMS, and Computer Networks
- **Question Count**: Set the exact number of questions needed
- **Cognitive Complexity**: Configure the distribution across Bloom's Taxonomy levels (remember, understand, apply, analyze, evaluate, create)
- **Custom Formatting**: Question papers follow standard academic formats
- **Download Options**: Export directly to PDF format

### 2. Content Generator
Creates structured educational content from user-provided topics or prompts:
- **Topic-Based Generation**: Enter any educational topic to receive comprehensive content
- **Structure Control**: Generate content with headings, subheadings, and organized sections
- **Academic Rigor**: Content follows educational standards with proper citations
- **Multiple Formats**: Generate lecture notes, handouts, or supplementary materials

### 3. Quiz Generator
Builds custom quizzes with multiple question types based on specific learning goals:
- **Multiple Question Types**: Generate MCQs, true/false, short answer, and essay questions
- **Difficulty Settings**: Adjust complexity level to match student abilities
- **Answer Keys**: Automatically includes correct answers and explanations
- **Topic Focusing**: Target specific subtopics within a broader subject area

### 4. E-learning Materials
Creates guided learning roadmaps and subject breakdowns to facilitate self-study:
- **Learning Paths**: Step-by-step guides for mastering new subjects
- **Resource Recommendations**: Suggested books, articles, videos, and online courses
- **Progress Tracking**: Milestones to mark learning advancement
- **Prerequisite Mapping**: Identifies foundational knowledge needed before advancing

### 5. AI Notes Generator
Summarizes complex content into clear, concise notes optimized for study:
- **Text Summarization**: Convert lengthy materials into focused study notes
- **Key Point Extraction**: Identify and highlight crucial information
- **Visual Organization**: Structured with bullets, numbering, and emphasis
- **Revision-Friendly**: Formatted for effective review and memorization

### 6. Flashcard Generator
Creates flashcards in Q&A format for effective review and memorization:
- **Automated Creation**: Convert any topic into ready-to-use flashcards
- **Spaced Repetition Format**: Designed for optimal memory retention
- **Concept Focusing**: Each flashcard targets one specific concept or fact
- **Balanced Difficulty**: Mixture of recall and application-based questions

### 7. Diagram Generation
Creates visual diagrams using Mermaid syntax based on user descriptions:
- **Text-to-Diagram Conversion**: Convert text descriptions into visual diagrams
- **Multiple Diagram Types**: Support for flowcharts, sequence diagrams, class diagrams, etc.
- **Interactive Editing**: Modify generated diagram code for customization
- **Visual Learning Support**: Enhance understanding of complex concepts through visualization

### 8. PDF Export
Export all generated content in clean, professionally formatted downloadable PDFs:
- **Consistent Formatting**: Professional document layout
- **Resource Preservation**: Maintains all content, formatting and diagrams
- **Sharing Ready**: Documents prepared for immediate distribution
- **Device Compatibility**: Works across all devices with PDF support

---

## 🤖 How AI Integration Works

1. **User Input Collection**: User submits a prompt/request with specific parameters
2. **Request Processing**: System formats the request for the appropriate AI model
3. **AI Generation**: DeepSeek Prover V2 generates content specific to the educational feature
4. **Post-Processing**: System formats and structures the AI response for optimal presentation
5. **Rendering**: Output is displayed in the user interface with options for further customization
6. **Export Options**: Generated content can be downloaded in PDF format

Each tool uses specialized prompting techniques to guide the AI toward producing high-quality educational content appropriate for the specific feature's requirements.

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

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account (for authentication)
- Access to question paper generation API

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/smartqpx-ai.git
cd smartqpx-ai
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure Firebase Authentication**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication service with Email/Password provider
   - Copy your Firebase configuration details
   - Update the Firebase configuration in `src/lib/firebase.ts`

4. **Configure API Access**
   - Ensure you have access to the question paper generation API
   - The API endpoint is configured in `src/utils/questionPaperApiUtils.ts`

5. **Start development server**
```bash
npm run dev
# or
yarn dev
```

### API Integration

The SmartQPX AI platform integrates with a specialized question paper generation API:

1. **API Configuration**:
   - The API is configured to handle subject-specific question generation
   - It accepts parameters for subject, question count, and cognitive complexity levels
   - API endpoint is defined in `src/utils/questionPaperApiUtils.ts`

2. **Running a Local API Server (Optional)**:
   - If you have access to the API source code, you can run a local instance
   - Follow the API repository's instructions for local deployment
   - Update the `API_BASE_URL` in `questionPaperApiUtils.ts` to point to your local server

3. **Deploying the API**:
   - For production, deploy the API to a reliable hosting service
   - Options include AWS Lambda, Google Cloud Functions, or traditional server hosting
   - Update the production API endpoint in the configuration

4. **API Security**:
   - Implement proper authentication if deploying publicly
   - Consider rate limiting to prevent abuse
   - Monitor API usage and performance

---

## 🔐 Authentication

SmartQPX AI uses Firebase Authentication for user management, providing:
- Email/password registration and login
- Password reset functionality
- Protected routes for authenticated users
- User profile management

---

## 🚀 Deployment

### Frontend Deployment
1. Build the production version of the application:
```bash
npm run build
# or
yarn build
```

2. Deploy the contents of the `dist` folder to your hosting service of choice:
   - Vercel, Netlify, and Firebase Hosting are good options
   - Configure environment variables on your hosting platform
   - Set up any required redirects for the single-page application

### API Deployment
1. Deploy your question paper generation API to a suitable hosting service
2. Update the API endpoint in your production environment
3. Set up proper CORS configuration to allow requests from your frontend domain
4. Implement monitoring and logging for the API service

---

## 🙏 Acknowledgments
- DeepSeek Prover V2 for advanced AI capabilities
- OpenRouter for specialized AI model access
- shadcn/ui for the component library
- Tailwind CSS for fast and responsive styling
- React & TypeScript communities for extensive documentation
- Firebase for authentication infrastructure
- All contributors who made this project possible

---

> © 2024 SmartQPX AI. All rights reserved.
