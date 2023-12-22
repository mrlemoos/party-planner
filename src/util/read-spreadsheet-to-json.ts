import { read, utils } from 'xlsx'

/**
 * The {@link utils.sheet_to_json} function from the XLSX library.
 */
const convertSpreadsheetToJSON = utils.sheet_to_json

/**
 * The options object passed to the {@link read} function from the XLSX library.
 */
const READ_XLSX_OPTIONS = { type: 'binary' } as const

/**
 * Reads a {@link File | spreadsheet file} (CSV, XLSX, etc.) and returns a JSON object with the data typed as the
 * provided {@link T} generic type.
 */
async function readSpreadsheetToJSON<T extends unknown[]>(file: File) {
  const reader = new FileReader()

  return new Promise<T[]>(function (resolve, reject) {
    reader.onerror = function (event) {
      reject(
        new Error(
          `readSpreadsheetToJSON(): The file could not be read. See verbose object ${
            event ? JSON.stringify(event) : null
          }`,
        ),
      )
    }

    reader.onload = function (event) {
      if (!event.target) {
        reject(new Error('FileReader onload "event.target" is null. See the data passed to readSpreadsheetToJSON().'))
      }

      const data = event.target?.result

      if (!data) {
        reject(
          new Error(
            'The given file is not valid or is empty or is corrupted. See the data passed to readSpreadsheetToJSON().',
          ),
        )
      }

      const workbook = read(data, READ_XLSX_OPTIONS)

      const workSpreadsheetNames = workbook.SheetNames
      const firstSpreadsheetName = workSpreadsheetNames[0]

      const worksheet = workbook.Sheets[firstSpreadsheetName]

      const json = convertSpreadsheetToJSON<T>(worksheet)

      resolve(json)
    }

    reader.readAsArrayBuffer(file)
  })
}

export default readSpreadsheetToJSON
