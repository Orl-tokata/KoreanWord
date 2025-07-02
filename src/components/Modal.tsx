'use client';

import React, { useEffect, useRef } from 'react'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children:React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;

    if (!modal) return;

    if (isOpen && !modal.open) {
      modal.showModal();
    }

    if (!isOpen && modal.open) {
      modal.close();
    }
  }, [isOpen]);
  
  return (
   
    <dialog id="my_modal_3" ref={modalRef} className="modal">
        <div className="modal-box">
            <form method="dialog">
            <button  onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            {children}
        </div>
    </dialog>
  )
}

export default Modal