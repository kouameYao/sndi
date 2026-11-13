import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LoadingSkeleton } from "./loading-skeleton";

describe("LoadingSkeleton", () => {
  test("annonce le chargement aux technologies d’assistance", () => {
    render(<LoadingSkeleton />);

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Chargement de la page…");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  test("masque les blocs de substitution, purement décoratifs", () => {
    const { container } = render(<LoadingSkeleton />);

    const placeholders = container.querySelectorAll('[data-slot="skeleton"]');
    expect(placeholders.length).toBeGreaterThan(0);
    placeholders.forEach((placeholder) => {
      expect(placeholder).toHaveAttribute("aria-hidden", "true");
    });
  });
});
