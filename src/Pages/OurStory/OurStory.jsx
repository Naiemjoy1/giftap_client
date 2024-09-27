const OurStory = () => {
  return (
    <div style={{ padding: '50px' }}>
      <h1 className="font-bold text-4xl italic flex justify-center mb-10 font-serif">Our Story</h1>
      <hr className="border-t-2 border-gray-400 border-dashed w-60 mx-auto mb-10" />

      {/* Heritage Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <img
          src="https://img.freepik.com/free-photo/scene-from-morocco_23-2148129786.jpg?t=st=1726745380~exp=1726748980~hmac=23c7c0d605612e2a1525fff01293fed9617a0b97d6b5ce3da550edb84c6ae14e&w=900"
          alt="Gift Image"
          className="w-full h-auto"
        />
        <div className="md:mt-24">
          <h2 className="text-xl uppercase font-opensans font-semibold">Our Heritage</h2>
          <p>
            We have a tradition of delivering unique, high-quality gifts worldwide. Our relationships with artisans help us curate thoughtful collections for every occasion.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="flex flex-col-reverse md:grid grid-cols-2 gap-8 mb-12">
        <div className="md:mt-24">
          <h2 className="text-xl uppercase font-opensans font-semibold">Who We Are</h2>
          <p>
            Our team is passionate about creating meaningful gifting experiences. We bring together designers and artisans to celebrate life’s most special moments.
          </p>
        </div>
        <img
          src="https://img.freepik.com/free-photo/silhouettes-executives-interacting_1098-1787.jpg?t=st=1726682441~exp=1726686041~hmac=802785b2b419a7854c661bdb312356ecc68d72f845b3bd2f0ab0ae438ac32bbe&w=900"
          alt="Who We Are"
          className="w-full h-auto"
        />
      </section>

      {/* Our Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <img
          src="https://img.freepik.com/premium-photo/our-mission-is-written-white-notebook-light-background-near-notebook_380694-3452.jpg?w=900"
          alt="Our Mission"
          className="w-full h-auto"
        />
        <div className="md:mt-24">
          <h2 className="text-xl uppercase font-opensans font-semibold">Our Mission</h2>
          <p>
            Our mission is to make every occasion unforgettable by offering personalized gifts that inspire joy and connection.
          </p>
        </div>
      </section>

      {/* Customer Services Section */}
      <section className="mt-8 bg-gray-50 p-8 rounded-lg shadow">
        <h1 className="font-bold text-5xl italic mb-8 flex justify-center">Customer Services</h1>
        <hr className="border-t-2 border-gray-400 border-dashed w-1/2 mb-8 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Returns and Refunds */}
          <div className="p-4">
            <h2 className="text-2xl font-medium mb-2">Returns And Refunds</h2>
            <p>
              If for any reason you are unsatisfied with your purchase, please return it to us for a full refund.
            </p>
          </div>

          {/* Buying Guides */}
          <div className="p-4">
            <h2 className="text-2xl font-medium mb-2">Buying Guides</h2>
            <p>
              Discover useful advice and handy tips about what to consider before you buy.
            </p>
          </div>

          {/* Ordering & Payment */}
          <div className="p-4">
            <h2 className="text-2xl font-medium mb-2">Ordering & Payment</h2>
            <p>
              All the major UK credit and debit cards you can use when shopping online at Gift Ribbon.
            </p>
          </div>

          {/* Sizing Guide */}
          <div className="p-4">
            <h2 className="text-2xl font-medium mb-2">Sizing Guide</h2>
            <p>
              For the best possible fit, check your measurements against the Debenhams size guides.
            </p>
          </div>

          {/* Privacy And Security */}
          <div className="p-4">
            <h2 className="text-2xl font-medium mb-2">Privacy And Security</h2>
            <p>
              We respect your privacy and have outlined how we make sure the information you submit remains safe and secure.
            </p>
          </div>

          {/* Terms And Conditions */}
          <div className="p-4">
            <h2 className="text-2xl font-medium mb-2">Terms And Conditions</h2>
            <p>
              Full details of the terms and conditions of sale for items purchased on Gift Ribbon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
