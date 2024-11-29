"use client"; 

import Image from "next/image";
import gsap from "gsap";
import LandingPage from "./pageComponent/LandingPage";
import React, { useState } from "react";
import PageOne from "./pageComponent/PageOne";
import PageTwo from "./pageComponent/PageTwo";

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
      </div>

    </>
  );
}
