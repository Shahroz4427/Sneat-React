import { useState } from "react"
const UserDetail = ({children,maxChar,minChar}) => {
  const [isExpanded,setIsExpanded]=useState(false);
  return (
    <div>
        <p>{isExpanded ? children.substring(0,maxChar) : children.substring(0,minChar)}</p>
        <button onClick={()=>setIsExpanded(!isExpanded)} type="button" className="btn btn-dark">
            {isExpanded ? 'less' : 'more'}
        </button> 
    </div>
  )
}

export default UserDetail