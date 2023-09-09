import { SignUp } from "@clerk/nextjs/app-beta";

import AuthPage from "@root/components/organisms/AuthPage";

export default function SignUpPage(): JSX.Element {
  return (
    <AuthPage>
      <SignUp />
    </AuthPage>
  );
}
