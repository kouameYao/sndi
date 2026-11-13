import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SelectField, TextareaField, TextField } from "./form-field";

describe("TextField", () => {
  test("relie le libellé au champ", () => {
    render(<TextField id="nom" name="nom" label="Nom et prénom" />);

    expect(screen.getByLabelText("Nom et prénom")).toHaveAttribute("id", "nom");
  });

  test("annonce le caractère obligatoire dans le libellé", () => {
    render(<TextField id="nom" name="nom" label="Nom" required />);

    expect(screen.getByLabelText("Nom (obligatoire)")).toBeRequired();
  });

  test("n’expose aucun état d’erreur par défaut", () => {
    render(<TextField id="nom" name="nom" label="Nom" />);

    const input = screen.getByLabelText("Nom");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  test("relie l’aide et le message d’erreur au champ", () => {
    render(
      <TextField
        id="email"
        name="email"
        label="Adresse e-mail"
        hint="Adresse professionnelle de préférence."
        error="Saisissez une adresse valide."
      />,
    );

    const input = screen.getByLabelText("Adresse e-mail");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(
      "Adresse professionnelle de préférence. Saisissez une adresse valide.",
    );
  });
});

describe("TextareaField", () => {
  test("expose une zone de texte libellée", () => {
    render(<TextareaField id="message" name="message" label="Message" />);

    expect(screen.getByRole("textbox", { name: "Message" }).tagName).toBe(
      "TEXTAREA",
    );
  });
});

describe("SelectField", () => {
  test("expose une liste déroulante et ses options", () => {
    render(
      <SelectField id="objet" name="objet" label="Objet" defaultValue="">
        <option value="">Choisir</option>
        <option value="cyber">Cybersécurité</option>
      </SelectField>,
    );

    expect(screen.getByRole("combobox", { name: "Objet" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Cybersécurité" }),
    ).toBeInTheDocument();
  });
});
