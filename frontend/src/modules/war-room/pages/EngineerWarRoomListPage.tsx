import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EngineerWarRoomCard from "../components/EngineerWarRoomCard";
import WarRoomFilters from "../components/WarRoomFilters";
import WarRoomPagination from "../components/WarRoomPagination";
import WarRoomEmptyState from "../components/WarRoomEmptyState";
import WarRoomSkeleton from "../components/WarRoomSkeleton";
import WarRoomErrorState from "../components/WarRoomErrorState";

import { useWarRooms } from "../hooks/useWarRooms";
import { useJoinWarRoom } from "../hooks/useJoinWarRoom";

import type { GetWarRoomsParams } from "../types/warRoom.types";

const DEFAULT_FILTERS: GetWarRoomsParams = {
  page: 1,
  limit: 6,
};

export default function EngineerWarRoomListPage() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<GetWarRoomsParams>(DEFAULT_FILTERS);

  const { data, isLoading, isError, refetch } = useWarRooms(filters);

  const joinWarRoomMutation = useJoinWarRoom();

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
    navigate(`/engineer/war-rooms/${warRoomId}`,{ replace: true });
  };

 const handleJoin = (warRoomId: string) => {
  joinWarRoomMutation.mutate(warRoomId, {
    onSuccess: () => {
      navigate(`/engineer/war-rooms/${warRoomId}`, {
        state: {
          from: "/engineer/war-rooms",
        },
      });
    },
  });
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#4B3932]">Engineers-War Rooms</h1>

        <p className="mt-1 text-sm text-stone-500">
          View and join war rooms related to your teams.
        </p>
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
          title="No war rooms available"
          description="There are no war rooms available for your teams."
        />
      )}

      {!isLoading && !isError && warRooms.length > 0 && (
        <>
          <div className="grid gap-4">
            {warRooms.map((warRoom) => (
              <EngineerWarRoomCard
                key={warRoom.id}
                warRoom={warRoom}
                onClick={() => handleWarRoomClick(warRoom.id)}
                onJoin={() => handleJoin(warRoom.id)}
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
    </div>
  );
}
