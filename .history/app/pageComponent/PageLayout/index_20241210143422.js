import gsap from "gsap";
import TextAreaLeft from '../../components/TextAreaLeft';
import NextArrow from '../../components/NextArrow';
import { useState } from "react";
import styles from "../../components/TextAreaLeft/TextAreaLeft.module.css"

export default function PageLayout({ 
    handleNext,
    delay,
    delayArrow,
    headingTitle = "",
    italicSubtitle = "",
    pText = "",
    fill,
}) {

  // State to track the animation of the text out
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Function to animate out text when the "NextArrow" is clicked
  const onTextAnimateOut = () => {
    setIsAnimatingOut(true);

    // Animate out the heading
    gsap.to(`.${styles.word}`, {
      opacity: 0,
      y: '2rem',
      duration: 1,
      ease: "power2.inOut"
    });

    // Animate out the italic subtitle
    gsap.to(`.${styles.subheaderItalixBH}`, {
      opacity: 0,
      y: '5rem',
      duration: 0.2,
      ease: "power2.inOut"
    });

    // Animate out the smaller text
    gsap.to(`.${styles.wordSmaller}`, {
      opacity: 0,
      stagger: 0.01,
      ease: "power2.inOut"
    });
  };

  const onClickHandler = () => {
    onTextAnimateOut();
    setTimeout(() => handleNext({handleNext}), 1000);
  };

  return (
    <>
        <div>
            <TextAreaLeft 
              headingTitle={headingTitle}
              italicSubtitle={italicSubtitle}
              pText={pText || "Lorem ipsum dolor sit amet consectetur. Ipsum cursus tempor ultricies pellentesque egestas massa. Porta massa phasellus ut nunc sem risus senectus sapien viverra. Nunc vitae senectus ullamcorper nec est faucibus lectus amet. Nunc nam ac pellentesque ut risus enim eget. Pharetra ut sapien nunc diam adipiscing ultrices ut. Proin proin metus dictum sit vel sapien facilisis adipiscing enim. Purus fringilla amet id aenean arcu justo morbi adipiscing a. Nec nisi."}
              delay={delay}
              isAnimatingOut={isAnimatingOut} // Pass down the animation state
            />
            <NextArrow onClickHandler={onClickHandler} fill={fill} delay={delayArrow}/>
        </div>
    </>
  );
}
