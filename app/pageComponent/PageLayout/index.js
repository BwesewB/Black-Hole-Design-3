import gsap from "gsap";
import TextAreaLeft from '../../components/TextAreas/TextAreaLeft';
import NextArrow from '../../components/NextArrow';

export default function PageLayout({ 
    handleNext,
    headingTitle="",
    italicSubtitle="",
    pText=""
}) {

  const onClickHandler = () => {
    handleNext({handleNext});
  };

  return (
    <>
        <div>
            <TextAreaLeft 
              headingTitle={headingTitle}
              italicSubtitle={italicSubtitle}
              pText={pText || "Lorem ipsum dolor sit amet consectetur. Ipsum cursus tempor ultricies pellentesque egestas massa. Porta massa phasellus ut nunc sem risus senectus sapien viverra. Nunc vitae senectus ullamcorper nec est faucibus lectus amet. Nunc nam ac pellentesque ut risus enim eget. Pharetra ut sapien nunc diam adipiscing ultrices ut. Proin proin metus dictum sit vel sapien facilisis adipiscing enim. Purus fringilla amet id aenean arcu justo morbi adipiscing a. Nec nisi."}
            />
            <NextArrow onClickHandler={onClickHandler} />
        </div>
    </>
  );
}
