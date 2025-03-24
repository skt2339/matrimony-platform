function Hero() {
  return (
    <div
      className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/16121688/pexels-photo-16121688.jpeg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Trusted Matrimony & Matchmaking Service
        </h1>
        <p className="text-lg mb-6">Find your perfect match. Forever begins here.</p>
        <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold">
          Let’s Begin
        </button>
      </div>
    </div>
  );
}

export default Hero;

