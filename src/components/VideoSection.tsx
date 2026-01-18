import videoFile from "../assets/videos/video.mp4";

const VideoSection = () => {
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

        {/* Video content */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

