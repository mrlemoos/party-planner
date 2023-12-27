#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

# Cancel the build if the commit message contains "[ci skip]". This is useful when you want to skip a build for a 
# specific commit.
#
# Reference:
# https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel#with-environment-variables
if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"[ci skip]"  ]] && [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
  echo "🛑 [CANCEL BUILD STEP] The build referred by $VERCEL_GIT_COMMIT_REF has been cancelled. See commit message: \"$VERCEL_GIT_COMMIT_MESSAGE\""
  exit 0;
else
  echo "✅ [CANCEL BUILD STEP] The build referred by $VERCEL_GIT_COMMIT_MESSAGE is allowed to proceed"
  exit 1;
fi