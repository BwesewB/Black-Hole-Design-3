"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isMainActive, setIsMainActive] = useState(true);

  useImperativeHandle(ref, () => ({
    playNextVideo(newSrc, newLoop, onEndCallback) {
      const mainVideo = isMainActive ? videoRef1.current : videoRef2.current;
      const overlayVideo = isMainActive ? videoRef2.current : videoRef1.current;

      // Configure the overlay video
      overlayVideo.src = newSrc;
      overlayVideo.loop = newLoop;
      overlayVideo.onended = () => {
        overlayVideo.style.display = "none"; // Hide the overlay video
        setIsMainActive(!isMainActive); // Switch active state
        if (onEndCallback) onEndCallback();
      };

      // Play the overlay video
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
          zIndex: -2,
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
          display: "none", // Hidden by default
        }}
      />
    </>
  );
});

export default VideoBackground;
