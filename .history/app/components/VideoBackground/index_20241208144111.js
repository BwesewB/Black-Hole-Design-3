"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isMainActive, setIsMainActive] = useState(true);

  // Expose `getCurrentVideo` to parent component through `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    // Returns the currently active video element (either videoRef1 or videoRef2)
    getCurrentVideo() {
      return isMainActive ? videoRef1.current : videoRef2.current;
    },
    playNextVideo(newSrc, newLoop, onEndCallback) {
      const mainVideo = isMainActive ? videoRef1.current : videoRef2.current;
      const transitionVideo = isMainActive ? videoRef2.current : videoRef1.current;

      // Set up the next video source and loop
      transitionVideo.src = newSrc;
      transitionVideo.loop = newLoop;
      transitionVideo.onended = onEndCallback || null;

      // Wait for the video to be ready to play
      transitionVideo.oncanplay = () => {
        transitionVideo.style.opacity = 0;
        transitionVideo.play();

        // Start the fade transition
        mainVideo.style.transition = "opacity 0.5s";
        transitionVideo.style.transition = "opacity 0.5s";

        mainVideo.style.opacity = 0; // Fade out current video
        transitionVideo.style.opacity = 1; // Fade in new video

        setTimeout(() => {
          setIsMainActive(!isMainActive); // Switch active video
          mainVideo.pause(); // Pause the previous video
        }, 500); // Match the duration of the fade
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