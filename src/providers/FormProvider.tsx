"use client";

import { type ReactNode, type ReactElement } from "react";

import useForm, { type UseFormProps } from "@root/hooks/useForm";
import FormContext from "@root/contexts/FormContext";

type PickedUseFormProps<U extends object> = Pick<
  UseFormProps<U>,
  "onSubmit" | "onChange" | "validate"
>;

interface FormProviderProps<U extends object> extends PickedUseFormProps<U> {
  children: ReactNode;

  defaultValues?: Partial<U>;
}

const FormProvider = <U extends object>({
  children,
  defaultValues,
  onSubmit,
  onChange,
  validate,
}: FormProviderProps<U>): ReactElement => {
  const { handleChange, handleSubmit, isSubmitting, overrideField, reset, values, errors } =
    useForm<U>(defaultValues, {
      onSubmit,
      validate,
      onChange,
    });

  return (
    <FormContext.Provider
      value={{ handleChange, errors, handleSubmit, isSubmitting, overrideField, reset, values }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
