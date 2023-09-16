import { useContext, type ContextType } from "react";

import FormContext from "@root/contexts/FormContext";

export default function useFormContext<U extends object>(): ContextType<typeof FormContext> {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(
      "useFormContext(): FormContext is undefined, did you forget to wrap your component in a <FormProvider> (from @root/providers/FormProvider)?",
    );
  }

  return context;
}
