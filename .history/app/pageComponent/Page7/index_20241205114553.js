import PageLayout from "../PageLayout";

export default function PageSeven({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Stellar Collapse Pt.2'
        italicSubtitle=''
        pText=''
        handleNext={() => handleNext("PageEight")}
      />
    </>
  );
}
