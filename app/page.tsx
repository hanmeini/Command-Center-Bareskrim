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
      ? Array.from({ length: 7 })
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

  // Generate random stable-ish technical data for "visual flavor"
  const getRandomData = (index: number) => {
    const id = `CAM-${(index + 10).toString(16).toUpperCase()}`;
    const lat = `-6.${2000 + index * 10}`;
    const long = `106.${8000 + index * 5}`;
    return { id, lat, long };
  };

  return (
    <main className="min-h-screen bg-[#050505] text-red-500 font-mono relative overflow-hidden flex flex-col selection:bg-red-900/50">
      {/* Tactical Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_90%)]"></div>
      </div>

      {/* Top Status Bar (Header) */}
      <header className="relative z-30 w-full border-b-2 border-red-900/30 bg-black/80 backdrop-blur-md">
        <div className="max-w-[2400px] mx-auto px-4 py-2 flex items-center justify-between">
          {/* Left: Brand / System Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative flex items-center justify-center border border-red-800 bg-red-950/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/favivon.ico"
                  alt="Logo"
                  className="w-5 h-5 opacity-80 mix-blend-screen"
                />
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-red-500"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-red-500"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-[0.2em] text-red-500 leading-none">
                  COMMAND<span className="text-white">CENTER</span>
                </h1>
                <span className="text-[10px] text-red-700 tracking-[0.3em] uppercase">
                  Bareskrim Polri // SEC_LEV_5
                </span>
              </div>
            </div>
          </div>

          {/* Center: Time / Mode */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-red-800 tracking-widest">
                SYSTEM_TIME
              </span>
              <span className="text-2xl font-bold text-white tracking-widest">
                {currentTime}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-red-900/50"></div>
            <div className="flex gap-2">
              <button
                onClick={() => setLayoutMode("grid")}
                className={`px-4 py-1 border ${layoutMode === "grid" ? "border-red-500 bg-red-500/10 text-red-400" : "border-red-900/30 text-red-900 hover:text-red-700"} text-xs tracking-wider transition-all`}
              >
                GRID_VIEW
              </button>
              <button
                onClick={() => setLayoutMode("bento")}
                className={`px-4 py-1 border ${layoutMode === "bento" ? "border-amber-500 bg-amber-500/10 text-amber-500" : "border-red-900/30 text-red-900 hover:text-red-700"} text-xs tracking-wider transition-all`}
              >
                TACTICAL_VIEW
              </button>
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
                    className={`w-8 h-8 flex items-center justify-center border text-xs font-bold transition-all ${gridCols === cols ? "border-red-500 bg-red-500 text-black" : "border-red-900/40 text-red-800"}`}
                  >
                    {cols}
                  </button>
                ))}
              </div>
            )}
            <div className="px-3 py-1 bg-red-600 text-black text-xs font-bold animate-pulse">
              LIVE_FEED
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Area */}
      <div className="relative z-20 flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
        <div
          className={`
                grid gap-2 w-full max-w-[2400px] mx-auto pb-10 transition-all duration-300
                ${mounted ? "opacity-100" : "opacity-0"}
                ${getGridColsClass()}
                ${layoutMode === "bento" ? "grid-rows-4 md:grid-rows-3 gap-3" : ""}
            `}
        >
          {cameras.map((_, index) => {
            const data = getRandomData(index);
            return (
              <div
                key={index}
                className={`
                            relative bg-black border border-red-900/20 overflow-hidden group hover:border-red-500/50 transition-colors duration-300
                            ${getBentoClasses(index)}
                            ${layoutMode === "bento" ? "aspect-auto" : "aspect-video"}
                        `}
              >
                {/* Video Layer */}
                <div className="absolute inset-[2px] z-10">
                  <iframe
                    src={iframeSrc}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 grayscale-[0.3] hover:grayscale-0 contrast-125"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                  {/* Scanlines inside video */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40"></div>
                </div>

                {/* HUD Overlay Layer */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {/* Corner Brackets */}
                  <svg
                    className="absolute top-2 left-2 w-8 h-8 text-red-600 opacity-60"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M0,10 L0,0 L10,0"
                    />
                  </svg>
                  <svg
                    className="absolute top-2 right-2 w-8 h-8 text-red-600 opacity-60"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M22,0 L32,0 L32,10"
                    />
                  </svg>
                  <svg
                    className="absolute bottom-2 left-2 w-8 h-8 text-red-600 opacity-60"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M0,22 L0,32 L10,32"
                    />
                  </svg>
                  <svg
                    className="absolute bottom-2 right-2 w-8 h-8 text-red-600 opacity-60"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M32,22 L32,32 L22,32"
                    />
                  </svg>

                  {/* Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity">
                    <div className="w-8 h-[1px] bg-red-500"></div>
                    <div className="h-8 w-[1px] bg-red-500 absolute"></div>
                    <div className="w-20 h-20 border border-red-500/50 rounded-full absolute"></div>
                  </div>

                  {/* Data Blocks */}
                  <div className="absolute top-3 left-10 text-[10px] font-bold text-red-500 bg-black/50 px-2 tracking-widest backdrop-blur-sm">
                    {data.id} :: LIVE
                  </div>

                  <div className="absolute bottom-3 right-10 flex flex-col items-end text-[9px] text-red-400/80 leading-tight bg-black/50 p-1 backdrop-blur-sm">
                    <span>
                      COORD: {data.lat}, {data.long}
                    </span>
                    <span>BW: 4.5MBPS // SIG: 98%</span>
                  </div>

                  {/* REC indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-bold text-red-600">
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
      <footer className="relative z-30 w-full border-t border-red-900/30 bg-black/90 px-6 py-2 flex items-center justify-between text-[10px] text-red-800/80 uppercase tracking-widest">
        <div className="flex gap-6">
          <span>
            SYS_STATUS: <span className="text-red-500">OPTIMAL</span>
          </span>
          <span>ACT_THREADS: 12</span>
          <span>NET_LATENCY: 14ms</span>
        </div>
        <div className="flex gap-1 opacity-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-2 bg-red-900"
              style={{ opacity: Math.random() }}
            ></div>
          ))}
        </div>
        <div>&copy; 2024 POLRI_COMMAND_SYSTEM // v2.1.0_BUILD_ALPHA</div>
      </footer>
    </main>
  );
}
