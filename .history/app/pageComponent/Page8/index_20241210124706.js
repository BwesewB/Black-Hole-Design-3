import PageLayout from "../PageLayout";

export default function PageEight({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='boom'
        italicSubtitle='When a Star Dies in a Supernova'
        pText=''
        handleNext={() => handleNext("PageNine")}
      />
    </>
  );
}
