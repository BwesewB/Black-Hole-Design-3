"use client"; 

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
import PageThirteen from "./pageComponent/Page13";

export default function Home({}) {
  const [currentPage, setCurrentPage] = useState("LandingPage");
  const [hasPlayedClip21, setHasPlayedClip21] = useState(false);
  const videoRef = useRef(null);

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

  const handleNextPage = (nextPage, videoConfig) => {
    // Get the currently active video from VideoBackground
    const currentVideo = videoRef.current.getCurrentVideo();

    // Define transition videos based on the current video playing (for PageFour only)
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
            // After transition video ends, play Clip16
            videoRef.current.playNextVideo("/videos/Clip16.mp4", true, () => {
              // Clip16 plays on repeat until the next transition
              videoRef.current.playNextVideo("/videos/Clip16.mp4", true, () => {});
            });
          });
        } else {
          // No transition video needed, just play the main video
          videoRef.current.playNextVideo(videoConfig.src, videoConfig.loop, videoConfig.onVideoEnd);
        }
      },
    });
  };

  const getTransitionVideo = (currentVideo) => {
    if (currentVideo.src.includes("Clip7")) return "/videos/Clip13.mp4";
    if (currentVideo.src.includes("Clip9")) return "/videos/Clip14.mp4";
    if (currentVideo.src.includes("Clip11")) return "/videos/Clip15.mp4";
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
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip16.mp4", true),
              })
            }
            playVideo={videoRef.current.playNextVideo}
          />
        )}
        {currentPage === "PageFive" && (
          <PageFive 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip17.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip18.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageSix" && (
          <PageSix 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip19.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip20.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageSeven" && (
          <PageSeven 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip22.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip23.mp4", true),
              })
            }
            changeBackgroundVideo={changeBackgroundVideo}
          />
        )}
        {currentPage === "PageEight" && (
          <PageEight 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip24.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip25.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageNine" && (
          <PageNine 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip26.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip27.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageTen" && (
          <PageTen 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip28.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip29.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageEleven" && (
          <PageEleven 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip30.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip31.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageTwelve" && (
          <PageTwelve 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip32.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip33.mp4", true),
              })
            }
          />
        )}
        {currentPage === "PageThirteen" && (
          <PageThirteen 
            handleNext={(nextPage) => 
              handleNextPage(nextPage, {
                src: "/videos/Clip33.mp4",
                loop: false,
                onVideoEnd: () => videoRef.current.playNextVideo("/videos/Clip34.mp4", true),
              })
            }
          />
        )}
      </div>
    </>
  );
}
