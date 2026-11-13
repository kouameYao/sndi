import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ContactForm } from "./contact-form";

const SUBJECTS = ["Cybersécurité", "Autre demande"];
const MESSAGE = "Nous souhaitons auditer la sécurité de notre réseau interne.";

function renderForm() {
  const user = userEvent.setup();
  render(<ContactForm recipient="info@sndi.ci" subjects={SUBJECTS} />);
  return user;
}

async function fillValidMessage(user: ReturnType<typeof userEvent.setup>) {
  await user.type(
    screen.getByLabelText("Nom et prénom (obligatoire)"),
    "Aya Koné",
  );
  await user.type(
    screen.getByLabelText("Adresse e-mail (obligatoire)"),
    "aya.kone@example.ci",
  );
  await user.selectOptions(
    screen.getByLabelText("Objet de la demande (obligatoire)"),
    "Cybersécurité",
  );
  await user.type(
    screen.getByLabelText("Votre message (obligatoire)"),
    MESSAGE,
  );
}

async function prepareMessage(user: ReturnType<typeof userEvent.setup>) {
  await fillValidMessage(user);
  await user.click(
    screen.getByRole("button", { name: "Préparer mon message" }),
  );
  return screen.getByRole("region", { name: "Votre message est prêt" });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ContactForm — saisie", () => {
  test("propose les objets fournis dans la liste déroulante", () => {
    renderForm();

    const select = screen.getByLabelText("Objet de la demande (obligatoire)");
    expect(
      within(select).getByRole("option", { name: "Cybersécurité" }),
    ).toBeInTheDocument();
    expect(
      within(select).getByRole("option", { name: "Autre demande" }),
    ).toBeInTheDocument();
  });

  test("affiche un résumé d’erreurs lorsque le formulaire est vide", async () => {
    const user = renderForm();

    await user.click(
      screen.getByRole("button", { name: "Préparer mon message" }),
    );

    const summary = screen.getByRole("alert");
    expect(summary).toHaveTextContent("4 champs sont à corriger");
    expect(within(summary).getAllByRole("link")).toHaveLength(4);
  });

  test("marque les champs invalides et décrit l’erreur", async () => {
    const user = renderForm();

    await user.type(
      screen.getByLabelText("Adresse e-mail (obligatoire)"),
      "adresse-invalide",
    );
    await user.click(
      screen.getByRole("button", { name: "Préparer mon message" }),
    );

    const email = screen.getByLabelText("Adresse e-mail (obligatoire)");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription(/adresse e-mail valide/);
    expect(email).toHaveValue("adresse-invalide");
  });

  test("ne signale pas l’organisation, champ facultatif", async () => {
    const user = renderForm();

    await user.click(
      screen.getByRole("button", { name: "Préparer mon message" }),
    );

    expect(screen.getByLabelText("Organisation")).not.toHaveAttribute(
      "aria-invalid",
    );
  });
});

describe("ContactForm — message prêt", () => {
  test("prépare le message sans rien envoyer lorsque tout est valide", async () => {
    const user = renderForm();

    const ready = await prepareMessage(user);

    expect(ready).toHaveTextContent("Rien n’a encore été envoyé");
    expect(ready).toHaveTextContent(MESSAGE);
    expect(
      screen.getByRole("link", { name: "Ouvrir ma messagerie" }),
    ).toHaveAttribute(
      "href",
      expect.stringMatching(
        /^mailto:info@sndi\.ci\?subject=Cybers%C3%A9curit%C3%A9&body=/,
      ),
    );
  });

  test("revenir modifier le message conserve toute la saisie", async () => {
    const user = renderForm();
    await prepareMessage(user);

    await user.click(
      screen.getByRole("button", { name: "Modifier mon message" }),
    );

    expect(screen.getByLabelText("Nom et prénom (obligatoire)")).toHaveValue(
      "Aya Koné",
    );
    expect(screen.getByLabelText("Adresse e-mail (obligatoire)")).toHaveValue(
      "aya.kone@example.ci",
    );
    expect(
      screen.getByLabelText("Objet de la demande (obligatoire)"),
    ).toHaveValue("Cybersécurité");
    expect(screen.getByLabelText("Votre message (obligatoire)")).toHaveValue(
      MESSAGE,
    );
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  test("copie le message et le confirme", async () => {
    const user = renderForm();
    const writeText = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined);
    await prepareMessage(user);

    await user.click(screen.getByRole("button", { name: "Copier le message" }));

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining(MESSAGE));
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Message copié dans le presse-papiers.",
    );
  });

  test("explique comment faire si la copie automatique échoue", async () => {
    const user = renderForm();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("Presse-papiers refusé"),
    );
    await prepareMessage(user);

    await user.click(screen.getByRole("button", { name: "Copier le message" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "La copie automatique a échoué",
    );
  });
});
