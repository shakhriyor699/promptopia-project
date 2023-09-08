'use client';
import React, { FC } from 'react'

import { SessionProvider } from 'next-auth/react'

interface ProviderProps {
  children: React.ReactNode,
  session: any
}

const Provider: FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}

export default Provider