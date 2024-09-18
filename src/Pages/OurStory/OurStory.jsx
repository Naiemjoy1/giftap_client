const OurStory = () => {
  return (
    <div style={{ padding: '25px' }}>
      <h1 className="font-bold text-4xl italic flex justify-center mb-10 font-serif">Our Story</h1>
      
      <section className="flex flex-col-reverse md:grid grid-cols-2">
      <img
        src="https://img.freepik.com/free-photo/3d-illustration-closed-black-gift-box_107791-18203.jpg?t=st=1726679783~exp=1726683383~hmac=88b25ef60aad0c890b35790671ebee7f3671d82cb300b2f0a32c4c81cac319d9&w=740"
        alt="Gift Image"
        className="hover:scale-105 transition-transform duration-500 ease-in-out"
        style={{ width: '50%', height: 'auto', marginBottom: '20px' }}
      />
        <div>
        <h2 className="text-xl  uppercase font-opensans ">Our Heritage</h2>
        <p>
          We have a rich heritage of delivering unique and memorable gifts to
          customers all over the world.
        </p>
        </div>
      </section>
      <section className="flex flex-col-reverse md:grid grid-cols-2">
      <img
        src="https://img.freepik.com/free-photo/silhouettes-executives-interacting_1098-1787.jpg?t=st=1726682441~exp=1726686041~hmac=802785b2b419a7854c661bdb312356ecc68d72f845b3bd2f0ab0ae438ac32bbe&w=900"
        alt="Gift Image"
          className="hover:scale-105 transition-transform duration-500 ease-in-out"
        style={{ width: '50%', height: 'auto', marginBottom: '20px' }}
      />
        <div>
        <h2 className="text-xl  uppercase font-opensans ">Who We Are</h2>
        <p>
          A passionate team dedicated to curating special moments through
          thoughtful gifts.
        </p>
        </div>
      </section>
      <section className="flex flex-col-reverse md:grid grid-cols-2">
      <img
        src="https://img.freepik.com/premium-photo/our-mission-is-written-white-notebook-light-background-near-notebook_380694-3452.jpg?w=900"
        alt="Gift Image"
          className="hover:scale-105 transition-transform duration-500 ease-in-out"
        style={{ width: '50%', height: 'auto', marginBottom: '20px' }}
      />
       <div>
       <h2 className="text-xl  uppercase font-opensans ">Our Mission</h2>
        <p>
          Our mission is to make every occasion memorable with the perfect gift,
          creating lasting impressions.
        </p>
       </div>
      </section>
      <section className="mt-8">
      <h1 className="font-bold text-5xl italic mb-4 flex justify-center">Customer Services</h1>
        <div>
        <div className="p-6 space-y-8">
      {/* Returns and Refunds */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Returns And Refunds</h2>
        <p>
          If for any reason you are unsatisfied with your purchase, please return it to us for a full refund.
        </p>
      </div>

      {/* Buying Guides */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Buying Guides</h2>
        <p>
          Discover useful advice and handy tips about what to consider before you buy.
        </p>
      </div>

      {/* Ordering & Payment */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Ordering & Payment</h2>
        <p>
          All the major UK credit and debit cards you can use when shopping online at Gift Ribbon.
        </p>
      </div>

      {/* Sizing Guide */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Sizing Guide</h2>
        <p>
          For the best possible fit, check your measurements against the Debenhams size guides.
        </p>
      </div>

      {/* Privacy And Security */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Privacy And Security</h2>
        <p>
          We respect your privacy and have outlined how we make sure the information you submit remains safe and secure.
        </p>
      </div>

      {/* Terms And Conditions */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Terms And Conditions</h2>
        <p>
          Full details of the terms and conditions of sale for items purchased on Gift Ribbon.
        </p>
      </div>
    </div>
  


export default InfoSections;

        </div>
      </section>
    </div>
  );
};

export default OurStory;
