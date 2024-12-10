import styles from "./TextAreaLeft.module.css";
import gsap from "gsap";
import { useEffect } from "react";

export default function TextAreaLeft({ 
    headingTitle = "",
    italicSubtitle = "",
    pText = "",
    delay = 3,
    isAnimatingOut // Add prop to handle out animation
}) {

    // Split text into spans for words
    const splitTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.word}>
                {word}
            </span>
        ));
    };

    // Split smaller text P into spans
    const splitSmallerTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.wordSmaller}>
                {word}
            </span>
        ));
    };

    // Heading animation: Animating words (spans)
    useEffect(() => {
        if (!isAnimatingOut) {
            const words = document.querySelectorAll(`.${styles.word}`);
            gsap.fromTo(
                words,
                {
                    y: '2rem',
                    opacity: 0,
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
        }
    }, [headingTitle, isAnimatingOut]);

    // Italic subtitle animation
    useEffect(() => {
        if (!isAnimatingOut) {
            const italix = document.querySelectorAll(`.${styles.subheaderItalixBH}`);
            gsap.fromTo(
                italix,
                { 
                    y: '2rem',
                    opacity: 0,
                },
                { 
                    delay: delay,
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power1.inOut" 
                }
            );
        }
    }, [italicSubtitle, isAnimatingOut]);

    // pText word animation: Animating each word
    useEffect(() => {
        if (!isAnimatingOut) {
            gsap.fromTo(
                document.querySelectorAll(`.${styles.wordSmaller}`),
                {
                    y: '1rem',
                    opacity: 0,
                },
                {
                    delay: delay,
                    opacity: 1,
                    y: 0,
                    stagger: 0.02,
                    ease: "power1.inOut",
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
