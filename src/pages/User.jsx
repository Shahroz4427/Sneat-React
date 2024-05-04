import Layout from '../layouts/AppLayout'
import { useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css';
const User=()=>{
 
    const [users,setUser]=useState([
        {id:1,name:'Shahroz',lastname:'khan',email:'Shah.Shahrozkhanshah@gmail.com',phone:'03442795822',address:'Pechs block 2'}
    ]);
   
    

    const handleCreateUser=()=>{
       const newUserObject={ 
            id:2,
            name:'Faraz',
            lastname:'khan',
            email:'fk35795@gmail.com', 
            phone:'034427942322',
            address:'Pechs block 3'
        }
        setUser([...users,newUserObject]);
    };
    

    const handleDestroyUser=(id)=>{
        setUser(users.filter((user,index)=> index!==id ));
    }
    

    const handleUpdateUser=(userIndex)=>{
        setUser(users.map((user,index)=>index==userIndex ? {...user,name:'Admin'} : user ));
    }



    const showAlert=(id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this '+id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.value) {
                handleDestroyUser(id);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked cancel button
            }
        })
    }
    const usersListing=users.map((user,index)=>(
        <tr key={index}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.address}</td>
            <td>
                <div className="row ">
                    <div className="col-6">
                        <button onClick={()=>handleUpdateUser(index) } type="button"  className="btn btn-warning mx-1">Update</button>
                        <button onClick={()=>showAlert(index)} type="button" className="btn btn-danger mx-1">Delete</button>
                    </div>
                </div>
            </td>
        </tr>
    ));

    return(
      <Layout>
         <div className="card __web-inspector-hide-shortcut__">
            <div className="card-header">
                <button onClick={handleCreateUser} type="button" className="btn btn-success" >Create</button>
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
                            <th>lastname</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>address</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {usersListing}
                    </tbody>
                </table>
            </div>
        </div>
      </Layout>
    );
}
export default User;