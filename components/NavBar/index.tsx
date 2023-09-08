'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, FC } from 'react'
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
// @ts-ignore
import { BuiltInProviderType } from "next-auth/providers";

const Nav: FC = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)



  useEffect(() => {
    const setProvider = async () => {
      const res = await getProviders();

      setProviders(res)
    }
    setProvider()
  }, [])



  return (
    <nav className='flex justify-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' width={30} height={30} alt='logo' className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </Link>


      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>Create Post</Link>
            <button type='button' className='outline_btn' onClick={() => signOut()}>Sign Out</button>
            <Link href="/profile">
              <Image src={`${session?.user.image}`} width={37} height={37} alt='profile' className='rounded-full' />
            </Link>
          </div>
        ) : (
          <>
            {
              providers && Object.values(providers).map((provider) => (
                <button key={provider.name} type='button' className='black_btn' onClick={() => signIn(provider.id)}>Sign in</button>
              ))
            }
          </>
        )
        }
      </div>

      {/* mobile navigation */}
      <div className='sm:hidden flex relative'>
        {
          session?.user ? (
            <div className='flex'>
              <Image
                src={`${session?.user.image}`}
                width={37}
                height={37}
                alt='profile'
                className='rounded-full'
                onClick={() => setToggleDropdown(prevState => !prevState)}
              />

              {
                toggleDropdown && (
                  <div className='dropdown'>
                    <Link
                      href='/profile'
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href='/create-prompt'
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button
                      type='button'
                      onClick={() => {
                        setToggleDropdown(false)
                        signOut()
                      }}
                      className='mt-5 w-full black_btn'
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) :
            (
              <>
                {/* {
                  providers && Object.values(providers).map((provider) => (
                    <button key={provider.name} type='button' className='black_btn' onClick={() => signIn(provider.id)}>Sign in</button>
                  ))
                } */}
                <button type='button' className='black_btn' onClick={() => signIn('google')}>Sign in</button>
              </>
            )
        }
      </div>
    </nav >
  )
}

export default Nav