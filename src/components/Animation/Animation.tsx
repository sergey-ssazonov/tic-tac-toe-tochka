import { type FC } from "react";
import Lottie from "lottie-react";

type IAnimationProps =  {
  animationData: any;
  className?: string;
}

const Animation: FC<IAnimationProps> = ({ animationData, className }) => {
  return (
    <Lottie
      loop={false}
      autoplay={true}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
      className={className}
      animationData={animationData}
    />
  );
};

export default Animation;
