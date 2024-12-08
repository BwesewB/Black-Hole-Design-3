"use client"; 

import Image from "next/image";
import gsap from "gsap";
import LandingPage from "./pageComponent/LandingPage";
import React, { useState, useRef } from "react";
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

  const handleNextPage = (nextPage, videoConfig) => {

    const currentVideo = videoRef.current.getCurrentVideo();

    // Define transition videos based on the current video playing in page 4
    let transitionVideo = "";
    if (currentVideo.includes("Clip9")) {
      transitionVideo = "/videos/Clip13.mp4"; // Transition for Clip9
    } else if (currentVideo.includes("Clip11")) {
      transitionVideo = "/videos/Clip14.mp4"; // Transition for Clip11
    } else if (currentVideo.includes("Clip7")) {
      transitionVideo = "/videos/Clip15.mp4"; // Transition for Clip7
    }

    // Hide the current page with animation
    gsap.to(".current-page", {
      onComplete: () => {
        setCurrentPage(nextPage); // Change page after animation
        videoRef.current.playNextVideo(
          videoConfig.src,
          videoConfig.loop,
          videoConfig.onVideoEnd
        );
      },
    });
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
                src:"/videos/Clip3.mp4",
                loop: false,
                onVideoEnd: () =>
                  videoRef.current.playNextVideo("/videos/Clip3.mp4", false),
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
        {currentPage === "PageFive" && (
          <PageFive 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("", true),
              })
            }
          />
        )}
        {currentPage === "PageSix" && (
          <PageSix 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("", true),
              })
            }
          />
        )}
        {currentPage === "PageSeven" && (
          <PageSeven 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("", true),
              })
            }
          />
        )}
        {currentPage === "PageEight" && (
          <PageEight 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("", true),
              })
            }
          />
        )}
        {currentPage === "PageNine" && (
          <PageNine 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("", true),
              })
            }
          />
        )}
        {currentPage === "PageTen" && (
          <PageTen 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("", true),
              })
            }
          />
        )}
        {currentPage === "PageEleven" && (
          <PageEleven 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("", true),
              })
            }
          />
        )}
        {currentPage === "PageTwelve" && (
          <PageTwelve 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("", true),
              })
            }
          />
        )}
      </div>
    </>
  );
}
