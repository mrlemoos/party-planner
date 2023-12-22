class FileUploadEvent {
  constructor(
    /**
     * The meta data of the files that were uploaded.
     */
    public readonly meta: {
      /**
       * The file that was uploaded.
       */
      file: File
      /**
       * The filename of the file that was uploaded.
       */
      filename: string
      /**
       * The last modified date of the file that was uploaded.
       */
      lastModified: number
      /**
       * The size of the file that was uploaded.
       */
      size: number
      /**
       * The MIME type of the file that was uploaded.
       */
      fileType: string
    }[],
    /**
     * Boolean that indicates the upload was interrupted because the {@link FileList} is `null`.
     */
    public readonly isInterrupted: boolean,
  ) {}
}

export default FileUploadEvent
