import styles from "./TextAreaLeft.module.css"

export default function TextAreaLeft({ 
    headingTitle="",
    italicSubtitle="",
    pText="",
    showButton,
    buttonRoute,
}){

    return(
        <>
            <div className={styles.textContainer}>
                <h2 className="h2BH">{headingTitle}</h2>
                <p className={styles.subheaderItalixBH}>{italicSubtitle}</p>
                <p className={styles.regularTextBH}>{pText}</p>
            </div>


        </>
    )
}