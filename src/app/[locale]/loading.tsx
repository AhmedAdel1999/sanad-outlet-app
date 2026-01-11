const Loading = () => {
  return (
    <div className="fixed inset-0 bg-linear-to-b from-white to-grey-50 flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl animate-pulse [animation-delay:700ms]"></div>
      </div>

      <div className="flex flex-col items-center gap-12 z-10">
        {/* Main loading spinner with multiple layers */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-8 border-secondary-300 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-0 border-8 border-t-secondary-500 border-r-secondary-400 border-b-secondary-50 border-l-secondary-50 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>

          {/* Center logo/icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-secondary-400 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex gap-3 mt-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 bg-secondary-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 100}ms` }}
            ></div>
          ))}
        </div>

        {/* Loading text with gradient */}
        <div className="relative">
          <div className="text-xl font-bold bg-linear-to-r from-primary-500 via-secondary-500 to-primary-500 bg-clip-text text-transparent bg-size-[200%_auto] animate-[gradient_3s_ease_infinite]">
            Loading
          </div>
          <div className="absolute top-full left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary-500 to-transparent animate-pulse mt-2"></div>
        </div>
      </div>

      <style>{`
          @keyframes gradient {
            0%, 100% {
              background-position: 0% center;
            }
            50% {
              background-position: 100% center;
            }
          }
        `}</style>
    </div>
  );
};

export default Loading;
