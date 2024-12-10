import PageLayout from "../PageLayout";

export default function PageEleven({ handleNext }) {

  return (   
    <>
      <PageLayout 
        headingTitle='TON-618: Mass'
        italicSubtitle='The mass of TON-618 exceeds the mass of 66 billion suns'
        pText="The mass of TON 618 is staggering, estimated at around 66 billion times the mass of our Sun. This makes it an ultramassive black hole, far surpassing the typical supermassive black holes found in the centers of galaxies. Such an enormous mass suggests that TON 618 has been accreting material at an extraordinary rate for billions of years, consuming gas, stars, and other matter in its vicinity, while emitting immense amounts of energy in the form of a luminous quasar."
        handleNext={() => handleNext("PageTwelve")}
      />
    </>
  );
}
