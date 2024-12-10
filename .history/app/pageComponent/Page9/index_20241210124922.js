import PageLayout from "../PageLayout";

export default function PageNine({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='Ton 618'
        italicSubtitle='The Giant Among Giants'
        pText='After a star’s violent explosion in a supernova, some remnants of its collapsed core can evolve into incredibly dense and powerful objects, including supermassive black holes like TON 618. It lies at the center of a quasar, an active galactic nucleus that emits an enormous amount of energy due to the intense gravitational forces at work as matter spirals into the black hole. The energy released from this process outshines the combined light of all the stars in its host galaxy. While the formation of such supermassive black holes is still not fully understood, it is believed that they might form from the merging of smaller black holes or the collapse of massive clouds of gas, processes that begin long after the death of individual stars.'
        handleNext={() => handleNext("PageNine")}
      />
    </>
  );
}
