import PageLayout from "../PageLayout";

export default function PageTen({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='TON 618: Diameter'
        italicSubtitle='19 of our solar systems could fit side-by-side within its event horizon'
        pText="TON 618, one of the most massive known black holes, has an event horizon with an extraordinary diameter of approximately 390 billion kilometers. To put this into perspective, its size vastly exceeds the orbit of Neptune, making it one of the largest structures ever identified in the universe. The Schwarzschild radius, which defines this diameter, is proportional to the black hole's immense mass, enveloping a region so vast that even light cannot escape its gravitational pull."
        handleNext={() => handleNext("PageEleven")}
      />
    </>
  );
}
