import { type FC } from "react";
import Lottie from "lottie-react";

interface AnimationProps {
  animationData: any;
  className?: string;
}

const Animation: FC<AnimationProps> = ({ animationData, className }) => {
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
