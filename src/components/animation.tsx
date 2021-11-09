import Lottie from "react-lottie";

export default function Animation({ lotti, width, height }) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};