"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null); // Main video reference
  const videoRef2 = useRef(null); // Overlay video reference
  const [isMainActive, setIsMainActive] = useState(true);

  useImperativeHandle(ref, () => ({
    playNextVideo(newSrc, newLoop, onEndCallback) {
      const mainVideo = isMainActive ? videoRef1.current : videoRef2.current;
      const overlayVideo = isMainActive ? videoRef2.current : videoRef1.current;

      // Preload and configure the next video
      overlayVideo.src = newSrc;
      overlayVideo.loop = newLoop;
      overlayVideo.onended = () => {
        setIsMainActive(!isMainActive); // Toggle active video after the second video ends
        overlayVideo.style.display = "none"; // Hide the overlay video once it's done
        if (onEndCallback) onEndCallback(); // Call the callback after the video ends
      };

      // Start the overlay video instantly without delay
      overlayVideo.style.display = "block"; // Ensure it's visible
      overlayVideo.play();
    },
  }));

  useEffect(() => {
    const video = isMainActive ? videoRef1.current : videoRef2.current;

    if (!loop && onVideoEnd) {
      const handleEnded = () => onVideoEnd();
      video.addEventListener("ended", handleEnded);
      return () => video.removeEventListener("ended", handleEnded);
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
          zIndex: -2, // Behind overlay video
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
          zIndex: -1, // Overlaying the first video
          display: "none", // Hidden by default
        }}
      />
    </>
  );
});

export default VideoBackground;
