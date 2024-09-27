import { Link } from "react-router-dom";

const SearchList = ({ searchResult }) => {

    console.log(searchResult)
    return (
        <div >

            <div className="text-black w-96 p-2 rounded-lg overflow-y-auto ">

                { searchResult ?
                    searchResult.map((product, i) => (
                        <div key={i} className="bg-blue-200  text-black  p-2  hover:text-rose-500">
                            {/* <h3 >{product.name}</h3> */}
                            <Link to={product._id} >{product.name}</Link>
                        </div>
                    )) :

                    <> </>
                }
                
            </div>

 

        </div>
    );
};

export default SearchList;