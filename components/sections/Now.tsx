import type { NowItem } from "@/lib/types";
import { Section } from "@/components/layout/Section";

type NowSectionProps = {
  items: NowItem[];
};

/** Phase 3 stub — Phase 6 polish. */
export function NowSection({ items }: NowSectionProps) {
  return (
    <Section id="now" index="08 // Now" title="Currently exploring">
      <ul className="max-w-3xl space-y-2">
        {items.map((item) => (
          <li
            key={item.text.slice(0, 32)}
            className="text-sm leading-relaxed text-[var(--text-secondary)]"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </Section>
  );
}
