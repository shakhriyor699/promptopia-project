import { connect } from '@/utils/database';
import Prompt from '@/models/prompt';
import { NextApiRequest } from 'next/types';


export const GET = async () => {

  try {
    await connect()

    const prompts = await Prompt.find({}).populate('creator')
    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fetch', {
      status: 500
    })
  }
}