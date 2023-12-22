'use client'

import { Fragment, useId, type JSX } from 'react'

import Button from '@root/components/ui/button'
import Label from '@root/components/ui/label'
// import useFileSelectionController from '@root/hooks/use-file-selection-controller'
import type ScrumTicketModel from '@root/models/scrum-ticket-model'
// import readSpreadsheetToJSON from '@root/util/read-spreadsheet-to-json'

// /**
//  * The type that represents the shape of a row in the Jira issues spreadsheet.
//  */
// type JiraSpreadsheetShapeRow = [
//   /* Summary */ string,
//   /* Issue key */ string,
//   /* Issue id */ string,
//   /* Issue type */ string,
//   /* Status */ string,
//   /* Project key */ string,
//   /* Project name */ string,
//   /* Project type */ string,
//   /* Project lead */ string,
//   /* Project lead id */ string,
//   /* Project description */ string,
//   /** Project url */ string,
//   /* Priority */ string,
//   /* Resolution */ string,
//   /* Assignee */ string,
//   /* Assignee id */ string,
//   /* Reporter */ string,
//   /* Reporter id */ string,
//   /* Creator */ string,
//   /* Creator id */ string,
//   /* Created */ string,
//   /* Updated */ string,
//   /* Last Viewed */ string,
//   /* Resolved */ string,
//   /* Due date */ string,
//   /* Votes */ string,
//   /* Description */ string,
//   /* Watchers */ string,
//   /* Watchers id */ string,
// ]

interface ImportJiraIssuesSpreadsheetProps {
  /**
   * The function that will be called when the user clicks the "Import" button.
   */
  onImport: (issues: ScrumTicketModel) => Promise<void> | void
}

function ImportSpreadsheet(_props: ImportJiraIssuesSpreadsheetProps): JSX.Element {
  // POTENTIAL RISK: Both fileInputId and callToActionButtonId are used to link the label with the input. If these both
  // inputs are used to run an end-to-end test, then the test will fail because this is re-created every time the
  // component is rendered.
  const fileInputId = useId()
  const callToActionButtonId = useId()

  // /**
  //  * @internal
  //  *
  //  * Handles the selection of the given ticket registration {@link FileSelectionHandler method}. It transforms the
  //  * {@link File | file} ({@link Blob | blob}) into a {@link ScrumTicketModel | Scrum ticket model} and then it calls
  //  * the functions to register the imported tickets.
  //  */
  // const handleFileSelect = useCallback(async function (files: File[]) {
  //   const spreadsheetAsJSON = await Promise.allSettled(files.map(readSpreadsheetToJSON<JiraSpreadsheetShapeRow>))

  //   for (const spreadsheet of spreadsheetAsJSON) {
  //     for (const [summary, issueKey, issueId, issueType, status] of spreadsheet) {

  //     }
  //   }
  // }, [])

  // const { fileSelectionInput, handleFileChange, handleSelectFile, acceptFileMemoTypes } = useFileSelectionController({
  //   onFileSelect: handleFileSelect,
  // })

  return (
    <Fragment>
      <Label htmlFor={fileInputId}>Import Jira issues spreadsheet</Label>
      <input
        // ref={fileSelectionInput}
        // id={fileInputId}
        aria-labelledby={callToActionButtonId}
        type='file'
        multiple={true}
        className='hidden'
        // accept={acceptFileMemoTypes}
        // onChange={handleFileChange}
      />
      <Button
        type='button'
        // onClick={handleSelectFile}
        id={callToActionButtonId}
      >
        Import
      </Button>
    </Fragment>
  )
}

export default ImportSpreadsheet
