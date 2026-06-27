import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // Optional authentication check: if GEO_AUTH_TOKEN is configured in environment variables
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.GEO_AUTH_TOKEN;
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate essential schema structure
    if (!body.business_name || !body.answer_first_summary) {
      return NextResponse.json({ error: 'Missing required GEO fields (business_name, answer_first_summary)' }, { status: 400 });
    }
    
    const filePath = path.join(process.cwd(), 'src', 'app', 'geo-assets.json');
    
    // Write JSON payload back to the data store file
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, message: 'GEO assets updated successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update GEO assets';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
