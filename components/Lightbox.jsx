/* journify.ai — Lightbox (click-to-enlarge image overlay) */

function Lightbox({ src, alt, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(26, 23, 20, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        cursor: 'zoom-out'
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close enlarged image"
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 44,
          height: 44,
          background: 'transparent',
          border: '0.5px solid var(--bg)',
          color: 'var(--bg)',
          fontSize: 20,
          fontFamily: 'var(--sans)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 0
        }}
      >
        ×
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '95vw',
          maxHeight: '95vh',
          width: 'auto',
          height: 'auto',
          display: 'block',
          cursor: 'default'
        }}
      />
    </div>
  );
}

Object.assign(window, { Lightbox });
