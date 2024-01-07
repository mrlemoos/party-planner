namespace NodeJS {
  interface ProcessEnv {
    /**
     * The URL to access the Edge Config for the project.
     */
    readonly EDGE_CONFIG: string
    /**
     * @ignore
     */
    readonly VERCEL: '1'
    /**
     * The Vercel environment that the project is deployed to. It is automatically set by Vercel at build time in the
     * pipeline.
     */
    readonly VERCEL_ENV: 'production' | 'preview' | 'development'
    /**
     * @ignore
     */
    readonly VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_COMMIT_AUTHOR_NAME: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_COMMIT_MESSAGE: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_COMMIT_REF: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_COMMIT_SHA: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_PREVIOUS_SHA: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_PROVIDER: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_PULL_REQUEST_ID: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_REPO_ID: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_REPO_OWNER: string
    /**
     * @ignore
     */
    readonly VERCEL_GIT_REPO_SLUG: string
    /**
     * @ignore
     */
    readonly VERCEL_URL: string
    /**
     * The URL of the Clerk project that the project uses for the sign up page.
     */
    readonly NEXT_PUBLIC_CLERK_SIGN_UP_URL: string
    /**
     * The URL of the Clerk project that the project uses for the sign in page.
     */
    readonly NEXT_PUBLIC_CLERK_SIGN_IN_URL: string
    /**
     * The URL of the Clerk project after the user signs up.
     */
    readonly NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string
    /**
     * The URL of the Clerk project after the user signs in.
     */
    readonly NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string
    /**
     * The Clerk secret key.
     */
    readonly CLERK_SECRET_KEY: string
    /**
     * The public key of the Clerk project that the project uses for authentication.
     */
    readonly NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
    /**
     * The PRIVATE key of the Clerk project that the project uses for authentication.
     */
    readonly CLERK_SECRET_KEY: string
    /**
     * The URL of the PostgreSQL database for the project.
     */
    readonly POSTGRES_URL: string
    /**
     * The URL of the PostgreSQL database for the project that is used by the Prisma ORM.
     */
    readonly POSTGRES_PRISMA_URL: string
    /**
     * The non-pooling URL of the PostgreSQL database for the project.
     */
    readonly POSTGRES_URL_NON_POOLING: string
    /**
     * The username of the PostgreSQL database for the project.
     */
    readonly POSTGRES_USER: string
    /**
     * The host of the PostgreSQL database for the project.
     */
    readonly POSTGRES_HOST: string
    /**
     * The password of the PostgreSQL database for the project.
     */
    readonly POSTGRES_PASSWORD: string
    /**
     * The database name of the PostgreSQL database for the project.
     */
    readonly POSTGRES_DATABASE: string
    /**
     * The URL for the Supabase project that the project uses for the database.
     */
    readonly NEXT_PUBLIC_SUPABASE_URL: string
    /**
     * The public key of the Supabase project that the project uses for the database.
     */
    readonly NEXT_PUBLIC_SUPABASE_PUBLIC_API_KEY: string
    /**
     * The [NextJS](https://nextjs.org) environment variable that contains the URL of the Vercel deployment for the
     * project. It is automatically set by Vercel at build time in the pipeline.
     *
     * This variable shall not have the HTTP/HTTPS protocol (i.e. `http://` or `https://`) prefix on the development
     * environment because Vercel does not inject the protocol at build time into this variable.
     *
     * @see https://vercel.com/docs/environment-variables#system-environment-variables
     *
     * @example "localhost:3000"
     * @example "party-planner.mrlemoos.dev"
     */
    readonly NEXT_PUBLIC_VERCEL_URL: string
  }
}
