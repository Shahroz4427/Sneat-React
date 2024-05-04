import Modal from "../components/Modal"
import { useState,useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css';
import Pagination from '../components/Pagination'
import debounce from 'lodash.debounce';
const Crud = () => {

const [showCreateModal,setShowCreateModal]=useState(false);
const [showEditModal,setShowEditModal]=useState(false);
const [products, setProduct] = useState([]);
const [links,setLinks]=useState([])
const[form,setForm]=useState({
  hiddenId:null,
  name:'',
  quantity:0,
  brand:'',
  model:'',
  category:'',
  stock:'instock',
  price:0,
  errors:{
    name:null,
    quantity:null,
    brand:null,
    model:null,
    category:null,
    stock:null,
    price:null
  },
  formState:{
    isProcessing:false,
    containErrors:false,
  }
});
const [sorting,setSorting]=useState("desc");
const [filter,setFilter]=useState("");
const [search,setSearch]=useState("");

const resetForm=()=>{
    setForm(
      {...form,hiddenId:null,name:'',quantity:0,brand:'',category:'',model:'',price:0,stock:'instock',errors:{
      name:null,
      quantity:null,
      brand:null,
      model:null,
      category:null,
      stock:null,
      price:null},
      formState:{
        ...form.formState,
        isProcessing:false,
        containErrors:false
      }
    },);
}
  
const formLoading=()=> setForm(
  {...form,errors:{...form.errors},formState:{...form.formState,isProcessing:true}}
);
  
const closeCreateModal=()=>{
  setShowCreateModal(!showCreateModal);
  resetForm();
}

const closeEditModal=()=>{
  setShowEditModal(!showEditModal);
  resetForm();
}

const updateSearch=(e)=>setSearch(e?.target?.value);

const onChangeDebounceSearch= debounce(updateSearch,350);

 const showAlert=(msg) =>{
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1500
  })
}

const showErrorDialog=()=>{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>'
  })
}

const fetchData= async ()=> {
    try {
      const {data} = await axios.get(`http://127.0.0.1:8000/api/products?search=${search}&sorting=${sorting}&filter=${filter}`,{
         method: 'GET',
         mode: 'no-cors',
         headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer 1|cmVCcm1HYNDN2nzeDmXmwdK3TCCzMigVPEe4YMSs'
         }
      });
      setProduct(data.products.data)
      setLinks(data.products.links)
    } catch (error) {
       showErrorDialog();
       console.log(error);
    }
}

const postProductRequest= async (data)=>{
  await axios.post('http://127.0.0.1:8000/api/products',data,{
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization': 'Bearer 1|cmVCcm1HYNDN2nzeDmXmwdK3TCCzMigVPEe4YMSs'
    }
  })
  .then((response) => {
      if(response.status===201){
        fetchData();
        closeCreateModal();
        showAlert('Product Created Successfully');
        resetForm();
      }
  })
  .catch((error) => {
    if (error.response.status===422){
       setForm({...form,errors:{...form.errors,
          name:error.response.data.errors.name,
          quantity:error.response.data.errors.quantity,
          brand:error.response.data.errors.brand,
          model:error.response.data.errors.model,
          category:error.response.data.errors.category,
          stock:error.response.data.errors.stock,
          price:error.response.data.errors.price,
      },formState:{...form.formState,containErrors:true}})
      }else if(error.request){
          console.log(error.request)
          showErrorDialog();
      }else if(error.message){
          console.log(error.message)
          showErrorDialog();
      }
  });
}

const handleSubmit=()=>{
  const newProduct={
    name:form.name,
    quantity:form.quantity,
    brand:form.brand,
    model:form.model,
    category:form.category,
    stock:form.stock,
    price:form.price
  }
  formLoading();
  postProductRequest(JSON.stringify(newProduct));
}

const handleDelete= async (id)=>{
  await axios.delete(`http://127.0.0.1:8000/api/products/${id}`,{
   headers: {
     'Content-Type': 'application/json',
     'Accept':'application/json',
     'Authorization': 'Bearer 1|cmVCcm1HYNDN2nzeDmXmwdK3TCCzMigVPEe4YMSs'
   }
 })
 .then((response) => {
     if(response.status===201){
      
     }
 })
 .catch((error) => {
   showErrorDialog();
 });
}

