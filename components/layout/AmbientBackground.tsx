export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="animate-aurora absolute -top-[20%] left-1/2 h-[360px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-200/50 via-sky-300/35 to-indigo-200/40 blur-[90px] md:-top-[20%] md:h-[550px] md:w-[850px] md:from-cyan-200/40 md:via-sky-300/30 md:to-indigo-200/35 md:blur-[110px]" />
      <div className="absolute top-[42%] -left-[140px] h-[320px] w-[320px] rounded-full bg-gradient-to-br from-indigo-200/25 to-sky-200/30 blur-[80px] md:top-[40%] md:-left-[100px] md:h-[500px] md:w-[500px] md:from-indigo-200/20 md:to-sky-200/25 md:blur-[100px]" />
      <div className="absolute top-[78%] -right-[120px] h-[340px] w-[340px] rounded-full bg-gradient-to-bl from-teal-200/30 to-blue-200/25 blur-[90px] md:top-[75%] md:-right-[150px] md:h-[600px] md:w-[600px] md:from-teal-200/25 md:to-blue-200/20 md:blur-[120px]" />
      <div className="bg-grid-pattern absolute inset-0 opacity-50 md:opacity-60" />
    </div>
  );
}
