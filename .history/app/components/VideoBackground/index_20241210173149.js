"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isMainActive, setIsMainActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false); // New state for tracking video loading

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

      let retryCount = 0;

      const handleCanPlay = () => {
        console.log(`Video ready to play: ${newSrc}`);
        setVideoLoaded(true); // Set video as loaded

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
        retryCount++;
        console.error(`Error loading video: ${newSrc}, retrying (${retryCount}/3)...`);
        if (retryCount > 3) {
          console.error("Failed to load video after 3 attempts.");
          setIsTransitioning(false);
          return;
        }
        setTimeout(() => {
          console.log(`Retrying video load: ${newSrc}`);
          transitionVideo.load();
        }, 1000);
      };

      transitionVideo.oncanplay = handleCanPlay;
      transitionVideo.onerror = handleError;
    }
  }));

  useEffect(() => {
    const activeVideo = isMainActive ? videoRef1.current : videoRef2.current;

    if (!loop && onVideoEnd) {
      const handleEnded = () => onVideoEnd();
      activeVideo.addEventListener("ended", handleEnded);
      return () => activeVideo.removeEventListener("ended", handleEnded);
    }

    // Handle video stall events to retry playback if needed
    const handleStalled = () => {
      console.warn("Video stalled, retrying...");
      activeVideo.play();
    };

    activeVideo.addEventListener("stalled", handleStalled);
    return () => activeVideo.removeEventListener("stalled", handleStalled);
  }, [loop, onVideoEnd, isMainActive]);

  return (
    <>
      <video
        ref={videoRef1}
        src={src}
        autoPlay
        muted
        loop={loop}
        playsInline
        onError={() => console.error("Main video failed to load")}
        onCanPlay={() => setVideoLoaded(true)} // Track loading state
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