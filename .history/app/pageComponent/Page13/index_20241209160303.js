import ButtonBH from "../../components/ButtonBH";
import styles from "./PageTwelve.module.css"

export default function PageThirteen({ handleNext }) {

  return (   
    <>
      <div className={styles.RetartSenterer}>
        <ButtonBH 
          buttonText="RESTART" 
          onClickHandler={() => {
            setTimeout(() => handleNext("LandingPage"), 3000)
          }}/>
      </div>
    </>
  );
}
