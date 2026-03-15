import { useEffect, useState } from "react";

const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;
const FOLDER_ORDER = ["1", "2", "3", "4"];

const VideoSection = () => {
  // dynamically import everything in the video_photo folder (videos + photos)
  const mediaModules = import.meta.glob<{ default: string }>(
    "../assets/video_photo/**/*.{mp4,jpg,jpeg,png,webp}",
    { eager: true }
  );

  interface MediaItem {
    url: string;
    type: "video" | "image";
    name: string;
    folder: string;
  }

  const mediaList: MediaItem[] = Object.keys(mediaModules).map((path) => {
    const parts = path.split(/[/\\]/);
    const fileName = parts[parts.length - 1];
    const folder = parts[parts.length - 2] || "root";
    const mod = mediaModules[path];
    const url = mod?.default || "";
    const ext = fileName.split(".").pop()?.toLowerCase();
    const type = ext === "mp4" ? "video" : "image";
    return { url, type, name: fileName, folder };
  });

  // Rotate folder every 5 hours: 1 → 2 → 3 → 4 → 1 → ...
  const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
  const currentFolder = FOLDER_ORDER[currentFolderIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFolderIndex((prev) => (prev + 1) % FOLDER_ORDER.length);
    }, FIVE_HOURS_MS);
    return () => clearInterval(interval);
  }, []);

  // Show only media from the current folder (1, 2, 3, or 4) – no exclusions so all pictures show
  const activeMediaList = mediaList.filter((m) => m.folder === currentFolder);
  const videos = activeMediaList.filter((m) => m.type === "video");
  const images = activeMediaList.filter((m) => m.type === "image");

  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Media content grid */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Videos Grid - current folder only */}
          {videos.length > 0 && (
            <div className={`grid gap-6 ${videos.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {videos.map((video) => (
                <div key={video.url} className="aspect-video bg-muted rounded-xl overflow-hidden shadow-2xl border border-gold/10 flex items-center justify-center">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          )}

          {/* Images Grid */}
          {images.length > 0 && (
            <div className={`grid gap-6 ${images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {images.map((image) => (
                <div key={image.url} className="aspect-video bg-muted rounded-xl overflow-hidden shadow-2xl border border-gold/10 flex items-center justify-center">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Bottle Sizes Info (Always visible) */}
          <div className="mt-8 px-4 sm:px-6 py-6 sm:py-8 rounded-2xl border border-gold/30 bg-background/60 text-center backdrop-blur-sm">
            <p className="font-display text-xl sm:text-3xl text-gold mb-4">
              🌟 High-Quality Bottles in Multiple Sizes 🌟
            </p>
            <p className="font-body text-base sm:text-lg text-white/80 mb-6">Available Now:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-lg sm:text-xl text-white font-bold tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              <p className="flex items-center justify-center gap-2">🧴 10 ml – Mini Size</p>
              <p className="flex items-center justify-center gap-2">🧴 35 ml – Compact Size</p>
              <p className="flex items-center justify-center gap-2">🧴 50 ml – Standard Size</p>
              <p className="flex items-center justify-center gap-2">🧴 100 ml – Regular Size</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

