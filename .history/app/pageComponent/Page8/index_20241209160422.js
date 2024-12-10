import PageLayout from "../PageLayout";

export default function PageEight({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='boom'
        italicSubtitle=''
        pText=''
        handleNext={() => handleNext("PageNine")}
      />
    </>
  );
}
