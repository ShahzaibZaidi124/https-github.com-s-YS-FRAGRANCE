import { useEffect, useState } from "react";

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
    const mod = mediaModules[path];
    const url = mod?.default || "";
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

  // ensure a photo is always shown by default (lifetime visibility)
  useEffect(() => {
    if (lastImageIndex === null) {
      const currentVideo = mediaList[lastVideoIndex];
      let idx: number | null = null;
      if (currentVideo && currentVideo.type === "video") {
        const assoc = findAssociatedImage(currentVideo);
        if (assoc) {
          idx = mediaList.findIndex((m) => m === assoc);
        }
      }
      if (idx === null || idx === -1) {
        const firstImageIdx = mediaList.findIndex((m) => m.type === "image");
        if (firstImageIdx !== -1) {
          setLastImageIndex(firstImageIdx);
        }
      } else {
        setLastImageIndex(idx);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-gold mb-0">
            OUR COLLECION COFFEE BLAST
          </h2>
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
            <>
              <div className="mt-4 aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={mediaList[lastImageIndex].url}
                    alt={mediaList[lastImageIndex].name}
                    className="media-frame"
                  />
              </div>
              <div className="mt-4 px-6 py-5 rounded-lg border border-gold/30 bg-background/60 text-center">
                <p className="font-display text-2xl text-gold">
                  🌟 High-Quality Bottles in Multiple Sizes 🌟
                </p>
                <p className="font-body text-lg text-foreground mt-2">Available Now:</p>
                <div className="mt-3 space-y-1 font-body text-base text-foreground">
                  <p>🧴 10 ml – Mini Size</p>
                  <p>🧴 35 ml – Compact Size</p>
                  <p>🧴 50 ml – Standard Size</p>
                  <p>🧴 100 ml – Regular Size</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

