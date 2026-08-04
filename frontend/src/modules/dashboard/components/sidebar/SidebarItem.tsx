import { NavLink } from "react-router-dom";

import type { SidebarItem as SidebarItemType } from "../../types/sidebar.types";

interface SidebarItemProps {
  item: SidebarItemType;
}

export default function SidebarItem({
  item,
}: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `
          group
          flex
          items-center
          gap-3
          rounded-xl
          border-l-4
          px-4
          py-3
          text-sm
          font-medium
          transition-all
          duration-200
          ${
            isActive
              ? "border-[#F0E7D5] bg-[#5A463E] text-white shadow-lg"
              : "border-transparent text-[#E7DDD3] hover:border-[#CBB8A8] hover:bg-[#5A463E] hover:text-white"
          }
        `
      }
    >
      <Icon
        size={20}
        className="
          shrink-0
          transition-transform
          duration-200
          group-hover:scale-110
        "
      />

      <span className="truncate">{item.label}</span>
    </NavLink>
  );
}