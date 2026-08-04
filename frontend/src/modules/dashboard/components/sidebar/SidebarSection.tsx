import SidebarItem from "./SidebarItem";

import type { SidebarSection as SidebarSectionType } from "../../types/sidebar.types";

interface SidebarSectionProps {
  section: SidebarSectionType;
}

export default function SidebarSection({
  section,
}: SidebarSectionProps) {
  return (
    <div className="space-y-2">
      <h3
        className="
          px-3
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-[#CBB8A8]
        "
      >
        {section.title}
      </h3>

      <div className="space-y-1">
        {section.items.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}