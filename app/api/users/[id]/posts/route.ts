import { connect } from '@/utils/database';
import Prompt from '@/models/prompt';
import { NextApiRequest } from 'next/types';


export const GET = async (req: NextApiRequest, { params }: { params: { id: string } }) => {

  try {
    await connect()
    const prompts = await Prompt.find({ creator: params.id }).populate('creator')
    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fetch', {
      status: 500
    })
  }
}