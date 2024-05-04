import AppLayout from "../layouts/AppLayout.jsx"
import { useState,useEffect } from 'react'
import Pagination from "../components/Pagination.jsx";
import axios from "axios";

const Home=()=>{
   
const [products, setProduct] = useState([])
const [links,setLinks]=useState([])


const fetchData= async (token)=> {
    try {
      const {data} = await axios.get('http://127.0.0.1:8000/api/products',{
         method: 'GET',
         mode: 'no-cors',
         headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
         }
      });
      setProduct(data.products.data)
      setLinks(data.products.links)
    } catch (error) {
      console.log(error);
    }
}

const productListing=products.map((product,index)=>(
    <tr key={index}>
        <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{product.id}</strong></td>
        <td>{product.name}</td>
        <td>{product.quantity}</td>
        <td>{product.brand}</td>
        <td>{product.category}</td>
        <td>{product.stock}</td>
        <td>{product.price}</td>
        <td>
            <div className="row ">
                <div className="col-6">
                    <button  type="button"  className="btn btn-warning mx-1">Edit</button>
                    <button  type="button" className="btn btn-danger mx-1">Delete</button>
                </div>
            </div>
        </td>
    </tr>
));

useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    fetchData(token);
},[])

 return(
     <>
        <div className="card __web-inspector-hide-shortcut__">
            <div className="card-header">
                <button type="button" className="btn btn-success" >Create</button>
            </div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col 0">
                            <h6> Search </h6>
                            <div className="col-3">
                                <input  type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
            <div className="table-responsive text-nowrap">
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>quantity</th>
                        <th>brand</th>
                        <th>category</th>
                        <th>stock</th>
                        <th>price</th>
                        <th>actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {productListing }
                    </tbody>
                </table>
            </div>
        </div>
        <Pagination pagelinks={links}></Pagination>
    </>
    )
}
export default Home