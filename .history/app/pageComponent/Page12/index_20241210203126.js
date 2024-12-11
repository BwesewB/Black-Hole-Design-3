import PageLayout from "../PageLayout";

export default function PageTwelve({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='A Pinky-Nail-Sized Earth'
        italicSubtitle=''
        pText='Black holes are so compact that the mass of earth could fit within a ball of around 9mm, or the size of our pinky finger!'
        handleNext={() => handleNext("PageThirteen")}
        delayArrow={7}
      />
    </>
  );
}
