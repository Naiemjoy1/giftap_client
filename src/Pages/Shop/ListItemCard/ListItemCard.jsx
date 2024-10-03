import { Link } from "react-router-dom";

const ListItemCard = ({ item }) => {
  const { _id, name, image, price, description, category, priceGroup } = item;

  const truncatedName = name.length > 20 ? `${name.slice(0, 20)}...` : name;
  const truncatedDescription =
    description.length > 50 ? `${description.slice(0, 150)}...` : description;

  return (
    <Link
      to={`/shop/${_id}`}
      className="flex border border-gray-200 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition duration-300"
    >
      {/* Image Section */}
      <img
        src={image.cardImg}
        alt={name}
        className="h-40 w-40 object-cover rounded-l-lg"
      />

      {/* Details Section */}
      <div className="flex-grow pl-4">
        <div className="flex justify-between items-start">
          {category === "digital gift" ? (
            <p className="text-gray-700 font-semibold">
              {priceGroup.length}
              <span className="text-gray-400 ml-2">Price Variation</span>
            </p>
          ) : (
            <p className="text-gray-700 font-semibold">
              ${price}
              <span className="text-gray-400 line-through ml-2 font-semibold">
                $80
              </span>
            </p>
          )}
          <button className="rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
            <span className="sr-only">Wishlist</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>

        <h3 className="mt-2 text-lg font-medium text-gray-900">
          {truncatedName}
        </h3>

        <p className="mt-1 text-gray-700 line-clamp-3">
          {truncatedDescription}
        </p>

        <form className="mt-4 flex gap-4">
          {category === "digital gift" ? (
            <Link to={`/shop/${_id}`}>
              <button className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
                See More
              </button>
            </Link>
          ) : (
            <>
              <button className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
                Add to Cart
              </button>

              <button
                type="button"
                className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                Buy Now
              </button>
            </>
          )}
        </form>
      </div>
    </Link>
  );
};

export default ListItemCard;
