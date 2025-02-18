import { useState, useRef, useEffect } from 'react';
import '../App.css';

const Services = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const preventScroll = (e: WheelEvent) => {
                e.preventDefault();
            };
            
            container.addEventListener('wheel', preventScroll, { passive: false });
            
            return () => {
                container.removeEventListener('wheel', preventScroll);
            };
        }
    }, []);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    const services = [
        {
          image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275127/Cupcakee_bqaymf.jpg',
          title: 'Looking for a flavour that will',
          description: 'convince hungry young people?'
        },
        {
          image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275046/Brownie_5_ujeowd.jpg',
          title: 'Variety Assured',
          description: 'From Fudgy Brownies to Creamy Ice Creams, discover flavors for every craving!'
        },
        {
          image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275046/Brownie_2_gzgbwa.jpg',
          title: 'Handcrafted Love',
          description: 'Every treat is made in small batches with precision and finest ingredients for homemade goodness!'
        },
        {
          image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275047/Brownie_Tub_3_m11kmr.jpg',
          title: 'Quality Maintain',
          description: 'Using only the finest ingredients, ensuring 100% eggless and preservative-free desserts.'
        },
        {
          image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739242354/cld-sample-4.jpg',
          title: 'Custom Orders',
          description: 'Personalized desserts for your special occasions, making your sweet dreams come true!'
        }
    ];

    return (
        <div 
            ref={containerRef} 
            className="bg-pink-600 w-full py-20"
        >
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Best Services We Provide
                    </h2>
                    <p className="text-pink-200">For Our Clients</p>
                </div>

                {/* Services Cards Container */}
                <div 
                    ref={scrollRef}
                    onWheel={handleWheel}
                    className="relative overflow-hidden"
                >
                    <div className="flex gap-8 w-max px-4">
                        {services.map((service, index) => (
                            <div 
                                key={index} 
                                className="w-[600px] flex-shrink-0 bg-pink-600 rounded-xl overflow-hidden"
                            >
                                <div className="h-64 overflow-hidden rounded-xl mb-6">
                                    <img 
                                        src={service.image} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-pink-200 text-xl">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;

// Add this CSS to your App.css or index.css
/*
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
*/
