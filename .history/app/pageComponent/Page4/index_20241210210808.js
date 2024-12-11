import NextArrow from "../../components/NextArrow";
import TextAreaLeft from "../../components/TextAreaLeft";
import { useState, useEffect } from "react";
import gsap from "gsap";
import styles from "./Page4.module.css"
import NextAnimaButton from "../../components/NextAnimaButton";
import textAreaLeftStyles  from "../../components/TextAreaLeft/TextAreaLeft.module.css"

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
  const onClickHandler = () => {
    onTextAnimateOut();
    handleNext("PageFive")
  };

  const onNextClick = () => {
    setDelay(0);

    const nextSequence = videoSequences[videoIndex];

    playVideo(nextSequence.transition, false, () => {
      playVideo(nextSequence.main, true);
    });

    // Update to the next video sequence (circular)
    setVideoIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % videoSequences.length;
      return nextIndex;
    });
    
    setCurrentTextIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % textAreas.length;
      return nextIndex;
    });
  }

  const onTextAnimateOut = () => {
    setIsAnimatingOut(true);

    // Animate out the heading
    gsap.to(`.${textAreaLeftStyles.word}`, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });

    // Animate out the italic subtitle
    gsap.to(`.${textAreaLeftStyles.subheaderItalixBH}`, {
      opacity: 0,
      delay: 0.07,
      duration: 0.5,
      ease: "power2.inOut"
    });

    // Animate out the smaller text
    gsap.to(`.${textAreaLeftStyles.wordSmaller}`, {
      opacity: 0,
      delay: 0.05,
      stagger: 0.005,
      ease: "power2.inOut"
    });
  };

  return (   
    <>
      <NextAnimaButton nextText="NEXT" onNextClick={onNextClick}/>

      <div>
        <TextAreaLeft
          key={currentTextIndex}
          headingTitle={textAreas[currentTextIndex].headingTitle}
          italicSubtitle={textAreas[currentTextIndex].italicSubtitle}
          pText={textAreas[currentTextIndex].pText}
          delay={delay}
          isAnimatingOut={isAnimatingOut}
        />
      </div>

      <NextArrow onClickHandler={onClickHandler}/>
    </>
  );
}
