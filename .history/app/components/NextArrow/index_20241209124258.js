"use client";

import gsap from "gsap";
import { useEffect } from "react";
import styles from "./NextArrow.module.css";




export default function NextArrow({ 
  onClickHandler,
  fill = "#F8F8F8",
  delay = "3"
}) {

  useEffect(() => {
    const words = document.querySelector(`.${styles.arrowsBH}`);
    gsap.fromTo(
        words,
        {
            x: '-2rem' 
        },
        {
            delay: delay,
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 1,
            ease: "power1.inOut",
        }
    );
}, []);
  return (
    <div className={styles.arrowsBH} onClick={onClickHandler}>
        <svg width="31" height="54" viewBox="0 0 31 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowBH}>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.56129 52.6298C-0.443373 50.7306 -0.528905 47.566 1.37025 45.5613L18.9546 27L1.37025 8.43874C-0.528906 6.43407 -0.443375 3.2694 1.56129 1.37025C3.56595 -0.528908 6.73062 -0.443374 8.62977 1.56129L29.4719 23.5613C31.2989 25.4898 31.2989 28.5103 29.4719 30.4387L8.62978 52.4387C6.73062 54.4434 3.56595 54.5289 1.56129 52.6298Z" fill={fill}/>
        </svg>
        <svg width="31" height="54" viewBox="0 0 31 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowBH}>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.56129 52.6298C-0.443373 50.7306 -0.528905 47.566 1.37025 45.5613L18.9546 27L1.37025 8.43874C-0.528906 6.43407 -0.443375 3.2694 1.56129 1.37025C3.56595 -0.528908 6.73062 -0.443374 8.62977 1.56129L29.4719 23.5613C31.2989 25.4898 31.2989 28.5103 29.4719 30.4387L8.62978 52.4387C6.73062 54.4434 3.56595 54.5289 1.56129 52.6298Z" fill={fill}/>
        </svg>
        <svg width="31" height="54" viewBox="0 0 31 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowBH}>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.56129 52.6298C-0.443373 50.7306 -0.528905 47.566 1.37025 45.5613L18.9546 27L1.37025 8.43874C-0.528906 6.43407 -0.443375 3.2694 1.56129 1.37025C3.56595 -0.528908 6.73062 -0.443374 8.62977 1.56129L29.4719 23.5613C31.2989 25.4898 31.2989 28.5103 29.4719 30.4387L8.62978 52.4387C6.73062 54.4434 3.56595 54.5289 1.56129 52.6298Z" fill={fill}/>
        </svg>
    </div>
  );
}
