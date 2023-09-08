'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Form } from '@/components'



const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })



  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          // @ts-ignore
          userId: session?.user?.id, 
        })
      })
      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type={'Create'}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt