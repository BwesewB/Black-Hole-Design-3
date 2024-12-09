import PageLayout from "../PageLayout";

export default function PageSix({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Stellar Collapse'
        italicSubtitle=''
        pText=''
        handleNext={() => handleNext("PageSeven")}
      />
    </>
  );
}
