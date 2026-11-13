import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types/content";

interface ExpertiseFaqProps {
  items: readonly FaqItem[];
}

/** Questions fréquentes d'une expertise. */
export function ExpertiseFaq({ items }: ExpertiseFaqProps) {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
