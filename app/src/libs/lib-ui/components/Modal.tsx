import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { modalClose, selectModal } from "../../../store/modalSlice";
import { createPortal } from "react-dom";

export default function Modal({ children }: React.PropsWithChildren) {
    const dispatch: AppDispatch = useDispatch();
    const { isOpen } = useSelector(selectModal);
    const modalClass = isOpen
        ? "@apply modal-open bg-gray-600 p-4 rounded-xl grid absolute top-50% left-50% -translate-x-50% -translate-y-50% z-2 max-w-screen max-h-screen overflow-y-scroll"
        : "hidden";

    function handleModalClose() {
        dispatch(modalClose());
    }

    return (
        <div>
            {isOpen && (
                <div>
                    <div className="fixed backdrop-blur-sm backdrop-brightness-50 w-screen h-screen z-1" />
                    {createPortal(
                        <div className={modalClass}>
                            <button
                                type="button"
                                onClick={handleModalClose}
                                onBlurCapture={handleModalClose}
                                aria-modal
                            >
                                Close
                            </button>
                            {children}
                        </div>,
                        document.body
                    )}
                </div>
            )}
        </div>
    );
}
