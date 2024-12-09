import PageLayout from "../PageLayout";

export default function PageSix({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Stellar Collapse'
        italicSubtitle="The Final Stage of a Stars Life"
        pText="Stellar collapse occurs when a star can no longer sustain the balance between gravity and the energy produced by nuclear fusion. As a star exhausts its nuclear fuel, the core begins to contract under gravity's immense pull, while the outer layers may expand or be expelled. If the star is massive enough, this collapse leads to the formation of a neutron star or, in the case of even greater mass, a black hole. The process is often marked by a dramatic supernova explosion, which signals the end of the star’s life and the beginning of a new cosmic phase."
        handleNext={() => handleNext("PageSeven")}
      />
    </>
  );
}
