"use client";

import { useState, type Ref } from "react";
import { Button } from "@/components/ui/button";
import {
  buildMailtoHref,
  buildMessageBody,
  isMailtoTooLong,
  type ContactValues,
} from "../lib/contact-message";

type CopyStatus = "idle" | "copied" | "failed";

const COPY_FEEDBACK: Record<CopyStatus, string> = {
  idle: "",
  copied: "Message copié dans le presse-papiers.",
  failed:
    "La copie automatique a échoué : sélectionnez le texte ci-dessus pour le copier.",
};

interface ContactMessageReadyProps {
  recipient: string;
  values: ContactValues;
  /** Retour au formulaire, saisie conservée. */
  onEdit: () => void;
  ref?: Ref<HTMLElement>;
}

/**
 * Étape de relecture : le message est prêt, rien n'a été envoyé. La personne
 * l'ouvre dans sa messagerie, le copie, ou revient le modifier.
 */
export function ContactMessageReady({
  recipient,
  values,
  onEdit,
  ref,
}: ContactMessageReadyProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const body = buildMessageBody(values);
  const mailtoHref = buildMailtoHref(recipient, values);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopyStatus("copied");
    } catch {
      // Presse-papiers indisponible ou refusé : on le dit, la sélection reste possible.
      setCopyStatus("failed");
    }
  }

  return (
    <section
      ref={ref}
      tabIndex={-1}
      aria-labelledby="contact-ready-title"
      className="border-l-4 border-success bg-surface-muted p-6 outline-none md:p-8"
    >
      <h2 id="contact-ready-title" className="text-h3 font-semibold">
        Votre message est prêt
      </h2>
      <p className="mt-2 max-w-xl">
        Rien n’a encore été envoyé. Relisez le message, puis adressez-le à{" "}
        <strong className="font-semibold">{recipient}</strong> depuis votre
        messagerie.
      </p>

      <pre className="mt-5 max-h-72 overflow-auto border border-border bg-surface p-4 font-sans text-small whitespace-pre-wrap">
        {body}
      </pre>

      {isMailtoTooLong(mailtoHref) ? (
        <p className="mt-3 max-w-xl text-small text-muted">
          Ce message est long : si votre messagerie ne s’ouvre pas ou tronque le
          texte, copiez-le puis collez-le dans un nouveau courriel.
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button asChild>
          <a href={mailtoHref}>Ouvrir ma messagerie</a>
        </Button>
        <Button type="button" variant="outline" onClick={handleCopy}>
          Copier le message
        </Button>
        <Button type="button" variant="ghost" onClick={onEdit}>
          Modifier mon message
        </Button>
      </div>

      <p
        role="status"
        data-status={copyStatus}
        className="mt-3 min-h-6 text-small font-medium text-success data-[status=failed]:text-destructive"
      >
        {COPY_FEEDBACK[copyStatus]}
      </p>
    </section>
  );
}
