import { YouTubePlayer } from "renderer/components/youtube-player";

export function MainScreen() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-background">
      <YouTubePlayer />
    </main>
  );
}
