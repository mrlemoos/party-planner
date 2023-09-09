export default function getEnv<T extends string>(
  name: "SUPABASE_PASSWORD" | "SUPABASE_PROJECT_URL" | "SUPABASE_API_KEY" | "SERVER_URL"
): T {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value as T;
}
