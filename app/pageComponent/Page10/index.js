import PageLayout from "../PageLayout";

export default function PageTen({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='TON-618: Mass'
        italicSubtitle='The mass of TON-618 exceeds the mass of 66 billion suns'
        pText=''
        handleNext={() => handleNext("PageEleven")}
      />
    </>
  );
}
