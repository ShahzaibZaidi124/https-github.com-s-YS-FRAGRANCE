import { useState } from "react";

const VideoSection = () => {
  // keep track of which media item is loaded (video or photo)
  const [selectedIndex, setSelectedIndex] = useState(0);
  // remember most recently chosen video so we can keep showing it when images are selected
  const [lastVideoIndex, setLastVideoIndex] = useState(0);
  // remember last image index so the image stays visible until user changes it
  const [lastImageIndex, setLastImageIndex] = useState<number | null>(null);

  // helper to find an image matching the current video name (same base)
  const findAssociatedImage = (videoItem: MediaItem) => {
    const base = videoItem.name.replace(/\.[^/.]+$/, "");
    return mediaList.find(
      (m) => m.type === "image" && m.name.startsWith(base)
    );
  };

  // dynamically import everything in the video_photo folder (videos + photos)
  const mediaModules = import.meta.glob<{ default: string }>(
    "../assets/video_photo/*.{mp4,jpg,jpeg,png,webp}",
    { eager: true }
  );

  interface MediaItem {
    url: string;
    type: "video" | "image";
    name: string;
  }

  const mediaList: MediaItem[] = Object.keys(mediaModules).map((path) => {
    const parts = path.split(/[/\\]/);
    const fileName = parts[parts.length - 1];
    const url = (mediaModules[path as keyof typeof mediaModules] as any).default || "";
    const ext = fileName.split(".").pop()?.toLowerCase();
    const type = ext === "mp4" ? "video" : "image";
    return { url, type, name: fileName };
  });

  // exclude specific filenames from the visible tabs (files remain in assets)
  const excludeNames = new Set(["perfume video.mp4", "prfume.jpg"]);
  const visibleMedia = mediaList.filter((m) => !excludeNames.has(m.name));

  // make sure we always have at least one item
  if (mediaList.length === 0) {
    mediaList.push({ url: "", type: "video", name: "(none)" });
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Experience Luxury
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Discover the art of perfumery through our exclusive collection
          </p>
        </div>

        {/* Media Tabs (videos/photos) */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {visibleMedia.map((item) => {
            const idx = mediaList.findIndex((m) => m === item);
            return (
              <button
                key={item.name}
                onClick={() => {
                  setSelectedIndex(idx);
                  if (item.type === "video") {
                    setLastVideoIndex(idx);
                    // try to find an associated image with same base name
                    const base = item.name.replace(/\.[^/.]+$/, "");
                    const assocIdx = mediaList.findIndex(
                      (m) => m.type === "image" && m.name.startsWith(base)
                    );
                    if (assocIdx !== -1) setLastImageIndex(assocIdx);
                  } else {
                    // image clicked -> show it persistently
                    setLastImageIndex(idx);
                  }
                }}
                className={`px-6 py-2 rounded-lg font-body transition-all ${
                  selectedIndex === idx
                    ? "bg-gold text-black"
                    : "bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Media content */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
              <video
                key={mediaList[lastVideoIndex].url}
                className="media-frame-video"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={mediaList[lastVideoIndex].url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
          </div>
          {/* persistently show last selected image (clicked or associated) */}
          {lastImageIndex !== null && mediaList[lastImageIndex]?.type === "image" && (
            <div className="mt-4 aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={mediaList[lastImageIndex].url}
                  alt={mediaList[lastImageIndex].name}
                  className="media-frame"
                />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

