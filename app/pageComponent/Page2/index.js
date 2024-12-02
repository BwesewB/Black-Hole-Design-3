import PageLayout from "../PageLayout";

export default function PageTwo({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Infinite Gravitational Pull'
        italicSubtitle='Nothing Escapes. Not Even Light'
        pText=''
        handleNext={() => handleNext("PageThree")}
      />
    </>
  );
}
