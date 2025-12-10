import { contextBridge } from "electron";
import { findChannelId, findLiveVideo, getLiveDetails } from "./utils";

declare global {
  interface Window {
    App: typeof API;
  }
}

const API = {
  sayHelloFromBridge: () => console.log("\nHello from bridgeAPI! 👋\n\n"),

  async checkChannelsLive(channels: Array<{ name: string }>): Promise<any[]> {
    const results = [];

    for (const c of channels) {
      const channelId = await findChannelId(c.name);
      if (!channelId) continue;

      const liveVideo = await findLiveVideo(channelId);
      if (!liveVideo) continue;

      const videoDetails = await getLiveDetails(liveVideo.id.videoId);

      results.push({
        channel: liveVideo.snippet.channelTitle,
        videoId: liveVideo.id.videoId,
        title: liveVideo.snippet.title,
        thumbnail: liveVideo.snippet.thumbnails.medium.url,
        viewers: videoDetails.liveStreamingDetails.concurrentViewers || 0,
      });
    }

    console.log("Live videos found:", results.length);
    return results;
  },
};

contextBridge.exposeInMainWorld("App", API);
