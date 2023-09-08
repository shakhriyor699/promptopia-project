'use client';
import { useState, useEffect, FC } from 'react'
import { PromptCard } from '@/components';

interface IPromptCardListProps {
  data: any,
  handleTagClick: (tagName: string) => void
}

const PromptCardList: FC<IPromptCardListProps> = ({ data, handleTagClick }) => {


  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt: any) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setsearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [posts, setPosts] = useState([])



  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setsearchTimeout(
      // @ts-ignore
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value)
        setSearchResults(searchResults)
      }, 500)
    )
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json();

      setPosts(data)
    }
    fetchPosts()
  }, [])

  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, 'i')
    return posts.filter((post: any) =>
      regex.test(post.prompt) ||
      regex.test(post.creator.username) ||
      regex.test(post.tag)
    )
  }

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName)

    const searchResults = filterPrompts(tagName)
    setSearchResults(searchResults)
  }


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='search'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={searchResults}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed