import { useState, useEffect } from "react";
import useProducts from "../../Components/Hooks/useProducts";

const Shop = () => {
  const [products, loading] = useProducts();
  console.log(products);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // Tracks view mode
  const [sortOption, setSortOption] = useState("default"); // Tracks sorting option
  const [priceRange, setPriceRange] = useState([0, 100]); // Tracks selected price range
  const productsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get unique categories
  const categories = ["All", ...new Set(products.map((item) => item.category))];

  // Update filtered products when category, sort option, or price range changes
  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    updatedProducts = updatedProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort based on sortOption
    if (sortOption === "highToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "lowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to page 1 when category, sorting, or price changes
  }, [selectedCategory, sortOption, priceRange, products]);

  // Get products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle price range input
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setPriceRange([Number(value), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Number(value)]);
    }
  };

  return (
    <div className="container mx-auto my-10 grid grid-cols-[30%_70%] justify-between gap-10">
      <section className="space-y-8">
        <section>
          <p className="text-2xl font-medium">Product categories</p>
          <hr className="border-dashed mt-4" />
        </section>
        <section>
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li key={index} className="mb-4">
                <div
                  className={`cursor-pointer ${
                    selectedCategory === category ? "font-bold" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </div>
                {index !== categories.length - 1 && (
                  <hr className="border-dashed my-4" />
                )}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <p className="text-2xl font-medium">Filter by Price</p>
          <hr className="border-dashed my-4" />
          <div className="space-y-2">
            <label htmlFor="minPrice">Min Price:</label>
            <input
              type="number"
              name="minPrice"
              value={priceRange[0]}
              onChange={handlePriceRangeChange}
              className="border p-2 w-full"
            />
            <label htmlFor="maxPrice">Max Price:</label>
            <input
              type="number"
              name="maxPrice"
              value={priceRange[1]}
              onChange={handlePriceRangeChange}
              className="border p-2 w-full"
            />
          </div>
        </section>
      </section>
      <section>
        <section className="flex justify-between">
          <p>
            Showing {currentProducts.length} of {filteredProducts.length}{" "}
            results
          </p>
          <section className="flex gap-5">
            <section className="flex gap-2">
              <button
                className={`${viewMode === "grid" ? "font-bold" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                Grid view
              </button>
              <button
                className={`${viewMode === "list" ? "font-bold" : ""}`}
                onClick={() => setViewMode("list")}
              >
                List View
              </button>
            </section>

            {/* Sorting Options */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border p-2"
            >
              <option value="default">Default Sort</option>
              <option value="highToLow">Sort by Price: High to Low</option>
              <option value="lowToHigh">Sort by Price: Low to High</option>
            </select>
          </section>
        </section>
        <hr className="border-dashed my-4" />

        {/* Apply different grid classes based on viewMode */}
        <section
          className={`grid ${
            viewMode === "grid" ? "grid-cols-3 gap-4" : "grid-cols-1 gap-4"
          }`}
        >
          {currentProducts.map((item) => (
            <div key={item._id} className=" p-4">
              <img src={item.image} alt="" />
              <section className="text-center">
                <p>{item.price}</p>
                <p>{item.name}</p>
                <p>Rating</p>
              </section>
            </div>
          ))}
        </section>

        {/* Pagination Controls */}
        <section className="flex justify-center mt-4">
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={` py-2 px-4 border ${
                    currentPage === index + 1
                      ? " bg-primary rounded-full text-white"
                      : "bg-gray-200 rounded-full"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};

export default Shop;
