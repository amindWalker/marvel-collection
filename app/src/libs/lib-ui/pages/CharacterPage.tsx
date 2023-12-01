import { useState } from "react";

export default function CharacterPage() {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <button
                className="btn"
                onClick={openModal}
            >
                Open modal
            </button>
            {modalOpen && (
                <dialog
                    id="my_modal"
                >
                    <div >
                        <h3 >Hello!</h3>
                        <p>
                            Press ESC key or click the button below to close
                        </p>
                        <div >
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button
                                    className="btn"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}
