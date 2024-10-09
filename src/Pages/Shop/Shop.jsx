import React, { useState } from "react";
import useProducts from "../../Components/Hooks/useProducts";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
<<<<<<< HEAD
import { MdViewList, MdFavoriteBorder, MdAddShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";  
import { FcViewDetails } from "react-icons/fc";
import axios from "axios";
import useUsers from "../../Components/Hooks/useUsers";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import RecentView from "./RecentView/RecentView";
import useRecentView from "../../Components/Hooks/useRecntView";

const Shop = () => {
  const [products, loading] = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const productsPerPage = 9;
   const {user} = useAuth();
   const axiosPublic =useAxiosPublic()
  //  console.log(user)
  //  console.log(user?.email)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const handleRecentView = (id, image, price, category, name) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const userEmail = user?.email;
    
    const info = { id, image, price, category, name, date, userEmail };
          console.log(info)
    axiosPublic.post("/recentviews", info)
      .then(response => {
        console.log("Recent view logged:", response.data);
      })
      .catch((error) => {
        console.error("Error logging recent view:", error);
      });
  };
  const handleAddToCart = (id, image, price, name) => {
    const date = new Date().toLocaleDateString();
    const userEmail = user?.email;
  
    const info = { id, image, price, name, date, userEmail };
    axiosPublic.post("/cart", info)
      .then(response => {
        console.log("Cart item added:", response.data);
      })
      .catch(error => {
        console.error("Error adding cart item:", error);
      });
  };
  const handleWishlist = (id, image, price, name) => {
    const date = new Date().toLocaleDateString();
    const userEmail = user?.email;

    const info = { id, image, price, name, date, userEmail };
    axiosPublic.post("/wishlist", info)
      .then(response => {
        console.log("Wishlist item added:", response.data);
      })
      .catch(error => {
        console.error("Error adding wishlist item:", error);
      });
  };

  useEffect(() => {
    let updatedProducts = [...products];
=======
import { MdViewList } from "react-icons/md";
import ItemCard from "./ItemCard/ItemCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import ListItemCard from "./ListItemCard/ListItemCard";
import HotSale from "./HotSale/HotSale";
import { CiFilter } from "react-icons/ci";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const Shop = () => {
  const [products, loading] = useProducts();

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const [currentPage, setCurrentPage] = useState(1);

  const [viewMode, setViewMode] = useState("grid");

  const itemsPerPage = viewMode === "grid" ? 6 : 5;

  const [sortOption, setSortOption] = useState("default");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const [expandedCategory, setExpandedCategory] = useState(null);

  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = new Set(selectedCategories);
    if (updatedCategories.has(category)) {
      updatedCategories.delete(category);
    } else {
      updatedCategories.add(category);
    }
    setSelectedCategories(updatedCategories);
  };

  const filteredProducts = products.filter((product) => {
    const productPrice = product.price;
    const isAboveMin = minPrice === "" || productPrice >= parseFloat(minPrice);
    const isBelowMax = maxPrice === "" || productPrice <= parseFloat(maxPrice);

    const categoryMatches =
      selectedCategories.size === 0 ||
      selectedCategories.has("All") ||
      selectedCategories.has(product.category) ||
      selectedCategories.has(product.subCategory);

    const inStock = product.quantity > 0;
    const onSale = product.discount > 0;

    return (
      isAboveMin &&
      isBelowMax &&
      categoryMatches &&
      (!inStockOnly || inStock) &&
      (!onSaleOnly || onSale)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOption === "highToLow") {
      return b.price - a.price;
    }
    return 0;
  });

  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

<<<<<<< HEAD
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setPriceRange([Number(value), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Number(value)]); 
=======
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - (maxVisiblePages - 1));
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const getSubCategories = (category) => {
    return [
      ...new Set(
        products
          .filter((item) => item.category === category)
          .map((item) => item.subCategory)
      ),
    ];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-[30%_70%] gap-8">
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
                  className={`cursor-pointer hover:bg-primary hover:text-white hover:btn hover:btn-primary ${
                    selectedCategory === category
                      ? "font-bold btn btn-primary text-white"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
=======
    <div className="container mx-auto my-10 flex gap-4">
      <div className="space-y-10 w-1/4 bg-primary p-4 rounded-lg text-white hidden lg:block">
        <div>
          <p className="text-lg font-medium uppercase">Product Categories</p>
          <div className="divide bg-white h-[1px] my-2"></div>
          <div className=" h-80 overflow-y-auto mt-8">
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index}>
                  <p className="flex justify-start gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.has(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="size-4 rounded border-gray-300"
                      id={`Option${index}`}
                    />
                    {capitalizeWords(category)}
                    {category !== "All" && (
                      <button
                        className="ml-2 text-white"
                        onClick={() =>
                          setExpandedCategory(
                            expandedCategory === category ? null : category
                          )
                        }
                      >
                        {expandedCategory === category ? "-" : "+"}
                      </button>
                    )}
                  </p>
                  {expandedCategory === category && (
                    <div className="ml-4 mt-2 text-sm text-gray-300">
                      {getSubCategories(category).map(
                        (subCategory, subIndex) => (
                          <p key={subIndex}>
                            <input
                              type="checkbox"
                              checked={selectedCategories.has(subCategory)}
                              onChange={() => handleCategoryChange(subCategory)}
                              className="mr-2"
                            />
                            {capitalizeWords(subCategory)}{" "}
                          </p>
                        )
                      )}
                    </div>
                  )}
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
                </div>
              ))}
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Price Filter Section */}
        <section>
          <p className="text-2xl font-medium">Filter by Price</p>
          <hr className="border-dashed my-4" />
          <div className="space-y- w-full gap-2 flex">
            <div className="w-1/2">
              <label htmlFor="minPrice">Min Price:</label>
              <input
                type="number"
                name="minPrice"
                value={priceRange[0]}
                onChange={handlePriceRangeChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="maxPrice">Max Price:</label>
              <input
                type="number"
                name="maxPrice"
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
                className="border p-2 w-full"
              />
            </div>
          </div>
        </section>
        <hr className="border-dashed mt-4" />
        <h1 className="flex justify-center items-center font-bold text-white text-3xl">Most Recent View product</h1>
            {/* Most Recent View Product Section */}
        {mostRecentProduct && (
         <div className="card bg-base-100 w-96 shadow-xl">
         <figure className="px-10 pt-10">
           <img
             src={mostRecentProduct?.image}
             alt="Shoes"
             className="rounded-xl" />
         </figure>
         <div className="card-body items-center text-center">
           <h2 className="card-title font-bold text-2xl">{mostRecentProduct?.name}</h2>
           <p>{mostRecentProduct?.price}</p>
           <div className="card-actions">
           <Link to={`/productDetails/${mostRecentProduct?.id}`}>
               
                     
                      <button
    className="bg-primary text-white p-2 rounded-full border border-gray-300"
   
  >
   View Details
  </button></Link>
           </div>
         </div>
       </div>
        )}
      </section>
     
      {/* Products Section */}
      <section>
        <section className="flex justify-around flex-wrap">
          <p className="flex-1">
            Showing {currentProducts.length} of {filteredProducts.length}{" "}
            results
          </p>
          <section className="flex gap-2 ">
            <section className="flex gap-2">
=======
        <div>
          <div className="divide bg-white h-[1px] my-2"></div>
          <p className="text-lg font-medium uppercase mt-8">
            Filter By Price Range
          </p>
          <section className="flex justify-between gap-4 items-center mt-4">
            <input
              type="number"
              placeholder="Min"
              className="input input-bordered w-full max-w-xs text-black"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="input input-bordered w-full max-w-xs text-black"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </section>
        </div>

        <div>
          <div className="divide bg-white h-[1px] my-2"></div>
          <p className="text-lg font-medium uppercase mt-8">Product Status</p>
          <section className="mt-4 space-y-4">
            <p className="flex justify-start gap-4 items-center">
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="inStock"
                checked={inStockOnly}
                onChange={() => setInStockOnly(!inStockOnly)}
              />{" "}
              In Stock
            </p>
            <p className="flex justify-start gap-4 items-center">
              <input
                type="checkbox"
                id="onSale"
                checked={onSaleOnly}
                onChange={() => setOnSaleOnly(!onSaleOnly)}
                className="size-4 rounded border-gray-300"
              />{" "}
              On Sale
            </p>
          </section>
        </div>

        <div>
          <div className="divide bg-white h-[1px] my-2"></div>
          <p className="text-lg font-medium uppercase mt-8">Hot Sale Product</p>
        </div>
        <HotSale></HotSale>
      </div>

      <div className="lg:w-3/4 p-4">
        <div className="flex justify-between items-center">
          <p className="hidden lg:block">
            Showing {currentProducts.length} of {filteredProducts.length}{" "}
            results
          </p>
          <button
            onClick={toggleDrawer}
            className="lg:hidden flex items-center gap-2"
          >
            <CiFilter className="text-xl text-primary" />
            <span className=" font-semibold">Filter</span>
          </button>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="right"
            className="bla bla bla"
          >
            <div className="p-4 bg-primary h-screen space-y-10 text-white">
              <div>
                <p className="lg:text-lg md:text-lg text-base font-medium uppercase">
                  Product Categories
                </p>
                <div className="divide bg-white h-[1px] my-2"></div>
                <div className=" h-80 overflow-y-auto mt-8">
                  <div className="space-y-4">
                    {categories.map((category, index) => (
                      <div key={index}>
                        <p className="flex justify-start gap-2 items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.has(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="size-4 rounded border-gray-300"
                            id={`Option${index}`}
                          />
                          {capitalizeWords(category)}
                          {category !== "All" && (
                            <button
                              className="ml-2 text-white"
                              onClick={() =>
                                setExpandedCategory(
                                  expandedCategory === category
                                    ? null
                                    : category
                                )
                              }
                            >
                              {expandedCategory === category ? "-" : "+"}
                            </button>
                          )}
                        </p>
                        {expandedCategory === category && (
                          <div className="ml-4 mt-2 text-sm text-gray-300">
                            {getSubCategories(category).map(
                              (subCategory, subIndex) => (
                                <p key={subIndex}>
                                  <input
                                    type="checkbox"
                                    checked={selectedCategories.has(
                                      subCategory
                                    )}
                                    onChange={() =>
                                      handleCategoryChange(subCategory)
                                    }
                                    className="mr-2"
                                  />
                                  {capitalizeWords(subCategory)}{" "}
                                </p>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="divide bg-white h-[1px] my-2"></div>
                <p className="lg:text-lg md:text-lg text-base font-medium uppercase mt-8">
                  Filter By Price Range
                </p>
                <section className="flex justify-between gap-4 items-center mt-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input input-bordered w-full max-w-xs text-black"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="input input-bordered w-full max-w-xs text-black"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </section>
              </div>

              <div>
                <div className="divide bg-white h-[1px] my-2"></div>
                <p className="lg:text-lg md:text-lg text-base font-medium uppercase mt-8">
                  Product Status
                </p>
                <section className="mt-4 space-y-4">
                  <p className="flex justify-start gap-4 items-center">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="inStock"
                      checked={inStockOnly}
                      onChange={() => setInStockOnly(!inStockOnly)}
                    />{" "}
                    In Stock
                  </p>
                  <p className="flex justify-start gap-4 items-center">
                    <input
                      type="checkbox"
                      id="onSale"
                      checked={onSaleOnly}
                      onChange={() => setOnSaleOnly(!onSaleOnly)}
                      className="size-4 rounded border-gray-300"
                    />{" "}
                    On Sale
                  </p>
                </section>
              </div>
            </div>
          </Drawer>

          <div className="flex justify-center gap-4">
            <section className="flex justify-end gap-2 items-center text-xl">
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
              <button
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "text-primary" : ""}
              >
                <BsFillGrid3X2GapFill />
              </button>
              <button
<<<<<<< HEAD
              className={`${viewMode === "grid" ? "font-bold" : ""}`}

=======
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "text-primary" : ""}
              >
                <MdViewList />
              </button>
            </section>
<<<<<<< HEAD

            {/* Sort By Section (moved) */}
            <section className="flex  items-center">
              
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border p-2 bg-white text-black"
              >
                <option value="default">Default Sort</option>
                <option value="alphabeticalAZ">Alphabetically, A-Z</option>
                <option value="alphabeticalZA">Alphabetically, Z-A</option>
                <option value="lowToHigh">Price, low to high</option>
                <option value="highToLow">Price, high to low</option>
                <option value="dateOldToNew">Date, old to new</option>
                <option value="dateNewToOld">Date, new to old</option>
              </select>
            </section>
          </section>
        </section>
        <hr className="border-dashed my-4" />
=======
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f

            <select
              className="border text-black"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
<<<<<<< HEAD
              {/* Background image */}
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {/* Buttons on hover, overlaid on the image */}
                <div className="absolute top-30 left-0 -right-30 -bottom-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="grid grid-cols-1 ">
                    <Link to={`/productDetails/${item._id}`}>
                  
                    <motion.button
                        className="tooltip tooltip-right text-blue-500 p-2 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        data-tip="View Details"
                        style={{ zIndex: 1000 }}
                      >  <button onClick={()=>handleRecentView(item._id,item.image,item.price,item.category,item.name)}>
                        <FcViewDetails /></button>
                      </motion.button>
                    
                    </Link>
                    <motion.button
                      className="tooltip tooltip-right text-pink-600 p-2 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      data-tip="Add to Wishlist"
                    >
                      <MdFavoriteBorder size={24} />
                    </motion.button>
                    <motion.button
                      className="tooltip tooltip-right text-green-600 p-2 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      data-tip="Add to Cart"
                    >
                      <MdAddShoppingCart size={24} />
                    </motion.button>
                  </div>
                </div>
              </div>
              {/* Wishlist and Cart Icons */}
              <div class="absolute top-0 right-0 mt-2 mr-2 flex gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">

              <motion.button
                      className="tooltip tooltip-bottom text-pink-600 p-2 rounded full"
                      whileHover={{ scale: 1.1 }}
                      data-tip="Add To Wishlist"
                    > <button
                    className="bg-white text-black p-2 rounded-full border border-gray-300"
                    onClick={() => handleWishlist(item._id, item.image, item.price, item.name)}
                  >
                    <MdFavorite />
                  </button></motion.button>

                  <Link to={`/productDetails/${item._id}`}>
                  <motion.button
                      className="tooltip tooltip-bottom text-pink-600 p-2 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      data-tip="View Details"
                    >
                      <button
    className="bg-white text-black p-2 rounded-full border border-gray-300"
    onClick={() => handleRecentView(item._id, item.image, item.price, item.category, item.name)}
  >
    <FcViewDetails />
  </button></motion.button></Link>

  <motion.button
                      className="tooltip tooltip-bottom text-pink-600 p-2 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      data-tip="Add To Cart"
                    ><button
                    className="bg-white text-black p-2 rounded-full border border-gray-300"
                    onClick={() => handleAddToCart(item._id, item.image, item.price, item.name)}
                  >
                     <MdAddShoppingCart />
                  </button></motion.button>
</div>

            </motion.div>
=======
              <option value="default">Default Sort</option>
              <option value="lowToHigh">Price low to high</option>
              <option value="highToLow">Price high to low</option>
            </select>
          </div>
        </div>
        <div className="divide bg-black h-[1px] my-2"></div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between items-center mt-4">
            {currentProducts.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-4 mt-4">
            {currentProducts.map((item) => (
              <ListItemCard key={item._id} item={item} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={handlePreviousPage}
            className={`px-4 py-2 text-white bg-primary rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            <GrPrevious />
          </button>

          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`px-4 py-2 rounded-full ${
                number === currentPage
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {number}
            </button>
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
          ))}

<<<<<<< HEAD
        {/* Pagination */}
        <section className="mt-6">
          {totalPages > 1 && (
            <ul className="flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
      
=======
          <button
            onClick={handleNextPage}
            className={`px-4 py-2 text-white bg-primary rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            <GrNext />
          </button>
        </div>
      </div>
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
    </div>
  );
};

export default Shop;