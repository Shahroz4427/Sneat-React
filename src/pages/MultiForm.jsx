import { useState } from "react";
const MultiForm = () => {

   const [rows, setRows] = useState([
      {name:"", email:"", phone:"",errors:{name:'',email:'',phone:''} }
   ]);

   const addRow=()=> setRows([...rows,{name:"",email:"",phone:"",errors:{name:'',email:'',phone:''}}])
   
   const popRow=()=>setRows(rows.filter((row,index)=>index!=rows.length-1));

   const deleteRow=(currentIndex)=> setRows(rows.filter((row,index)=>index!=currentIndex))
   
   const handleError=()=>{
    return rows.map((row)=>{
         if(row.name===''){
            return {...row,errors:{...row.errors,name:'Name is required'}}
         }
         if(row.email===''){
            return {...row,errors:{...row.errors,email:'Email is required'}}
         }
         if(row.phone===''){
            return {...row,errors:{...row.errors,phone:'Phone is required'}}
         }
      });
   }


   const handleInputChange = (event, index, name) => {
      const newRows = [...rows];
      newRows[index][name] = event.target.value;
      setRows(newRows);
      
   };




    const handleSubmit=()=>{
    
        setRows(handleError);
    }


    const table=rows.map((row,index)=>(
        <tr key={index}>
            <td>
                <label className="form-label" htmlFor="name">Name</label>
                <input 
                  value={row.name}
                  onChange={(e) => handleInputChange(e, index, "name")}
                  className="form-control"
                  type="text"  
                  id="name" 
                  placeholder="John Doe">
                </input> 
                <span className="text-danger">{row.errors.name!=null ? row.errors.name : null}</span>    
            </td>
            <td>
                <label className="form-label" htmlFor="email">Email</label>
                <input 
                  value={row.email}
                  onChange={(e) => handleInputChange(e, index, "email")}
                  className="form-control"
                  type="text"  
                  id="email" 
                  placeholder="example@gmail.com">
                </input>
                <span className="text-danger">{row.errors.email!=null ? row.errors.email : null}</span>     
            </td>
            <td>
                <label className="form-label" htmlFor="phone">Phone</label>
                <input 
                  value={row.phone}
                  onChange={(e) => handleInputChange(e, index, "phone")}
                  className="form-control"
                  type="number"  
                  id="phone" 
                  placeholder="*********">
                </input>
                <span className="text-danger">{row.errors.phone!=null ? row.errors.phone : null}</span>          
            </td>
            <td>
                <button onClick={()=>deleteRow(index)} type="button" className="btn btn-danger mx-1">Delete</button>
            </td>
        </tr>
    ));

  return (
    <div>
        <div className="card __web-inspector-hide-shortcut__">
            <div className="card-header">
                <button onClick={handleSubmit} type="button" className="btn btn-success me-1" >Submit</button>
            </div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col 0">
                            <h6> Actions </h6>
                            <div className="d-flex flex-row-reverse">
                                <button onClick={popRow}  type="button" className="btn btn-danger me-1" >Pop</button>
                                <button onClick={addRow} type="button" className="btn btn-primary me-1" >Add </button>
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
            <div className="table-responsive text-nowrap">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>password</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                          {table}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default MultiForm