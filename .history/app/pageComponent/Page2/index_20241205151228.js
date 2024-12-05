import PageLayout from "../PageLayout";

export default function PageTwo({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Infinite Gravitational Pull'
        italicSubtitle='Nothing Escapes. Not Even Light'
        pText='what you just saw was the Gravitational Pull of the black hole'
        handleNext={() => handleNext("PageThree")}
      />
    </>
  );
}
