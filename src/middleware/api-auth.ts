import { NextRequest, NextResponse } from 'next/server';

type RouteHandler<T = unknown> = (
  req: NextRequest,
  context: T,
  apiKey: string
) => Promise<NextResponse>;

export function withApiAuth<T>(
  handler: RouteHandler<T>
): (req: NextRequest, context: T) => Promise<NextResponse> {
  return async function (req: NextRequest, context: T): Promise<NextResponse> {
    // Get API key from environment variable
    const apiKey = process.env.RUNWAY_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'RUNWAY_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    // Pass the API key from environment variable to the handler
    return handler(req, context, apiKey);
  };
}
