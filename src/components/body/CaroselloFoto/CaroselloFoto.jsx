import { useState } from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./CaroselFoto.css";

const LeNostreDelizie = () => {
  const { dishes } = useSelector((state) => state.dishes);
  const allDishes = [
    ...(dishes.ANTIPASTI || []),
    ...(dishes.PRIMI || []),
    ...(dishes.SECONDI || []),
    ...(dishes.CONTORNI || []),
    ...(dishes.DOLCI || []),
  ];
  const images = allDishes.map((dish) => dish.imageUrl).filter(Boolean);

  function arrayScomposto(arr, size) {
    const scomposto = [];
    for (let i = 0; i < arr.length; i += size) {
      scomposto.push(arr.slice(i, i + size));
    }
    return scomposto;
  }

  const [index, setIndex] = useState(0);
  const groupedImages = arrayScomposto(images, 4);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="text-center mt-5 mb-5">
      <h1 className="text-center mt-5 mb-4 fw-bold">Le nostre delizie</h1>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
        {groupedImages.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row className="justify-content-center flex-nowrap" style={{ overflow: "hidden" }}>
              {group.map((img, i) => (
                <Col key={i} className="d-flex justify-content-center align-items-center col-md-3">
                  <img src={img} alt={`Delizia ${idx * 4 + i + 1}`} className="carousel-item-img" />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default LeNostreDelizie;
