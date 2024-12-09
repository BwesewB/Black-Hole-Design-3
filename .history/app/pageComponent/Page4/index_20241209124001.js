import NextArrow from "../../components/NextArrow";
import TextAreaLeft from "../../components/TextAreas/TextAreaLeft";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import styles from "./Page4.module.css"

gsap.registerPlugin(CustomEase);

export default function PageFour({ handleNext, playVideo }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [delay, setDelay] = useState(3);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const textAreas = [
    {
      headingTitle: "Stellar",
      italicSubtitle: "The Birth of a Black Hole",
      pText: "A stellar black hole forms when a massive star runs out of fuel and collapses under its own gravity after undergoing a supernova explosion. Typically, these black holes are between 3 to 10 solar masses. When the star's core collapses, the gravitational pull becomes so strong that not even light can escape from it, creating a region of space-time known as the event horizon. Stellar black holes are the most common type in the universe, often found in binary star systems where they can be detected by the way they interact with a companion star."
    },
    {
      headingTitle: "Intermediate",
      italicSubtitle: "The Mystery Between Sizes",
      pText: 'Intermediate black holes are believed to have masses ranging from 100 to 1000 solar masses. Their origin is still a subject of active research, but they might form when stellar black holes merge or by the collapse of dense star clusters in a galactic core. These black holes are harder to detect, as they are smaller than supermassive black holes but much larger than stellar ones. They could be the "missing link" in the evolution of black holes, and their study may provide clues about how the largest black holes form in the centers of galaxies.'
    },
    {
      headingTitle: "Supermassive",
      italicSubtitle: "Giants at the Center of Galaxies",
      pText: "Supermassive black holes are the largest type, with masses ranging from millions to billions of solar masses. These colossal black holes lie at the centers of most galaxies, including our own Milky Way, where the supermassive black hole known as Sagittarius A* resides. Supermassive black holes likely formed in the early universe and grew over time by accumulating gas, dust, and merging with other black holes. They play a crucial role in the dynamics of galaxies, influencing their formation and evolution. The study of supermassive black holes is essential to understanding the structure and behavior of galaxies across the universe."
    }
  ];

  const videoSequences = [
    { transition: "/videos/Clip8.mp4", main: "/videos/Clip9.mp4" },
    { transition: "/videos/Clip10.mp4", main: "/videos/Clip11.mp4" },
    { transition: "/videos/Clip12.mp4", main: "/videos/Clip7.mp4" },
  ];

  // Function to animate out text when the "NextArrow" is clicked
  const onTextAnimateOut = () => {
    setIsAnimatingOut(true);
    gsap.to(
      ".h2BH", {
      opacity: 0,
      y: '5rem',
      duration: 1,
      ease: "power2.inOut"
    });
  };


  useEffect(() => {
    gsap.fromTo(
      [
        document.querySelector(`.${styles.nextButton} svg`), // Target the SVG first
        document.querySelector(`.${styles.nextButton} p`)   // Then target the <p>
      ],
      {
        x:"-3rem",
        opacity:0,
      },
      {
        opacity:1,
        delay:3,
        stagger:0.2,
        x:"0",
        ease: "power3.inOut"
      }
    )
  })

  const onClickHandler = () => {
    onTextAnimateOut()
    handleNext("PageFive")
  };

  const onNextClick = () => {
    setDelay(0);

    const nextSequence = videoSequences[videoIndex];

    playVideo(nextSequence.transition, false, () => {
      playVideo(nextSequence.main, true);
    });

    // Update to the next video sequence (circular)
    setVideoIndex((prevIndex) => (prevIndex + 1) % videoSequences.length);

    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textAreas.length)
  }

  return (   
    <>
      <div className={styles.buttonWidth}>
        <div className={styles.nextButton} onClick={onNextClick}>
          <p>NEXT</p>
          <svg viewBox="0 0 31 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowBH}>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.56129 52.6298C-0.443373 50.7306 -0.528905 47.566 1.37025 45.5613L18.9546 27L1.37025 8.43874C-0.528906 6.43407 -0.443375 3.2694 1.56129 1.37025C3.56595 -0.528908 6.73062 -0.443374 8.62977 1.56129L29.4719 23.5613C31.2989 25.4898 31.2989 28.5103 29.4719 30.4387L8.62978 52.4387C6.73062 54.4434 3.56595 54.5289 1.56129 52.6298Z" fill="#F8F8F8"/>
          </svg>
        </div>
      </div>

      <div>
        <TextAreaLeft
          key={currentTextIndex}
          headingTitle={textAreas[currentTextIndex].headingTitle}
          italicSubtitle={textAreas[currentTextIndex].italicSubtitle}
          pText={textAreas[currentTextIndex].pText}
          delay={delay}
        />
      </div>

      <NextArrow onClickHandler={onClickHandler}/>
    </>
  );
}
