import React from "react";

type BannerPicProps = {
  img: unknown;
};

const BannerPic: React.FC<BannerPicProps> = ({ img }) => {
  const bgImage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
  };
  return (
    <div data-aos="zoom-in" className="h-[400px] w-full" style={bgImage}></div>
  );
};

export default BannerPic;
