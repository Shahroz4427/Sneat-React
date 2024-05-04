import { useState } from "react"
import ExpenseListing from "../components/ExpenseListing"
import CategoryForm from "../components/CategoryForm"
import CategoryDropDown from "../components/CategoryDropdown"
import  categories from '../webconstants/categories.js'

const Shopping=()=>{

    const [expenses,setExpenses]=useState([
        {id:1,amount:20,description:'shirt',category:'utility'},
        {id:2,amount:20,description:'pant',category:'grocery'},
        {id:3,amount:20,description:'wallet',category:'utility'},
        {id:4,amount:20,description:'shirt',category:'entertainment'}
    ]);

    const [selectedCategory,setSelectedCategory]=useState("");

    const filteredExpense= selectedCategory ? expenses.filter((expense)=>expense.category===selectedCategory) : expenses;

    return(
        <> 
          
           <CategoryForm 
             categories={categories}
             onSubmitted={(date)=>setExpenses([...expenses,{...date,id:expenses.length+1}])}>
           </CategoryForm>

           <CategoryDropDown 
             selectedCategory={(category)=>setSelectedCategory(category)} 
             categories={categories}>
           </CategoryDropDown>

           <ExpenseListing 
              handleDelete={(id)=>setExpenses(expenses.filter((expense)=>expense.id!=id))} 
              Expenses={filteredExpense}>
           </ExpenseListing>
        </>
    )
}
export default Shopping