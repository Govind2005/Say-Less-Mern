import { useNavigate } from 'react-router-dom';

const HamperSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/menuitems');
  };

  return (
    <div className="relative w-full bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16 flex mr-auto gap-[200px]">
        {/* Right Text Section */}
        <div className="w-1/3 flex flex-col justify-center space-y-12 ml-auto">
          <div className="space-y-8">
            <h1 className="text-6xl font-light italic text-pink-600 leading-tight">
              Customize
              <br />
              your favorite
              <br />
              hampers
            </h1>
            
            <p className="text-pink-300 text-lg">
              Craft your perfect gift with our bespoke hamper collection.
              Personalize every detail for a truly memorable experience.
            </p>
            
            <div className="inline-block">
              <button 
                onClick={handleClick}
                className="border-2 border-pink-600 text-pink-600 px-12 py-4 rounded-full hover:bg-pink-800 hover:text-gray-900 transition-all duration-300 text-lg cursor-pointer"
              >
                TREAT YOURSELF TO
              </button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="pl-12 -ml-48"> 
          <div 
            className="rounded-3xl overflow-hidden mr-[100px] cursor-pointer" 
            onClick={handleClick}
          > 
            <img 
              src="https://images.unsplash.com/photo-1534432182912-63863115e106?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Luxury Gift Hamper" 
              className="w-[550px] h-[600px] object-cover rounded-3xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
      
      {/* Top-right branding */}
      <div className="absolute top-28 right-16 text-sm font-medium tracking-wider text-pink-500 rotate-90 uppercase">
        #BINDI'SEXCLUSIVE
      </div>
    </div>
  );
};

export default HamperSection;