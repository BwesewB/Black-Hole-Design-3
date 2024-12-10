import PageLayout from "../PageLayout";

export default function PageTen({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='TON 618: Diameter'
        italicSubtitle='19 of our solar systems could fit side-by-side within its event horizon'
        pText=''
        handleNext={() => handleNext("PageTen")}
      />
    </>
  );
}
