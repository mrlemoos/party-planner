import Link from 'next/link'

import Blockquote from '@root/components/ui/blockquote'
import Heading from '@root/components/ui/heading'
import Paragraph from '@root/components/ui/paragraph'

import ExternalLink from './components/external-link'
import ThirdPartyPackages from './components/third-party-packages'

function AboutProject(): JSX.Element {
  return (
    <main className='mx-auto mt-20 min-h-screen max-w-[96vw] md:max-w-4xl'>
      <Heading hierarchy='h1' className='my-5 text-center md:my-24'>
        About Planria 🎉
      </Heading>
      <Blockquote className='text-3xl'>We didn&rsquo;t find the perfect planning poker app, so we built it.</Blockquote>
      <Paragraph>
        This quote is what we say when people ask us why we built Planria. But it&rsquo;s not the whole story. Our
        intention with this quote is not to say that we&rsquo;re the first people to build a planning poker app.
        We&rsquo;re not. Also, we don&rsquo;t want to say that we&rsquo;re the only people who can build a planning
        poker app. We&rsquo;re not.&nbsp;
        <b>
          And most importantly, we don&rsquo;t want to say that there aren&rsquo;t any other planning poker apps out
          there that are better than ours
        </b>
        . There might be.
      </Paragraph>
      <Paragraph>
        What we want to say is that we&rsquo;re not aware of any other planning poker app that has the features that we
        want. And that&rsquo;s why we built Planria. We built it for ourselves, and we&rsquo;re sharing it with you.
      </Paragraph>
      <Heading hierarchy='h2' className='mt-20 text-center'>
        Origin
      </Heading>
      <Paragraph>
        Planria was born inside one of the largest companies on Earth, but let&apos;s redact names for now.
      </Paragraph>
      <Paragraph>
        Planria has the idea idea behind of being a <b>plug-and-play</b> experience. We want to make it easy for you to
        start using Planria, and we want to make it easy for you to integrate Planria into your existing workflow.
      </Paragraph>
      <Heading hierarchy='h2' className='mt-20 text-center'>
        Open Source & Your Data
      </Heading>
      <Paragraph>
        <b>Our commitment to keep the project as much open source as possible</b> is a way to ensure that you can use
        Planria without any concerns about privacy or security. We want to make it easy for you to trust Planria. Also,
        we declare everything that we do with the data that you input into Planria in our&nbsp;
        <Link href='/privacy-policy' target='_blank' className='font-bold'>
          Privacy Policy
        </Link>
        &nbsp;and&nbsp;
        <Link href='/terms-of-service' target='_blank' className='font-bold'>
          Terms of Service
        </Link>
        . We know that the legal jargon can be boring, but we want to make it clear that we&rsquo;re not going to sell
        your data to anyone. We don&apos;t look at your data. We don&apos;t even know who you are. We don&apos;t want to
        know who you are.
      </Paragraph>
      <Paragraph>
        We just want to help you plan your sprint and have fun doing it (because we know that planning rituals take
        long). All of your data is stored in databases that are managed by&nbsp;
        <Link href='https://vercel.com' className='font-bold'>
          Vercel
        </Link>
        &nbsp;with all the security that they provide.
      </Paragraph>
      <Paragraph>
        Your credentials (<i>i.e.</i> your email and password) are stored in the Clerk Authentication service, which is
        managed by&nbsp;
        <Link href='https://clerk.com' className='font-bold'>
          Clerk
        </Link>
        &nbsp;and is secured by them as you may find in their&nbsp;
        <Link href='https://clerk.com/privacy' className='font-bold'>
          Privacy Policy
        </Link>
        and&nbsp;
        <Link href='https://clerk.com/terms'>Terms & Conditions</Link>
        &nbsp;official documentation.
      </Paragraph>
      <ul className='ml-6 list-disc'>
        <li>
          <ExternalLink href='https://vercel.com/legal/privacy-policy'>Vercel&apos;s Privacy Policy</ExternalLink>
        </li>
        <li>
          <ExternalLink href='https://vercel.com/docs/storage/vercel-postgres'>Vercel Postgres</ExternalLink>
        </li>
      </ul>
      <Heading hierarchy='h3' className='mt-16 text-center'>
        Technologies we use
      </Heading>
      <div className='flex flex-wrap items-center justify-center gap-1'>
        <ExternalLink href='https://nextjs.org'>
          Next.js&nbsp;<span className='text-gray-500'>| The React Framework</span>
        </ExternalLink>
        <ExternalLink href='https://react.dev'>
          React.js&nbsp;<span className='text-gray-500'>| A JavaScript library for building user interfaces</span>
        </ExternalLink>
        <ExternalLink href='https://tailwindcss.com'>
          TailwindCSS&nbsp;
          <span className='text-gray-500'>| Rapidly build modern websites without ever leaving your HTML.</span>
        </ExternalLink>
        <ExternalLink href='https://typescriptlang.org'>
          TypeScript&nbsp;<span className='text-gray-500'>| TypeScript is JavaScript with syntax for types.</span>
        </ExternalLink>
        <ExternalLink href='https://cva.style'>Class Variance Authority</ExternalLink>
        <ExternalLink href='https://uishadcn.com'>
          shadcn/ui&nbsp;
          <span className='text-gray-500'>| Beautifully designed components built with Radix UI and Tailwind CSS.</span>
        </ExternalLink>
        <ExternalLink href='https://clerk.com'>
          Clerk&nbsp;<span className='text-gray-500'>| More than authentication. Complete user management.</span>
        </ExternalLink>
      </div>
      <Heading hierarchy='h3' className='mt-16 text-center'>
        Third Party Dependencies
      </Heading>
      <ThirdPartyPackages />
    </main>
  )
}

export default AboutProject
