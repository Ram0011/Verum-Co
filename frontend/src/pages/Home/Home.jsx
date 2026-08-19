import React from "react";
import Hero from "../../components/Hero/Hero";
import Category from "@/components/Category/Category";
import ProductSection from "@/components/Product/ProductSection";

const Home = () => {
    return (
        <>
            <Hero />
            <Category />
            <ProductSection />
        </>
    );
};

export default Home;
