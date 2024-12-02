"use client"; 

import Image from "next/image";
import gsap from "gsap";
import LandingPage from "./pageComponent/LandingPage";
import React, { useState } from "react";
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

  const [currentPage, setCurrentPage] = useState("LandingPage")

  const handleNextPage = (nextPage) => {
    // Hide the current page with animation
    gsap.to(".current-page", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setCurrentPage(nextPage); // Change page after animation
      },
    });
  };

  return (
    <>
      <div>
        {currentPage === "LandingPage" && <LandingPage onClickHandler={handleNextPage} />}
        {currentPage === "PageOne" && <PageOne handleNext={handleNextPage}/>}
        {currentPage === "PageTwo" && <PageTwo handleNext={handleNextPage}/>}
        {currentPage === "PageThree" && <PageThree handleNext={handleNextPage} />}
        {currentPage === "PageFour" && <PageFour handleNext={handleNextPage} />}
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
