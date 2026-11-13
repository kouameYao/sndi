import { CircleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const CONTROL_CLASSES = cn(
  "w-full border border-border-strong bg-surface px-4 py-3 text-base text-foreground",
  "placeholder:text-muted",
  "transition-colors duration-150",
  "hover:border-foreground",
  "focus-visible:border-foreground focus-visible:outline-offset-2",
  "aria-invalid:border-2 aria-invalid:border-destructive",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

interface FieldMessages {
  hint?: string;
  error?: string;
}

function describedBy(id: string, { hint, error }: FieldMessages) {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(
    Boolean,
  );
  return ids.length > 0 ? ids.join(" ") : undefined;
}

interface FieldShellProps extends FieldMessages {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Libellé, aide et message d'erreur reliés au contrôle par leurs identifiants. */
function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: FieldShellProps) {
  return (
    <div
      data-slot="form-field"
      className={cn("flex flex-col gap-2", className)}
    >
      <label htmlFor={id} className="font-semibold">
        {label}
        {required ? (
          <span className="font-normal text-muted"> (obligatoire)</span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-small text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-start gap-2 text-small font-medium text-destructive"
        >
          <CircleAlert
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0"
            strokeWidth={2}
          />
          {error}
        </p>
      ) : null}
    </div>
  );
}

type ControlBaseProps = FieldMessages & {
  id: string;
  label: string;
  fieldClassName?: string;
};

export type TextFieldProps = ControlBaseProps &
  Omit<ComponentProps<"input">, "id">;

export function TextField({
  id,
  label,
  hint,
  error,
  fieldClassName,
  className,
  required,
  ...props
}: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={fieldClassName}
    >
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={cn(CONTROL_CLASSES, "h-12", className)}
        {...props}
      />
    </FieldShell>
  );
}

export type TextareaFieldProps = ControlBaseProps &
  Omit<ComponentProps<"textarea">, "id">;

export function TextareaField({
  id,
  label,
  hint,
  error,
  fieldClassName,
  className,
  required,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={fieldClassName}
    >
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={cn(CONTROL_CLASSES, "min-h-36 resize-y", className)}
        {...props}
      />
    </FieldShell>
  );
}

export type SelectFieldProps = ControlBaseProps &
  Omit<ComponentProps<"select">, "id">;

/** Liste déroulante native : accessible et adaptée au tactile sans JavaScript. */
export function SelectField({
  id,
  label,
  hint,
  error,
  fieldClassName,
  className,
  required,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={fieldClassName}
    >
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={cn(CONTROL_CLASSES, "h-12 pr-10", className)}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
