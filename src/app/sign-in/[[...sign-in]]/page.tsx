import { SignIn } from "@clerk/nextjs/app-beta";

import AuthPage from "@root/components/organisms/AuthPage";

export default function SignInPage(): JSX.Element {
  return (
    <AuthPage>
      <SignIn />
    </AuthPage>
  );
}
