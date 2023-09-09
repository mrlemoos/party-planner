import { cookies } from "next/headers";

export default function getSessionToken() {
  return cookies().get("__session")?.value;
}
