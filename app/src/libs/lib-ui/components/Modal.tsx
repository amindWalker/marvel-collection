interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactElement;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const modalClass = isOpen ? "modal open" : "modal";

    return (
        <div
            className={modalClass}
            onClick={onClose}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
