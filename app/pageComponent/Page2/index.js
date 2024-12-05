import PageLayout from "../PageLayout";

export default function PageTwo({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Infinite Gravitational Pull'
        italicSubtitle='Nothing Escapes. Not Even Light'
        pText='Click the next button to see the gravitational pull!'
        handleNext={() => handleNext("PageThree")}
        delay={0}
      />
    </>
  );
}
