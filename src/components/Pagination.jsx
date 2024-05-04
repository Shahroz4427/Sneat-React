const Pagination=({pagelinks})=>{

    const links = pagelinks.map((link,index) =>
       <li key={index}  className={link.active ? 'page-item active' : 'page-item'} >
          <a href={link.url} className="page-link">{link.label}</a>
       </li>
    );
      
  return(
      <>
        <div className="row">
            <div className="col d-flex justify-content-center">
                <div className="demo-inline-spacing">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li  className="page-item first">
                            <a className="page-link" ><i className="tf-icon bx bx-chevrons-left"></i></a>
                        </li>
                          {links}
                        <li  className="page-item last">
                            <a className="page-link" ><i className="tf-icon bx bx-chevrons-right"></i></a>
                        </li>
                    </ul>
                </nav>
                </div>
            </div>
        </div>
      </>
    );

}
export default Pagination;