# AI Resume Analyzer - Smart Resume Analysis Tool

An intelligent resume analysis application that leverages AI to analyze, score, and provide feedback on resumes. Built with React Router 7, PDF.js, and modern web technologies.

## 🚀 Tech Stack

- **Frontend:** React 19 with React Router 7
- **Backend:** React Router Node (Full-stack framework)
- **PDF Processing:** PDF.js for resume parsing
- **Build Tool:** Vite 6 with React Router build system
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **File Upload:** React Dropzone
- **Icons:** Lucide React
- **Language:** TypeScript

## ✨ Features

- **PDF Resume Upload** - Drag & drop or click to upload resume files
- **AI-Powered Analysis** - Intelligent resume scoring and feedback
- **Resume Parsing** - Extract text and structure from PDF resumes
- **Smart Recommendations** - AI-generated suggestions for improvement
- **Real-time Analysis** - Instant feedback on resume quality
- **Modern UI** - Clean, responsive interface with smooth animations
- **File Management** - Easy file handling with dropzone interface
- **Type Safety** - Full TypeScript support throughout

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- Modern browser with PDF.js support
- AI/ML API access (for resume analysis)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ASHUTOSH-KUMAR-RAO/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   
   # Or using yarn
   yarn install
   
   # Or using pnpm
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # AI/ML API Configuration
   OPENAI_API_KEY=your-openai-api-key
   # or
   ANTHROPIC_API_KEY=your-anthropic-api-key
   
   # Application Settings
   NODE_ENV=development
   PORT=3000
   
   # CORS Settings (if needed)
   ALLOWED_ORIGINS=http://localhost:3000
   ```

4. **Type Generation**
   ```bash
   npm run typecheck
   ```

## 🚀 Running the Application

### Development Mode
```bash
# Start development server
npm run dev

# Application will be available at http://localhost:5173
```

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Preview Build
```bash
# Preview production build locally
npm run preview
```

## 📄 PDF Processing

### Supported Formats
- **PDF files** (primary format)
- **Text extraction** from PDF documents
- **Multi-page resume** support
- **Various PDF versions** compatibility

### Processing Features
- Automatic text extraction
- Structure recognition
- Section identification (experience, education, skills)
- Contact information parsing

## 🤖 AI Analysis Features

### Resume Scoring
- **Overall Score** - Comprehensive resume rating
- **Section Analysis** - Individual section scores
- **ATS Compatibility** - Applicant Tracking System optimization
- **Keyword Analysis** - Industry-specific keyword detection

### Smart Recommendations
- **Content Suggestions** - Improve resume content
- **Format Optimization** - Better structure recommendations
- **Skill Enhancement** - Missing skills identification
- **Experience Optimization** - Better experience descriptions

## 📁 Project Structure

```
ai-resume-analyzer/
├── app/
│   ├── components/       # Reusable React components
│   ├── routes/          # React Router 7 routes
│   ├── lib/             # Utility functions and configurations
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── services/        # AI and PDF processing services
│   └── styles/          # Global styles and Tailwind config
├── public/              # Static assets
├── build/               # Production build output
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── react-router.config.ts # React Router configuration
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start React Router development server |
| `build` | Build production application with React Router |
| `start` | Start production server |
| `typecheck` | Generate types and run TypeScript checks |
| `preview` | Preview production build locally |

## 🎨 UI Components

### File Upload Interface
- **Drag & Drop Zone** - Easy file upload with React Dropzone
- **File Validation** - PDF format checking
- **Upload Progress** - Visual feedback during upload
- **Error Handling** - Clear error messages

### Analysis Dashboard
- **Score Display** - Visual scoring with progress indicators
- **Feedback Sections** - Organized recommendations
- **Download Options** - Export analysis results
- **Responsive Layout** - Works on all device sizes

## 🔧 Configuration

### React Router 7 Setup
- **File-based routing** - Automatic route generation
- **Server-side rendering** - SEO-friendly pages
- **Type-safe routing** - TypeScript route definitions
- **Nested layouts** - Shared UI components

### Vite Configuration
- **Fast HMR** - Instant development updates
- **Optimized builds** - Tree-shaking and code splitting
- **TypeScript paths** - Clean import statements
- **Plugin ecosystem** - Extended functionality

## 🚀 Deployment

### Static Hosting
```bash
# Build for production
npm run build

# Deploy to:
# - Vercel
# - Netlify 
# - GitHub Pages
# - Surge.sh
```

### Server Deployment
```bash
# For server-side features
npm run build
npm run start

# Deploy to:
# - Railway
# - Render
# - DigitalOcean
# - AWS/GCP
```

## 🔐 Security & Privacy

- **Client-side Processing** - PDF parsing happens in browser
- **Secure API Calls** - Encrypted communication with AI services
- **No File Storage** - Files processed in memory only
- **Privacy First** - Resume data not permanently stored

## 📊 Performance Optimization

- **Lazy Loading** - Components load on demand
- **PDF.js Workers** - Background PDF processing
- **Code Splitting** - Optimized bundle sizes
- **Caching Strategy** - Browser caching for better performance

## 🛠️ Development Tools

- **TypeScript** - Full type safety
- **ESLint** - Code quality and formatting
- **Vite** - Fast development and building
- **React Router DevTools** - Route debugging
- **Browser DevTools** - Performance monitoring

## 📱 Usage Guide

1. **Upload Resume** - Drag PDF file or click to browse
2. **Processing** - Wait for PDF text extraction
3. **AI Analysis** - Review scoring and recommendations
4. **Download Results** - Export analysis report
5. **Iterate** - Upload improved version for comparison

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-analyzer`)
3. Commit your changes (`git commit -m 'Add new analysis feature'`)
4. Push to the branch (`git push origin feature/new-analyzer`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues
- **WebGPU not available** - Use Chrome 94+ or enable experimental features
- **PDF not loading** - Check file size and format
- **Slow analysis** - Ensure stable internet for AI API calls
- **Memory issues** - Close other tabs, restart browser

## 📝 License

This project is private and proprietary.

## 👤 Author

**Ashutosh Kumar Rao**
- GitHub: [@ASHUTOSH-KUMAR-RAO](https://github.com/ASHUTOSH-KUMAR-RAO)

## 🙏 Acknowledgments

- **MLC-AI** - For client-side AI capabilities
- **PDF.js** - For PDF processing
- **React Router** - For modern full-stack framework
- **Tailwind CSS** - For beautiful styling

---

*Analyze resumes with AI precision - Upload, Analyze, Improve* 📄🤖
