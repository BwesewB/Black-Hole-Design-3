import PageLayout from "../PageLayout";

export default function PageOne({ handleNext }) {

  return (
    <>
      <PageLayout 
        headingTitle='What is a black hole?'
        italicSubtitle='pepepepe'
        pText=''
        handleNext={() => handleNext("PageTwo")}
      />
    </>
  );
}
