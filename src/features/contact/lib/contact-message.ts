/**
 * Logique du formulaire de contact : validation et préparation du message.
 * Fonctions pures, sans dépendance au DOM, testées unitairement.
 */

export interface ContactValues {
  name: string;
  organisation: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 120,
  organisationMax: 160,
  emailMax: 200,
  messageMin: 20,
  messageMax: 3000,
} as const;

/** Volontairement simple : la vérification réelle se fait à l'envoi du courriel. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const EMPTY_CONTACT_VALUES: ContactValues = {
  name: "",
  organisation: "",
  email: "",
  subject: "",
  message: "",
};

/** Lit et nettoie les champs attendus ; toute autre donnée est ignorée. */
export function readContactValues(formData: FormData): ContactValues {
  const read = (field: ContactField): string => {
    const value = formData.get(field);
    return typeof value === "string" ? value.trim() : "";
  };

  return {
    name: read("name"),
    organisation: read("organisation"),
    email: read("email"),
    subject: read("subject"),
    message: read("message"),
  };
}

/** Retourne un message d'erreur par champ invalide ; objet vide si tout est valide. */
export function validateContact(
  values: ContactValues,
  allowedSubjects: readonly string[],
): ContactErrors {
  const errors: ContactErrors = {};

  if (values.name.length < CONTACT_LIMITS.nameMin) {
    errors.name = "Indiquez votre nom et votre prénom.";
  } else if (values.name.length > CONTACT_LIMITS.nameMax) {
    errors.name = `Le nom ne doit pas dépasser ${CONTACT_LIMITS.nameMax} caractères.`;
  }

  if (values.organisation.length > CONTACT_LIMITS.organisationMax) {
    errors.organisation = `Le nom de l’organisation ne doit pas dépasser ${CONTACT_LIMITS.organisationMax} caractères.`;
  }

  if (values.email.length === 0) {
    errors.email = "Indiquez votre adresse e-mail.";
  } else if (
    values.email.length > CONTACT_LIMITS.emailMax ||
    !EMAIL_PATTERN.test(values.email)
  ) {
    errors.email =
      "Saisissez une adresse e-mail valide, par exemple nom@organisation.ci.";
  }

  if (!allowedSubjects.includes(values.subject)) {
    errors.subject = "Choisissez l’objet de votre demande.";
  }

  if (values.message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Décrivez votre besoin en ${CONTACT_LIMITS.messageMin} caractères au minimum.`;
  } else if (values.message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Le message ne doit pas dépasser ${CONTACT_LIMITS.messageMax} caractères.`;
  }

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Corps du courriel, tel qu'il sera proposé à la relecture. */
export function buildMessageBody(values: ContactValues): string {
  const signature = [values.name, values.organisation, values.email].filter(
    (line) => line.length > 0,
  );
  return ["Bonjour,", "", values.message, "", ...signature].join("\n");
}

/**
 * Lien `mailto:` vers l'adresse de contact, objet et corps encodés.
 * Les sauts de ligne sont émis en CRLF, comme le demande la RFC 6068.
 */
export function buildMailtoHref(
  recipient: string,
  values: ContactValues,
): string {
  const subject = encodeURIComponent(values.subject);
  const body = encodeURIComponent(
    buildMessageBody(values).replace(/\n/g, "\r\n"),
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

/**
 * Au-delà de cette longueur, certains logiciels de messagerie tronquent ou
 * ignorent un lien `mailto:` : la copie du message est alors recommandée.
 */
export const MAILTO_SAFE_LENGTH = 1800;

export function isMailtoTooLong(href: string): boolean {
  return href.length > MAILTO_SAFE_LENGTH;
}
