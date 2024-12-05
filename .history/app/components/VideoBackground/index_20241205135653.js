"use client";

import React, { useState, useEffect, useRef } from "react";

const VideoBackground = ({ src, loop = false, onVideoEnd }) => {
  const [currentVideo, setCurrentVideo] = useState(src);
  const [nextVideo, setNextVideo] = useState(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isMainActive, setIsMainActive] = useState(true);

  useEffect(() => {
    const video = isMainActive ? videoRef1.current : videoRef2.current;

    if (!loop && onVideoEnd) {
      const handleEnded = () => onVideoEnd();
      video.addEventListener("ended", handleEnded);
      return () => video.removeEventListener("ended", handleEnded);
    }
  }, [loop, onVideoEnd, isMainActive]);

  const playNextVideo = (newSrc, newLoop, onEndCallback) => {
    const mainVideo = isMainActive ? videoRef1.current : videoRef2.current;
    const transitionVideo = isMainActive ? videoRef2.current : videoRef1.current;

    // Preload the next video
    setNextVideo({ src: newSrc, loop: newLoop });
    transitionVideo.src = newSrc;
    transitionVideo.loop = newLoop;
    transitionVideo.onended = onEndCallback || null;

    // Fade out the current video and fade in the next
    transitionVideo.style.opacity = 0;
    transitionVideo.play();
    transitionVideo.style.transition = "opacity 0.5s";
    setTimeout(() => {
      mainVideo.style.opacity = 0;
      transitionVideo.style.opacity = 1;
      setTimeout(() => {
        setIsMainActive(!isMainActive);
        mainVideo.pause();
      }, 500);
    }, 100);
  };

  return (
    <>
      <video
        ref={videoRef1}
        src={currentVideo}
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
};

export default VideoBackground;
