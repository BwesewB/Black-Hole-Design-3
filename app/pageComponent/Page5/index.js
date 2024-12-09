import PageLayout from "../PageLayout";

export default function PageFive({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='The Birth of Black Holes'
        italicSubtitle='How Dying Stars Create Singularities'
        pText='Black holes form when massive stars run out of fuel and can no longer sustain the nuclear fusion needed to support their massive size. When a star with a mass greater than about three times that of the Sun exhausts its nuclear fuel, its core collapses under the force of gravity, causing it to shrink into an incredibly dense and compact object. This collapse results in a singularity, a point where gravity is so intense that not even light can escape, surrounded by an event horizon. The outer layers of the star are blown away in a supernova explosion, while the core continues to collapse, ultimately forming a black hole.'
        handleNext={() => handleNext("PageSix")}
      />
    </>
  );
}
