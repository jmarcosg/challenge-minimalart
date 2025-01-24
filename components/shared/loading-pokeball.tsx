export function LoadingPokeball() {
  return (
    <div className="relative w-12 h-12 animate-loading">
      <div className="absolute w-full h-full rounded-full bg-white border-4 border-black overflow-hidden">
        <div className="absolute top-0 w-full h-1/2 bg-red-500"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 rounded-full bg-white border-4 border-black"></div>
      </div>
    </div>
  );
}
