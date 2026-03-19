function Footer({ footer, onAboutOpen, compact = false }) {
  const basePadding = compact ? 'px-5 py-5 sm:px-6' : 'px-4 py-10 sm:px-6 lg:px-8'

  return (
    <footer className={`border-t border-slate-200 bg-slate-950 text-slate-100 ${basePadding}`}>
      <div className="mx-auto grid w-full max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Address</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">{footer.address}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Emails</p>
          <p className="mt-2 text-sm text-slate-200">{footer.emails[0]}</p>
          <p className="text-sm text-slate-200">{footer.emails[1]}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Phone</p>
          <p className="mt-2 text-sm text-slate-200">{footer.phones[0]}</p>
          <p className="text-sm text-slate-200">{footer.phones[1]}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Company</p>
          <button
            type="button"
            onClick={onAboutOpen}
            className="mt-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
          >
            About
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
