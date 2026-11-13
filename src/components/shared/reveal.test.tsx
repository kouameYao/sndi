import { fireEvent, render, screen } from "@testing-library/react";
import { Activity } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Reveal } from "./reveal";

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void;

const observers: { callback: ObserverCallback; disconnect: () => void }[] = [];

/** Place le prochain élément rendu à une hauteur donnée dans la page. */
function mockElementTop(top: number) {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    top,
  } as DOMRect);
}

/** jsdom n'implémente pas AnimationEvent : l'événement est construit à la main. */
function endAnimation(target: HTMLElement, animationName: string) {
  const event = new Event("animationend", { bubbles: true });
  Object.defineProperty(event, "animationName", { value: animationName });
  fireEvent(target, event);
}

/**
 * Next.js conserve les pages visitées dans une frontière Activity : masquée, la
 * page nettoie ses effets ; réaffichée, elle les relance sans perdre son état.
 */
function renderInPage(content: string, mode: "visible" | "hidden") {
  return (
    <Activity mode={mode}>
      <Reveal>{content}</Reveal>
    </Activity>
  );
}

function mockReducedMotion(isReduced: boolean) {
  vi.mocked(window.matchMedia).mockImplementation(
    (query: string) =>
      ({
        matches: isReduced,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );
}

beforeEach(() => {
  observers.length = 0;
  mockReducedMotion(false);
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      disconnect = vi.fn();
      constructor(callback: ObserverCallback) {
        observers.push({ callback, disconnect: this.disconnect });
      }
      observe() {}
    },
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Reveal", () => {
  test("rend son contenu dans la balise demandée et transmet ses attributs", () => {
    mockElementTop(100);
    render(
      <Reveal as="section" aria-label="Solutions" className="bloc">
        Contenu
      </Reveal>,
    );

    const section = screen.getByRole("region", { name: "Solutions" });
    expect(section).toHaveTextContent("Contenu");
    expect(section).toHaveClass("bloc");
  });

  test("ne masque jamais un bloc déjà visible au chargement", () => {
    mockElementTop(100);
    render(<Reveal>Contenu visible</Reveal>);

    expect(screen.getByText("Contenu visible")).not.toHaveAttribute(
      "data-reveal",
    );
    expect(observers).toHaveLength(0);
  });

  test("met en attente un bloc situé sous l’écran, puis le révèle à son entrée", () => {
    mockElementTop(window.innerHeight + 500);
    render(<Reveal>Contenu plus bas</Reveal>);
    const block = screen.getByText("Contenu plus bas");

    expect(block).toHaveAttribute("data-reveal", "pending");

    observers[0].callback([{ isIntersecting: false }]);
    expect(block).toHaveAttribute("data-reveal", "pending");

    observers[0].callback([{ isIntersecting: true }]);
    expect(block).toHaveAttribute("data-reveal", "visible");
    expect(observers[0].disconnect).toHaveBeenCalled();
  });

  test("n’anime rien lorsque l’utilisateur réduit les animations", () => {
    mockReducedMotion(true);
    mockElementTop(window.innerHeight + 500);
    render(<Reveal>Contenu sans animation</Reveal>);

    expect(screen.getByText("Contenu sans animation")).not.toHaveAttribute(
      "data-reveal",
    );
    expect(observers).toHaveLength(0);
  });

  test("retire son marqueur une fois l’animation terminée", () => {
    mockElementTop(window.innerHeight + 500);
    render(
      <Reveal>
        <span>Enfant animé</span>
      </Reveal>,
    );
    const block = screen.getByText("Enfant animé").parentElement as HTMLElement;
    observers[0].callback([{ isIntersecting: true }]);

    // La fin d'une animation d'un enfant, ou d'une autre animation, ne compte pas.
    endAnimation(screen.getByText("Enfant animé"), "fade-up");
    endAnimation(block, "settle-up");
    expect(block).toHaveAttribute("data-reveal", "visible");

    endAnimation(block, "fade-up");
    expect(block).not.toHaveAttribute("data-reveal");
  });

  test("ne remasque pas un bloc déjà révélé lorsque sa page est réaffichée", () => {
    mockElementTop(window.innerHeight + 500);
    const { rerender } = render(renderInPage("Contenu déjà vu", "visible"));
    observers[0].callback([{ isIntersecting: true }]);

    rerender(renderInPage("Contenu déjà vu", "hidden"));
    rerender(renderInPage("Contenu déjà vu", "visible"));

    expect(screen.getByText("Contenu déjà vu")).not.toHaveAttribute(
      "data-reveal",
    );
    expect(observers).toHaveLength(1);
  });

  test("ne masque pas, à son réaffichage, un bloc qui était visible au chargement", () => {
    mockElementTop(100);
    const { rerender } = render(renderInPage("Contenu du haut", "visible"));

    // Au retour arrière, la page est réaffichée avant que sa position soit restaurée.
    rerender(renderInPage("Contenu du haut", "hidden"));
    mockElementTop(window.innerHeight + 500);
    rerender(renderInPage("Contenu du haut", "visible"));

    expect(screen.getByText("Contenu du haut")).not.toHaveAttribute(
      "data-reveal",
    );
    expect(observers).toHaveLength(0);
  });

  test("remet en attente, à son réaffichage, un bloc qui n’a jamais été vu", () => {
    mockElementTop(window.innerHeight + 500);
    const { rerender } = render(renderInPage("Contenu jamais vu", "visible"));
    const block = screen.getByText("Contenu jamais vu");

    rerender(renderInPage("Contenu jamais vu", "hidden"));
    expect(block).not.toHaveAttribute("data-reveal");

    rerender(renderInPage("Contenu jamais vu", "visible"));
    expect(block).toHaveAttribute("data-reveal", "pending");
    expect(observers).toHaveLength(2);
  });

  test("ne laisse aucun bloc en attente lorsque la page est retirée ou masquée", () => {
    mockElementTop(window.innerHeight + 500);
    const { unmount } = render(<Reveal>Contenu retiré</Reveal>);
    const block = screen.getByText("Contenu retiré");
    expect(block).toHaveAttribute("data-reveal", "pending");

    unmount();

    expect(observers[0].disconnect).toHaveBeenCalled();
    expect(block).not.toHaveAttribute("data-reveal");
  });
});
