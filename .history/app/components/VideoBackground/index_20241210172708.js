"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null); // Main video
  const videoRef2 = useRef(null); // Transition video
  const [isMainActive, setIsMainActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle imperative video control methods
  useImperativeHandle(ref, () => ({
    getCurrentVideo() {
      return isMainActive ? videoRef1.current : videoRef2.current;
    },
    playNextVideo(newSrc, newLoop = false, onEndCallback = null) {
      if (isTransitioning) {
        console.warn("Transition already in progress.");
        return;
      }

      setIsTransitioning(true);
      const mainVideo = isMainActive ? videoRef1.current : videoRef2.current;
      const transitionVideo = isMainActive ? videoRef2.current : videoRef1.current;

      // Clean up previous event listeners
      transitionVideo.oncanplay = null;
      transitionVideo.onerror = null;

      // Set new source and loop
      transitionVideo.src = newSrc;
      transitionVideo.loop = newLoop;

      // Handle video ready to play
      const handleCanPlay = () => {
        transitionVideo.play()
          .then(() => {
            mainVideo.style.opacity = 0;
            transitionVideo.style.opacity = 1;

            setTimeout(() => {
              setIsMainActive(!isMainActive);
              mainVideo.pause();
              setIsTransitioning(false);

              if (onEndCallback) {
                transitionVideo.onended = onEndCallback;
              }
            }, 500);
          })
          .catch((err) => {
            console.error("Failed to play transition video:", err);
            setIsTransitioning(false);
          });
      };

      // Retry logic for failed video loads
      const handleError = () => {
        console.error(`Error loading video: ${newSrc}`);
        setIsTransitioning(false);
      };

      transitionVideo.oncanplay = handleCanPlay;
      transitionVideo.onerror = handleError;
      transitionVideo.load();
    }
  }));

  return (
    <>
      <video
        ref={videoRef1}
        src={src}
        autoPlay
        muted
        loop={loop}
        playsInline
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