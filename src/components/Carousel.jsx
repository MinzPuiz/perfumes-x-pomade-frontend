import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = () => {
    return (
      <div className="w-full">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
          transitionTime={600}
          className="overflow-hidden"
        >
          <div>
            <img src="/perfumes-x-pomade-frontend/img/best-summer-colognes.jpg" alt="Banner 1" />
          </div>
          <div>
            <img src="/perfumes-x-pomade-frontend/img/best-summer-colognes_2.jpg" alt="Banner 2" />
          </div>  
          <div>
            <img src="/perfumes-x-pomade-frontend/img/Summer-fragrances.png" alt="Banner 3" />
          </div>
        </Carousel>
      </div>
    );
  };

  export default ImageCarousel;