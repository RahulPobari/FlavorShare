import React, { useEffect } from 'react'

export default function Modal({ children, onClose }) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Prevent modal content clicks from closing modal
  const onDialogClick = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <div className="backdrop" onClick={onClose} aria-label="Close modal backdrop" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose() }}>
        <dialog className="modal" open onClick={onDialogClick} aria-modal="true" role="dialog" tabIndex={-1}>
          {children}
        </dialog>
      </div>

      <style jsx="true">{`
        /* Backdrop covers entire screen with semi-transparent black */
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeInBg 0.25s ease forwards;
        }

        /* Modal dialog box styling */
        .modal {
          background-color: #2b2b3c;
          color: #f0f0f0;
          border: none;
          border-radius: 12px;
          padding: 2rem 2.4rem;
          max-width: 450px;
          width: 90vw;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
          position: relative;
          animation: fadeInModal 0.3s ease forwards;
          outline: none;
          font-family: 'Poppins', Arial, sans-serif;
          max-height: 90vh;
          overflow-y: auto;
        }

        /* Remove native dialog border & background set above */
        dialog::backdrop {
          display: none;
        }

        /* Animations */
        @keyframes fadeInBg {
          from { background-color: rgba(0, 0, 0, 0); }
          to { background-color: rgba(0, 0, 0, 0.75); }
        }
        @keyframes fadeInModal {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Responsive fixes */
        @media (max-width: 480px) {
          .modal {
            padding: 1.5rem 1.8rem;
            max-width: 95vw;
          }
        }
      `}</style>
    </>
  )
}
