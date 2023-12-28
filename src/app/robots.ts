import { type MetadataRoute } from 'next'

/**
 * The function that is responsible for generating the `robots.txt` file for the application according to the
 * {@link MetadataRoute.Robots} interface.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/(auth|parties|profile)',
    },
  }
}
