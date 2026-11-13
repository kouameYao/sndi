import { describe, expect, test } from "vitest";
import {
  buildMailtoHref,
  buildMessageBody,
  CONTACT_LIMITS,
  hasErrors,
  isMailtoTooLong,
  MAILTO_SAFE_LENGTH,
  readContactValues,
  validateContact,
  type ContactValues,
} from "./contact-message";

const SUBJECTS = ["Cybersécurité", "Autre demande"] as const;

const VALID_VALUES: ContactValues = {
  name: "Aya Koné",
  organisation: "Mairie de Bouaké",
  email: "aya.kone@example.ci",
  subject: "Cybersécurité",
  message: "Nous souhaitons auditer la sécurité de notre réseau interne.",
};

describe("readContactValues", () => {
  test("lit les champs attendus et retire les espaces superflus", () => {
    const formData = new FormData();
    formData.set("name", "  Aya Koné  ");
    formData.set("email", " aya.kone@example.ci ");
    formData.set("inconnu", "ignoré");

    const values = readContactValues(formData);

    expect(values.name).toBe("Aya Koné");
    expect(values.email).toBe("aya.kone@example.ci");
    expect(values).not.toHaveProperty("inconnu");
  });

  test("remplace un champ absent par une chaîne vide", () => {
    expect(readContactValues(new FormData()).message).toBe("");
  });
});

describe("validateContact", () => {
  test("accepte un message complet", () => {
    const errors = validateContact(VALID_VALUES, SUBJECTS);

    expect(errors).toEqual({});
    expect(hasErrors(errors)).toBe(false);
  });

  test("accepte une organisation vide : le champ est facultatif", () => {
    const errors = validateContact(
      { ...VALID_VALUES, organisation: "" },
      SUBJECTS,
    );

    expect(errors).toEqual({});
  });

  test("signale chaque champ obligatoire manquant", () => {
    const errors = validateContact(
      { name: "", organisation: "", email: "", subject: "", message: "" },
      SUBJECTS,
    );

    expect(Object.keys(errors).sort()).toEqual([
      "email",
      "message",
      "name",
      "subject",
    ]);
  });

  test.each(["aya", "aya@", "aya@example", "aya kone@example.ci"])(
    "rejette l’adresse e-mail mal formée « %s »",
    (email) => {
      const errors = validateContact({ ...VALID_VALUES, email }, SUBJECTS);

      expect(errors.email).toMatch(/adresse e-mail valide/);
    },
  );

  test("rejette un objet qui ne figure pas dans la liste proposée", () => {
    const errors = validateContact(
      { ...VALID_VALUES, subject: "Objet injecté" },
      SUBJECTS,
    );

    expect(errors.subject).toBeDefined();
  });

  test("exige un message d’une longueur minimale", () => {
    const errors = validateContact(
      { ...VALID_VALUES, message: "Trop court" },
      SUBJECTS,
    );

    expect(errors.message).toContain(String(CONTACT_LIMITS.messageMin));
  });

  test("refuse un message au-delà de la longueur maximale", () => {
    const errors = validateContact(
      { ...VALID_VALUES, message: "a".repeat(CONTACT_LIMITS.messageMax + 1) },
      SUBJECTS,
    );

    expect(errors.message).toContain(String(CONTACT_LIMITS.messageMax));
  });
});

describe("buildMessageBody", () => {
  test("compose le message suivi de la signature", () => {
    expect(buildMessageBody(VALID_VALUES)).toBe(
      [
        "Bonjour,",
        "",
        VALID_VALUES.message,
        "",
        "Aya Koné",
        "Mairie de Bouaké",
        "aya.kone@example.ci",
      ].join("\n"),
    );
  });

  test("omet l’organisation lorsqu’elle n’est pas renseignée", () => {
    const body = buildMessageBody({ ...VALID_VALUES, organisation: "" });

    expect(body.split("\n").slice(-3)).toEqual([
      "",
      "Aya Koné",
      "aya.kone@example.ci",
    ]);
  });
});

describe("buildMailtoHref", () => {
  test("encode l’objet et le corps du courriel", () => {
    const href = buildMailtoHref("info@sndi.ci", {
      ...VALID_VALUES,
      subject: "Autre demande",
      message: "Question & précision : 100 % utile ?",
    });

    expect(
      href.startsWith("mailto:info@sndi.ci?subject=Autre%20demande&body="),
    ).toBe(true);
    expect(href).toContain("Question%20%26%20pr%C3%A9cision");
    expect(href).not.toContain(" ");
  });
});

describe("sauts de ligne et longueur du lien mailto", () => {
  test("émet les sauts de ligne en CRLF, comme le demande la RFC 6068", () => {
    const href = buildMailtoHref("info@sndi.ci", VALID_VALUES);

    expect(href).toContain("Bonjour%2C%0D%0A%0D%0A");
    expect(href).not.toMatch(/(?<!%0D)%0A/);
  });

  test("signale un lien trop long pour certaines messageries", () => {
    const longHref = buildMailtoHref("info@sndi.ci", {
      ...VALID_VALUES,
      message: "é".repeat(CONTACT_LIMITS.messageMax),
    });

    expect(longHref.length).toBeGreaterThan(MAILTO_SAFE_LENGTH);
    expect(isMailtoTooLong(longHref)).toBe(true);
    expect(isMailtoTooLong(buildMailtoHref("info@sndi.ci", VALID_VALUES))).toBe(
      false,
    );
  });
});
