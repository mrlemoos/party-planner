import { useCallback, useRef, type ChangeEvent as ReactChangeEvent } from 'react'

import convertFileListToArray from '@root/util/convert-file-list-to-array'

/**
 * The accepted file types for the file selection input.
 */
const ACCEPT_FILE_MEMO_TYPES =
  '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' as const

/**
 * The event handler for when a file is selected.
 */
interface FileSelectEventHandler {
  (files: File[]): void
}

/**
 * The options interface for the {@link useFileSelectionController} hook.
 */
interface UseFileSelectionControllerOptions {
  onFileSelect: FileSelectEventHandler
}

/**
 * A custom React Hook for the file selection controller. This hook is used to control the file selection in an input of
 * `file` type.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FileList
 * @see https://developer.mozilla.org/en-US/docs/Web/API/File
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
 *
 * @see {@link UseFileSelectionControllerOptions}
 * @see {@link FileSelectEventHandler}
 */
function useFileSelectionController({ onFileSelect }: UseFileSelectionControllerOptions) {
  const fileSelectionInput = useRef<HTMLInputElement>(null)

  /**
   * The event handler for when the user selects a {@link File | file}. This must be bound to the
   * {@link HTMLInputElement.onclick | `onClick`} event of the element that triggers the file selection.
   */
  const handleSelectFile = useCallback(() => {
    if (!fileSelectionInput.current) {
      throw new Error('The fileSelectionInput is not defined. See your useFileSelectionController() hook call.')
    }

    fileSelectionInput.current?.click()
  }, [])

  /**
   * The event handler that is attached to the {@link HTMLInputElement.onchange | `onChange`} event of the file
   * selection `<input />` element. This must be bound to the `onChange` event of the `<input />` element.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/change_event
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files
   */
  const handleFileChange = useCallback(
    (event: ReactChangeEvent<HTMLInputElement>) => {
      if (typeof onFileSelect !== 'function') {
        throw new Error(
          'The onFileSelect() callback is not a function. See your useFileSelectionController() hook call.',
        )
      }

      const { files: fileList } = event.target

      if (!fileList) {
        return
      }

      const files = convertFileListToArray(fileList)

      for (const file of files) {
        if (!ACCEPT_FILE_MEMO_TYPES.includes(file.type)) {
          console.warn(
            `useFileSelectionController(): The file type "${file.type}" is not accepted. See your useFileSelectionController() hook call.`,
          )
        }
      }

      onFileSelect(files)
    },
    [onFileSelect],
  )

  return {
    fileSelectionInput,
    handleSelectFile,
    handleFileChange,
    acceptFileMemoTypes: ACCEPT_FILE_MEMO_TYPES,
  }
}

export default useFileSelectionController
