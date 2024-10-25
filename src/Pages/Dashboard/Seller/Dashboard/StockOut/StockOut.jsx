import useAuth from "../../../../../Components/Hooks/useAuth";
import useProducts from "../../../../../Components/Hooks/useProducts";
import useSellers from "../../../../../Components/Hooks/useSellers";

const StockOut = () => {
  const { user } = useAuth();
  const [sellers] = useSellers();

  const currentSeller = sellers.find((seller) => seller.email === user.email);

  const [products] = useProducts();

  const currentProducts = products.filter(
    (product) => product.store_name === currentSeller.shopName
  );

  const stockOut = currentProducts.filter((product) => {
    if (product.category === "digital gift") {
      return product.priceGroup.some((tier) => tier.quantity < 10);
    }
    return product.quantity < 10;
  });

  return (
    <div>
      <div className="overflow-x-auto overflow-y-auto h-[300px]">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Product Details</th>
              <th>Seller Details</th>
              <th>Stock Low</th>
            </tr>
          </thead>
          <tbody>
            {stockOut.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image.cardImg1}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{item.store_name}</div>
                </td>
                <td className="text-red-600">
                  {item.category === "digital gift" ? (
                    <div>
                      {item.priceGroup
                        .filter((tier) => tier.quantity < 10)
                        .map((tier, idx) => (
                          <div key={idx}>
                            <span>
                              {tier.tier}: {tier.quantity}
                            </span>{" "}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <>{item.quantity}</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockOut;
