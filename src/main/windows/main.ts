import { BrowserWindow } from "electron";
import { join } from "node:path";

import { createWindow } from "lib/electron-app/factories/windows/create";
import { displayName } from "~/package.json";

export async function MainWindow() {
  const window = createWindow({
    id: "main",
    title: displayName,
    width: 1430,
    height: 780,
    minWidth: 1430,
    minHeight: 780,
    resizable: true,
    show: false,
    center: true,
    movable: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,

    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
    },
  });

  window.webContents.on("did-finish-load", () => {
    window.show();
  });

  window.on("close", () => {
    for (const window of BrowserWindow.getAllWindows()) {
      window.destroy();
    }
  });

  return window;
}
