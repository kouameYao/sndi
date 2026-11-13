"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Menu de navigation accessible (Radix NavigationMenu, style shadcn/ui).
 * Le panneau est positionné par rapport au premier ancêtre positionné,
 * ce qui lui donne la largeur du conteneur d'en-tête.
 */
export function NavigationMenu({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      delayDuration={120}
      className={cn("flex items-stretch", className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("flex list-none items-stretch", className)}
      {...props}
    />
  );
}

export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuLink = NavigationMenuPrimitive.Link;

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn("group/trigger inline-flex items-center gap-1", className)}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180"
        strokeWidth={2}
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

function NavigationMenuViewport() {
  return (
    <div className="absolute inset-x-0 top-full z-50 flex justify-center px-(--gutter)">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "w-full max-w-(--container-max) overflow-hidden border border-t-0 border-border bg-surface shadow-menu",
          "data-[state=closed]:animate-menu-out data-[state=open]:animate-menu-in",
        )}
      />
    </div>
  );
}
