import React from "react";
import Hero from "~/components/landing_page/Hero/Hero";
import NatureVid from "~/assets/video/main.mp4";
import BlogsComp from "~/components/landing_page/Blogs/BlogsComp";
import Places from "~/components/landing_page/Places/Places";
// import Testimonial from "~/components/landing_page/Testimonial/Testimonial";
import Banner from "~/components/landing_page/Banner/Banner";
import BannerPic from "~/components/landing_page/BannerPic/BannerPic";
import BannerImg from "~/assets/cover-women.jpg";
import Banner2 from "~/assets/travel-cover2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../../components/landing_page/Navbar/Navbar";
import Footer from "../../components/landing_page/Footer/Footer";

const Home = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  
  return (
    <>
    <Navbar />
      <div>
        <div className="h-[700px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <Hero />
        </div>
        <Places />
        <BannerPic img={BannerImg} />
        <BlogsComp />
        <Banner />
        <BannerPic img={Banner2} />
        {/* <Testimonial /> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
