import styles from "./TextAreaLeft.module.css"
import gsap from "gsap"
import { useEffect, useRef } from "react";

export default function TextAreaLeft({ 
    headingTitle="",
    italicSubtitle="",
    pText="",
    showButton,
    buttonRoute,
}){
    const headingRef = useRef(null);

    // Function to split text into spans
    const splitTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.word}>
                {word}
            </span>
        ));
    };

    useEffect(() => {
        // Select all span elements inside the heading
        const letters = headingRef.current.querySelectorAll("span");

        // Animate letters with a stagger
        gsap.fromTo(
            letters,
            { 
                opacity: 0, 
                y: '5rem',
            }, // Initial state
            {
                delay:0.1,
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.25, // Delay between each word
                ease: "power1.inOut",
            }
        );
    }, [headingTitle]); // Re-run animation if headingTitle changes

    useEffect(() => {
        const italix = document.querySelectorAll('subheaderItalixBH');

        gsap.fromTo(
            italix,
            {

            },
            {
                
            }
        )
    })

    return (
        <div className={styles.textContainer}>
            <div className={styles.textBox}>
                <h2 ref={headingRef} className="h2BH">
                    {splitTextToSpans(headingTitle)}
                </h2>
            </div>
            <div className={styles.textBox}>
                <p className={styles.subheaderItalixBH}>{italicSubtitle}</p>
            </div>
            <div className={styles.textBox}>
                <p className={styles.regularTextBH}>{pText}</p>
            </div>
            
        </div>
    );
}