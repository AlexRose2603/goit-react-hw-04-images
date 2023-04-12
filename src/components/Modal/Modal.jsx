import React from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, onShowImg }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  useEffect(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  const handleKeydown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <img src={onShowImg.largeImageURL} alt={onShowImg.tags} />
      </div>
    </div>,
    modalRoot
  );
};
