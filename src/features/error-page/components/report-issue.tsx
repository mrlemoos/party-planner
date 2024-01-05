import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

/**
 * The URL that redirects the user to the GitHub issue page.
 */
const OPEN_ISSUE_ON_GITHUB_URL = 'https://github.com/mrlemoos/party-planner/issues/new' as const

/**
 * The component that renders the unit of the UI responsible for providing easy access to the GitHub issue page.
 */
function ReportIssue(): JSX.Element {
  return (
    <span className='mt-[40%] flex items-center text-foreground/70'>
      We&apos;d appreciate if you report this issue on&nbsp;
      <Link
        href={OPEN_ISSUE_ON_GITHUB_URL}
        target='_blank'
        className='flex items-center gap-1 text-sky-500 underline underline-offset-2'
      >
        GitHub
        <GitHubLogoIcon width={20} height={20} aria-hidden='true' className='text-foreground' />
      </Link>
    </span>
  )
}

export default ReportIssue
