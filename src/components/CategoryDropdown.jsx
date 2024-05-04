const CategoryDropDown=({categories,selectedCategory})=>{
    return(
     <>
     <h1>Fillter</h1>
        <select onChange={(e)=>selectedCategory(e.target.value)} className="form-select mb-5" aria-label="Default select example">
            <option>Select Category</option>
            {
                categories.map((category,index)=>(
                  <option key={index} defaultValue={category}>{category}</option>
                ))
            }
        </select>
     </>
    )
}
export default CategoryDropDown;