"use client";

import React, { useRef, useEffect } from "react";

const VideoBackground = ({ src, loop = false, onVideoEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!loop && onVideoEnd) {
      const handleEnded = () => onVideoEnd();
      video.addEventListener("ended", handleEnded);
      return () => video.removeEventListener("ended", handleEnded);
    }
  }, [loop, onVideoEnd]);

  return (
    <video
      ref={videoRef}
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
      }}
    />
  );
};

export default VideoBackground;
