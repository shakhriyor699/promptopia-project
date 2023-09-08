import '../styles/globals.css';
import { Metadata } from 'next';
import { Nav, Provider } from '@/components';

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
}

const RootLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <html lang='en'>
      <body>
        {/* @ts-ignore */}
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;