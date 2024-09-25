import { useState, useEffect } from "react";
import useProducts from "../../Components/Hooks/useProducts";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { MdViewList } from "react-icons/md";
import { motion } from "framer-motion";

const Shop = () => {
  const [products, loading] = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const productsPerPage = 9;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const categories = ["All", ...new Set(products.map((item) => item.category))];

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

    // Sort by selected option
    if (sortOption === "lowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "alphabeticalAZ") {
      updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "alphabeticalZA") {
      updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "dateOldToNew") {
      updatedProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "dateNewToOld") {
      updatedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
  }, [selectedCategory, sortOption, priceRange, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      {/* Sidebar */}
      <section className="space-y-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-5 rounded-lg text-white">
        {/* Category Section */}
        <section>
          <p className="text-2xl font-medium">Product Categories</p>
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

        {/* Price Filter Section */}
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

        {/* Sort By Section */}
        <section>
          <p className="text-2xl font-medium">Sort By</p>
          <hr className="border-dashed my-4" />
          <div className="space-y-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border p-2 w-full bg-white text-black"
            >
              <option value="default">Default Sort</option>
              <option value="alphabeticalAZ">Alphabetically, A-Z</option>
              <option value="alphabeticalZA">Alphabetically, Z-A</option>
              <option value="lowToHigh">Price, low to high</option>
              <option value="highToLow">Price, high to low</option>
              <option value="dateOldToNew">Date, old to new</option>
              <option value="dateNewToOld">Date, new to old</option>
            </select>
          </div>
        </section>
      </section>

      {/* Products Section */}
      <section>
        <section className="flex justify-between">
          <p>
            Showing {currentProducts.length} of {filteredProducts.length} results
          </p>
          <section className="flex gap-5">
            <section className="flex gap-2">
              <button
                className={`${viewMode === "grid" ? "font-bold" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <BsFillGrid3X2GapFill />
              </button>
              <button
                className={`${viewMode === "list" ? "font-bold" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <MdViewList />
              </button>
            </section>
          </section>
        </section>
        <hr className="border-dashed my-4" />

        {/* Products Grid/List */}
        <section
          className={`grid ${
            viewMode === "grid" ? "grid-cols-3 gap-6" : "grid-cols-1 gap-6"
          }`}
        >
          {currentProducts.map((item) => (
            <motion.div
              key={item._id}
              className="relative group bg-white shadow-lg rounded-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.4 }}
                transition={{ duration: 0.5 }}
              />
              <section className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm font-semibold">Seller: {item.seller_name}</p>
                <p className="text-sm"><span className="font-bold text-pink-500">Store:</span>{item.store_name}</p>
                <p className="text-sm"><span className="font-bold text-pink-500">Category:</span>{item.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-red-500">${item.price}</span>
                  <span className="text-sm text-red-500">{item.discount}</span>
                </div>
                <motion.section
                  className="flex justify-center items-center gap-4 w-full mx-auto py-2"
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button className="text-sm font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 rounded-full">
                    Add to Cart
                  </button>
                  <button className="text-sm font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 rounded-full">
                    View Details
                  </button>
                </motion.section>
              </section>
            </motion.div>
          ))}
        </section>

        {/* Pagination */}
        <section className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? "bg-pink-400 text-white" : "bg-red-400 text-white"
            }`}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages ? "bg-pink-400 text-white" : "bg-red-400 text-white"
            }`}
          >
            Next
          </button>
        </section>
      </section>
    </div>
  );
};

export default Shop;
