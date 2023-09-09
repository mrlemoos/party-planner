import { type JSX } from "react";

import CoverLoading from "@root/components/molecules/CoverLoading";

function CreatePartyLoading(): JSX.Element {
  return <CoverLoading isLogoMinimum={true}>Creating your party</CoverLoading>;
}

export default CreatePartyLoading;
