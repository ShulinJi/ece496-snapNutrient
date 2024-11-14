import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID,
});

const ASSISTANT_ID = process.env.OPENAI_VLLM_ASSISTANT_ID as string;

async function uploadFile(base64Image: any) {
    try {
        const base64Data = base64Image.includes('base64,') 
            ? base64Image.split('base64,')[1] 
            : base64Image;

        const buffer = Buffer.from(base64Data, 'base64');
        const blob = new Blob([buffer]);
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

        const uploadedFile = await openai.files.create({
            file: file,
            purpose: 'assistants',
        });

        return uploadedFile.id;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

export async function analyzeImageWithAssistant(base64Image: any) {
    let fileId = null;
    
    try {
        fileId = await uploadFile(base64Image);
        const thread = await openai.beta.threads.create();

        await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Analyze this image and provide the results in a JSON format."
                    },
                    {
                        type: "image_file",
                        image_file: { file_id: fileId }
                    }
                ]
            }
        );

        // const run = await openai.beta.threads.runs.create(thread.id, {
        //     assistant_id: ASSISTANT_ID
        // });
        const run = await openai.beta.threads.runs.create(
            thread.id,
            { assistant_id: ASSISTANT_ID }
          );
        let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        }

        if (runStatus.status === 'failed') {
            throw new Error('Assistant run failed: ' + runStatus.last_error?.message);
        }

        const messages = await openai.beta.threads.messages.list(thread.id);
        
        // Find text content in the response
        const textContent = messages.data[0].content.find(
            content => content.type === 'text'
        );
        
        if (!textContent || textContent.type !== 'text') {
            throw new Error('No text content found in response');
        }

        let jsonResponse;
        try {
            // Access the value property of the text content
            jsonResponse = JSON.parse(textContent.text.value);
        } catch (parseError) {
            console.error('Error parsing JSON response:', parseError);
            jsonResponse = { 
                error: 'Failed to parse JSON response', 
                raw: textContent.text.value 
            };
        }

        return {
            threadId: thread.id,
            response: jsonResponse,
            status: runStatus.status
        };

    } catch (error) {
        console.error('Error in analyzeImageWithAssistant:', error);
        throw error;
    } finally {
        if (fileId) {
            try {
                await openai.files.del(fileId);
            } catch (deleteError) {
                console.error('Error deleting file:', deleteError);
            }
        }
    }
}

export default openai;