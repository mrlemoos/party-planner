import { type ReactElement, type InputHTMLAttributes, type LabelHTMLAttributes, type HTMLAttributes, type ReactNode, useMemo } from "react";

import cls from "classnames";

import type PrefixObjectKeys from "@root/type-util/PrefixObjectKeys";
import isValidRenderElement from "@root/util/isValidRenderElement";
import useDeconstructedMemo from "@root/hooks/useDeconstructedMemo";

import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import Input from "./Input";

// #region Interfaces & Types

interface HTMLInputElementAttributes extends Omit<InputHTMLAttributes<HTMLInputElement>, "children"> {
  children?: never;
}

type HTMLLabelElementAttributes = Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor" | "children" | "className">;

type WithLabelProps = PrefixObjectKeys<HTMLLabelElementAttributes, "label">;

type HTMLElementAttributes = Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

type WithContainerProps = PrefixObjectKeys<HTMLElementAttributes, "container">;

interface FieldProps extends HTMLInputElementAttributes, WithLabelProps, WithContainerProps {
  children?: never;

  error?: ReactNode;
  label?: ReactNode;
}

// #endregion

const Field = ({
  className,
  name,
  error,
  type = "text",
  label,
  autoCapitalize = "off",
  autoCorrect = "off",
  autoComplete = "off",
  spellCheck = false,
  ...props
}: FieldProps): ReactElement => {
  const [labelProps$, containerProps$] = useDeconstructedMemo<[HTMLLabelElementAttributes, HTMLElementAttributes]>([
    {
      prefix: "label",
      props,
    },
    {
      prefix: "container",
      props,
    },
  ]);

  const labelProps = labelProps$ as HTMLLabelElementAttributes;
  const containerProps = containerProps$ as HTMLElementAttributes;

  const errorElementId = `${name}-error`;

  return (
    <div className={cls("w-full")} {...containerProps}>
      {isValidRenderElement(label) && (
        <Label htmlFor={name} {...labelProps}>
          {label}
        </Label>
      )}
      <Input
        aria-errormessage={errorElementId}
        className={cls({ "border-red-500": !!error }, className)}
        name={name}
        type={type}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        {...props}
      />
      <ErrorMessage id={errorElementId} aria-hidden={error ? "false" : "true"} className={cls({ "hidden animate-fade-in": !error })}>
        {error}
      </ErrorMessage>
    </div>
  );
};

export default Field;
