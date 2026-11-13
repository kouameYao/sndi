"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  SelectField,
  TextareaField,
  TextField,
} from "@/components/ui/form-field";
import {
  CONTACT_LIMITS,
  EMPTY_CONTACT_VALUES,
  hasErrors,
  readContactValues,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "../lib/contact-message";
import { ContactMessageReady } from "./contact-message-ready";

const FIELD_ORDER: readonly ContactField[] = [
  "name",
  "organisation",
  "email",
  "subject",
  "message",
];

const FIELD_LABELS: Record<ContactField, string> = {
  name: "Nom et prénom",
  organisation: "Organisation",
  email: "Adresse e-mail",
  subject: "Objet de la demande",
  message: "Votre message",
};

type FormState =
  | { status: "editing"; values: ContactValues; errors: ContactErrors }
  | { status: "ready"; values: ContactValues };

const INITIAL_STATE: FormState = {
  status: "editing",
  values: EMPTY_CONTACT_VALUES,
  errors: {},
};

interface ContactFormProps {
  /** Adresse à laquelle le message préparé sera adressé. */
  recipient: string;
  /** Objets proposés dans la liste déroulante. */
  subjects: readonly string[];
}

/**
 * Formulaire de contact de démonstration. Aucune donnée n'est transmise ni
 * conservée : après validation, le message est préparé pour être relu puis
 * envoyé par la personne depuis sa propre messagerie.
 */
export function ContactForm({ recipient, subjects }: ContactFormProps) {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readContactValues(new FormData(event.currentTarget));
    const errors = validateContact(values, subjects);

    if (hasErrors(errors)) {
      setState({ status: "editing", values, errors });
      // Le résumé d'erreurs reçoit le focus pour être annoncé immédiatement.
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setState({ status: "ready", values });
    requestAnimationFrame(() => readyRef.current?.focus());
  }

  function handleEdit(values: ContactValues) {
    // La saisie est conservée : le formulaire est réaffiché prérempli.
    setState({ status: "editing", values, errors: {} });
    requestAnimationFrame(() => firstFieldRef.current?.focus());
  }

  if (state.status === "ready") {
    return (
      <ContactMessageReady
        ref={readyRef}
        recipient={recipient}
        values={state.values}
        onEdit={() => handleEdit(state.values)}
      />
    );
  }

  const { errors, values } = state;
  const invalidFields = FIELD_ORDER.filter((field) => errors[field]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title" className="text-h2 font-semibold">
        Écrire à la SNDI
      </h2>
      <p className="mt-2 text-muted">
        Le formulaire prépare votre message : vous l’envoyez ensuite depuis
        votre messagerie.
      </p>

      {invalidFields.length > 0 ? (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 border-l-4 border-destructive bg-surface-muted p-5 outline-none"
        >
          <p className="font-semibold text-destructive">
            {invalidFields.length === 1
              ? "Un champ est à corriger"
              : `${invalidFields.length} champs sont à corriger`}
          </p>
          <ul className="mt-2 flex flex-col text-small">
            {invalidFields.map((field) => (
              <li key={field}>
                <a
                  href={`#contact-${field}`}
                  className="inline-flex min-h-8 items-center underline underline-offset-4"
                >
                  {FIELD_LABELS[field]} : {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <TextField
          ref={firstFieldRef}
          id="contact-name"
          name="name"
          label={FIELD_LABELS.name}
          autoComplete="name"
          required
          maxLength={CONTACT_LIMITS.nameMax}
          defaultValue={values.name}
          error={errors.name}
        />
        <TextField
          id="contact-organisation"
          name="organisation"
          label={FIELD_LABELS.organisation}
          autoComplete="organization"
          maxLength={CONTACT_LIMITS.organisationMax}
          defaultValue={values.organisation}
          error={errors.organisation}
        />
        <TextField
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          label={FIELD_LABELS.email}
          autoComplete="email"
          spellCheck={false}
          required
          maxLength={CONTACT_LIMITS.emailMax}
          defaultValue={values.email}
          error={errors.email}
        />
        <SelectField
          id="contact-subject"
          name="subject"
          label={FIELD_LABELS.subject}
          required
          defaultValue={subjects.includes(values.subject) ? values.subject : ""}
          error={errors.subject}
        >
          <option value="" disabled>
            Choisir un objet
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </SelectField>
        <TextareaField
          id="contact-message"
          name="message"
          label={FIELD_LABELS.message}
          required
          rows={6}
          maxLength={CONTACT_LIMITS.messageMax}
          defaultValue={values.message}
          hint="Contexte, objectifs et échéances éventuelles."
          error={errors.message}
          fieldClassName="md:col-span-2"
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" className="shrink-0">
          Préparer mon message
        </Button>
        <p className="max-w-sm text-small text-muted">
          Ce site de démonstration ne transmet et ne conserve aucune donnée.
        </p>
      </div>
    </form>
  );
}
