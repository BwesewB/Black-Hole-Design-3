import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function VideoBackground({ src }) {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       // Smooth transition animation for video opacity
//       gsap.fromTo(
//         videoRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 1, ease: "power1.out" }
//       );
//     }
//   }, [src]);

  return (
    <video
      ref={videoRef}
      className="video-background"
      src={src}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        // zIndex: -1,
      }}
    />
  );
}
