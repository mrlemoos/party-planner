import {
  type ReactElement,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  useMemo,
} from "react";

import cls from "classnames";

import type PrefixObjectKeys from "@root/type-util/PrefixObjectKeys";
import isValidRenderElement from "@root/util/isValidRenderElement";
import convertFromObjectWithPrefix from "@root/util/convertFromObjectWithPrefix";

import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import Input from "./Input";

type RawHTMLLabelElementAttributes = Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">;
type RawHTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>;

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  children?: never;

  error?: ReactNode;
  label?: ReactNode;
} & PrefixObjectKeys<RawHTMLLabelElementAttributes, "label"> &
  PrefixObjectKeys<RawHTMLDivElementAttributes, "container">;

const Field = ({
  className,
  name,
  error,
  type = "text",

  containerClassName,
  labelClassName,

  label,

  autoCapitalize = "off",
  autoCorrect = "off",
  autoComplete = "off",
  spellCheck = false,

  ...props
}: FieldProps): ReactElement => {
  const labelProps = useMemo(() => convertFromObjectWithPrefix<RawHTMLLabelElementAttributes>(props, "label"), [props]);
  const containerProps = useMemo(
    () => convertFromObjectWithPrefix<RawHTMLDivElementAttributes>(props, "container"),
    [props]
  );

  const errorElementId = useMemo(() => (error ? `${name}-error` : undefined), [error, name]);

  return (
    <div className={cls("w-full", containerClassName)} {...containerProps}>
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
      <ErrorMessage
        id={errorElementId}
        aria-hidden={error ? "false" : "true"}
        className={cls({ "hidden animate-fade-in": !error })}
      >
        {error}
      </ErrorMessage>
    </div>
  );
};

export default Field;
