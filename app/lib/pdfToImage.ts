export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
        // Use local worker file - exact version match
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        pdfjsLib = lib;
        isLoading = false;
        return lib;
    });

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        console.log("Starting PDF conversion...");
        console.log("File name:", file.name, "Size:", file.size);
        
        const lib = await loadPdfJs();
        console.log("PDF.js loaded successfully:", lib);

        const arrayBuffer = await file.arrayBuffer();
        console.log("File buffer created, size:", arrayBuffer.byteLength);

        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        console.log("PDF document loaded, pages:", pdf.numPages);

        const page = await pdf.getPage(1);
        console.log("First page loaded");

        const viewport = page.getViewport({ scale: 4 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (context) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
        }

        console.log("Canvas created, starting render...");
        console.log("Canvas dimensions:", canvas.width, "x", canvas.height);

        await page.render({ canvasContext: context!, viewport }).promise;
        
        console.log("Page rendered successfully");

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        console.log("Blob created successfully, size:", blob.size);
                        
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        console.log("Image file created:", imageFile.name);

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        console.error("Failed to create blob");
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                1.0
            );
        });
    } catch (err) {
        console.error("PDF conversion detailed error:", err);
        console.error("Error type:", typeof err); 
        
        const errorMessage = err instanceof Error ? err.message : String(err);
        const errorStack = err instanceof Error ? err.stack : undefined;
        
        console.error("Error message:", errorMessage);
        if (errorStack) {
            console.error("Error stack:", errorStack);
        }
        
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${errorMessage}`,
        };
    }
}

/*
PDF Binary Data → PDF.js Parser → Page Content → Canvas Pixels → Image File

     ↑                ↑              ↑             ↑            ↑
ArrayBuffer      Decode होता      Visual बनता    Pixels में    Final Image
को access       है PDF का        है content      convert       ready!
करते हैं        structure                        होता है
*/



/* Jab bhi PDF.js update karo ya version issue aaye ,run this command in terminal
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/

*/