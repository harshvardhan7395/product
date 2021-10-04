import { useEffect, useState } from "react";

const ProductView = (props) => {
  const [product, setProduct] = useState();
  console.log(props.history.location.state);

  useEffect(() => {
    if (props.history.location.state) {
      setProduct(props.history.location.state);
    }
  });
  return (
    <div>
      <div className="bg-white mx-auto  w-2/4 border-b-4 border-t-2 border-gray-500 rounded-3xl p-2 m-4">
        <h1 className="align-center font-bold">Product Details</h1>
        <div className="flex p-2">
          <div
            className={`font-bold text-xl ${
              product && product.productStock
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {product && product.productStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>
        <div className=" px-5 py-3 w-full flex justify-center">
          <img className=" w-1/4" src={product && product.productImage} />
        </div>
        <div className=" px-5 py-3 w-full flex justify-between">
          <div className="flex p-2">
            <div className="heading">Product Name: </div>
            <div className="content">{product && product.productName}</div>
          </div>
          <div className="flex p-2">
            <div className="heading">Sale Price: </div>
            <div className="">{product && product.salePrice.toFixed(3)}</div>
          </div>
        </div>
        <div className=" px-5 py-3 w-full flex justify-between">
          <div className="flex p-2">
            <div className="heading">Product Category: </div>
            <div className="content">{product && product.productCategory}</div>
          </div>
          <div className="flex p-2">
            <div className="heading">Product Price: </div>
            <div className="">{product && product.productPrice.toFixed(3)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
