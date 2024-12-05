import styles from "./TextAreaLeft.module.css"
import gsap from "gsap"
import { useEffect, useRef } from "react";

export default function TextAreaLeft({ 
    headingTitle="",
    italicSubtitle="",
    pText="",
}) {

    // Function to split text into spans for words
    const splitTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.word}>
                {word}
            </span>
        ));
    };

    // Heading animation: Animating words (spans)
    useEffect(() => {
        const words = document.querySelectorAll(`.${styles.word}`);
        gsap.fromTo(
            words,
            { opacity: 0, y: '5rem' },
            {
                delay: 0.1,
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
            { opacity: 0, y: '5rem' },
            { opacity: 1, y: 0, duration: 1, ease: "power1.inOut" }
        );
    }, [italicSubtitle]);

    // pText line animation: Animating each line of text
    useEffect(() => {
        gsap.fromTo(
            document.querySelector(`.${styles.regularTextBH}`),
            {
                opacity:0,
                x:"-20rem",
            },
            {
                opacity:1,
                x:"0rem",
                duration:1,
                delay:1.5,
                ease: "power2.inOut"
            }
        )
    }, []);

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
                    {pText} 
                </div> 
                {/* split the text to spans later */}
            </div>
        </div>
    );
}
