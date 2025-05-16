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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return NextResponse.json(
        { error: 'Invalid Authorization header format. Expected Bearer token.' },
        { status: 401 }
      );
    }

    const apiKey = parts[1];
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is missing from Authorization header' },
        { status: 401 }
      );
    }

    // Pass the extracted API key to the handler
    return handler(req, context, apiKey);
  };
}
