import { X } from 'lucide-react'

type ConfirmModalProps = {
    message: string;
    hidden?: boolean
    onConfirm: () => void;
    onCancel?: () => void;
};

function ConfirmModal ({
    message,
    hidden = false,
    onConfirm,
    onCancel
}: ConfirmModalProps) {
    return (
        <div  className="modal fixed flex justify-center align-items">
            <div className="flex col justify-center align-items gap-20 modal-box">
                
                <button
                className='btn-close'    
                onClick={hidden ? onConfirm : onCancel}>
                    <X size={24}/>
                </button>
                
                <p>{message}</p>
                <div className="flex row justify-center gap-20 align-items modal-btn">
                    <button onClick={onConfirm}>
                        {hidden? 'OK' : 'Yes'}
                    </button>
                    <button hidden={hidden} onClick={onCancel}>No</button>
                </div>
            </div>


        </div>
        
)};

export default ConfirmModal;