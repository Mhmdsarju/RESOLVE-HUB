export default function RouteLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDEAE3] px-4">
      <div className="text-center">
        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-[#F0E7D5]
            shadow-sm
          "
        >
          <div
            className="
              h-8
              w-8
              animate-spin
              rounded-full
              border-4
              border-[#D8C9BD]
              border-t-[#4B3932]
            "
          />
        </div>

        <h2 className="mt-5 text-lg font-bold text-[#4B3932]">Loading ResolveHub</h2>

        <p className="mt-1 text-sm text-stone-500">Preparing your workspace...</p>
      </div>
    </main>
  );
}
