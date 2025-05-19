

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
- **DistilBERT** – Fine-tuned model for Bloom's Taxonomy level classification
- **Gemma 2B** – Local LLM for question refinement via Ollama

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

The generator works by:
1. Taking user input for subject, question count, and BTL distribution
2. Querying a database of pre-classified questions
3. Sampling questions based on the specified distribution
4. Using an LLM to refine and format questions
5. Generating a downloadable question paper in PDF format

### 2. Content Generator
Creates structured educational content from user-provided topics or prompts:
- **Topic-Based Generation**: Enter any educational topic to receive comprehensive content
- **Structure Control**: Generate content with headings, subheadings, and organized sections
- **Academic Rigor**: Content follows educational standards with proper citations
- **Multiple Formats**: Generate lecture notes, handouts, or supplementary materials

Users simply enter a topic and the DeepSeek Prover V2 model generates structured educational content tailored to academic standards.

### 3. Quiz Generator
Builds custom quizzes with multiple question types based on specific learning goals:
- **Multiple Question Types**: Generate MCQs, true/false, short answer, and essay questions
- **Difficulty Settings**: Adjust complexity level to match student abilities
- **Answer Keys**: Automatically includes correct answers and explanations
- **Topic Focusing**: Target specific subtopics within a broader subject area

The system analyzes the topic and generates appropriate questions across different formats, adjusting difficulty levels based on user preferences.

### 4. E-learning Materials
Creates guided learning roadmaps and subject breakdowns to facilitate self-study:
- **Learning Paths**: Step-by-step guides for mastering new subjects
- **Resource Recommendations**: Suggested books, articles, videos, and online courses
- **Progress Tracking**: Milestones to mark learning advancement
- **Prerequisite Mapping**: Identifies foundational knowledge needed before advancing

Users enter a subject they want to learn, and the system creates a comprehensive roadmap with resources and milestones.

### 5. AI Notes Generator
Summarizes complex content into clear, concise notes optimized for study:
- **Text Summarization**: Convert lengthy materials into focused study notes
- **Key Point Extraction**: Identify and highlight crucial information
- **Visual Organization**: Structured with bullets, numbering, and emphasis
- **Revision-Friendly**: Formatted for effective review and memorization

Users can input lengthy educational content and receive well-structured notes that highlight key concepts and information.

### 6. Flashcard Generator
Creates flashcards in Q&A format for effective review and memorization:
- **Automated Creation**: Convert any topic into ready-to-use flashcards
- **Spaced Repetition Format**: Designed for optimal memory retention
- **Concept Focusing**: Each flashcard targets one specific concept or fact
- **Balanced Difficulty**: Mixture of recall and application-based questions

Users simply input a topic and receive a set of question-answer pairs optimized for learning and memorization.

### 7. Diagram Generation
Creates visual diagrams using Mermaid syntax based on user descriptions:
- **Text-to-Diagram Conversion**: Convert text descriptions into visual diagrams
- **Multiple Diagram Types**: Support for flowcharts, sequence diagrams, class diagrams, etc.
- **Interactive Editing**: Modify generated diagram code for customization
- **Visual Learning Support**: Enhance understanding of complex concepts through visualization

Users describe what they want to visualize, and the system generates the appropriate Mermaid syntax which renders as an interactive diagram.

### 8. PDF Export
Export all generated content in clean, professionally formatted downloadable PDFs:
- **Consistent Formatting**: Professional document layout
- **Resource Preservation**: Maintains all content, formatting and diagrams
- **Sharing Ready**: Documents prepared for immediate distribution
- **Device Compatibility**: Works across all devices with PDF support

PDF export is available for all generated content with customizable filenames.

---

## 🤖 How AI Integration Works

### Web Interface
1. **User Input Collection**: User submits a prompt/request with specific parameters
2. **Request Processing**: System formats the request for the appropriate AI model
3. **AI Generation**: DeepSeek Prover V2 generates content specific to the educational feature
4. **Post-Processing**: System formats and structures the AI response for optimal presentation
5. **Rendering**: Output is displayed in the user interface with options for further customization
6. **Export Options**: Generated content can be downloaded in PDF format

### Local Model for Question Paper Generation
The platform also includes a specialized local model pipeline for generating question papers:

