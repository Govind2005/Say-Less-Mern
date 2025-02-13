import  { useState } from 'react';
import './About.css';

function About() {
  const [currentChefIndex, setCurrentChefIndex] = useState(0);

  const nextChef = () => {
    setCurrentChefIndex((prev) => 
      prev === chefs.length - 3 ? 0 : prev + 1
    );
  };

  const prevChef = () => {
    setCurrentChefIndex((prev) => 
      prev === 0 ? chefs.length - 3 : prev - 1
    );
  };

  const chefs = [
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275287/team-1_bpvjqy.jpg',
      name: 'Chef Michael',
      designation: 'Head Chef'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275288/team-2_huu62r.jpg',
      name: 'Chef Sarah',
      designation: 'Pastry Specialist'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275289/team-3_jgve0k.jpg',
      name: 'Chef David',
      designation: 'Dessert Expert'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275291/team-4_t0vkqw.jpg',
      name: 'Chef John',
      designation: 'Cake Artist'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739379645/chef_gvqsdc.jpg',
      name: 'Chef Patrick',
      designation: 'Pastry Chef'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Us</h1>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h1 className="section-title">Where Flavor Meets Love!</h1>
        <div className="about-content">
          <div className="about-left">
            <h2>Why Us?</h2>
            <p className="main-text">
              We create Experiences! Every dessert is Handcrafted with love, 
              using 100% VEGETERIAN, EGGLESS, and Preservative-FREE Ingredients.
            </p>
            <p className="sub-text">
              From Rich, Fudgy Brownies to Melt-in-your-Mouth Cupcakes and 
              Handcrafted Ice Creams, Every Bite is packed with FLAVOR, 
              FRESHNESS, and LOVE
            </p>
            <button className="learn-more light">Learn More</button>
          </div>

          <div className="about-center">
            <img 
              src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274920/about_p50wfw.jpg" 
              alt="Featured dessert" 
            />
          </div>

          <div className="about-right">
            <h2>Our Features</h2>
            <p className="main-text">
              We don't just bake treats—we create personalized experiences. 
              From custom dessert hampers for special occasions to seasonal 
              delicacies that capture the flavors of the moment, there's always 
              something delightful to discover.
            </p>
            <ul className="features-list">
              <li>Wholesome & Pure</li>
              <li>Custom Hampers</li>
              <li>Drool-Worthy Aesthetics</li>
            </ul>
            <button className="learn-more pink">Learn More</button>
          </div>
        </div>
      </section>

      {/* Chefs Section */}
      <section className="chefs-section">
        <div className="section-header">
          <h1 className="section-title">
            Experienced & Most
            <br />
            Famous Chefs
          </h1>
          <div className="carousel-buttons">
            <button className="carousel-btn prev" onClick={prevChef}>
              <span>&#8249;</span>
            </button>
            <button className="carousel-btn next" onClick={nextChef}>
              <span>&#8250;</span>
            </button>
          </div>
        </div>

        <div className="chefs-carousel">
          <div 
            className="chefs-track" 
            style={{ 
              transform: `translateX(-${currentChefIndex * (28 + 3)}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {chefs.map((chef, index) => (
              <div key={index} className="chef-card">
                <div className="chef-image-container">
                  <img src={chef.image} alt={chef.name} />
                  <div className="chef-overlay"></div>
                </div>
                <h3>{chef.name}</h3>
                <p>{chef.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

