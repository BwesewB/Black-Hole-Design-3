import PageLayout from "../PageLayout";

export default function PageOne({ handleNext }) {

  return (
    <>
      <PageLayout 
        headingTitle='What is a black hole?'
        italicSubtitle='The Invisible Force'
        pText='A black hole is a region in space where gravity is so intense that not even light can escape. It forms when a massive star collapses, creating a singularity—an infinitely dense point—and a boundary called the event horizon. Anything that crosses this boundary is pulled into the black hole, making it invisible. While black holes can’t be seen directly, their presence is known by how they affect nearby stars and gas. They play a critical role in shaping galaxies and our understanding of the universe.'
        handleNext={() => handleNext("PageTwo")}
      />
    </>
  );
}
