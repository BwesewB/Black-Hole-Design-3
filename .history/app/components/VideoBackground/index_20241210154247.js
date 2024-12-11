"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null); // Main video
  const videoRef2 = useRef(null); // Transition video
  const [isMainActive, setIsMainActive] = useState(true); // Determine which video is currently playing
  const [isTransitioning, setIsTransitioning] = useState(false); // Track if a transition is in progress

  // Handle imperative video control methods
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

      console.log(`Preloading next video: ${newSrc}`);

      // Set the next video's source and loop setting (but don't play it yet)
      transitionVideo.src = newSrc;
      transitionVideo.loop = newLoop;

      // Preload the video, this will load it without showing it
      transitionVideo.load();

      // Handle the successful loading of the video
      const handleCanPlay = () => {
        console.log(`Next video is ready to play: ${newSrc}`);

        // Wait for the transition to start
        setIsTransitioning(false);

        // Start the transition when the current video ends
        mainVideo.style.transition = "opacity 0.5s";
        transitionVideo.style.transition = "opacity 0.5s";

        mainVideo.style.opacity = 0;
        transitionVideo.style.opacity = 1;

        // Swap the main and transition videos after a short delay
        setTimeout(() => {
          setIsMainActive(!isMainActive);
          mainVideo.pause();
          if (onEndCallback) {
            transitionVideo.onended = () => {
              console.log("Transition video ended.");
              onEndCallback();
            };
          }
        }, 500);
      };

      // Error handling if the video fails to load
      const handleError = () => {
        console.error(`Error loading video: ${newSrc}`);
        setIsTransitioning(false);
      };

      transitionVideo.oncanplay = handleCanPlay;
      transitionVideo.onerror = handleError;
    }
  }));

  // Video end and retry logic
  useEffect(() => {
    const activeVideo = isMainActive ? videoRef1.current : videoRef2.current;

    if (!loop && onVideoEnd) {
      const handleEnded = () => onVideoEnd();
      activeVideo.addEventListener("ended", handleEnded);
      return () => activeVideo.removeEventListener("ended", handleEnded);
    }

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
