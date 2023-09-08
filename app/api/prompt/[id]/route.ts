import { connect } from '@/utils/database';
import Prompt from '@/models/prompt';
import { NextApiRequest } from 'next/types';


export const GET = async (req: NextApiRequest, { params }: { params: { id: string } }) => {

  try {
    await connect()

    const prompt = await Prompt.findById(params.id).populate('creator')
    if (!prompt) return new Response('Prompt not found', {
      status: 404
    })

    return new Response(JSON.stringify(prompt), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fetch', {
      status: 500
    })
  }
}


export const PATCH = async (req: any, { params }: { params: { id: string } }) => {
  const { prompt, tag } = await req.json();

  try {
    await connect()

    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt) return new Response('Prompt not found', {
      status: 404
    })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), {
      status: 200
    })

  } catch (error) {
    return new Response('Failed to fetch', {
      status: 500
    })
  }
}

export const DELETE = async (req: NextApiRequest, { params }: { params: { id: string } }) => {


  try {
    await connect()

    await Prompt.findByIdAndRemove(params.id)

    return new Response('Prompt deleted seccesfully', {
      status: 200
    })

  } catch (error) {
    return new Response('Failed to fetch', {
      status: 500
    })
  }
}