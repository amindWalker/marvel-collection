import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { modalClose, selectModal } from "../../../store/modalSlice";
import { createPortal } from "react-dom";

export default function Modal({ children }: React.PropsWithChildren) {
    const dispatch: AppDispatch = useDispatch();
    const { isOpen } = useSelector(selectModal);
    const modalClass = isOpen
        ? "modal-open bg-gray-600 p-4 rounded-xl grid absolute top-50% left-50% -translate-x-50% -translate-y-50% z-2 max-w-screen max-h-screen overflow-y-scroll @apply opacity-100"
        : "opacity-0";

    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === "Escape" && isOpen) {
                dispatch(modalClose());
            }
        }

        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [dispatch, isOpen]);

    function handleModalClose() {
        dispatch(modalClose());
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed backdrop-blur backdrop-brightness-20 w-screen h-screen z-0  animate-fade-in animate-duration-300"
                    onClick={handleModalClose}
                >
                    {createPortal(
                        <dialog
                            className={` ${modalClass}`}
                            onClick={(e) => e.stopPropagation()}
                            open={isOpen}
                        >
                            <button
                                type="button"
                                onClick={handleModalClose}
                            >
                                Close
                            </button>
                            {children}
                        </dialog>,
                        document.body
                    )}
                </div>
            )}
        </>
    );
}
