import PageLayout from "../PageLayout";

export default function PageEight({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Ton 618'
        italicSubtitle='The Giant Among Giants'
        pText=''
        handleNext={() => handleNext("PageNine")}
      />
    </>
  );
}
