"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [layoutMode, setLayoutMode] = useState<"grid" | "bento">("grid");
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate items based on mode
  const cameras =
    layoutMode === "bento"
      ? Array.from({ length: 12 })
      : Array.from({ length: 12 });

  // The provided iframe URL
  const iframeSrc =
    "https://lawulive.polisihebat.org:5443/live/play.html?id=streamId_R0KwkoIFw";

  const getBentoClasses = (index: number) => {
    if (layoutMode !== "bento") return "";
    switch (index) {
      case 0:
        return "md:col-span-2 md:row-span-2"; // Main
      case 1:
        return "md:col-span-2 md:row-span-1";
      case 6:
        return "md:col-span-2 md:row-span-1";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  const getGridColsClass = () => {
    if (layoutMode === "bento") return "grid-cols-1 md:grid-cols-4";
    switch (gridCols) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default:
        return "grid-cols-4";
    }
  };

  const getRandomData = (index: number) => {
    const id = `CAM-${(index + 10).toString(16).toUpperCase()}`;
    const lat = `-6.${2000 + index * 10}`;
    const long = `106.${8000 + index * 5}`;
    return { id, lat, long };
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-mono relative overflow-hidden flex flex-col selection:bg-blue-500/30">
      {/* Light Tactical Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]"></div>
      </div>

      {/* Top Status Bar (Header) */}
      <header className="relative z-30 w-full border-b border-slate-300 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-[2400px] mx-auto px-4 py-2 flex items-center justify-between">
          {/* Left: Brand / System Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 relative flex items-center justify-center border border-slate-800 bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/favivon.ico"
                  alt="Logo"
                  className="w-20 h-20 opacity-90 mix-blend-multiply"
                />
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-slate-800"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-slate-800"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-[0.2em] text-slate-900 leading-none">
                  DIT <span className="text-slate-500">TIPUDEKSUS</span>
                </h1>
                <span className="text-xl font-bold tracking-[0.2em] text-slate-500 leading-none">
                  BARESKRIM <span className="text-slate-900">POLRI</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center: Title / Time / Mode */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold tracking-[0.2em] text-slate-900 leading-none">
                COMMAND<span className="text-slate-500">CENTER</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-slate-800 tracking-widest leading-none">
                  {currentTime}
                </span>
                {/* Removed separate SYSTEM_TIME label to save vertical space if needed, checking request: "diatas sistem time dan grid view" - implies stacking. */}
              </div>
              <div className="h-4 w-[1px] bg-slate-300"></div>
              <div className="flex gap-2">
                <button
                  onClick={() => setLayoutMode("grid")}
                  className={`px-3 py-0.5 border ${layoutMode === "grid" ? "border-slate-800 bg-slate-800 text-white" : "border-slate-300 text-slate-500 hover:text-slate-800 hover:border-slate-400"} text-[10px] tracking-wider transition-all font-bold`}
                >
                  GRID
                </button>
                <button
                  onClick={() => setLayoutMode("bento")}
                  className={`px-3 py-0.5 border ${layoutMode === "bento" ? "border-amber-500 bg-amber-500 text-white" : "border-slate-300 text-slate-500 hover:text-slate-800 hover:border-slate-400"} text-[10px] tracking-wider transition-all font-bold`}
                >
                  TACTICAL
                </button>
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-4">
            {layoutMode === "grid" && (
              <div className="flex gap-1">
                {[2, 3, 4].map((cols) => (
                  <button
                    key={cols}
                    onClick={() => setGridCols(cols as 2 | 3 | 4)}
                    className={`w-8 h-8 flex items-center justify-center border text-xs font-bold transition-all ${gridCols === cols ? "border-slate-800 bg-slate-800 text-white" : "border-slate-300 text-slate-500 hover:bg-slate-100"}`}
                  >
                    {cols}
                  </button>
                ))}
              </div>
            )}
            <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold animate-pulse shadow-md shadow-red-500/20">
              LIVE
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Area */}
      <div className="relative z-20 flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
        <div
          className={`
                grid gap-3 w-full max-w-[2400px] mx-auto pb-10 transition-all duration-300
                ${mounted ? "opacity-100" : "opacity-0"}
                ${getGridColsClass()}
                ${layoutMode === "bento" ? "grid-rows-4 md:grid-rows-3 gap-4" : ""}
            `}
        >
          {cameras.map((_, index) => {
            const data = getRandomData(index);
            return (
              <div
                key={index}
                className={`
                            relative bg-white border border-slate-300 overflow-hidden group hover:border-slate-800 transition-all duration-300 shadow-sm
                            ${getBentoClasses(index)}
                            ${layoutMode === "bento" ? "aspect-auto min-h-[250px]" : "aspect-video"}
                        `}
              >
                {/* Video Layer */}
                <div className="absolute inset-[3px] z-10 bg-slate-900 border border-slate-100">
                  <iframe
                    src={iframeSrc}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 contrast-125 brightness-110"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                  {/* Dark Scanlines for light mode - subtle */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_3px] pointer-events-none opacity-30"></div>
                </div>

                {/* HUD Overlay Layer (Dark Inverted) */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {/* Corner Brackets */}
                  <svg
                    className="absolute top-2 left-2 w-8 h-8 text-slate-800 opacity-80"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      d="M0,10 L0,0 L10,0"
                    />
                  </svg>
                  <svg
                    className="absolute top-2 right-2 w-8 h-8 text-slate-800 opacity-80"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      d="M22,0 L32,0 L32,10"
                    />
                  </svg>
                  <svg
                    className="absolute bottom-2 left-2 w-8 h-8 text-slate-800 opacity-80"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      d="M0,22 L0,32 L10,32"
                    />
                  </svg>
                  <svg
                    className="absolute bottom-2 right-2 w-8 h-8 text-slate-800 opacity-80"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      d="M32,22 L32,32 L22,32"
                    />
                  </svg>

                  {/* Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity">
                    <div className="w-12 h-[1px] bg-slate-800"></div>
                    <div className="h-12 w-[1px] bg-slate-800 absolute"></div>
                    <div className="w-24 h-24 border border-slate-800/80 rounded-full absolute border-dashed"></div>
                  </div>

                  {/* Data Blocks (Light Frost) */}
                  <div className="absolute top-4 left-10 text-[10px] font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 tracking-widest backdrop-blur-sm shadow-sm">
                    {data.id} :: ONLINE
                  </div>

                  <div className="absolute bottom-4 right-10 flex flex-col items-end text-[9px] text-slate-700 bg-white/80 border border-slate-200 p-1 backdrop-blur-sm shadow-sm font-bold">
                    <span>
                      COORD: {data.lat}, {data.long}
                    </span>
                    <span>BW: 4.5MBPS // SIG: 98%</span>
                  </div>

                  {/* REC indicator */}
                  <div className="absolute top-5 right-5 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
                    <span className="text-[9px] font-bold text-red-600 bg-white/90 px-1 rounded-sm">
                      REC
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <footer className="relative z-30 w-full border-t border-slate-300 bg-white/95 px-6 py-2 flex items-center justify-between text-[10px] text-slate-600 uppercase tracking-widest font-bold">
        <div className="flex gap-6">
          <span>
            SYS_STATUS: <span className="text-emerald-600">OPTIMAL</span>
          </span>
          <span>ACT_THREADS: 12</span>
          <span>NET_LATENCY: 14ms</span>
        </div>
        <div className="flex gap-1 opacity-80">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-2 bg-slate-300"
              style={{ opacity: 0.2 + (i % 5) * 0.15 }}
            ></div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          &copy; 2026 BARESKRIM_COMMAND // v2.1.0_LIGHT_OPS
        </div>
      </footer>
    </main>
  );
}
