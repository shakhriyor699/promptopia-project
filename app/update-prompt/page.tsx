'use client'
import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { Form } from '@/components'

type Props = {}

const UpdatePrompt = (props: Props) => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`)
      const data = await res.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if (promptId) getPromptDetails()
  }, [promptId])



  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('Prompt ID not found')

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
      type={'Edit'}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt