export const ENVIRONMENT = {
  IS_DEV: process.env.NODE_ENV === "development",
  YOUTUB_API_KEY:
    process.env.YOUTUBE_API_KEY || "AIzaSyAcq7ZLGwyiVPnbq1I0K6hacV5lSL-xY3Q",
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
