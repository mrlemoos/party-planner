import {
  type HTMLInputTypeAttribute,
  type ReactNode,
  useCallback,
  type FormEvent as ReactFormEvent,
  useReducer,
} from "react";

import FormValueNotProvidedError from "@root/errors/FormValueNotProvidedError";
import useProxy from "@root/hooks/useProxy";

// #region Internal Utility & Constants

const $boolInputTypes = ["checkbox", "radio"] as const;
const $allowedPrimitiveTypes = ["string", "number", "boolean"] as const;
const $initialFormUserFeedbackState: FormUserFeedbackState = {
  isSubmitting: false,
};

/* internal */ function $isBoolInputType(type: HTMLInputTypeAttribute): type is (typeof $boolInputTypes)[number] {
  return $boolInputTypes.includes(type as (typeof $boolInputTypes)[number]);
}

/* internal */ function $isPrimitiveTypeAllowed(
  type:
    | "string"
    | "number"
    | "boolean"
    /* not allowed 👇 */
    | "bigint"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
): type is (typeof $allowedPrimitiveTypes)[number] {
  return $allowedPrimitiveTypes.includes(type as (typeof $allowedPrimitiveTypes)[number]);
}

/* internal */ function $isPrimitiveTypeOfValueAllowed(
  value: unknown
): value is (typeof $allowedPrimitiveTypes)[number] {
  return $isPrimitiveTypeAllowed(typeof value);
}

/* internal */ function $reduceFormUserFeedbackState(
  state = $initialFormUserFeedbackState,
  { type, payload }: FormUserFeedbackAction
): FormUserFeedbackState {
  switch (type) {
    case "Set Submitting":
      return {
        ...state,
        isSubmitting: payload,
      };
    default:
      return state;
  }
}

// #endregion

// #region Types & Interfaces

export type FormValidationErrors<U extends object> = {
  [K in keyof U]?: ReactNode;
};

/* internal */ interface ValidateFunction<U extends object> {
  (values: U): {
    [K in keyof U]?: ReactNode;
  };
}

export interface FormFieldChangeEventHandler {
  <E>(event: E): boolean | void;
}

export interface UseFormProps<U extends object> {
  onChange?: FormFieldChangeEventHandler;
  validate?: ValidateFunction<U>;
  onSubmit: AsynchronousHandleSubmit<U>;
  resetAfterSubmit?: boolean;
}

export interface AsynchronousHandleSubmit<U extends object> {
  <E>(values: U, event?: E): Promise<void> | void;
}

/* internal */ interface VirtualHandleSubmitConfiguration {
  preventDefault?: boolean;
}

/* internal */ interface FormUserFeedbackState {
  isSubmitting: boolean;
}

/* internal */ type FormUserFeedbackAction = {
  type: "Set Submitting";
  payload: boolean;
};

// #endregion

export default function useForm<U extends object>(
  initialValues: Partial<U> = {},
  { onChange, validate, onSubmit, resetAfterSubmit }: UseFormProps<U>
) {
  const values = useProxy({ ...initialValues } as U);
  const errors = useProxy<FormValidationErrors<U>>({});

  const [{ isSubmitting }, controlUserFeedback] = useReducer(
    $reduceFormUserFeedbackState,
    $initialFormUserFeedbackState
  );

  const handleChange = useCallback(
    <E>(field: keyof U, value?: U[keyof U]) =>
      function $handleChangeEventListenerClosure(event: E) {
        if (typeof onChange === "function") {
          if (onChange(event) === false) {
            return;
          }
        }

        if (event && typeof event === "object" && "target" in event) {
          const target = event.target as HTMLInputElement;
          values[field] = ($isBoolInputType(target.type) ? target.checked : target.value) as unknown as U[keyof U];
        } else if ($isPrimitiveTypeOfValueAllowed(value)) {
          values[field] = value;
        } else {
          throw new FormValueNotProvidedError<U>(
            "useForm()",
            field,
            `Note that the form fields have to be of type ${$allowedPrimitiveTypes.join(", ")}.`
          );
        }
      },
    [values, onChange]
  );

  const reset = useCallback(() => {
    Object.keys(values).forEach((key$) => {
      const key = key$ as keyof U;
      values[key] = (initialValues as U)[key];
    });
  }, [values, initialValues]);

  const overrideField = useCallback(
    (field: keyof U, value: U[keyof U]) => {
      values[field] = value;
    },
    [values]
  );

  const handleSubmit = useCallback(
    ({ preventDefault = true }: VirtualHandleSubmitConfiguration = {}) =>
      async function $handleSubmitEventListenerClosure<E>(event: ReactFormEvent<E>) {
        if (preventDefault) {
          event.preventDefault();
        }
        const validationErrors = typeof validate === "function" ? validate(values) : ({} as FormValidationErrors<U>);
        const errorKeys = Object.keys(validationErrors).filter((key) => {
          const value = validationErrors[key as keyof U];
          return value !== undefined && value !== null;
        });
        const hasErrors = errorKeys.length > 0;

        if (hasErrors) {
          errorKeys.forEach((key$) => {
            const key = key$ as keyof U;
            errors[key] = validationErrors[key as keyof U];
          });
          return;
        }

        controlUserFeedback({ type: "Set Submitting", payload: true });
        try {
          await onSubmit({ ...values }, event);
        } catch (error) {}
        controlUserFeedback({ type: "Set Submitting", payload: false });

        if (resetAfterSubmit) {
          reset();
        }
      },
    [validate, values, onSubmit, errors, controlUserFeedback, resetAfterSubmit, reset]
  );

  return {
    handleChange,
    reset,
    overrideField,
    values,
    errors,
    handleSubmit,
    isSubmitting,
  };
}