import { useState,useEffect  } from "react"
import axios from "axios"
const UserForm = () => {
    
    const[form,setForm]=useState({
        name:'',
        email:'',
        password:'',
        errors:{
            name:null,
            email:null,
            password:null
        },
        isProcessing:false
    })



    const postUserRequest= async (data)=>{
        await axios.post('http://127.0.0.1:8000/api/register',data )
        .then((response) => {
            
            if(response.status===201){
                localStorage.setItem('token', JSON.stringify(response.data.token));
            }
        })
        .catch((error) => {
          if (error.response.status===422){
             setForm({...form,errors:{...form.errors,
                name:error.response.data.errors.name,
                email:error.response.data.errors.email,
                password:error.response.data.errors.password,
            }})
            }else if(error.request){
                console.log(error.request)
            }else if(error.message){
                console.log(error.message)
            }
        });
    }

    const clearForm=()=>setForm({...form,name:'',email:'',password:'',errors:{...form.errors},isProcessing:false});

    const handleSubmit= async (e) =>{
        e.preventDefault();
        const newUser={
            name:form.name,
            email:form.email,
            password:form.password
        }
        postUserRequest(newUser);
        setForm({...form,errors:{...form.errors},isProcessing:true});
    }



  return (
    <div className="row">
        <div className="col-xl">
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Basic Layout</h5>
                    <small className="text-muted float-end">Default label</small>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#basicModal" >
                      Launch modal
                    </button>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Name</label>
                            <input value={form.name} className={form.errors.name!=null ? 'form-control is-invalid' : 'form-control'} onChange={(e)=> setForm({...form,name:e.target.value}) } type="text"  id="basic-default-fullname" placeholder="John Doe"></input>
                            {form.errors.name!=null ? (<span className="text-danger">{ form.errors.name}</span>) : null}
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-email">Email</label>
                            <div className="input-group input-group-merge">
                            <input value={form.email} className={form.errors.email!=null ? 'form-control is-invalid' : 'form-control'} onChange={(e)=> setForm({...form,email:e.target.value}) } type="text" id="basic-default-email"  placeholder="john.doe" aria-label="john.doe" aria-describedby="basic-default-email2"></input>
                            
                            <span className="input-group-text" id="basic-default-email2">@example.com</span>
                            </div>
                            {form.errors.email!=null ? (<span className="text-danger">{ form.errors.email}</span>) : null}
                            <div className="form-text">You can use letters, numbers &amp; periods</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-password">Password</label>
                            <input value={form.password} className={form.errors.password!=null ? 'form-control phone-mask is-invalid' : 'form-control phone-mask'} onChange={(e)=> setForm({...form,password:e.target.value}) } type="password" id="basic-default-password"  placeholder="*********"></input>
                            {form.errors.password!=null ? (<span className="text-danger">{ form.errors.password}</span>) : null}
                        </div>
                        <button type="submit" className={form.isProcessing ? 'btn btn-dark text-white-50' : 'btn btn-dark'}  disabled={form.isProcessing}>
                            <div className={form.isProcessing ? 'spinner-border spinner-border-sm' : '' }  role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                              Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserForm