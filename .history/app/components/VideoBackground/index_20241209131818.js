"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isMainActive, setIsMainActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useImperativeHandle(ref, () => ({
    getCurrentVideo() {
      return isMainActive ? videoRef1.current : videoRef2.current;
    },
    playNextVideo(newSrc, newLoop, onEndCallback) {
      if (isTransitioning) return; // Prevent overlapping transitions
      setIsTransitioning(true);

      const mainVideo = isMainActive ? videoRef1.current : videoRef2.current;
      const transitionVideo = isMainActive ? videoRef2.current : videoRef1.current;

      // Set up the next video
      transitionVideo.src = newSrc;
      transitionVideo.loop = newLoop;
      transitionVideo.onended = onEndCallback || null;

      const handleCanPlay = () => {
        transitionVideo.style.opacity = 0;
        transitionVideo.play();

        // Smooth transition
        mainVideo.style.transition = "opacity 0.5s";
        transitionVideo.style.transition = "opacity 0.5s";

        mainVideo.style.opacity = 0; // Fade out current video
        transitionVideo.style.opacity = 1; // Fade in new video

        setTimeout(() => {
          setIsMainActive(!isMainActive); // Switch active video
          mainVideo.pause(); // Pause the previous video
          setIsTransitioning(false); // Allow new transitions
        }, 500); // Match fade duration
      };

      // Attach event listener for readiness
      transitionVideo.oncanplay = handleCanPlay;
    },
  }));

  useEffect(() => {
    const activeVideo = isMainActive ? videoRef1.current : videoRef2.current;

    if (!loop && onVideoEnd) {
      const handleEnded = () => onVideoEnd();
      activeVideo.addEventListener("ended", handleEnded);
      return () => activeVideo.removeEventListener("ended", handleEnded);
    }
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
