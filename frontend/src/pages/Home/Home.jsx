import Hero from "../../components/Hero/Hero";
import Category from "@/components/Category/Category";
import ProductSection from "@/components/Product/ProductSection";
import Marquee from "@/components/landing/Marquee";

const Home = () => {
    return (
        <>
            <Hero />
            <Marquee />
            <Category />
            <ProductSection />
        </>
    );
};

export default Home;
