import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { ProductContext, ProductProvider } from "./utils/ProductContext";
import ProductList from "./Containers/ProductList";
import ProductAddEdit from "./Containers/ProductAddEdit";
import ProductView from "./Containers/ProductView";
// const fs = require('react-fs')
let path = require("path");
let filePath = path.join(__dirname, "data1.json");
// var path = process.cwd();
function App() {
  // const[isBuyer,setIsBuyer]=useState(false)
  // const[isBuyer,setIsBuyer]=useState(localStorage.getItem('isBuyer'))
  //   useEffect(()=>{

  //     localStorage.setItem('isBuyer',true)
  // },[])

  return (
    <div className="App">
      <Router>
        <Switch>
          <ProductProvider>
            <Route path="/" exact component={ProductList} />
            <Route path="/product/" exact component={ProductAddEdit} />
            <Route path="/product/:id" exact component={ProductView} />
          </ProductProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