const showDeleteAlert=(id) =>{
  Swal.fire({
      title: 'Are you sure?',
      text: `You will not be able to recover this ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
  }).then((result) => {
      if (result.value) {
        handleDelete(id);
        fetchData();
        showAlert('Product Deleted Successfully');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          // User clicked cancel button
      }
  })
}

const handleEdit=(id)=>{
  setShowEditModal(!showEditModal);
  const [product]= products.filter((products)=>products.id===id);
  setForm({...form,
    hiddenId:id,
    name:product.name,
    quantity:product.quantity,
    brand:product.brand,
    category:product.category,
    model:product.model,
    price:product.price,
    stock:product.stock
  });
}

const updatedProductRequest= async (id,data)=>{
  await axios.put(`http://127.0.0.1:8000/api/products/${id}`,data,{
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization': 'Bearer 1|cmVCcm1HYNDN2nzeDmXmwdK3TCCzMigVPEe4YMSs'
    }
  })
  .then((response) => {
      if(response.status===200){
        fetchData();
        closeEditModal();
        showAlert('Product Updated Successfully');
        resetForm();
      }
  })
  .catch((error) => {
    if (error.response.status===422){
       setForm({...form,errors:{...form.errors,
          name:error.response.data.errors.name,
          quantity:error.response.data.errors.quantity,
          brand:error.response.data.errors.brand,
          model:error.response.data.errors.model,
          category:error.response.data.errors.category,
          stock:error.response.data.errors.stock,
          price:error.response.data.errors.price,
      },formState:{...form.formState,containErrors:true}})
      }else if(error.request){
          console.log(error.request)
          showErrorDialog();
      }else if(error.message){
          console.log(error.message)
          showErrorDialog();
      }
  });
}

const handleUpdate=()=>{
  const updatedProduct={
    name:form.name,
    quantity:form.quantity,
    brand:form.brand,
    model:form.model,
    category:form.category,
    stock:form.stock,
    price:form.price
  }
  formLoading();
  updatedProductRequest(form.hiddenId,JSON.stringify(updatedProduct));
}

