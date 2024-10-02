import { BiSupport } from "react-icons/bi";
import { IoAccessibilityOutline, IoPricetagsOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { AimOutlined, ContactsFilled } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { TbBookFilled } from "react-icons/tb";

const ServicesData = [
  {
    id: 1,
    title: "CV Assistance",
    link: "/cv",
    icon: <IoAccessibilityOutline />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Simulated Interview",
    link: "/simulated-interview",
    icon: <AimOutlined />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Learning",
    link: "/learning",
    icon: <TbBookFilled />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "Pricing",
    link: "/pricing",
    icon: <IoPricetagsOutline />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "Contact us",
    link: "/contact-us",
    icon: <ContactsFilled />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "Quickly support",
    link: "/contact-us",
    icon: <BiSupport />,
    delay: 0.7,
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Services = () => {
  return (
    <section className="bg-white opacity-80">
      <div className="container pb-14 pt-16">
        <h1 className="text-4xl font-bold text-left pb-10 text-[#3B7B7A]">
          Services we provide
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-white">
          {ServicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={SlideLeft(service.delay)}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
              className="hover:scale-110 duration-300 hover:shadow-white"
            >
              {/* Wrap the service in a Link */}
              <Link
                to={service.link}
                className="bg-[#3B7B7A] h-[185px] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:text-black"
              >
                <div className="text-4xl mb-4"> {service.icon}</div>
                <h1 className="text-lg font-semibold text-center px-3">
                  {service.title}
                </h1>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
