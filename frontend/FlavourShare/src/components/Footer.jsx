import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <p>@copyright FlavourShare</p>
      </footer>

      <style jsx="true">{`
        .footer {
          width: 100%;
          background-color: #1f1f1f;
          color: #ccc;
          text-align: center;
          padding: 0.8rem 1rem;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          user-select: none;
          position: relative;
          bottom: 0;
          /* optional fixed footer:
          position: fixed;
          left: 0;
          bottom: 0;
          */
        }

        footer.footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 40px;
}
        

        .footer p {
          margin: 0;
          line-height: 1.4;
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
          .footer {
            font-size: 0.8rem;
            padding: 0.7rem 0.8rem;
            letter-spacing: 0.03em;
          }
        }

        @media (max-width: 360px) {
          .footer {
            font-size: 0.75rem;
            padding: 0.6rem 0.6rem;
          }
        }
      `}</style>
    </>
  )
}
