import { useState, useEffect } from "react";
import ButtonBH from "../../components/ButtonBH";
import styles from "./PageTwelve.module.css";

export default function PageThirteen({ handleNext }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={styles.RetartSenterer}>
        {showButton && (
          <ButtonBH
            buttonText="RESTART"
            onClickHandler={() => {
              setTimeout(() => handleNext("LandingPage"), 3000);
            }}
          />
        )}
      </div>
    </>
  );
}
