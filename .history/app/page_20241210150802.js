"use client"; 

import gsap from "gsap";
import React, { useState, useRef } from "react";
import VideoBackground from "./components/VideoBackground";
import LandingPage from "./pageComponent/LandingPage";
import PageOne from "./pageComponent/Page1";
import PageTwo from "./pageComponent/Page2";
import PageThree from "./pageComponent/Page3";
import PageFour from "./pageComponent/Page4";
import PageFive from "./pageComponent/Page5";
import PageSix from "./pageComponent/Page6";
import PageSeven from "./pageComponent/Page7";
import PageEight from "./pageComponent/Page8";
import PageNine from "./pageComponent/Page9";
import PageTen from "./pageComponent/Page10";
import PageEleven from "./pageComponent/Page11";
import PageTwelve from "./pageComponent/Page12";
import PageThirteen from "./pageComponent/Page13";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("LandingPage");
  const [hasPlayedClip21, setHasPlayedClip21] = useState(false);
  const videoRef = useRef(null);

  const pageConfig = [
    {
      page: "LandingPage",
      component: LandingPage,
      videoConfig: {
        src: "/videos/Clip1.mp4",
        loop: true,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip2.mp4", false, () =>
            videoRef.current.playNextVideo("/videos/Clip3.mp4", true)
          ),
      },
    },
    {
      page: "PageOne",
      component: PageOne,
      videoConfig: {
        src: "/videos/Clip3.mp4",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip3.mp4", false),
      },
    },
    {
      page: "PageTwo",
      component: PageTwo,
      videoConfig: {
        src: "/videos/Clip4.mp4",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip5.mp4", true),
      },
    },
    {
      page: "PageThree",
      component: PageThree,
      videoConfig: {
        src: "/videos/Clip6.mp4",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip7.mp4", true),
      },
    },
    {
      page: "PageFour",
      component: PageFour,
      videoConfig: {
        src: "",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip16.mp4", true),
      },
    },
    {
      page: "PageFive",
      component: PageFive,
      videoConfig: {
        src: "/videos/Clip17.mp4",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip18.mp4", true),
      },
    },
    {
      page: "PageSix",
      component: PageSix,
      videoConfig: {
        src: "/videos/Clip19.mp4",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip20.mp4", true),
      },
    },
    {
      page: "PageSeven",
      component: PageSeven,
      videoConfig: {
        src: "/videos/Clip22.mp4",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip23.mp4", true),
      },
      changeBackgroundVideo: () => changeBackgroundVideo(),
    },
    {
      page: "PageEight",
      component: PageEight,
      videoConfig: {
        src: "/videos/Clip24.mp4",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip25.mp4", true),
      },
    },
    {
      page: "PageNine",
      component: PageNine,
      videoConfig: {
        src: "/videos/Clip26.mp4",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip27.mp4", true),
      },
    },
    {
      page: "PageTen",
      component: PageTen,
      videoConfig: {
        src: "/videos/Clip28.mp4",
        loop: false,
        onVideoEnd: () =>
          videoRef.current.playNextVideo("/videos/Clip29.mp4", true),
      },
    },
    {
      page: "PageEleven",
      component: PageEleven,
      videoConfig: {
        src: "",
        loop: false,
        onVideoEnd: () => videoRef.current.playNextVideo("", true),
      },
    },
    {
      page: "PageTwelve",
      component: PageTwelve,
      videoConfig: {
        src: "",
        loop: false,
        onVideoEnd: () => videoRef.current.playNextVideo("", true),
      },
    },
    {
      page: "PageThirteen",
      component: PageThirteen,
      videoConfig: {
        src: "",
        loop: false,
        onVideoEnd: () => videoRef.current.playNextVideo("", true),
      },
    },
  ];

  const changeBackgroundVideo = () => {
    if (hasPlayedClip21) {
      console.log("Clip21 has already been played. Action blocked.");
      return;
    }

    setHasPlayedClip21(true); // Prevent further clicks
    videoRef.current.playNextVideo("/videos/Clip21.mp4", false, () => {
      console.log("Clip21 has ended.");
      // Play Clip18 after Clip21 finishes
      videoRef.current.playNextVideo("/videos/Clip18.mp4", true, () => {
        console.log("Clip18 is now playing on loop.");
      });
    });
  };

  const handleNextPage = (nextPage) => {
    const nextConfig = pageConfig.find((page) => page.page === nextPage);
    if (!nextConfig) return;

    // Hide the current page with animation
    gsap.to(".current-page", {
      onComplete: () => {
        setCurrentPage(nextPage); // Change page after animation
        // Play the corresponding video for the next page
        const videoConfig = nextConfig.videoConfig;
        videoRef.current.playNextVideo(videoConfig.src, videoConfig.loop, videoConfig.onVideoEnd);
      },
    });
  };

  const CurrentPageComponent = pageConfig.find(
    (page) => page.page === currentPage
  )?.component;

  return (
    <>
      <VideoBackground ref={videoRef} src="/videos/Clip1.mp4" loop={true} />
      <div>
        {CurrentPageComponent && (
          <CurrentPageComponent
            handleNext={handleNextPage}
            changeBackgroundVideo={changeBackgroundVideo}
          />
        )}
      </div>
    </>
  );
}
