import RadixTable from '@root/enums/radix-table'
import ProvidedBytesIsNaNException from '@root/exceptions/provided-bytes-is-nan-exception'

/**
 * This constant contains the sufixes for file sizes in human readable format.
 */
const FILE_SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB'] as const

/**
 * The number of bytes in one kilobyte.
 */
const KILOBYTE = 1024 as const

/**
 * This function prettifies file size of given bytes number to human readable format (e.g. `1.2 MB`) and returns it.
 *
 * This function may throw an exception of type {@link ProvidedBytesIsNaNException} if the provided bytes number is not
 * a number.
 *
 * @example
 * ```ts
 * const fileSize = prettifyFileSize(123456789)
 * console.log(fileSize) // 117.74 MB
 * ```
 */
function prettifyFileSize<U>(ofBytes: U): string {
  const bytes = typeof ofBytes === 'number' ? ofBytes : parseInt(String(ofBytes), 10)

  if (Number.isNaN(bytes)) {
    throw new ProvidedBytesIsNaNException('prettifyFileSize(ofBytes)', ofBytes)
  }

  if (bytes === 0) {
    return '0 Byte'
  }

  const valueInKilobytes = Math.floor(Math.log(bytes) / Math.log(KILOBYTE))
  const integerInKilobytes = parseInt(String(valueInKilobytes), RadixTable.DECIMAL)

  const computedIndex = Math.pow(1024, integerInKilobytes)

  const floatingFileSize = parseFloat((bytes / computedIndex).toFixed(2))
  const fileSizeUnit = FILE_SIZES[integerInKilobytes]

  return `${floatingFileSize} ${fileSizeUnit}`
}

export default prettifyFileSize
