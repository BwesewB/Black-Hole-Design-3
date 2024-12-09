import PageLayout from "../PageLayout";

export default function PageFive({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='How Black Holes Form'
        italicSubtitle=''
        pText=''
        handleNext={() => handleNext("PageSix")}
      />
    </>
  );
}
