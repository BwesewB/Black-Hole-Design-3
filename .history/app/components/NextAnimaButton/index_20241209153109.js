import styles from "./nextAnimaButton.module.css"

export default function NextAnimaButton({
    nextText="NEXT"
}) {
    return(
        <>
            <div className={styles.buttonWidth}>
                <div className={styles.nextButton} onClick={onNextClick}>
                <p>{nextText}</p>
                <svg viewBox="0 0 31 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowBH}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.56129 52.6298C-0.443373 50.7306 -0.528905 47.566 1.37025 45.5613L18.9546 27L1.37025 8.43874C-0.528906 6.43407 -0.443375 3.2694 1.56129 1.37025C3.56595 -0.528908 6.73062 -0.443374 8.62977 1.56129L29.4719 23.5613C31.2989 25.4898 31.2989 28.5103 29.4719 30.4387L8.62978 52.4387C6.73062 54.4434 3.56595 54.5289 1.56129 52.6298Z" fill="#F8F8F8"/>
                </svg>
                </div>
            </div>
        </>
    )
}