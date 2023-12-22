/**
 * Copyright (c) Planria.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in the LICENSE file in the root directory of
 * this source tree.
 *
 * @license Apache-2.0
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'

/**
 * The string that corresponds to the directory where the source files are located.
 */
const SOURCE_DIR = 'src' as const

/**
 * The string that corresponds to the directory where the test files are located.
 */
const COPYRIGHT_HEADER = `/*
  * Copyright (c) Planria.
  *
  * This source code is licensed under the Apache License, Version 2.0 found in
  * the LICENSE file in the root directory of this source tree.
  *
  * @license Apache-2.0
  */
` as const

/**
 * The object that corresponds to the configuration of the {@link readdir}, {@link readFile}, and {@link writeFile}
 * functions.
 */
const UNIVERSAL_FILE_CONFIGURATION = {
  encoding: 'utf-8',
} as const

const SOURCE_FILE_EXT = ['.ts', '.tsx'] as const

/**
 * Function that validates whether or not the given filename is a {@link SOURCE_FILE_EXT | source file}.
 */
function isSourceFile(file: string): boolean {
  return SOURCE_FILE_EXT.some((ext) => file.endsWith(ext))
}

/**
 * Writes the header into the file located by the given {@link pathname} and saves the file.
 */
async function writeHeaderIntoFileAndSaveFile(pathname: string): Promise<void> {
  const header = COPYRIGHT_HEADER

  const fileContent = await readFile(pathname, UNIVERSAL_FILE_CONFIGURATION)

  const newFileContent = `${header}\n${fileContent}`

  await writeFile(pathname, newFileContent, UNIVERSAL_FILE_CONFIGURATION)
}

/**
 *
 * This function loops recursively over the files and directories located by the given {@link pathname} and appends the
 * header to the source files.
 */
async function loopRecursivelyOverFilesAndAppendHeader(pathname: string): Promise<void> {
  const files = await readdir(pathname, UNIVERSAL_FILE_CONFIGURATION)

  for (const file of files) {
    const fileOrDirectoryPathname = `${pathname}/${file}`

    const isDirectory = fileOrDirectoryPathname.endsWith('/')

    if (isDirectory) {
      await loopRecursivelyOverFilesAndAppendHeader(fileOrDirectoryPathname)
    } else if (isSourceFile(fileOrDirectoryPathname)) {
      await writeHeaderIntoFileAndSaveFile(fileOrDirectoryPathname)
    }
  }
}

/**
 * Calls the {@link loopRecursivelyOverFilesAndAppendHeader} function with the {@link SOURCE_DIR} as the initial
 * {@link pathname}.
 */
async function main() {
  await loopRecursivelyOverFilesAndAppendHeader(SOURCE_DIR)
}

main()
