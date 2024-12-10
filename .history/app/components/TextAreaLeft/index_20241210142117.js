import styles from "./TextAreaLeft.module.css"
import gsap from "gsap"
import { useEffect } from "react";

export default function TextAreaLeft({ 
    headingTitle = "",
    italicSubtitle = "",
    pText = "",
    delay = 3,
    isAnimatingOut
}) {

    // Split text into spans for words
    const splitTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.word}>
                {word}
            </span>
        ));
    };

    //Split smaller text P into spans
    const splitSmallerTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.wordSmaller}>
                {word}
            </span>
        ));
    };

    // Heading animation: Animating words (spans)
    useEffect(() => {
        const words = document.querySelectorAll(`.${styles.word}`);
        gsap.fromTo(
            words,
            {
                y: '2rem' 
            },
            {
                delay: delay,
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.25,
                ease: "power1.inOut",
            }
        );
    }, [headingTitle]);

    // Italic subtitle animation
    useEffect(() => {
        const italix = document.querySelectorAll(`.${styles.subheaderItalixBH}`);
        gsap.fromTo(
            italix,
            { 
                y: '2rem' 
            },
            { 
                delay: delay,
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: "power1.inOut" 
            }
        );
    }, [italicSubtitle]);

    // pText word animation: Animating each word
    useEffect(() => {
        gsap.fromTo(
            document.querySelectorAll(`.${styles.wordSmaller}`),
            {
                y: '1rem'
            },
            {
                delay: delay,
                opacity: 1,
                y: 0,
                stagger: 0.02,
                ease: "power1.inOut",
            }
        )
    }, []);


    //ANIMATING TEXT OUT
    useEffect(() => {
        if (!isAnimatingOut) {
            const words = document.querySelectorAll(`.${styles.word}`);
            gsap.fromTo(
                words,
                {
                    opacity: 0,
                    y: "5rem",
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.inOut",
                }
            );
        }
    }, [headingTitle, isAnimatingOut]);

    useEffect(() => {
        if (!isAnimatingOut) {
            const italix = document.querySelectorAll(`.${styles.subheaderItalixBH}`);
            gsap.to(
                italix,
                { 
                    opacity: 0,
                    y: "3rem",
                    duration: 0.8,
                    ease: "power2.inOut",
                }
            );
        }
    }, [italicSubtitle, isAnimatingOut]);

    useEffect(() => {
        if (!isAnimatingOut) {
            gsap.to(
                document.querySelectorAll(`.${styles.wordSmaller}`),
                {
                    opacity: 0,
                    y: "2rem",
                    duration: 1,
                    stagger: 0.02,
                    ease: "power2.inOut",
                }
            );
        }
    }, [isAnimatingOut]);

    return (
        <div className={styles.textContainer}>
            <div className={styles.textBox}>
                <h2 className="h2BH">
                    {splitTextToSpans(headingTitle)}
                </h2>
            </div>
            <div className={styles.textBox}>
                <p className={styles.subheaderItalixBH}>{italicSubtitle}</p>
            </div>
            <div className={styles.textBox}>
                <div className={styles.regularTextBH}>
                    {splitSmallerTextToSpans(pText)}
                </div> 
            </div>
        </div>
    );
}
