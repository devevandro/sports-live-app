import { ENVIRONMENT } from "shared/constants";

export async function findChannelId(name: string) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&type=video&maxResults=1&key=${ENVIRONMENT.YOUTUB_API_KEY}`;
  const res = await fetch(url).then((r) => r.json());
  return res.items?.[0]?.snippet?.channelId || null;
}

export async function findLiveVideo(channelId: string) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${ENVIRONMENT.YOUTUB_API_KEY}`;
  const res = await fetch(url).then((r) => r.json());
  return res.items?.[0] || null;
}

export async function getLiveDetails(videoId: string) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoId}&key=${ENVIRONMENT.YOUTUB_API_KEY}`;
  const res = await fetch(url).then((r) => r.json());
  return res.items?.[0] || null;
}
