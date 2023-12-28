import { type MetadataRoute } from 'next'

/**
 * The Next.js special function that is responsible for generating the `sitemap.xml` file for the website, according to
 * the {@link MetadataRoute.Sitemap}. This function is called by Next.js during the build process.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://planria.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://planria.com/contact-us',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://planria.com/about-project',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]
}
