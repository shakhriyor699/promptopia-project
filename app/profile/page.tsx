'use client'

import { FC, useState, useEffect } from "react"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Profile } from "@/components"

const ProfilePage: FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      // @ts-ignore
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json();

      setPosts(data)
    }
    // @ts-ignore
    if (session?.user.id) fetchPosts()
  }, [])


  const handleEdit = (post: any) => {
    console.log(post);
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm('Are you sure?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((p: any) => p._id !== post._id)
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name={"My"}
      desc='Welcome to your personalized profile page!'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage