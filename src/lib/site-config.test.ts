import { describe, expect, test } from "vitest";
import {
  CONTACT,
  CONTACT_NAV,
  getAriaCurrent,
  isActivePath,
  LEGAL_NAV,
  MAIN_NAV,
} from "./site-config";

describe("isActivePath", () => {
  test("l’accueil n’est actif que sur la racine", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/expertises", "/")).toBe(false);
  });

  test("une rubrique est active sur sa page et ses sous-pages", () => {
    expect(isActivePath("/expertises", "/expertises")).toBe(true);
    expect(isActivePath("/expertises/cybersecurite", "/expertises")).toBe(true);
  });

  test("un préfixe commun ne suffit pas à activer une rubrique", () => {
    expect(isActivePath("/solutions-archive", "/solutions")).toBe(false);
  });
});

describe("getAriaCurrent", () => {
  test("désigne la page affichée", () => {
    expect(getAriaCurrent("/solutions", "/solutions")).toBe("page");
    expect(getAriaCurrent("/", "/")).toBe("page");
  });

  test("désigne la rubrique qui contient la page affichée", () => {
    expect(getAriaCurrent("/solutions/sigfip", "/solutions")).toBe("true");
  });

  test("ne désigne pas une rubrique étrangère à la page affichée", () => {
    expect(getAriaCurrent("/solutions/sigfip", "/institution")).toBeUndefined();
    expect(getAriaCurrent("/solutions", "/")).toBeUndefined();
  });
});

describe("navigation", () => {
  test("chaque entrée pointe vers un chemin interne unique", () => {
    const hrefs = [...MAIN_NAV, CONTACT_NAV, ...LEGAL_NAV].map(
      (item) => item.href,
    );

    expect(hrefs.every((href) => href.startsWith("/"))).toBe(true);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("coordonnées", () => {
  test("les numéros de téléphone utilisent le schéma tel: au format international", () => {
    for (const phone of CONTACT.phones) {
      expect(phone.href).toMatch(/^tel:\+225\d{10}$/);
    }
  });

  test("les liens externes sont servis en HTTPS", () => {
    const urls = [
      CONTACT.sourceUrl,
      CONTACT.orderUrl,
      ...CONTACT.socials.map((social) => social.url),
    ];

    expect(urls.every((url) => url.startsWith("https://"))).toBe(true);
  });
});
