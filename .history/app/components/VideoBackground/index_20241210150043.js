import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isMainActive, setIsMainActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useImperativeHandle(ref, () => ({
    getCurrentVideo() {
      return isMainActive ? videoRef1.current : videoRef2.current;
    },
    playNextVideo(newSrc, newLoop, onEndCallback) {
      if (isTransitioning) {
        console.warn("Transition already in progress.");
        return;
      }

      setIsTransitioning(true);
      const mainVideo = isMainActive ? videoRef1.current : videoRef2.current;
      const transitionVideo = isMainActive ? videoRef2.current : videoRef1.current;

      console.log(`Attempting to load video: ${newSrc}`);

      // Reset previous video settings
      transitionVideo.oncanplay = null;
      transitionVideo.onerror = null;

      // Load the next video source
      transitionVideo.src = newSrc;
      transitionVideo.loop = newLoop;

      const handleCanPlay = () => {
        console.log(`Video ready to play: ${newSrc}`);
        setVideoLoaded(true);
        transitionVideo.style.opacity = 0;
        transitionVideo.play().then(() => {
          mainVideo.style.transition = "opacity 0.5s";
          transitionVideo.style.transition = "opacity 0.5s";

          mainVideo.style.opacity = 0;
          transitionVideo.style.opacity = 1;

          setTimeout(() => {
            setIsMainActive(!isMainActive);
            mainVideo.pause();
            setIsTransitioning(false);

            if (onEndCallback) {
              transitionVideo.onended = () => {
                transitionVideo.onended = null;
                console.log("Transition video ended.");
                onEndCallback();
              };
            }
          }, 500);
        }).catch((err) => {
          console.error("Failed to play transition video:", err);
          setIsTransitioning(false);
        });
      };

      const handleError = () => {
        setRetryCount(prev => prev + 1);
        console.error(`Error loading video: ${newSrc}, retrying (${retryCount}/3)...`);
        if (retryCount >= 3) {
          console.error("Failed to load video after 3 attempts.");
          setIsTransitioning(false);
          return;
        }
        setTimeout(() => {
          console.log(`Retrying video load: ${newSrc}`);
          transitionVideo.load();
        }, Math.pow(2, retryCount) * 1000); // Exponential backoff retry logic
      };

      transitionVideo.oncanplay = handleCanPlay;
      transitionVideo.onerror = handleError;
    }
  }));

  useEffect(() => {
    const activeVideo = isMainActive ? videoRef1.current : videoRef2.current;

    // Handle video stall events to retry playback if needed
    const handleStalled = () => {
      console.warn("Video stalled, retrying...");
      activeVideo.play();
    };

    activeVideo.addEventListener("stalled", handleStalled);
    return () => activeVideo.removeEventListener("stalled", handleStalled);
  }, [isMainActive]);

  return (
    <>
      <video
        ref={videoRef1}
        src={src}
        autoPlay
        muted
        loop={loop}
        preload="auto"  // Preload the video to ensure it's ready
        playsInline
        onError={() => console.error("Main video failed to load")}
        onCanPlay={() => setVideoLoaded(true)} // Track video loading state
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: isMainActive ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      />
      <video
        ref={videoRef2}
        muted
        preload="auto" // Preload transition video
        playsInline
        onError={() => console.error("Transition video failed to load")}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: isMainActive ? 0 : 1,
          transition: "opacity 0.5s",
        }}
      />
    </>
  );
});

export default VideoBackground;
