// app/api/analyze-image/route.js
import { analyzeImageWithAssistant } from '@/lib/openai';

export async function POST(req: Request) {
    try {
        const { image } = await req.json();
        
        if (!image) {
            return Response.json(
                { error: 'No image provided' },
                { status: 400 }
            );
        }

        // Basic validation
        if (!image.startsWith('data:image/')) {
            return Response.json(
                { error: 'Invalid image format' },
                { status: 400 }
            );
        }

        const result = await analyzeImageWithAssistant(image);
        
        return Response.json(result);
        
    } catch (error: any) {
        console.error('Error processing request:', error);

        // Handle specific errors
        if (error.message.includes('file too large')) {
            return Response.json(
                { error: 'Image file size too large' },
                { status: 413 }
            );
        }

        if (error.message.includes('billing')) {
            return Response.json(
                { error: 'API billing error' },
                { status: 402 }
            );
        }

        return Response.json(
            { error: 'Failed to analyze image' },
            { status: 500 }
        );
    }
}