import SidebarItem from "./SidebarItem";

import type { SidebarSection as SidebarSectionType } from "../../types/sidebar.types";

interface SidebarSectionProps {
  section: SidebarSectionType;
  onNavigate?: () => void;
}

export default function SidebarSection({
  section,
  onNavigate,
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
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}