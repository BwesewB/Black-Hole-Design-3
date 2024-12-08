import PageLayout from "../PageLayout";

export default function PageThree({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Event Horizon'
        italicSubtitle='The Point Of No Return'
        pText=''
        handleNext={() => handleNext("PageFour")}
        fill="#0e0e0e"
      />
    </>
  );
}
