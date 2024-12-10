import PageLayout from "../PageLayout";

export default function PageEight({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='boom'
        italicSubtitle='When a Star Dies in a Supernova'
        pText=' In a spectacular release of energy, the star explodes in a supernova, sending its outer shells of gas and dust hurtling into space. This explosion is so intense that it can briefly outshine an entire galaxy. As the outer layers are ejected, the core continues to collapse inward, forming either a dense neutron star or, in the case of a very massive star, a black hole.'
        handleNext={() => handleNext("PageNine")}
      />
    </>
  );
}
