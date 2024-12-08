import PageLayout from "../PageLayout";

export default function PageTwo({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Infinite Gravitational Pull'
        italicSubtitle='Nothing Escapes. Not Even Light'
        pText='A black hole’s gravitational pull is so intense that it warps space-time itself. Within the core, or singularity, matter is compressed to an infinitely small point, creating an infinite gravitational pull. Once an object crosses the event horizon, the boundary surrounding the black hole, it can no longer escape, not even light. The closer you get to the singularity, the stronger the gravity becomes, distorting both time and space in ways that challenge our understanding of physics. This immense force makes black holes some of the most mysterious and extreme objects in the universe. Click the next button to see the gravitational pull!'
        handleNext={() => handleNext("PageThree")}
        delay={0}
      />
    </>
  );
}
