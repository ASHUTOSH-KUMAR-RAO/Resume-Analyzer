import { useState, useCallback, useRef } from 'react';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

// Utility function to format file size
const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    // Simulate upload progress
    const simulateUpload = useCallback((file: File) => {
        setIsUploading(true);
        setUploadProgress(0);
        
        const duration = 2000; // 2 seconds
        const intervals = 20;
        const incrementTime = duration / intervals;
        
        let currentProgress = 0;
        const timer = setInterval(() => {
            currentProgress += 100 / intervals;
            setUploadProgress(Math.min(currentProgress, 100));
            
            if (currentProgress >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsUploading(false);
                    setSelectedFile(file);
                    onFileSelect?.(file);
                }, 300);
            }
        }, incrementTime);
    }, [onFileSelect]);

    // Handle drag events
    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        const file = files[0];

        if (file && file.type === 'application/pdf' && file.size <= maxFileSize) {
            simulateUpload(file);
        } else {
            // Better error handling with toast-like notification
            setDragActive(false);
        }
    }, [maxFileSize, simulateUpload]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        
        if (file && file.type === 'application/pdf' && file.size <= maxFileSize) {
            simulateUpload(file);
        }
        
        // Reset input value to allow selecting same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [maxFileSize, simulateUpload]);

    const removeFile = useCallback(() => {
        setSelectedFile(null);
        setUploadProgress(0);
        onFileSelect?.(null);
    }, [onFileSelect]);

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div 
                className={`
                    relative overflow-hidden border-2 border-dashed rounded-2xl p-8 
                    transition-all duration-300 ease-out cursor-pointer
                    ${dragActive 
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-[1.02] shadow-lg' 
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }
                    ${isUploading ? 'pointer-events-none' : ''}
                `}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={!selectedFile && !isUploading ? triggerFileSelect : undefined}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="hidden"
                />
                
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 animate-pulse"></div>
                </div>

                <div className="relative space-y-6">
                    {isUploading ? (
                        <div className="text-center space-y-4">
                            {/* Upload Animation */}
                            <div className="mx-auto w-20 h-20 relative">
                                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                                <div 
                                    className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"
                                    style={{
                                        borderTopColor: 'transparent',
                                        borderRightColor: 'transparent',
                                    }}
                                ></div>
                                <div className="absolute inset-2 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Uploading your file...</p>
                                <div className="w-full max-w-xs mx-auto mt-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300 ease-out"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">{Math.round(uploadProgress)}% complete</p>
                                </div>
                            </div>
                        </div>
                    ) : selectedFile ? (
                        <div 
                            className="flex items-center justify-between p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* PDF Icon with animation */}
                            <div className="w-14 h-14  rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse">
                                <img src="/images/pdf.png" alt="pdf" />
                            </div>
                            
                            {/* File Info */}
                            <div className="flex-1 ml-4">
                                <p className="text-base font-semibold text-gray-800 truncate max-w-xs">
                                    {selectedFile.name}
                                </p>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <span>{formatSize(selectedFile.size)}</span>
                                    <span className="flex items-center gap-1 text-green-600">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Uploaded
                                    </span>
                                </p>
                            </div>
                            
                            {/* Remove Button with hover effect */}
                            <button 
                                className="group p-3 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                                onClick={removeFile}
                                type="button"
                            >
                                <svg 
                                    className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="text-center space-y-6">
                            {/* Enhanced Upload Icon with animation */}
                            <div className="mx-auto w-24 h-24 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg 
                                        className="w-12 h-12 text-blue-500" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                {dragActive && (
                                    <div className="absolute inset-0 border-4 border-blue-300 rounded-full animate-ping"></div>
                                )}
                            </div>
                            
                            <div>
                                <p className="text-xl font-semibold text-gray-700 mb-2">
                                    Drop your PDF here, or{' '}
                                    <span className="text-blue-600 hover:text-blue-700 transition-colors duration-200 underline decoration-2 underline-offset-2">
                                        browse files
                                    </span>
                                </p>
                                <p className="text-base text-gray-500">
                                    Support for PDF files up to{' '}
                                    <span className="font-medium text-gray-700">{formatSize(maxFileSize)}</span>
                                </p>
                            </div>

                            {/* Feature badges */}
                            <div className="flex flex-wrap justify-center gap-3 pt-4">
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Secure
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Fast Processing
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Drag overlay */}
                {dragActive && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center rounded-2xl">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <p className="text-xl font-bold text-blue-700">Drop it here!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploader;