import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const DishDetailsModal = () => {
  const dispatch = useDispatch();
  const { selectedDish, showDishDetails } = useSelector((state) => state.dishes);

  const handleClose = () => {
    dispatch({ type: "CLOSE_DISH_DETAILS" });
  };

  return (
    <Modal show={showDishDetails} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title className="fw-bold text-center w-100" style={{ color: "rgba(226, 196, 196, 0.767)" }}>
          {selectedDish?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="text-center">
            {selectedDish?.imageUrl && (
              <img
                src={selectedDish.imageUrl}
                alt={selectedDish.name}
                className="img-fluid rounded"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
          </Col>
          <Col md={6}>
            <div className="dish-details">
              <h5 className="text-success mt-2">Prezzo: {selectedDish?.price}€</h5>
              <h6 className="text-muted mb-3">Composizione:</h6>
              <p>{selectedDish?.composition}</p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DishDetailsModal;
