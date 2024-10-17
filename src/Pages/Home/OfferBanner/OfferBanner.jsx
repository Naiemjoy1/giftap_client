import gift from './../../../assets/animation/gift.gif'
const OfferBanner = () => {
  return (
    <div className="flex justify-center pt-10 px-4">
      <div className="relative bg-gradient-to-br from-primary to-yellow-500 text-white lg:w-[80%] flex justify-center items-center lg:h-[300px] rounded-lg shadow-lg overflow-hidden">
        
        <div className="absolute inset-0 bg-opacity-30 bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/light-sand.png")' }}>
        </div>

        
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-10"></div>

        
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 bg-yellow-300 w-1/2 h-full transform rotate-45 opacity-30"></div>
        </div>

        
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-shadow-md mb-2">
            24 HOURS LIMITED SPECIAL OFFER
          </h2>
          <h1 className="text-6xl md:text-7xl font-extrabold mt-4 uppercase tracking-widest text-shadow-lg">
            MEGA SALE
          </h1>
          <p className="text-3xl mt-2 italic text-shadow-sm">
            Up to 80% OFF
          </p>
        </div>
      </div>
    </div>
  )
}

export default OfferBanner
