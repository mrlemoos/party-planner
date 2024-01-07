import * as fs from 'node:fs/promises'

import { Fragment } from 'react'

import { type Metadata } from 'next'
import Link from 'next/link'

import Footer from '@root/components/ui/footer'
import InfoPanel from '@root/components/ui/info-panel'
import InfoPanelIcon from '@root/components/ui/info-panel-icon'
import Markdown from '@root/components/ui/markdown'
import NonProtectedTopBar from '@root/features/non-protected-top-bar/non-protected-top-bar'

export const metadata: Metadata = {
  title: 'Planria | What we have been doing ⏰ - Changelog',
  description: 'Point your tasks. Plan your sprint. Have fun.',
  keywords: [
    'party',
    'planner',
    'tasks',
    'sprint',
    'fun',
    'planning poker',
    'planning',
    'poker',
    'planria',
    'changelog',
  ],
}

/**
 * The name of the Changelog file.
 */
const CHANGELOG_FILENAME = 'CHANGELOG.md' as const

/**
 * The path to the {@link CHANGELOG_FILENAME | changelog file} relative to the root workspace.
 */
const DIR_PATH = `${process.cwd()}/${CHANGELOG_FILENAME}` as const

/**
 * This function reads the {@link CHANGELOG_FILENAME | changelog file} and returns its contents as a string.
 *
 * @see {@link CHANGELOG_FILENAME}
 * @see {@link DIR_PATH}
 */
async function readChangelogMarkdown() {
  const markup = await fs.readFile(DIR_PATH, 'utf-8')

  if (!markup) {
    throw new Error(`The "${CHANGELOG_FILENAME}" file is empty.`)
  }

  return markup
}

/**
 * The constant that holds the URL to the GitHub repository.
 */
const GITHUB_REPO_URL = 'https://github.com/mrlemoos/party-planner' as const

/**
 * The `Changelog` page.
 */
async function ChangelogPage(): Promise<JSX.Element> {
  const markup = await readChangelogMarkdown()

  return (
    <Fragment>
      <NonProtectedTopBar />
      <main className='container my-[10vh] min-h-screen'>
        <InfoPanel className='flex gap-6'>
          <InfoPanelIcon size={24} />
          <span>
            The Changelog is a list of all the changes that have been made to the Planria app. It is updated every time
            a new version of the app is released, linking to the corresponding commits and issues available on&nbsp;
            <Link href={GITHUB_REPO_URL} className='underline underline-offset-4 hover:text-foreground/80'>
              GitHub
            </Link>
            .
          </span>
        </InfoPanel>
        <Markdown markup={markup} />
      </main>
      <Footer />
    </Fragment>
  )
}

export default ChangelogPage
