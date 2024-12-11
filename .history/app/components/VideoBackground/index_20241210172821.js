"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ src, loop = false, onVideoEnd }, ref) => {
  const videoRef1 = useRef(null); // Main video
  const videoRef2 = useRef(null); // Transition video
  const [isMainActive, setIsMainActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false); // Track video loading
  const [loading, setLoading] = useState(true); // Track loading state
  const [retryCount, setRetryCount] = useState(0); // Track retry attempts

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
        setLoading(true);
        setRetryCount(0); // Reset retries for new video
    
        const mainVideo = isMainActive ? videoRef1.current : videoRef2.current;
        const transitionVideo = isMainActive ? videoRef2.current : videoRef1.current;
    
        console.log(`Starting video transition to: ${newSrc}`);
    
        // Clean up previous event listeners
        transitionVideo.oncanplay = null;
        transitionVideo.onerror = null;
    
        // Set new source and loop
        transitionVideo.src = newSrc;
        transitionVideo.loop = newLoop;
    
        let retries = 0;
    
        // Handle video ready to play
        const handleCanPlay = () => {
            console.log(`Transition video is ready: ${newSrc}`);
            setVideoLoaded(true);
    
            // Start playing the transition video
            transitionVideo.play().then(() => {
                // Fade out main and fade in transition video
                mainVideo.style.opacity = 0;
                transitionVideo.style.opacity = 1;
    
                setTimeout(() => {
                    setIsMainActive(!isMainActive); // Toggle active video
                    mainVideo.pause(); // Pause old video
                    setIsTransitioning(false);
                    setLoading(false);
    
                    if (onEndCallback) {
                        transitionVideo.onended = onEndCallback;
                    }
                }, 500); // Match CSS transition
            }).catch((err) => {
                console.error("Failed to play transition video:", err);
                setIsTransitioning(false);
                setLoading(false);
            });
        };
    
        // Retry logic for failed video loads
        const handleError = () => {
            retries++;
            console.error(`Error loading video: ${newSrc}, retry attempt (${retries}/3)`);
    
            if (retries >= 3) {
                console.error("Failed to load video after 3 retries.");
                setIsTransitioning(false);
                setLoading(false);
                return;
            }
    
            setTimeout(() => {
                console.log(`Retrying video load: ${newSrc}`);
                transitionVideo.load(); // Reload video
            }, 1000);
        };
    
        // Assign event listeners
        transitionVideo.oncanplay = handleCanPlay;
        transitionVideo.onerror = handleError;
    
        // Trigger video loading
        transitionVideo.load();
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
    // muted
    loop={loop}
    playsInline
    onError={() => console.error("Main video failed to load")}
    onCanPlay={() => setVideoLoaded(true)}
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
    // muted
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
