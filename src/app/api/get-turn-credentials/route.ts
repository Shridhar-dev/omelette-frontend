import { NextResponse } from 'next/server';

export async function GET() {
  // Here you would typically generate time-limited credentials for your TURN server
  // This is just a placeholder
  return NextResponse.json({
    urls: process.env.TURN_SERVER_URL,
    username: process.env.TURN_SERVER_USERNAME,
    credential: process.env.TURN_SERVER_PASSWORD
  });
}