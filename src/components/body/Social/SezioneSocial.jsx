import { Card } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaXTwitter, FaTiktok } from "react-icons/fa6";

const Seguici = () => {
  return (
    <Card className="text-center shadow-sm border-0 p-4 mx-auto mb-4 " style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title as="h2" className="fw-bold mb-4">
          Seguici sui social
        </Card.Title>
        <div className="d-flex justify-content-center gap-4 fs-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook color="#1877f3" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter color="#000" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram color="#E4405F" />
          </a>

          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok color="#000" />
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Seguici;