useEffect(() => {
  fetchData();
},[sorting,search])

  return (
    <div>
      {showCreateModal &&
        <Modal 
          title={"Create Product"} 
          header={
            <button onClick={closeCreateModal} type="button" className="btn-close" disabled={form.formState.isProcessing}  aria-label="Close"></button>
          }
          body={
            <>
              <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
                  <div className="col-sm-10">
                    <input 
                        value={form.name} 
                        onChange={(e)=> setForm({...form,name:e.target.value})} 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Enter Name">
                     </input>
                     <span className="text-danger">{form.errors?.name}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="quantity">Quantity</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.quantity} 
                      onChange={(e)=> setForm({...form,quantity:e.target.value})} 
                      type="number" 
                      className="form-control" 
                      id="quantity">
                     </input>
                    <span className="text-danger">{form.errors?.quantity}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="brand">Brand</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.brand} 
                      onChange={(e)=> setForm({...form,brand:e.target.value})} 
                      type="text" 
                      className="form-control" 
                      id="brand" 
                      placeholder="Enter Brand">
                    </input>
                    <span className="text-danger">{form.errors?.brand}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="model">Model</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.model} 
                      onChange={(e)=> setForm({...form,model:e.target.value})} 
                      type="text" 
                      id="model" 
                      className="form-control"
                      placeholder="Enter Model" >
                     </input>
                    <span className="text-danger">{form.errors?.model}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="category">Category</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.category} 
                      onChange={(e)=> setForm({...form,category:e.target.value})} 
                      type="text" 
                      id="category" 
                      className="form-control"  
                      placeholder="Enter Category">
                    </input>
                    <span className="text-danger">{form.errors?.category}</span>
                  </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Stock</label>
                    <div className="col-sm-10">
                        <select 
                            value={form.stock} onChange={(e)=> setForm({...form,stock:e.target.value})} 
                            className="form-select"  
                            aria-label="Default select example">
                            <option value={"instock"}>instock</option>
                            <option value={"outofstock"}>outofstock</option>
                          </select>
                        <span className="text-danger">{form.errors?.stock}</span>
                    </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="price">Price</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.price} 
                      onChange={(e)=> setForm({...form,price:e.target.value})} 
                      type="number" 
                      id="price" 
                      className="form-control">
                    </input>
                     <span className="text-danger">{form.errors?.price}</span>
                  </div>
                </div>
            </>
          }
          footer={
            <>
               <button onClick={closeCreateModal} type="button" disabled={form.formState.isProcessing} className="btn btn-dark">Close</button>
               <button onClick={handleSubmit} type="button"  className={form.formState.isProcessing ? 'btn btn-dark text-white-50' : 'btn btn-dark'} disabled={form.formState.isProcessing}>
                  <div className={form.formState.isProcessing ? 'spinner-border spinner-border-sm' : '' }  role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                    Save
               </button>
            </>
          }
        ></Modal>
      }
      {showEditModal &&
        <Modal 
          title={"Update Product"} 
          header={
            <button onClick={closeEditModal} type="button" className="btn-close" disabled={form.formState.isProcessing} aria-label="Close"></button>
          }
          body={
            <>
              <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
                  <div className="col-sm-10">
                    <input 
                        value={form.name} 
                        onChange={(e)=> setForm({...form,name:e.target.value})} 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Enter Name">
                     </input>
                     <span className="text-danger">{form.errors?.name}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="quantity">Quantity</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.quantity} 
                      onChange={(e)=> setForm({...form,quantity:e.target.value})} 
                      type="number" 
                      className="form-control" 
                      id="quantity">
                     </input>
                    <span className="text-danger">{form.errors?.quantity}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="brand">Brand</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.brand} 
                      onChange={(e)=> setForm({...form,brand:e.target.value})} 
                      type="text" 
                      className="form-control" 
                      id="brand" 
                      placeholder="Enter Brand">
                    </input>
                    <span className="text-danger">{form.errors?.brand}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="model">Model</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.model} 
                      onChange={(e)=> setForm({...form,model:e.target.value})} 
                      type="text" 
                      id="model" 
                      className="form-control"
                      placeholder="Enter Model" >
                     </input>
                    <span className="text-danger">{form.errors?.model}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="category">Category</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.category} 
                      onChange={(e)=> setForm({...form,category:e.target.value})} 
                      type="text" 
                      id="category" 
                      className="form-control"  
                      placeholder="Enter Category">
                    </input>
                    <span className="text-danger">{form.errors?.category}</span>
                  </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Stock</label>
                    <div className="col-sm-10">
                        <select 
                            value={form.stock} onChange={(e)=> setForm({...form,stock:e.target.value})} 
                            className="form-select"  
                            aria-label="Default select example">
                            <option value={"instock"}>instock</option>
                            <option value={"outofstock"}>outofstock</option>
                          </select>
                        <span className="text-danger">{form.errors?.stock}</span>
                    </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="price">Price</label>
                  <div className="col-sm-10">
                    <input 
                      value={form.price} 
                      onChange={(e)=> setForm({...form,price:e.target.value})} 
                      type="number" 
                      id="price" 
                      className="form-control">
                    </input>
                     <span className="text-danger">{form.errors?.price}</span>
                  </div>
                </div>
            </>
          }
          footer={
            <>
               <button onClick={closeEditModal} type="button" className="btn btn-dark" disabled={form.formState.isProcessing}>Close</button>
               <button onClick={handleUpdate} type="button"  className={form.formState.isProcessing ? 'btn btn-dark text-white-50' : 'btn btn-dark'} disabled={form.formState.isProcessing}>
                  <div className={form.formState.isProcessing ? 'spinner-border spinner-border-sm' : '' }  role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                    Update
               </button>
            </>
          }
        ></Modal>
      }
      <div className="card __web-inspector-hide-shortcut__">
            <div className="card-header">
                <button onClick={()=>setShowCreateModal(!showCreateModal)} type="button" className="btn btn-success" >Create</button>
            </div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col 0">
                            
                            <div className="row">
                                <div className="col-3">
                                <h6> Search </h6>
                                  <input onChange={onChangeDebounceSearch} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                </div>
                                <div className="col-3">
                                <h6> OrderBy </h6>
                                  <select onChange={(e)=>{setSorting(e.target.value)} } className="form-select" aria-label="Default select example">
                                      <option value="desc">decending</option>
                                      <option value="asc">accending</option>
                                  </select>
                                </div>
                                <div className="col-3">
                                <h6> Filter </h6>
                                  <select onChange={(e)=>setFilter(e.target.value)} className="form-select" aria-label="Default select example">
                                      <option value="">No Filter</option>
                                      <option value="id">id</option>
                                      <option value="name">name</option>
                                      <option value="quantity">quantity</option>
                                      <option value="brand">brand</option>
                                      <option value="category">quantity</option>
                                      <option value="model">brand</option>
                                      <option value="price">quantity</option>
                                  </select>
                                </div>
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
                        {
                          products.map((product,index)=>(
                            <tr key={index}>
                                <td>
                                  <i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{product.id}</strong>
                                </td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>
                                  <span className={product.stock==='instock' ? 'badge bg-label-success me-1' :'badge bg-label-warning me-1'}>{product.stock}</span>
                                </td>
                                <td>{product.price}</td>
                                <td>
                                    <div className="row ">
                                        <div className="col-6">
                                            <button onClick={()=>handleEdit(product.id)} type="button"  className="btn btn-warning mx-1">Edit</button>
                                            <button onClick={()=>showDeleteAlert(product.id)} type="button" className="btn btn-danger mx-1">Delete</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                          ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <Pagination pagelinks={links}></Pagination>
    </div>
  )
}

export default Crud