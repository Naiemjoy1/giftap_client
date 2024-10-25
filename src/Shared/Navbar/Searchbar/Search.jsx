import { useState } from "react";
import useProducts from "../../../Components/Hooks/useProducts";
import { Link } from "react-router-dom";

const Search = () => {
  const [product] = useProducts();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = product.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative flex-grow">
      <label className="input input-bordered rounded-full flex items-center gap-2 w-3/4">
        <input
          type="text"
          className="grow w-full"
          placeholder="What are you looking for?"
          value={searchTerm}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70 text-primary"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      {searchTerm && (
        <div className="absolute top-full p-2 space-y-2 w-3/4 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((result) => {
                const truncateName = (name, charLimit) => {
                  if (name.length > charLimit) {
                    return name.slice(0, charLimit) + "...";
                  }
                  return name;
                };

                return (
                  <Link
                    to={`/shop/${result._id}`}
                    key={result._id}
                    className="flex justify-start items-center gap-4 ml-2 p-2 shadow-lg rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    onClick={handleClick}
                  >
                    <section className="w-1/3">
                      <img
                        src={result.image.cardImg1}
                        alt={result.name}
                        className="w-full h-24 object-cover rounded-md"
                      />
                    </section>

                    <section className="w-2/3 text-sm space-y-1">
                      <p className="font-bold text-base">
                        {truncateName(result.name, 16)}{" "}
                      </p>
                      <p className="text-base font-semibold">
                        {result.price} $
                      </p>
                      <p className="text-gray-600">{result.category}</p>
                      <p className="text-green-600">{result.discount}</p>
                    </section>
                  </Link>
                );
              })}
            </>
          ) : (
            <p className="text-gray-500 px-3 py-2">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
