function Header({ companyName, logo, onContactOpen }) {
  const goHomeTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={goHomeTop}
          className="flex items-center gap-3 text-left"
          aria-label="Go to home"
        >
          <img
            src={logo}
            alt="Company logo"
            className="h-11 w-11 rounded-lg border border-slate-200 object-cover shadow-sm"
          />
          <span className="text-xl font-bold uppercase tracking-wide text-slate-900 sm:text-2xl">
            {companyName}
          </span>
        </button>

        <button
          type="button"
          onClick={onContactOpen}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 sm:text-base"
        >
          Contact Us
        </button>
      </div>
    </header>
  )
}

export default Header
