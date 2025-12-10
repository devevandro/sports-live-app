"use client";

import { useState } from "react";
import { VideoSidebar } from "./video-sidebar";
import { channels } from "shared/constants";

const { App } = window;
const liveVideos = await App.checkChannelsLive(channels);

export function YouTubePlayer() {
  const [selectedVideo, setSelectedVideo] = useState(liveVideos[0]);

  return (
    <div className="relative flex min-h-screen bg-[#0f0f0f]">
      <VideoSidebar
        videos={liveVideos}
        selectedVideo={selectedVideo}
        onSelectVideo={setSelectedVideo}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 ml-4">
        <div className="w-full max-w-5xl">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&mute=0`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="mt-4 text-foreground">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                AO VIVO
              </span>
              <span className="text-muted-foreground text-sm">
                {selectedVideo.viewers}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-white">
              {selectedVideo.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {selectedVideo.channel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
