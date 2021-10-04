import { useEffect, useState, useContext } from "react";
import { ProductContext } from "./../utils/ProductContext";
import { useHistory } from "react-router";
// import {writeJsonFile} from 'write-json-file';

const ProductAddEdit = (props) => {
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState();
  const [isEdit, setIsEdit] = useState();
  let history = useHistory();
  // const[isBuyer,setIsBuyer]=useState(localStorage.getItem('isBuyer'))
  console.log(product);

  useEffect(() => {
    if (props.history.location.state) {
      const id = props.history.location.state.id;
      const val = products.find((element) => element.productId === id);
      setIsEdit(true);
      setProduct(val);
    } else {
      setProduct((prevstate) => ({
        ...prevstate,
        productCategory: "",
        productId: Math.floor(1100 + Math.random() * 9000),
        productImage: "",
        productName: "",
        productPrice: null,
        productStock: "",
        salePrice: null,
      }));
      setIsEdit(false);
    }
  }, []);

  const handleChange = (event, variable) => {
    // event.persist();
    let value;
    if (variable==="productPrice"||variable==="salePrice"){
        value=+event.target.value;
    }else{
        value=event.target.value;
    }
    setProduct((prevState) => ({
      ...prevState,
      [variable]: value,
    }));
  };

  const handleSubmit = async(e) => {

    e.preventDefault();
    console.log("submit");
    let newData;
    if (!isEdit) {
      newData = [...products, product];
      console.log(newData);
    } else {
      newData = products.map((element) => {
        if (product.productId === element.productId) {
          return product;
        } else {
          return element;
        }
      });
    }
    console.log("new data",newData)
    setProducts(newData);
    // const result=await writeJsonFile('./../data1.json', newData);
    // console.log(result) 
    history.push("/");
  };
  const handleChangeCheckbox = (event, variable) => {
    console.log("in click");
    const currentValue = product[variable];
    setProduct((prevState) => ({ ...prevState, [variable]: !currentValue }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-2 m-4">
        <div>
          <div className="flex w-full mx-auto p-4 m-6">
            <div className="bg-gray-400 w-full p-6 rounded-3xl">
              <div className="heading-3">
                {isEdit
                  ? `Edit Product Details of : ${
                      product && product.productName
                    }`
                  : `Add New Product`}
              </div>
            </div>
          </div>
          <div className=" mx-auto items-center p-4 m-6 ">
            <label className="heading">Product Name</label>
            <input
              type="text"
              name="productName"
              className="items-center border-2 border-gray-300 ml-2"
              value={product && product.productName}
              onChange={(event) => handleChange(event, "productName")}
            />
          </div>
          <div className=" mx-auto items-center p-4 m-6 ">
            <label className="heading">Product Category</label>
            <input
              type="text"
              name="productCategory"
              className="items-center border-2 border-gray-300 ml-2"
              value={product && product.productCategory}
              onChange={(event) => handleChange(event, "productCategory")}
            />
          </div>
          <div className=" mx-auto items-center p-4 m-6 ">
            <label className="heading">Product Price</label>
            <input
              type="number"
              name="productPrice"
              className="items-center border-2 border-gray-300 ml-2"
              value={product && product.productPrice}
              onChange={(event) => handleChange(event, "productPrice")}
            />
          </div>
          <div className=" mx-auto items-center p-4 m-6 ">
            <label className="heading">Sale Price</label>
            <input
              type="number"
              name="salePrice"
              className="items-center border-2 border-gray-300 ml-2"
              value={product && product.salePrice}
              onChange={(event) => handleChange(event, "salePrice")}
            />
          </div>
          <div className=" mx-auto items-center p-4 m-6 ">
            <label className="heading">In stock</label>
            <input
              type="checkbox"
              name="productStock"
              className="items-center border-2 border-gray-300 ml-2"
              checked={product && product.productStock ? true : false}
              onClick={(event) => handleChangeCheckbox(event, "productStock")}
            />
          </div>

          <div className=" mx-auto  p-4 m-6 ">
            <button className="  border-2 rounded-2xl border-black bg-blue-500 text-white font-bold text-xl px-6 py-3">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductAddEdit;
