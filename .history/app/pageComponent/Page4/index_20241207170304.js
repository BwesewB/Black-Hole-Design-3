import NextArrow from "../../components/NextArrow";
import TextAreaLeft from "../../components/TextAreas/TextAreaLeft";
import { useState } from "react";
import gsap from "gsap";
import styles from "./Page4.module.css"

export default function PageFour({ handleNext }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const textAreas = [
    {
      headingTitle: "Stellar",
      italicSubtitle: "www",
      pText: "Lorem ipsum dolor sit amet consectetur. Ipsum cursus tempor ultricies pellentesque egestas massa. Porta massa phasellus ut nunc sem risus senectus sapien viverra. Nunc vitae senectus ullamcorper nec est faucibus lectus amet. Nunc nam ac pellentesque ut risus enim eget. Pharetra ut sapien nunc diam adipiscing ultrices ut. Proin proin metus dictum sit vel sapien facilisis adipiscing enim. Purus fringilla amet id aenean arcu justo morbi adipiscing a. Nec nisi."
    },
    {
      headingTitle: "bh",
      italicSubtitle: "www",
      pText: "Lorem ipsum dolor sit amet consectetur. Ipsum cursus tempor ultricies pellentesque egestas massa. Porta massa phasellus ut nunc sem risus senectus sapien viverra. Nunc vitae senectus ullamcorper nec est faucibus lectus amet. Nunc nam ac pellentesque ut risus enim eget. Pharetra ut sapien nunc diam adipiscing ultrices ut. Proin proin metus dictum sit vel sapien facilisis adipiscing enim. Purus fringilla amet id aenean arcu justo morbi adipiscing a. Nec nisi."
    },
    {
      headingTitle: "bbbh",
      italicSubtitle: "www",
      pText: "Lorem ipsum dolor sit amet consectetur. Ipsum cursus tempor ultricies pellentesque egestas massa. Porta massa phasellus ut nunc sem risus senectus sapien viverra. Nunc vitae senectus ullamcorper nec est faucibus lectus amet. Nunc nam ac pellentesque ut risus enim eget. Pharetra ut sapien nunc diam adipiscing ultrices ut. Proin proin metus dictum sit vel sapien facilisis adipiscing enim. Purus fringilla amet id aenean arcu justo morbi adipiscing a. Nec nisi."
    }
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

  const onClickHandler = () => {
    onTextAnimateOut()
    handleNext("PageFive")
  };

  return (   
    <>
      <div className={styles.buttonWidth}>
        <div className={styles.nextButton}>
          <p>NEXT</p>
          <svg viewBox="0 0 31 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowBH}>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.56129 52.6298C-0.443373 50.7306 -0.528905 47.566 1.37025 45.5613L18.9546 27L1.37025 8.43874C-0.528906 6.43407 -0.443375 3.2694 1.56129 1.37025C3.56595 -0.528908 6.73062 -0.443374 8.62977 1.56129L29.4719 23.5613C31.2989 25.4898 31.2989 28.5103 29.4719 30.4387L8.62978 52.4387C6.73062 54.4434 3.56595 54.5289 1.56129 52.6298Z" fill="#F8F8F8"/>
          </svg>
        </div>
      </div>

      <div>
        <TextAreaLeft 
          headingTitle='Stellar'
          italicSubtitle='www'
          pText="Lorem ipsum dolor sit amet consectetur. Ipsum cursus tempor ultricies pellentesque egestas massa. Porta massa phasellus ut nunc sem risus senectus sapien viverra. Nunc vitae senectus ullamcorper nec est faucibus lectus amet. Nunc nam ac pellentesque ut risus enim eget. Pharetra ut sapien nunc diam adipiscing ultrices ut. Proin proin metus dictum sit vel sapien facilisis adipiscing enim. Purus fringilla amet id aenean arcu justo morbi adipiscing a. Nec nisi."
        />
        <TextAreaLeft 
          headingTitle='bh'
          italicSubtitle='www'
          pText="Lorem ipsum dolor sit amet consectetur. Ipsum cursus tempor ultricies pellentesque egestas massa. Porta massa phasellus ut nunc sem risus senectus sapien viverra. Nunc vitae senectus ullamcorper nec est faucibus lectus amet. Nunc nam ac pellentesque ut risus enim eget. Pharetra ut sapien nunc diam adipiscing ultrices ut. Proin proin metus dictum sit vel sapien facilisis adipiscing enim. Purus fringilla amet id aenean arcu justo morbi adipiscing a. Nec nisi."
        />
        <TextAreaLeft 
          headingTitle='bbbh'
          italicSubtitle='www'
          pText="Lorem ipsum dolor sit amet consectetur. Ipsum cursus tempor ultricies pellentesque egestas massa. Porta massa phasellus ut nunc sem risus senectus sapien viverra. Nunc vitae senectus ullamcorper nec est faucibus lectus amet. Nunc nam ac pellentesque ut risus enim eget. Pharetra ut sapien nunc diam adipiscing ultrices ut. Proin proin metus dictum sit vel sapien facilisis adipiscing enim. Purus fringilla amet id aenean arcu justo morbi adipiscing a. Nec nisi."
        />
      </div>


      <NextArrow onClickHandler={onClickHandler}/>
    </>
  );
}
