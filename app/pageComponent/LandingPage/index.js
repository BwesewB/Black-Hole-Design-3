"use client"

import styles from './LandingPage.module.css';
import gsap from "gsap";
import ButtonBH from '../../components/ButtonBH';
import { useEffect } from 'react';

export default function LandingPage({ onClickHandler }) {

    useEffect(() => {
        const letters = document.querySelectorAll(`.${styles['bh-h1']}`);
        
        // Animate each letter coming from the top with a stagger effect
        gsap.fromTo(
            letters, 
            { 
                y: -100, 
                opacity: 0 
            }, // Starting position (above screen, invisible)
            { 
                y: 0, 
                opacity: 1, 
                duration: 2, 
                stagger: 0.2, 
                ease: "power3.out" 
            }
        );
      }, []);

      const handleStartClick = () => {
        // Select all letters for the black hole
        const blackHole = document.querySelectorAll(`.${styles['bh-h1']}`);
        
        // Animate letters to fade out and move downward
        gsap.to(blackHole, {
            y: 50, // Move downward
            opacity: 0, // Fade out
            duration: 1, // Animation duration
            stagger: 0.2,
            ease: "power3.in", // Smooth easing for exit
            onComplete: () => {
                // Call the parent's handler to transition to PageOne
                onClickHandler("PageOne");
            }
        });
    };

  return (
    <>
    <div className={styles.LandingPageFormat}>
        <div className={styles['bh-title']}>
            <div className={styles['bh-black']}>
                <h1 className={styles['bh-h1']}>B</h1>
                <h1 className={styles['bh-h1']}>L</h1>
                <h1 className={styles['bh-h1']}>A</h1>
                <h1 className={styles['bh-h1']}>C</h1>
                <h1 className={styles['bh-h1']}>K</h1>
            </div>
            <div className={styles['bh-hole']}>
                <h1 className={styles['bh-h1']}>H</h1>
                <h1 className={styles['bh-h1']}>O</h1>
                <h1 className={styles['bh-h1']}>L</h1>
                <h1 className={styles['bh-h1']}>E</h1>
            </div>
        </div>
        <ButtonBH buttonText='START' onClickHandler={handleStartClick}/>
    </div>

    </>
  );
}
