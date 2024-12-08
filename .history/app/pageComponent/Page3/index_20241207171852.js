import PageLayout from "../PageLayout";

export default function PageThree({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Event Horizon'
        italicSubtitle='The Point Of No Return'
        pText='The event horizon is the boundary around a black hole beyond which nothing can escape its immense gravitational pull—not even light. Once an object crosses this point, it is inevitably drawn toward the black holes singularity. The event horizon marks the limit where escape velocity exceeds the speed of light, meaning no information or matter can travel back across it. From a distance, the event horizon appears as a dark, invisible boundary, but its effects are felt in the surrounding space as it distorts light and time. Anything that crosses this threshold is lost to the black hole forever.'
        handleNext={() => handleNext("PageFour")}
        fill="#0e0e0e"
      />
    </>
  );
}
