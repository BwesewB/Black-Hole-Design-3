"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null); // Main video reference
  const videoRef2 = useRef(null); // Second video reference
  const [isMainActive, setIsMainActive] = useState(true); // State to toggle videos

  useImperativeHandle(ref, () => ({
    playNextVideo(newSrc, newLoop, onEndCallback) {
      const mainVideo = isMainActive ? videoRef1.current : videoRef2.current;
      const nextVideo = isMainActive ? videoRef2.current : videoRef1.current;

      // Set up the next video source and loop
      nextVideo.src = newSrc;
      nextVideo.loop = newLoop;
      nextVideo.onended = () => {
        setIsMainActive(!isMainActive); // Switch active video
        nextVideo.style.display = "none"; // Hide the second video once it ends
        if (onEndCallback) onEndCallback(); // Execute callback after video ends
      };

      // Ensure the next video is ready to play
      nextVideo.oncanplay = () => {
        nextVideo.play(); // Play the next video immediately
      };

      // Hide the main video once it ends
      mainVideo.onended = () => {
        mainVideo.style.display = "none"; // Hide the first video once it ends
      };
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
          zIndex: -1,
          display: isMainActive ? "block" : "none", // Show or hide based on active state
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
          display: isMainActive ? "none" : "block", // Show or hide based on active state
        }}
      />
    </>
  );
});

export default VideoBackground;
