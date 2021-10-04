import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { ProductContext } from "./../utils/ProductContext";
import "./../style.css";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductList = (props) => {
  const history = useHistory();
  const [pageNumber, setpageNumber] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [products, setProducts] = useContext(ProductContext);
  const [isBuyer, setIsBuyer] = useState(
    localStorage.getItem("isBuyer") ? localStorage.getItem("isBuyer") : true
  );
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, sethasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [scrollBottom, setscrollBottom] = useState(false);
  const [searchProduct, setsearchProduct] = useState("");
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();

  useEffect(() => {
    if (localStorage.getItem("isBuyer") == null) {
      localStorage.setItem("isBuyer", true);
    }
    setIsBuyer(localStorage.getItem("isBuyer") === "true" ? true : false);
  }, []);

  useEffect(() => {
    console.log(pageData);
    setPageData(() => []);
    console.log(pageData);
    console.log(pageNumber);
    setLoading(true);
    let val;
    if (filter) {
      let count = 0;
      const value = filter === "In Stock" ? true : false;
      val = products.filter((ele) => {
        if (count < pageNumber * pageSize && ele.productStock === value) {
          count++;
          return ele;
        }
      });
    } else if (sort) {
      let count = 0;
      const sortarr = products.sort((a, b) => b.salePrice - a.salePrice);
      val = sortarr.filter((ele, index) => {
        if (index < pageNumber * pageSize) {
          return ele;
        }
      });
    } else {
      val = products.filter((ele, index) => {
        if (index < pageNumber * pageSize) {
          return ele;
        }
      });
    }
    sethasMore(products.length >= pageNumber * pageSize);
    setPageData(val);
    setLoading(false);
    setscrollBottom(false);
  }, [pageNumber]);

  const onScroll = () => {
    setscrollBottom(true);
    setpageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleEdit = (data) => {
    console.log(data);
    history.push("/product/", { id: data });
  };

  const handleView = (data) => {
    const val = products.find((element) => element.productId === data);
    history.push("/product/" + data, val);
  };

  const handleAdd = () => {
    history.push("/product/");
  };

  const handleRoleChange = (e) => {
    const temp = localStorage.getItem("isBuyer") === "true" ? true : false;
    setIsBuyer(!temp);
    localStorage.setItem("isBuyer", !temp);
    // e.preventDefault()
  };

  const handleChange = (event, field) => {
    if (event.target.value === "") {
      setpageNumber(1);
    }
    setsearchProduct((prev) => event.target.value);
    const val = products.filter((ele) => {
      const prodname = ele.productName.toLocaleLowerCase();
      if (prodname.search(event.target.value.toLocaleLowerCase()) >= 0) {
        return ele;
      }
    });
    setPageData(val);
  };

  const handleFilterChange = (e) => {
    if (e.target.value === "null") {
      setpageNumber((prev) => 1);

      let val = products.filter((ele, index) => {
        if (index < pageNumber * pageSize) {
          return ele;
        }
      });
      setFilter();
      setPageData(val);
    } else {
      let count = 0;
      const value = e.target.value === "In Stock" ? true : false;
      let val = products.filter((ele) => {
        if (count < pageNumber * pageSize && ele.productStock === value) {
          count++;
          return ele;
        }
      });
      setFilter((prev) => e.target.value);
      setPageData(val);
    }
  };
  const handleSort = (e) => {
    console.log(e.target.value);
    const is_sort = sort;
    if (e.target.value === "null") {
      setpageNumber(1);

      let val = products.filter((ele, index) => {
        if (index < pageNumber * pageSize) {
          return ele;
        }
      });
      setSort(false);
      setPageData(val);
    } else if (e.target.value === "Ascending") {
      setSort(e.target.value);
      const sortarr = products.sort((a, b) => a.salePrice - b.salePrice);
      let val = sortarr.filter((ele, index) => {
        if (index < pageNumber * pageSize) {
          return ele;
        }
      });
      setPageData(val);
    } else {
      setSort(e.target.value);
      const sortarr = products.sort((a, b) => b.salePrice - a.salePrice);
      let val = sortarr.filter((ele, index) => {
        if (index < pageNumber * pageSize) {
          return ele;
        }
      });
      setPageData(val);
    }
  };



  return (
    <div
      className="h-screen overflow-y-scroll overflow-x-scroll"

      id="scrolldiv"
    >
      <InfiniteScroll
        dataLength={
          searchProduct !== "" ? pageData.length : pageNumber * pageSize
        }
        next={onScroll}

        hasMore={searchProduct !== "" ? false : hasMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollableTarget="scrolldiv"
      >
        <div className="flex mx-auto w-1/2 p-4 m-6">
          <label style={{fontSize:22,lineHeight:"28px",fontWeight:"700"}} className=" my-auto heading">Switch User Role:</label>
          <button style={{backgroundColor:"#1b6d8d"}}
            className=" my-auto border-2 rounded-2xl border-black text-white font-bold text-xl px-3 py-1"
            onClick={handleRoleChange}
          >
            {isBuyer ? "Buyer" : "Seller"}
          </button>
          {isBuyer ? null : (
            <button style={{backgroundColor:"#800000"}}
              className=" mx-auto my-auto border-2 rounded-2xl border-black  text-white font-bold text-xl px-3 py-1"
              onClick={handleAdd}
            >
              Add Product
            </button>
          )}
        </div>

        {console.log("hasmore", pageData)}

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              name="searchProduct"
              placeholder="Enter Product Name"
              className="items-center border-2 border-gray-300 ml-2 w-1/3 p-4"
              value={searchProduct}
              onChange={(event) => handleChange(event, "productName")}
            />
          
            <label className="ml-5">Filter</label>
            <select
              name="filter"
              id="filter"
              className="mx-3  px-4 py-2"
              onChange={(event) => {
                handleFilterChange(event);
              }}
              value={filter}
            >
              <option value="null">Select</option>
              <option value="In Stock">In stock</option>
              <option value="Out of stock">Out of Stock</option>
            </select>
            <label className="ml-5">Sort</label>
            <select
              name="filter"
              id="filter"
              className="mx-3  px-4 py-2"
              onChange={(event) => {
                handleSort(event);
              }}
              value={filter}
            >
              <option value="null">Select</option>
              <option value="Ascending">Sale Price ↑</option>
              <option value="descending">Sale Price ↓</option>
            </select>
          </form>
        </div>
        {pageData.map((ele, index) => {
          return (
            <div key={ele.productId}>
              <div className="bg-white mx-auto flex w-2/4 p-2 m-4">
                <div
                  style={{
                    minWidth: "520px",
                    minHeight: "234px",     
                    position: "relative",
                  }}
                  className=" mx-2 px-2 w-full py-3 border-2 rounded-2xl border-black bg-gray-300"
                >
                  <div className="flex w-full p-2" style={{marginBottom:"30px"}}>
                    <img
                      className=" w-1/3"
                      alt="Error in  Loading"
                      src={ele && ele.productImage}
                    />
                    <div className="w-1/3">
                      <div className="heading">Product Name: </div>
                      <div className="content">
                        {ele && ele.productName ? ele.productName : null}
                      </div>
                    </div>
                    {console.log(ele)}
                    <div className="w-1/3">
                      <div className="heading">Sale Price: </div>
                      <div className="">
                        {ele && ele.salePrice
                          ? +ele.salePrice.toFixed(3)
                          : null}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left:"15px"
                    }}
                    className={`font-bold text-xl ${
                      ele && ele.productStock
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {ele && ele.productStock ? "In Stock" : "Out of Stock"}
                  </div>
                  <div style={{position:"absolute",bottom:"10px",right:"15px"}}>
                  {isBuyer ? null : (
                    <button
                      onClick={() => handleEdit(ele.productId)}
                      className=" mx-auto my-auto border-2 rounded-2xl border-black bg-gray-500 text-black font-bold text-xl px-3 py-1"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleView(ele.productId)}
                    className=" ml-4 mx-auto my-auto border-2 rounded-2xl border-black bg-gray-500 text-black font-bold text-xl px-3 py-1"
                  >
                    View
                  </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;
