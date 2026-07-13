import { NextRequest, NextResponse } from 'next/server';
import { runStartupResearch } from '../../../services/research';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, country, targetAudience, businessModel } = body;

    if (!idea) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    const report = await runStartupResearch(
      idea,
      country || 'Global',
      targetAudience || 'General',
      businessModel || 'General'
    );

    return NextResponse.json(report);
  } catch (error: any) {
    console.error('Research API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during research.' },
      { status: 500 }
    );
  }
}
