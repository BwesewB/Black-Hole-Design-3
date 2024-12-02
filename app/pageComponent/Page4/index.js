import PageLayout from "../PageLayout";

export default function PageFour({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Stellar'
        italicSubtitle=''
        pText=''
        handleNext={() => handleNext("PageFive")}
      />
    </>
  );
}
