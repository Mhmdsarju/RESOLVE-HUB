export default function DashboardPreview() {
  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border-4 border-stone-700 bg-stone-900 shadow-2xl">

      {/* Window Header */}
      <div className="flex h-12 items-center justify-between border-b border-stone-700 bg-stone-800 px-5">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        <p className="text-xs font-semibold tracking-wide text-stone-400">
          ResolveHub Console • Incident #1084
        </p>

        <div className="w-8" />
      </div>

      {/* Body */}
      <div className="grid min-h-[520px] grid-cols-12">

        {/* Sidebar */}
        <aside className="col-span-2 border-r border-stone-800 bg-stone-950 p-4">

          <div className="mb-8 h-3 w-20 rounded bg-stone-700" />

          <div className="space-y-4">
            <div className="h-10 rounded-lg border-l-4 border-green-500 bg-stone-800" />
            <div className="h-10 rounded-lg bg-stone-900" />
            <div className="h-10 rounded-lg bg-stone-900" />
            <div className="h-10 rounded-lg bg-stone-900" />
          </div>

        </aside>

        {/* Main */}
        <main className="col-span-7 p-6">

          {/* Incident */}
          <div className="mb-6 flex items-center gap-3">

            <span className="rounded bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400">
              SEV-1
            </span>

            <h3 className="font-semibold text-white">
              Database Replica Lag Exceeding 180 Seconds
            </h3>

          </div>

          {/* Video Grid */}

          <div className="grid grid-cols-3 gap-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="relative aspect-video rounded-xl bg-stone-700"
              >
                <div className="absolute bottom-3 left-3 flex items-center gap-2">

                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="text-xs font-medium text-white">
                    Engineer {item}
                  </span>

                </div>
              </div>
            ))}

          </div>

          {/* Chat */}

          <div className="mt-8 space-y-4 border-t border-stone-800 pt-6">

            <div className="rounded-lg bg-stone-800 p-3 text-sm text-stone-300">
              <span className="font-semibold text-white">
                SRE Lead
              </span>

              {" "}
              Restarting replica node...
            </div>

            <div className="rounded-lg bg-stone-800 p-3 text-sm text-stone-300">
              <span className="font-semibold text-white">
                DBA
              </span>

              {" "}
              IOPS returned to normal baseline.
            </div>

          </div>

        </main>

        {/* Timeline */}

        <aside className="col-span-3 border-l border-stone-800 bg-stone-950 p-5">

          <h4 className="mb-6 text-sm font-bold tracking-wide text-white">
            TIMELINE
          </h4>

          <div className="space-y-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg bg-stone-800 p-3"
              >
                <div className="h-3 w-3 rounded-full bg-red-500" />

                <div className="flex-1">
                  <div className="mb-2 h-2 w-24 rounded bg-stone-600" />
                  <div className="h-2 w-16 rounded bg-stone-700" />
                </div>
              </div>
            ))}

          </div>

        </aside>

      </div>
    </div>
  );
}