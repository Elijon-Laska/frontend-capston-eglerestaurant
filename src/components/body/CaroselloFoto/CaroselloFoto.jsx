import { useState } from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import img1 from "../../../assets/egle-logo - Copia.png";
import img2 from "../../../assets/egle-logo-1.PNG";
import img3 from "../../../assets/proprietario-2-copia.jpg";
import img4 from "../../../assets/proprietaria.jpg";
import img5 from "../../../assets/egle-logo - Copia.png";
import "./CaroselFoto.css";
const images = [img1, img2, img3, img4, img5];

function arrayScomposto(arr, size) {
  const scomposto = [];
  for (let i = 0; i < arr.length; i += size) {
    scomposto.push(arr.slice(i, i + size));
  }
  return scomposto;
}

function LeNostreDelizie() {
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
                <Col
                  key={i}
                  className="d-flex justify-content-center align-items-center"
                  style={{ flex: "0 0 25%", maxWidth: "25%" }}
                >
                  <img
                    src={img}
                    alt={`Delizia ${idx * 4 + i + 1}`}
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default LeNostreDelizie;
