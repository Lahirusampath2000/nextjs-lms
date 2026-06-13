import React from 'react'

function Herosection() {
  return (
    <section className="relative min-h-screen min-w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-br from-indigo-200 via-indigo-200 to-violet-300">
      <div className="flex flex-col lg:flex-row items-center gap-12 w-full max-w-6xl mx-auto">

        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-indigo-950 leading-[1.08] tracking-tight max-w-xl">
            The smarter way
            <br />
            <span className="bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 bg-clip-text text-transparent">
              to learn anything.
            </span>
          </h1>

          <p className="mt-6 text-lg text-indigo-900/75 max-w-md leading-relaxed">
            Structured courses, live lessons, and adaptive progress tracking.
          </p>

          <div className="flex gap-3 mt-8">
            <button className="bg-transparent text-violet-900 border border-violet-600 mx-50 px-6 py-3 rounded-lg text-base font-medium hover:bg-violet-100/40 transition-colors">
              Get started
            </button>
            {/* <button className="bg-transparent text-violet-900 border border-violet-600 px-6 py-3 rounded-lg text-base font-medium hover:bg-violet-100/40 transition-colors">
              Learn more
            </button> */}
          </div>
        </div>

        {/*  Image placeholder */}
        {/* <div className="flex-1 min-h-[360px] lg:min-h-[460px] rounded-2xl bg-white/25 border-2 border-dashed border-violet-400/50 flex flex-col items-center justify-center gap-3">

          <svg className="w-12 h-12 text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-sm text-violet-700 font-medium opacity-70">Your image here</span>
        </div> */}

      </div>
    
    </section>
  )
}

export default Herosection