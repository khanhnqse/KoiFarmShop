import BannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* image section */}
          <div data-aos="zoom-in">
            <img
              src={BannerImg}
              alt=""
              className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </div>

          {/* text details section */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
              Winter Sale upto 50% Off
            </h1>
            <p
              data-aos="fade-up"
              className="text-sm text-gray-500 tracking-wide leading-5"
            >
              HIGHEST QUALITY JAPANESE KOI FISH (NISHIKIGOI) FOR SALE FROM
              NIIGATA, JAPAN
            </p>
            <div className="flex flex-col gap-4 pr-[60px]">
              <p
                data-aos="fade-up"
                className="text-sm text-gray-500 tracking-wide leading-5"
              >
                Our vision for the Koi Fish Farm Management System is to
                revolutionize the way Koi fish farms operate by providing a
                seamless, comprehensive platform that streamlines fish
                management, sales, and customer interactions. We envision a
                world where every Koi fish farm, regardless of size, can
                efficiently manage their stock, provide transparent and detailed
                information to customers, and offer personalized post-purchase
                services such as care and consignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
