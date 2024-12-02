import PageLayout from "../PageLayout";

export default function PageEleven({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='A Pinky-Nail-Sized Earth'
        italicSubtitle=''
        pText='Black holes are so compact that the mass of earth could fit within a ball the size of our pinky finger'
        handleNext={() => handleNext("PageTwelve")}
      />
    </>
  );
}
