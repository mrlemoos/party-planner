import { ImageResponse } from 'next/og'

/**
 * The constant that informs Next.js to generate the `/icon.png` on the Edge runtime. Vercel takes care of the rest.
 */
export const runtime = 'edge'

/**
 * An object that corresponds to the dimensions of the app's icon. This is used by the `og:image` meta tag.
 */
export const size = {
  width: 32,
  height: 32,
}

/**
 * The constant that informs Next.js to generate a `/icon.png` route that responds with an {@link ImageResponse image}
 * of the app's icon. This is used by the `og:image` meta tag.
 */
export const contentType = 'image/png'

/**
 * The function that causes the `/icon` route to respond with an {@link ImageResponse image} of the app's icon. This is
 * generated under the hood by satori, and is used by the `og:image` meta tag.
 *
 * @see {@link https://github.com/vercel/satori}
 * @see {@link ImageResponse}
 */
export default function Icon(): ImageResponse {
  const { width, height } = size

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'serif',
          backgroundColor: '#000',
          color: '#fff',
          width: size.width,
          height: size.height,
          fontSize: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        P
      </div>
    ),
    {
      emoji: 'twemoji',
      width,
      height,
    },
  )
}
