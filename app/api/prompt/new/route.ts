import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { connect } from '@/utils/database';
import Prompt from '@/models/prompt';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connect();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag
    })
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201
    })
  } catch (error) {
    return new Response('Failed to create prompt', { status: 500 });
  }

}