1. **DistilBERT Classification**: Fine-tuned DistilBERT model classifies questions according to Bloom's Taxonomy levels
2. **Question Bank**: Pre-classified questions stored in subject-specific CSVs
3. **Sampling Algorithm**: Questions sampled based on user-defined BTL distribution
4. **Gemma 2B Refinement**: Local Gemma LLM used to refine and format questions
5. **API Integration**: Flask server exposes the model capabilities to the web interface

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

### Local Model Repository Structure
For the local model component, we recommend organizing your GitHub repository as follows:
```
smartqpx-model/
├── data/                   # Training and question data
│   ├── ds/                 # Data Science materials
│   │   ├── ds.csv          # Data Science question bank
│   │   └── ds.txt          # Data Science syllabus
│   ├── cn/                 # Computer Networks materials
│   │   ├── cn.csv          # Computer Networks question bank
│   │   └── cn.txt          # Computer Networks syllabus
│   ├── dbms/               # DBMS materials
│   │   ├── dbms.csv        # DBMS question bank
│   │   └── dbms.txt        # DBMS syllabus
│   └── ScienceQA/          # Training dataset
├── models/                 # Saved model files
│   └── distilbert_btl_classifier.pt  # Fine-tuned model
├── notebooks/              # Jupyter notebooks
│   ├── train_model.ipynb   # Model training notebook
│   └── inference.ipynb     # Inference testing notebook
├── server/                 # API server files
│   └── server-api.py       # Flask API implementation
├── requirements.txt        # Dependencies
└── README.md               # Setup instructions
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account (for authentication)
- Access to question paper generation API

### Local Development Setup (Web Application)

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

### Local Model Setup

1. **Clone the model repository**
```bash
git clone https://github.com/yourusername/smartqpx-model.git
cd smartqpx-model
```

2. **Create a virtual environment (recommended)**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Install Ollama**
   - Download and install Ollama from [ollama.ai](https://ollama.ai/)
   - Pull the Gemma model: `ollama pull gemma:2b`

5. **Prepare data directories**
   - Ensure your subject directories (ds, cn, dbms) contain the required CSV and TXT files
   - Each CSV file should have columns: Question, BTL, Marks, CO

6. **Run the local API server**
```bash
cd server
python server-api.py
```

7. **Expose the API (optional)**
   - Install ngrok: `npm install -g ngrok` or download from [ngrok.com](https://ngrok.com/)
   - Run: `ngrok http 5000`
   - Copy the forwarded URL and update it in `src/utils/questionPaperApiUtils.ts`

8. **Test the API**
   - Use a tool like Postman to test the API endpoint
   - Send a POST request to `http://localhost:5000/generate_raw_questions` with the following body:
```json
{
  "subject": "ds",
  "num_questions": 5,
  "percent_btl": {
    "1": 20,
    "2": 20,
    "3": 20,
    "4": 20,
    "5": 20,
    "6": 0
  }
}
```

### Training the Local Model (Advanced)

1. **Prepare your training data**
   - Create a CSV file with columns: Question, BTL
   - BTL should be a value from 1-6 corresponding to Bloom's Taxonomy levels

2. **Run the training script**
```bash
python train_model.py --data your_data.csv --epochs 3
```

3. **Save the model**
   - The model will be saved as `distilbert_btl_classifier.pt`
   - Move this file to the `models` directory

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
1. Deploy your question paper generation API to a suitable hosting service:
   - Options include Heroku, AWS, Google Cloud, or DigitalOcean
   - Set up a virtual machine and install the required dependencies
   - Set up a reverse proxy using Nginx or similar

2. Configure the deployed API:
   - Ensure all required data files are available on the server
   - Set up proper CORS configuration to allow requests from your frontend domain
   - Configure environment variables for security
   - Set up proper error handling and logging

3. Update the API endpoint in your production frontend:
   - Replace the development API URL with your production API URL
   - Test the integration thoroughly before final deployment

---

## 🙏 Acknowledgments
- DeepSeek Prover V2 for advanced AI capabilities
- OpenRouter for specialized AI model access
- The Ollama project for enabling local LLM deployment
- Hugging Face Transformers for providing the DistilBERT implementation
- shadcn/ui for the component library
- Tailwind CSS for fast and responsive styling
- React & TypeScript communities for extensive documentation
- Firebase for authentication infrastructure
- All contributors who made this project possible

---

> © 2024 SmartQPX AI. All rights reserved.

