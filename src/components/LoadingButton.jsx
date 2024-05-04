const LoadingButton=({title,isLoading,isValid})=>{
    return(
      <>
        <button  type="submit" className={isLoading ? 'btn btn-dark text-white-50' : 'btn btn-dark'} disabled={!isValid || isLoading}>
            <div className={isLoading && 'spinner-border spinner-border-sm' }  role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
               {title}
        </button>
      </>
    )
}
export default LoadingButton;