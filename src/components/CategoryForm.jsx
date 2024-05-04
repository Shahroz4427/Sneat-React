import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import Button from '../components/LoadingButton';
import  {z} from "zod";

const CategoryForm=({onSubmitted,categories})=>{

    const schema = z.object({
        amount: z.number(),
        description: z.string().max(50).min(4),
        category: z.enum(categories,{
            errorMap: (issue, ctx) => ({ message: 'Invalid category' })
        })
    });


    const { register, handleSubmit, watch, formState: { errors,isValid,isLoading },reset } = useForm({
        defaultValues: {
            amount: 0,
            description:"",
            category:"Select Category"
        },
        resolver: zodResolver(schema),
        mode:'all'
    });


return(
    <> 
    <h1>Category</h1>
        <div className="row">
            <div className="col-xl">
                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit((date)=>{onSubmitted(date),reset()})}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="amount">amount</label>
                                <input
                                    {...register("amount",{valueAsNumber:true})}   
                                    type="text"
                                    className="form-control"  
                                    id="amount">
                                </input>
                                <span className="text-danger">{errors.amount?.message}</span>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="discription">description</label>
                                <input
                                    {...register("description")}       
                                    type="text"
                                    className="form-control"  
                                    id="description">
                                </input>
                                <span className="text-danger">{errors.description?.message}</span>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="category">category</label>
                                <select {...register("category")} className="form-select" aria-label="Default select example">
                                    <option>Select Category</option>
                                    {
                                        categories.map((category,index)=>(
                                         <option key={index} value={category}>{category}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-danger">{errors.category?.message}</span>
                            </div>
                            <Button isLoading={isLoading} title={"save"} isValid={isValid}></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default CategoryForm;