import '../Modal.css'
const Modal = ({title,header,body,footer}) => {
return (
<> 
<div className="modal">
      <div className="modal-overlay" ></div>
        <div className="modal-content">
            <div className="modal-header">
                <h3>{ title }</h3>
                {header}
            </div>
            <div className="modal-body">
                 {body}
            </div>
            <div className="modal-footer">
                 {footer}
            </div>
       </div>
</div>

</>
)
}

export default Modal