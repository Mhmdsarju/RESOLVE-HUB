import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import WarRoomCard from "../components/WarRoomCard";
import WarRoomFilters from "../components/WarRoomFilters";
import WarRoomPagination from "../components/WarRoomPagination";
import WarRoomEmptyState from "../components/WarRoomEmptyState";
import WarRoomSkeleton from "../components/WarRoomSkeleton";
import WarRoomErrorState from "../components/WarRoomErrorState";
import CreateWarRoomModal from "../components/CreateWarRoomModal";

import { useWarRooms } from "../hooks/useWarRooms";

import type { GetWarRoomsParams } from "../types/warRoom.types";

const DEFAULT_FILTERS: GetWarRoomsParams = {
  page: 1,
  limit: 6,
};

export default function WarRoomListPage() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<GetWarRoomsParams>(DEFAULT_FILTERS);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useWarRooms(filters);

  const warRooms = data?.items ?? [];

  const handleFilterChange = (newFilters: GetWarRoomsParams) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handlePageChange = (page: number) => {
    setFilters((current) => ({
      ...current,
      page,
    }));
  };

  const handleWarRoomClick = (warRoomId: string) => {
    navigate(`/war-rooms/${warRoomId}`);
  };

  return (
    <div className="space-y-6">
      <div
        className="
                    flex
                    flex-col
                    justify-between
                    gap-4
                    sm:flex-row
                    sm:items-center
                "
      >
        <div>
          <h1 className="text-2xl font-bold text-[#4B3932]">War Rooms</h1>

          <p className="mt-1 text-sm text-stone-500">
            Monitor and manage incident response war rooms.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#4B3932]
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#3B2E29]
                    "
        >
          <Plus size={18} />
          Create War Room
        </button>
      </div>

      <WarRoomFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {isLoading && <WarRoomSkeleton />}

      {isError && !isLoading && <WarRoomErrorState onRetry={() => refetch()} />}

      {!isLoading && !isError && warRooms.length === 0 && (
        <WarRoomEmptyState
          title="No war rooms found"
          description="There are no war rooms matching the current filters."
          action={
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-[#4B3932]
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-[#3B2E29]
                            "
            >
              <Plus size={16} />
              Create War Room
            </button>
          }
        />
      )}

      {!isLoading && !isError && warRooms.length > 0 && (
        <>
          <div className="grid gap-4">
            {warRooms.map((warRoom) => (
              <WarRoomCard
                key={warRoom.id}
                warRoom={warRoom}
                onClick={() => handleWarRoomClick(warRoom.id)}
              />
            ))}
          </div>

          {data && (
            <WarRoomPagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <CreateWarRoomModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
