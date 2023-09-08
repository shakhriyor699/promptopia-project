import { FC } from 'react'
import { PromptCard } from '@/components'


interface IProfileProps {
  name: string
  desc: string
  data: any
  handleEdit: (prompt: any) => void
  handleDelete: (prompt: any) => void
}

const Profile: FC<IProfileProps> = ({ name, desc, data, handleEdit, handleDelete }) => {
  console.log(data);
  
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>{name} Profile</h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((prompt: any) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile