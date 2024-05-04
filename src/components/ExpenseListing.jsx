const ExpenseListing = ({Expenses,handleDelete}) => {
  return (
    <>
    <h1>Expense</h1>
        <div className="table-responsive text-nowrap">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>amount</th>
                        <th>description</th>
                        <th>category</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                    {
                        Expenses.map((expense,index)=>(
                            <tr key={index}>
                                <td>{expense.id}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.description}</td>
                                <td>{expense.category}</td>
                                <td>
                                    <button onClick={()=>handleDelete(expense.id)} type="button" className="btn btn-danger mx-1">Delete</button>
                                </td>
                           </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total Amount</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{Expenses.reduce((acc,expense)=>expense.amount+acc,0)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </>
  )
}

export default ExpenseListing