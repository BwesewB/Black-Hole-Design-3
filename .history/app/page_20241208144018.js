"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import LandingPage from "./pageComponent/LandingPage";
import VideoBackground from "./components/VideoBackground";
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

export default function Home({}) {
  const [currentPage, setCurrentPage] = useState("LandingPage");
  const videoRef = useRef(null);

  // Generic function to handle video transitions and page change
  const handleNextPage = (nextPage, videoConfig) => {
    const currentVideo = videoRef.current.getCurrentVideo();

    // Define transition videos only for PageFour based on current video
    let transitionVideo = "";
    if (currentPage === "PageFour") {
      transitionVideo = getTransitionVideo(currentVideo);
    }

    // Hide the current page with animation
    gsap.to(".current-page", {
      onComplete: () => {
        setCurrentPage(nextPage); // Change page after animation
        // Play transition video if necessary
        if (transitionVideo) {
          videoRef.current.playNextVideo(transitionVideo, false, () => {
            videoRef.current.playNextVideo(videoConfig.src, videoConfig.loop, videoConfig.onVideoEnd);
          });
        } else {
          videoRef.current.playNextVideo(videoConfig.src, videoConfig.loop, videoConfig.onVideoEnd);
        }
      },
    });
  };

  // A helper function to determine the transition video
  const getTransitionVideo = (currentVideo) => {
    if (currentVideo.includes("Clip9")) return "/videos/Clip13.mp4";
    if (currentVideo.includes("Clip11")) return "/videos/Clip14.mp4";
    if (currentVideo.includes("Clip7")) return "/videos/Clip15.mp4";
    return "";
  };

  return (
    <>
      <VideoBackground ref={videoRef} src="/videos/Clip1.mp4" loop={true} />
      <div>
        {currentPage === "LandingPage" && (
          <LandingPage
            onClickHandler={(nextPage) =>
              handleNextPage(nextPage, {
                src: "/videos/Clip2.mp4",
                loop: false,
                onVideoEnd: () =>
                  videoRef.current.playNextVideo("/videos/Clip3.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageOne" && (
          <PageOne 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip3.mp4",
                loop: false,
                onVideoEnd: () =>
                  videoRef.current.playNextVideo("/videos/Clip4.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageTwo" && (
          <PageTwo 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip4.mp4",
                loop: false,
                onVideoEnd: () =>
                  videoRef.current.playNextVideo("/videos/Clip5.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageThree" && (
          <PageThree 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip6.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip7.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageFour" && (
          <PageFour 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("", true),
              })
            }
            playVideo={videoRef.current.playNextVideo}
          />
        )}
        {currentPage === "PageFive" && <PageFive handleNext={handleNextPage} />}
        {currentPage === "PageSix" && <PageSix handleNext={handleNextPage} />}
        {currentPage === "PageSeven" && <PageSeven handleNext={handleNextPage} />}
        {currentPage === "PageEight" && <PageEight handleNext={handleNextPage} />}
        {currentPage === "PageNine" && <PageNine handleNext={handleNextPage} />}
        {currentPage === "PageTen" && <PageTen handleNext={handleNextPage} />}
        {currentPage === "PageEleven" && <PageEleven handleNext={handleNextPage} />}
        {currentPage === "PageTwelve" && <PageTwelve handleNext={handleNextPage} />}
      </div>
    </>
  );
}
