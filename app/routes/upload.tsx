import Navbar from "~/components/Navbar";
import type { Route } from "./+types/upload";
import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";

// ✅ Loader function for GET requests
export function loader({}: Route.LoaderArgs) {
  return {
    message: "Upload page loaded successfully",
  };
}

// ✅ Meta function for SEO
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Upload Resume | Resumind" },
    {
      name: "description",
      content: "Upload your resume for AI-powered analysis",
    },
  ];
}

// ✅ Fixed Upload Component
const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ❌ Fix: Remove unnecessary form.closest() - e.currentTarget is already the form
    const form = e.currentTarget;
    if (!form) return;

    const formData = new FormData(form); // ❌ Fix: Typo - FormData instead of fromData

    // ❌ Fix: Use formData.get() instead of FormData.get()
    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;

    // ✅ Validation before processing
    if (!companyName || !jobTitle || !jobDescription || !file) {
      alert('Please fill all fields and upload a resume');
      return;
    }

    // ✅ Start processing
    setIsProcessing(true);
    setStatusText("Analyzing your resume...");

    // Your form submission logic here
    console.log({
      companyName,
      jobTitle,
      jobDescription,
      file
    });

    // ✅ Simulate processing (remove this in production)
    setTimeout(() => {
      setIsProcessing(false);
      setStatusText("");
      // Handle success/error states here
    }, 3000);
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>🎯 Get Your Dream Job With AI-Powered Resume Analysis</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="Resume Scan"
                className="w-full"
              />
            </>
          ) : (
            <h2>✨ Upload Your Resume & Get Instant ATS Score + Personalized Improvement Tips</h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Target Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="e.g., Google, Microsoft, Netflix, Amazon, Tesla..."
                  id="company-name"
                  required // ✅ Add validation
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Desired Job Position</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="e.g., Senior Frontend Developer, ML Engineer, Product Manager..."
                  id="job-title"
                  required // ✅ Add validation
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Complete Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Copy & paste the full job description from the company's website. Include requirements, responsibilities, and preferred qualifications for better analysis..."
                  id="job-description"
                  required // ✅ Add validation
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Your Resume (PDF, DOC, DOCX)</label>
                <FileUploader onFileSelect={handleFileSelect}/>
              </div>

              <button 
                className="primary-button" 
                type="submit"
                disabled={isProcessing || !file} // ✅ Disable if no file or processing
              >
                {isProcessing ? (
                  <>🔄 Analyzing...</>
                ) : (
                  <>🚀 Analyze My Resume & Get ATS Score</>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;