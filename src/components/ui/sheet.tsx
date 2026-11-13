"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Panneau plein écran (Radix Dialog) : focus piégé, fermeture par Échap,
 * restitution du focus au déclencheur. Sert au menu mobile.
 */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;

export function SheetContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink-950/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-background",
          "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
