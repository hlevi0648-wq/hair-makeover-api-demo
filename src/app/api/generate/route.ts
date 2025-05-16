import { OUTPUT_RATIO } from '@/constants';
import { runwayApiRequest } from '@/lib/runway-api';
import { withApiAuth } from '@/middleware/api-auth';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_PROMPT = 'IMG_1 with IMG_2 hair style';

async function generateHandler(req: NextRequest, _: unknown, apiKey: string) {
  try {
    const { userImage, hairstyleImage, prompt } = await req.json();

    const promptText = prompt || DEFAULT_PROMPT;

    if (!promptText || !userImage || !hairstyleImage) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt, userImage, or hairstyleImage' },
        { status: 400 }
      );
    }

    const data = await runwayApiRequest('/v1/text_to_image', apiKey, {
      method: 'POST',
      body: {
        promptText,
        ratio: OUTPUT_RATIO,
        model: 'gen4_image',
        referenceImages: [
          {
            uri: userImage,
          },
          {
            uri: hairstyleImage,
          },
        ],
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const POST = withApiAuth(generateHandler);
