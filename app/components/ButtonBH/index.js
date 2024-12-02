"use client";

import styles from './ButtonBH.module.css';
import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';

export default function ButtonBH({
    buttonText = "",
    onClickHandler,
}) {
    const circleBackRef = useRef(null);
    const buttonBHRef = useRef(null);
    const buttonNavigate = useRef(null);

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        console.log("Button Clicked");
        setIsClicked(true); // Trigger animation
        if (onClickHandler) {
            onClickHandler(); // Call the provided handler
        }
    };

    useEffect(() => {
        if (!isClicked) return; // Only run animations if button is clicked

        // Animate the circleBack
        gsap.to(circleBackRef.current, {
            width: "7rem",
            height: "7rem",
            duration: 0.3,
            ease: "power1.out",
            onComplete: () => {
                // Shrink the circle
                gsap.to(circleBackRef.current, {
                    width: "0rem",
                    height: "0rem",
                    delay: 1, // DELAY
                    duration: 0.5,
                    ease: "power1.in",
                    onComplete: () => {
                        // Set opacity to 0 after shrinking animation
                        gsap.to(circleBackRef.current, {
                            opacity: 0,
                            delay: 0.1,
                            duration: 0.2,
                            ease: "power1.inOut"
                        });
                    }
                });
            }
        });

        // Animate buttonBHRef
        gsap.to(buttonBHRef.current, {
            width: "17vw",
            height: "0vh",
            duration: 0.7,
            ease: "power1.inOut",
            delay: 1.3,
            onComplete: () => {
                // After button expands and shrinks, set opacity to 0
                gsap.to(buttonBHRef.current, {
                    opacity: 0,
                    delay: 0.4,
                    duration: 0.3,
                    ease: "power1.inOut",
                });

                gsap.to(buttonNavigate.current, {
                    width: "0vw",
                    duration: 0.5,
                    ease: "power1.in",
                    onComplete: () => {
                        // Fade out the circleBack after buttonNavigate animation completes
                        gsap.to(circleBackRef.current, {
                            opacity: 0,
                            delay: 1, // DELAY
                            duration: 0.3,
                            ease: "power1.inOut",
                        });
                    },
                });
            },
        });

        // Animate the button text
        gsap.to(
            document.querySelectorAll(`.${styles['button-BH']}`),
            {
                fontSize: 0,
                delay: 1.3, // DELAY
                ease: "power1.out",
            }
        );

        // Reset isClicked to allow animations to re-trigger
        return () => setIsClicked(false);
    }, [isClicked]); // Dependencies: isClicked

    return (
        <>
            <button ref={buttonNavigate} className={styles.buttonGroup} onClick={handleClick}>
                <div ref={buttonBHRef} className={styles['button-BH']}>
                    <p className={styles['buttonText-BH']}>{buttonText}</p>
                </div>
                <div ref={circleBackRef} className={styles.circleBack} />
            </button>
        </>
    );
}
