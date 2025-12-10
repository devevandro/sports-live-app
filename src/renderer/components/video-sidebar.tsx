/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, Radio } from "lucide-react";
import { cn } from "../lib/utils";

interface Video {
  id: string;
  title: string;
  channel: string;
  viewers: string;
  thumbnail: string;
}

interface VideoSidebarProps {
  videos: Video[];
  selectedVideo: Video;
  onSelectVideo: (video: Video) => void;
}

export function VideoSidebar({
  videos,
  selectedVideo,
  onSelectVideo,
}: VideoSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    setDisplayedVideos(videos.concat(videos).concat(videos));
  }, [videos]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight * 0.8 && !loadingRef.current) {
      loadingRef.current = true;
      setTimeout(() => {
        setDisplayedVideos((prev) => [...prev, ...videos]);
        loadingRef.current = false;
      }, 300);
    }
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out",
        isExpanded ? "w-80" : "w-4"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={cn(
          "cursor-pointer absolute left-0 top-0 h-full w-4 bg-linear-to-r from-red-600/20 to-transparent flex items-center justify-center transition-opacity duration-300",
          isExpanded ? "opacity-0" : "opacity-100"
        )}
      >
        <ChevronRight className="w-4 h-4 text-red-500 animate-pulse" />
      </div>

      <div
        className={cn(
          "h-full bg-[#181818] border-r border-[#272727] overflow-hidden transition-all duration-300",
          isExpanded
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
        )}
      >
        <div className="p-4 border-b border-[#272727]">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-500" />
            <h2 className="font-semibold text-white">Lives</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Transmissões ao vivo
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-auto h-[calc(100%-80px)] p-2 space-y-2 custom-scrollbar"
        >
          {displayedVideos.map((video, index) => (
            <button
              key={`${video.id}-${index}`}
              onClick={() => onSelectVideo(video)}
              className={cn(
                "cursor-pointer w-full p-2 rounded-lg transition-all duration-200 text-left group",
                selectedVideo.id === video.id
                  ? "bg-[#272727] ring-1 ring-red-500/50"
                  : "hover:bg-[#272727]/50"
              )}
            >
              <div className="relative aspect-video rounded-md overflow-hidden mb-2">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  AO VIVO
                </div>
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                  {video.viewers}
                </div>
              </div>
              <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                {video.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {video.channel}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
