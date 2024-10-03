import { useState } from "react";
import useProducts from "../../Components/Hooks/useProducts";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { MdViewList } from "react-icons/md";
import ItemCard from "./ItemCard/ItemCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import ListItemCard from "./ListItemCard/ListItemCard";

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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
    <div className="container mx-auto my-10 flex gap-4">
      <div className="space-y-10 w-1/4 bg-primary p-4 rounded-lg text-white">
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
                </div>
              ))}
            </div>
          </div>
        </div>

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
      </div>

      <div className="w-3/4 p-4">
        <div className="flex justify-between items-center">
          <p>
            Showing {currentProducts.length} of {filteredProducts.length}{" "}
            results
          </p>
          <div className="flex justify-center gap-4">
            <section className="flex justify-end gap-2 items-center text-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "text-primary" : ""}
              >
                <BsFillGrid3X2GapFill />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "text-primary" : ""}
              >
                <MdViewList />
              </button>
            </section>

            <select
              className="border text-black"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default Sort</option>
              <option value="lowToHigh">Price low to high</option>
              <option value="highToLow">Price high to low</option>
            </select>
          </div>
        </div>
        <div className="divide bg-black h-[1px] my-2"></div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-3 gap-4 justify-between items-center mt-4">
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
          ))}

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
    </div>
  );
};

export default Shop;
