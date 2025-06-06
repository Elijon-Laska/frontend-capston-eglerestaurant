import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminDashboard, createDish, updateDish, deleteDish } from "../../redux/actions/adminActions";
import { Button, Card, Container, Row, Col, Table, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { FaPlus, FaCheck, FaTimes, FaUtensils, FaTrash } from "react-icons/fa";

const Piatti = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);

  // Stati per modale e form
  const [showModal, setShowModal] = useState(false);
  const [dishData, setDishData] = useState({
    name: "",
    composition: "",
    price: "",
    categoryType: "",
  });
  const [dishImage, setDishImage] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  // Carica dati all'avvio
  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);
  // Gestione apertura/chiusura modale
  const handleClose = () => {
    setShowModal(false);
    setDishData({
      name: "",
      composition: "",
      price: "",
      categoryType: "",
    });
    setDishImage(null);
    setSelectedDish(null);
  };

  const handleShow = (dish = null) => {
    if (dish) {
      setSelectedDish(dish);
      setDishData({
        name: dish.name,
        composition: dish.composition,
        price: dish.price,
        categoryType: dish.categoryType,
      });
    }
    setShowModal(true);
  };

  const handleImageSelect = (e) => {
    setDishImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDish) {
      await dispatch(updateDish(selectedDish.id, dishData, dishImage));
    } else {
      await dispatch(createDish(dishData, dishImage));
    }
    dispatch(fetchAdminDashboard());
    handleClose();
  };
  const handleDelete = async (dishId) => {
    await dispatch(deleteDish(dishId));
    dispatch(fetchAdminDashboard());
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mx-2 my-4">
          <FaUtensils />
          Gestione Piatti
        </h2>
        <Button variant="primary" onClick={() => handleShow()}>
          <FaPlus className="me-2" /> Nuovo Piatto
        </Button>
      </div>

      {adminState.loading && <Spinner animation="border" variant="primary" />}
      {adminState.error && (
        <Alert variant="danger">
          <FaTimes className="me-2" />
          {adminState.error}
        </Alert>
      )}
      {adminState.success && (
        <Alert variant="success">
          <FaCheck className="me-2" />
          {adminState.success}
        </Alert>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Immagine</th>
            <th>Nome</th>
            <th>Composizione</th>
            <th>Prezzo</th>
            <th>Categoria</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {adminState.dishes.map((dish) => (
            <tr key={dish.id}>
              <td>
                <img src={dish.imageUrl} alt={dish.name} style={{ width: 80, height: 60, objectFit: "cover" }} />
              </td>
              <td>{dish.name}</td>
              <td>{dish.composition}</td>
              <td>{dish.price} €</td>
              <td>{dish.categoryType}</td>
              <td>
                <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleShow(dish)}>
                  Modifica
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(dish.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDish ? "Modifica Piatto" : "Nuovo Piatto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={dishData.name}
                onChange={(e) => setDishData({ ...dishData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Composizione</Form.Label>
              <Form.Control
                type="text"
                value={dishData.composition}
                onChange={(e) => setDishData({ ...dishData, composition: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="number"
                value={dishData.price}
                onChange={(e) => setDishData({ ...dishData, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                value={dishData.categoryType}
                onChange={(e) => setDishData({ ...dishData, categoryType: e.target.value })}
                required
              >
                <option value="">Seleziona una categoria</option>
                {adminState.categories.map((cat) => (
                  <option key={cat.id} value={cat.categoryType}>
                    {cat.categoryType}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Immagine</Form.Label>
              <Form.Control type="file" onChange={handleImageSelect} accept="image/*" />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Chiudi
              </Button>
              <Button variant="primary" type="submit">
                Salva
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Piatti;
