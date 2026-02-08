import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Polyfill for Promise.withResolvers (required by pdfjs-dist v4.0+)
if (typeof (Promise as any).withResolvers === 'undefined') {
    // @ts-ignore
    (Promise as any).withResolvers = function () {
        let resolve, reject;
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve, reject };
    };
}

export const extractTextFromPdf = async (file: File): Promise<string> => {
    try {
        // Set worker source using Vite's resolved URL
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
            // Check if we can use the imported URL
            if (typeof pdfWorker === 'string') {
                pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
            } else {
                // Fallback to CDN if local worker resolution failed
                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
            }
        }
        console.log("PDF Worker set to:", pdfjsLib.GlobalWorkerOptions.workerSrc);

        const arrayBuffer = await file.arrayBuffer();
        // Use Uint8Array for data to ensure compatibility
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            // Extract text items and join them
            // items has type TextItem | TextMarkedContent, usually we want TextItem.str
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');

            fullText += pageText + '\n';
        }

        return fullText.trim();
    } catch (error) {
        console.error("Error parsing PDF:", error);
        throw new Error("Failed to extract text from PDF");
    }
};

export const calculateATSScore = (resumeText: string, jobDescription: string) => {
    const cleanText = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, '');

    // 1. Keyword Extraction (Simple Frequency-based for now)
    const jdWords = cleanText(jobDescription).split(/\s+/).filter(w => w.length > 3);
    const resumeWords = cleanText(resumeText).split(/\s+/);

    // Remove stop words (simplified list)
    const stopWords = new Set(['this', 'that', 'with', 'from', 'have', 'what', 'which', 'will', 'your', 'their']);
    const meaningfulJdKeywords = jdWords.filter(w => !stopWords.has(w));

    // Unique keywords from JD to match against
    const uniqueJdKeywords = [...new Set(meaningfulJdKeywords)];

    let matchCount = 0;
    const matches: string[] = [];
    const missing: string[] = [];

    uniqueJdKeywords.forEach(keyword => {
        if (resumeWords.includes(keyword)) {
            matchCount++;
            matches.push(keyword);
        } else {
            missing.push(keyword);
        }
    });

    // Score calculation
    // A simplified metric: % of unique meaningful JD keywords found in resume
    // We can also weight frequency, but presence is the big one.

    let score = 0;
    if (uniqueJdKeywords.length > 0) {
        score = Math.round((matchCount / uniqueJdKeywords.length) * 100);
    }

    // Bonus for exact phrase matches (optional, keep simple for now)

    // Categorize
    const strengths = matches.slice(0, 5); // Just top 5 matched keywords
    const concerns = missing.slice(0, 5).map(w => `Missing: ${w}`); // Top 5 missing

    const summary = `Found ${matchCount} out of ${uniqueJdKeywords.length} key terms. Match rate: ${score}%.`;

    return {
        score,
        summary,
        strengths,
        concerns
    };
};
