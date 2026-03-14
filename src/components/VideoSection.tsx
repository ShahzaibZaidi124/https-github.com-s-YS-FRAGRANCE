import { useEffect, useState } from "react";

const VideoSection = () => {
  // keep track of which media item is loaded (video or photo)
  const [selectedIndex, setSelectedIndex] = useState(0);
  // remember most recently chosen video so we can keep showing it when images are selected
  const [lastVideoIndex, setLastVideoIndex] = useState(0);
  // remember last image index so the image stays visible until user changes it
  const [lastImageIndex, setLastImageIndex] = useState<number | null>(null);

  // helper to find an image matching the current video name (same base)
  const findAssociatedImage = (videoItem: MediaItem, list: MediaItem[]) => {
    const base = videoItem.name.replace(/\.[^/.]+$/, "");
    return list.find(
      (m) => m.type === "image" && m.name.startsWith(base)
    );
  };

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

  // rotation logic: change folder every 5 hours
  const [currentFolder, setCurrentFolder] = useState("1");

  useEffect(() => {
    const calculateFolder = () => {
      const now = new Date();
      const hoursSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60));
      // Rotate between 1, 2, 3, 4 every 5 hours
      const rotationIndex = (Math.floor(hoursSinceEpoch / 5) % 4) + 1;
      setCurrentFolder(rotationIndex.toString());
    };

    calculateFolder();
    const interval = setInterval(calculateFolder, 1000 * 60 * 5); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // filter media based on current rotation folder
  const currentMediaList = mediaList.filter(m => m.folder === currentFolder);
  
  // if current folder is empty for some reason, fallback to all media
  const activeMediaList = currentMediaList.length > 0 ? currentMediaList : mediaList;

  // exclude specific filenames from the visible tabs (files remain in assets)
  const excludeNames = new Set(["perfume video.mp4", "prfume.jpg", "perfume (1).jpg"]);
  const visibleMedia = activeMediaList.filter((m) => !excludeNames.has(m.name));

  // make sure we always have at least one item
  if (activeMediaList.length === 0) {
    activeMediaList.push({ url: "", type: "video", name: "(none)", folder: "none" });
  }

  // ensure a photo is always shown by default (lifetime visibility)
  useEffect(() => {
    // reset selection when folder changes
    setSelectedIndex(0);
    const firstVideoIdx = activeMediaList.findIndex(m => m.type === "video" && !excludeNames.has(m.name));
    setLastVideoIndex(firstVideoIdx !== -1 ? firstVideoIdx : 0);

    const currentVideo = activeMediaList[firstVideoIdx !== -1 ? firstVideoIdx : 0];
    let imgIdx: number | null = null;
    
    if (currentVideo && currentVideo.type === "video") {
      const assoc = findAssociatedImage(currentVideo, activeMediaList);
      if (assoc && !excludeNames.has(assoc.name)) {
        imgIdx = activeMediaList.findIndex((m) => m === assoc);
      }
    }
    
    if (imgIdx === null || imgIdx === -1) {
      const firstImageIdx = activeMediaList.findIndex((m) => m.type === "image" && !excludeNames.has(m.name));
      if (firstImageIdx !== -1) {
        setLastImageIndex(firstImageIdx);
      }
    } else {
      setLastImageIndex(imgIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFolder]);

  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-gold mb-0 leading-tight">
            🌟 OUR COLLECION COFFEE BLAST 🌟
          </h2>
          <p className="text-gold/60 font-body text-sm mt-2 uppercase tracking-widest">
            Currently showing: Collection {currentFolder}
          </p>
        </div>

        {/* Media Tabs (videos/photos) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
          {visibleMedia.map((item) => {
            const idx = activeMediaList.findIndex((m) => m === item);
            return (
              <button
                key={item.name}
                onClick={() => {
                  setSelectedIndex(idx);
                  if (item.type === "video") {
                    setLastVideoIndex(idx);
                    // try to find an associated image with same base name
                    const base = item.name.replace(/\.[^/.]+$/, "");
                    const assocIdx = activeMediaList.findIndex(
                      (m) => m.type === "image" && m.name.startsWith(base)
                    );
                    if (assocIdx !== -1) setLastImageIndex(assocIdx);
                  } else {
                    // image clicked -> show it persistently
                    setLastImageIndex(idx);
                  }
                }}
                className={`px-3 sm:px-6 py-2 rounded-lg font-body text-sm sm:text-base transition-all ${
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
                key={activeMediaList[lastVideoIndex].url}
                className="media-frame-video"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeMediaList[lastVideoIndex].url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
          </div>
          {/* persistently show last selected image (clicked or associated) */}
          {lastImageIndex !== null && activeMediaList[lastImageIndex]?.type === "image" && (
            <>
              <div className="mt-4 aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={activeMediaList[lastImageIndex].url}
                    alt={activeMediaList[lastImageIndex].name}
                    className="media-frame"
                  />
              </div>
              <div className="mt-4 px-4 sm:px-6 py-4 sm:py-5 rounded-lg border border-gold/30 bg-background/60 text-center">
                <p className="font-display text-xl sm:text-2xl text-gold">
                  🌟 High-Quality Bottles in Multiple Sizes 🌟
                </p>
                <p className="font-body text-base sm:text-lg text-foreground mt-2">Available Now:</p>
                <div className="mt-3 space-y-1 font-sans text-lg sm:text-xl text-white font-bold tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
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

