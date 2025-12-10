export const ENVIRONMENT = {
  IS_DEV: process.env.NODE_ENV === "development",
  YOUTUB_API_KEY:
    process.env.YOUTUBE_API_KEY || "",
};

export const PLATFORM = {
  IS_MAC: process.platform === "darwin",
  IS_WINDOWS: process.platform === "win32",
  IS_LINUX: process.platform === "linux",
};

export const channels = [
  {
    name: "@CazeTV",
  },
  {
    name: "@canalgoatbr",
  },
  {
    name: "@getv",
  },
];
