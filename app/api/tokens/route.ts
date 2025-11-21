import { NextRequest, NextResponse } from 'next/server';
import { generateMockTokens } from '@/lib/utils/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  try {
    // Simulate network delay
    await delay(500);

    const searchParams = request.nextUrl.searchParams;
    const count = parseInt(searchParams.get('count') || '40');
    const type = searchParams.get('type') as 'new_pairs' | 'final_stretch' | 'migrated' | null;

    let tokens = generateMockTokens(count);

    // Filter by type if specified
    if (type) {
      tokens = tokens.filter(token => token.status === type);
    }

    return NextResponse.json({
      success: true,
      data: tokens,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}
