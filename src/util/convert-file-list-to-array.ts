/**
 * Converts a {@link FileList} to an array of {@link File}.
 */
function convertFileListToArray(fileList: FileList): File[] {
  const files: File[] = []

  for (let index = 0; index < fileList.length; index++) {
    const element = fileList.item(index)

    if (!element) {
      continue
    }

    files.push(element)
  }

  return files
}

export default convertFileListToArray
