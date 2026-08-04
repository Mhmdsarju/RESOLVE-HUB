import { Bell, Menu,  } from "lucide-react";
// import {Search} from "lucide-react";

export default function TopNavbar() {

  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-[#E7DDD3]
        bg-white
        px-8
      "
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        <button
          className="
            rounded-lg
            p-2
            transition
            hover:bg-[#F5EFE7]
            lg:hidden
          "
        >
          <Menu size={22} />
        </button>

        <h1 className="text-2xl font-bold text-[#4B3932]">Dashboard</h1>
      </div>

      {/* Search */}

      {/* <div className="hidden w-full max-w-md lg:block">
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-stone-400
            "
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              bg-[#FAF6F0]
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-[#4B3932]
            "
          />
        </div>
      </div> */}

      {/* Right */}

      <div className="flex items-center gap-5">
        <button
          className="
            relative
            rounded-xl
            p-2
            transition
            hover:bg-[#F5EFE7]
          "
        >
          <Bell size={22} />

          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>

      </div>
    </header>
  );
}
