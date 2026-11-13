import { describe, expect, test } from "vitest";
import { cn, formatDateParts, formatIndex } from "./utils";

describe("cn", () => {
  test("fusionne les classes et ignore les valeurs fausses", () => {
    expect(cn("flex", false, undefined, "gap-2")).toBe("flex gap-2");
  });

  test("résout les conflits Tailwind au profit de la dernière classe", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});

describe("formatDateParts", () => {
  test("décompose une date ISO en parties affichables en français", () => {
    const parts = formatDateParts("2021-09-17");

    expect(parts).toEqual({
      iso: "2021-09-17",
      full: "17 septembre 2021",
      day: "17",
      month: "sept",
      year: "2021",
    });
  });

  test("complète le jour sur deux chiffres", () => {
    expect(formatDateParts("2016-02-05").day).toBe("05");
  });

  test("ne dépend pas du fuseau horaire de la machine", () => {
    expect(formatDateParts("2021-01-01").full).toBe("1 janvier 2021");
  });

  test("rejette une date invalide avec un message explicite", () => {
    expect(() => formatDateParts("pas-une-date")).toThrow(/Date invalide/);
  });
});

describe("formatIndex", () => {
  test("numérote à partir de 1 sur deux chiffres", () => {
    expect(formatIndex(0)).toBe("01");
    expect(formatIndex(9)).toBe("10");
  });
});
