import React from 'react'
import Banner from "./components/Banner";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";

const HomePage = () => {
  return (
    <>
      <Banner />
      <CategoryList />
      <ProductList />
    </>
  )
}

export default HomePage