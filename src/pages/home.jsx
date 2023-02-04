import React, { useEffect, useState } from "react";
import Product from "../componenets/product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { QrReader } from "react-qr-reader";
import Search from "../componenets/Search";
import { resetClient } from "../slices/clientSlice";
import { clearCart } from "../slices/cartSlice";
import Loader from "../componenets/Loader";
import Message from "../componenets/Message";

const Home = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(16);
  const [page, setPage] = useState(0);
  const [data, setData] = useState("No result");
  const [scanning, setScanning] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const params = {
      page: page,
      pageSize: pageSize,
      keyword: keyword,
    };
    dispatch(fetchProducts(params));
    // if(data !== "No result")
    // dispatch(fetchClientDetails(data));

  }, [dispatch, page, keyword, data]);

  const handleScan = (data) => {
    if (data) {
      setData(data);      
      setScanning(false);
    } else if (error) {
      console.info(error);
    }
  };

  const resteClientHandler = () => {
    dispatch(resetClient());
  };

  const restOrderHandler = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {scanning ? (
        <>
          <QrReader
            onResult={handleScan}
            // onError={error => console.info(error)}
            style={{ width: "100%" }}
            constraints={ {facingMode: 'environment'} }
            showViewFinder={true}
           />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex justify-between">
            <div className="mx-3 my-3">
              <button
                onClick={() => setScanning(true)}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:green-700 focus:outline-none focus:ring-2  focus:ring-offset-2"
              >
                Start Scan
              </button>
            </div>

            <div className="mx-3 my-3">
              <button
                onClick={() => resteClientHandler()}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:green-700 focus:outline-none focus:ring-2  focus:ring-offset-2"
              >
                Reset Client
              </button>
            </div>
            <div className="mx-3 my-3">
              <button
                onClick={() => restOrderHandler()}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:green-700 focus:outline-none focus:ring-2  focus:ring-offset-2"
              >
                Reset Order
              </button>
            </div>
            <Search>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-300 focus:bg-white focus:border-indigo-600"
              />
            </Search>
          </div>
          {loading ? <Loader/> : null }
          {error ? <Message>{error}</Message>: null}
          <div className="w-full grid bg-gray-300 sm:!grid-cols-2 sm:gap-1 md:grid-cols-3 md:gap-2 grid-cols-3 gap-3">
            {products.products?.map((product) => (
              <Product
                id={product._id}
                image={product.image}
                title={product.name}
                price={product.price}
                key={product._id}
              />
            ))}
          </div>
          <div className="bg-white p-4 flex items-center flex-wrap text-sm font-bold">
            <nav>
              <ul className="inline-flex">
                <li>
                  <button
                    disabled={page === 0}
                    className="px-4 py-2 text-sky-600 transition-colors duration-150 bg-white border border-r-0 border-sky-600 rounded-l-lg focus:shadow-outline hover:bg-sky-100 disabled:opacity-50"
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </button>
                </li>
                {Array.from({ length: products.pages }, (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setPage(i)}
                      className="px-4 py-2 text-sky-600 transition-colors duration-150 bg-white border border-r-0 border-sky-600 focus:shadow-outline "
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    disabled={page === products.pages - 1}
                    className="px-4 py-2 text-sky-600 transition-colors duration-150 bg-white border border-sky-600 rounded-r-lg focus:shadow-outline hover:bg-sky-100 disabled:opacity-50"
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

