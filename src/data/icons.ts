export const iconPaths = {
  interior: "M3 21V4a1 1 0 0 1 1-1h11v18M3 21h18M7 7h4M7 11h4M7 15h4M18 10h3v11M17 14h4M17 18h4",
  table: "M3 9h18v4H3zM5 13v8M19 13v8M5 17h14M7 5h10",
  cabinet: "M4 4h16v16H4zM4 11h16M12 4v16M9 7v1M15 7v1M9 14v2M15 14v2M6 20v2M18 20v2",
  wall: "M3 4h18v16H3zM3 9h18M3 15h18M9 4v5M15 9v6M9 15v5",
  ceiling: "M3 7V3h18v4M3 7h18M7 7v3h10V7M12 10v5M8 17h8l2 4H6z",
  elevator: "M4 3h16v18H4zM7 7h10v14M12 7v14M8 5h1M15 5h1M2 11V8M2 8 1 9M2 8l1 1",
  wood: "M6 3c-3 3-3 15 1 18M12 3c-4 4-4 7-1 10s3 5 1 8M18 3c-3 3-3 6 0 9s3 6 0 9M7 9c0-2 2-3 3-2M6 16c-1 2 0 4 1 5",
  stone: "M3 3h18v18H3zM6 3l3 5-2 4 5 3-1 6M16 3l-2 6 4 4-2 8M9 8l5 1M12 15l6-2",
  solid: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2M7 7h10M7 11h6",
  fabric: "M6 3v18M12 3v18M18 3v18M3 6h18M3 12h18M3 18h18",
  concrete: "M4 3h16v18H4zM8 7h1M14 6h2M7 12h2M15 13h1M11 17h2M17 18h1M7 18h1",
  metal: "M4 3h16v18H4zM7 16 16 7M7 11l4-4M10 18l7-7M15 18l2-2",
  mirror: "M6 3h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2M9 20v2M15 20v2M7 12l5-5M12 15l5-5",
  swatches: "M3 5h6v16H3zM9 16l6-11 5 3-7 13H9M9 21h12v-6h-5M6 17v1",
  phone: "M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2z",
  arrow: "M4 12h16M14 6l6 6-6 6",
  check: "m5 12 4 4L19 6",
} as const;

export type IconName = keyof typeof iconPaths;

const categoryIcons: Record<string, IconName> = {
  "dan-film-noi-that": "interior", "dan-film-ban": "table", "dan-film-tu-bep": "cabinet",
  "dan-film-tuong": "wall", "dan-film-tran": "ceiling", "dan-film-thang-may": "elevator",
  "van-go": "wood", "da-cam-thach": "stone", "don-sac": "solid", "van-vai": "fabric",
  "be-tong": "concrete", "kim-loai": "metal", "trang-guong": "mirror",
  "vat-lieu": "swatches",
};

export const categoryIcon = (path: string): IconName | undefined => categoryIcons[path.split("/").filter(Boolean).at(-1) || ""];
