import  { useState } from 'react';
import './Gallery.css';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274475/111_rtm1vj.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/222_u7w8gn.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/333_i0ae0e.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274474/444_oapcps.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274480/555_bsghyy.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274480/666_hjsal2.jpg'
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="gallery-hero">
        <h1>Gallery</h1>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2 className="section-title">Our Delicacies!</h2>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`Gallery image ${index + 1}`} />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="image-dialog-overlay" onClick={() => setSelectedImage(null)}>
            <div className="image-dialog">
              <img src={selectedImage} alt="Selected gallery image" />
              <button className="close-button" onClick={() => setSelectedImage(null)}>
                ×
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Gallery; 