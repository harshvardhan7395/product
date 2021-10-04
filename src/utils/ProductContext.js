import React, { createContext, useEffect, useState } from "react";
import data from "./../data1.json"

export const ProductContext=createContext()

export const ProductProvider=props=>{
    const[products,setProducts]=useState(data)
    return  <ProductContext.Provider value={[products,setProducts]}>
        {props.children}
    </ProductContext.Provider>
}