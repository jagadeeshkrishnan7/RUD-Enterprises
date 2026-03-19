import { AnimatePresence, motion } from 'framer-motion'

const MotionOverlay = motion.div
const MotionDialog = motion.div

function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-5xl' }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <MotionOverlay
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <MotionDialog
            className={`glass-panel max-h-[92vh] w-full overflow-y-auto rounded-2xl border border-white/60 shadow-2xl ${maxWidth}`}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4 sm:px-8">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
            {children}
          </MotionDialog>
        </MotionOverlay>
      ) : null}
    </AnimatePresence>
  )
}

export default Modal
