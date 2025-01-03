import { Button, Col, Row } from "antd";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      <AboutUsSection />
      <Row
        gutter={[16, 16]}
        style={{
          padding: "64px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Col xs={24} md={12}>
          <div className="pb-6">
            <Title level={4} className="pt-5">
              We Passionate Koi Keepers at Heart
            </Title>
            <Paragraph className="text-lg font-thin">
              Buying a new Koi is the highlight for any Koi Keepers and we
              understand just how magical the experience should be. Here at
              Exclusively Koi we are Japanese Koi Carp specialists and dedicate
              our knowledge and focus on providing exceptional customer service.
            </Paragraph>
          </div>
          <div className="pb-6">
            <Title level={4} className="pt-5">
              Unique Approach
            </Title>
            <Paragraph className="text-lg font-thin">
              At Exclusively Koi we have took a fresh approach to what we would
              offer to Koi keepers. Our passion lies with the Koi themselves so
              we decided to focus and specialise in livestock only. Our ethos is
              to do one thing and do it exceptioanlly well. All of our time is
              dedicated to sourcing the best Japanese Koi Carp from the finest
              breeders and providing you with super healthy Koi.
            </Paragraph>
          </div>
          <div className="pb-6">
            <Title level={4} className="pt-5">
              Unrivalled Expertise
            </Title>
            <Paragraph className="text-lg font-thin">
              Whether you are purchasing your first ever Koi or looking for
              something to challenge at top Koi shows in Japan or the UK you
              want to know that you are receiving the best advice. The team at
              Exclusively Koi has a rich heritage in the Koi industry both
              commercially and as hobbyists. Our sole aim is your satisfaction
              and to ensure that we fulfill your expectations and more.
            </Paragraph>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <img
            src={
              "https://images.unsplash.com/photo-1727696726111-b20cfcb027bb?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Our Story"
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <div className="text-center mt-10 mb-10">
        <Link to="/contact-us">
          <Button type="default" size="large">
            Contact Us Today
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AboutUs;
