import React, { useState } from "react";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <ProductList selectedCategory={selectedCategory} />
    </>
  );
};

export default Shop;