import PageLayout from "../PageLayout";
import NextAnimaButton from "../../components/NextAnimaButton";
import gsap from "gsap";

export default function PageSeven({ handleNext, changeBackgroundVideo }) {
  const handleClick = () => {
    // Animate the button opacity to 0
    gsap.to(".next-anima-button", { opacity: 0, duration: 0.5 });
    // Call the function to play the video
    changeBackgroundVideo();
  };

  return (
    <>
      <NextAnimaButton
        nextText="Watch Molecules Fuse"
        onNextClick={handleClick}
        className="next-anima-button"
      />
      <PageLayout
        headingTitle="Stellar Collapse Pt.2"
        italicSubtitle="How Particles Become Compressed in Stellar Collapse"
        pText="During stellar collapse, the particles within the star’s core are pulled closer and closer together as gravity overwhelms the forces that previously kept them apart. As the core contracts, atoms are crushed, and the electrons are forced into the protons, forming neutrons in a process known as neutronization. This intense compression causes the matter to become incredibly dense, with particles packed together far more tightly than in any ordinary state of matter. In the case of the most massive stars, this compression continues until the core becomes a singularity, where the density is infinite and space-time is warped to its extreme."
        handleNext={() => handleNext("PageEight")}
        delay={1}
      />
    </>
  );
}
