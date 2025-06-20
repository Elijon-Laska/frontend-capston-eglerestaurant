import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
  fetchAdminDashboard,
  createCategory,
  createDish,
  confirmReservation,
  cancelReservation,
  uploadImage,
  fetchUsers,
  deleteCategory,
  deleteDish,
} from "../redux/actions/adminActions";
import { Button, Card, Container, Row, Col, Table, Modal, Form, Spinner } from "react-bootstrap";
import { FaPlus, FaCheck, FaTimes, FaUpload, FaUtensils, FaCalendarCheck } from "react-icons/fa";
import { updateCategory, updateDish } from "../redux/actions/adminActions";
import { Navigate } from "react-router";
import { fetchDishes } from "../redux/actions/dishesActions";
import { Check2Square } from "react-bootstrap-icons";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");
  const adminState = useSelector((state) => state.admin);

  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDishModal, setShowDishModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Form states
  const [categoryData, setCategoryData] = useState({ categoryType: "" });
  const [dishData, setDishData] = useState({
    name: "",
    composition: "",
    price: "",
    categoryType: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  // Gestione immagine piatto
  const [dishImage, setDishImage] = useState(null);

  const handleDishImageSelect = (e) => {
    setDishImage(e.target.files[0]);
  };

  const handleDishSubmit = async (e) => {
    e.preventDefault();
    if (selectedDish) {
      await dispatch(updateDish(selectedDish.id, dishData, dishImage));
      await dispatch(fetchDishes());
    } else {
      await dispatch(createDish(dishData, dishImage));
      await dispatch(fetchDishes());
    }
    handleClose();
  };

  // Gestione modali
  const handleClose = () => {
    setShowCategoryModal(false);
    setShowDishModal(false);
    setShowImageModal(false);
    setSelectedFile(null);
    setCategoryData({ categoryType: "" });
    setDishData({ name: "", composition: "", price: "", categoryType: "" });
    setSelectedCategory(null);
    setSelectedDish(null);
  };

  const handleShow = (modalType) => {
    switch (modalType) {
      case "category":
        setShowCategoryModal(true);
        break;
      case "dish":
        setShowDishModal(true);
        break;
      case "image":
        setShowImageModal(true);
        break;
    }
  };

  // Gestione file
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = () => {
    if (selectedFile) {
      dispatch(uploadImage(selectedFile));
      handleClose();
    }
  };

  // Gestione form
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      dispatch(updateCategory(selectedCategory.id, categoryData));
    } else {
      dispatch(createCategory(categoryData));
    }
    handleClose();
  };

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAdminDashboard());
      dispatch(fetchUsers());
    }
  }, [isAdmin, dispatch]);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-dashboard">
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="my-4">Dashboard Amministratore</h1>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <Button variant="primary" onClick={() => handleShow("category")} className="my-2 mx-2">
                  <FaPlus className="me-2" /> Nuova Categoria
                </Button>
                <Button variant="primary" onClick={() => handleShow("dish")} className="my-2 mx-2">
                  <FaPlus className="me-2" /> Nuovo Piatto
                </Button>
                <Button variant="primary" onClick={() => handleShow("image")} className="my-2 mx-2">
                  <FaUpload className="me-2" /> Carica Immagine
                </Button>
              </div>
              <div>
                {adminState.loading && <Spinner animation="border" variant="primary" size="sm" className="m-2" />}
                {adminState.error && (
                  <span className="text-danger">
                    <FaTimes className="me-2" />
                    {adminState.error}
                  </span>
                )}
                {adminState.success && (
                  <span className="text-success">
                    <FaCheck className="me-2" />
                    {adminState.success}
                  </span>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Sezioni principali */}
        <Row>
          <Col xs={12} md={6} lg={6} xl={6} className="my-2">
            <Card>
              <Card.Header>
                <h3 className="mb-0">
                  <Check2Square className="me-2" /> Categorie ({adminState.categories.length})
                </h3>
              </Card.Header>
              <Card.Body>
                <Table striped>
                  <tbody>
                    {adminState.categories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.categoryType}</td>
                        <td>
                          <div className="d-flex justify-content-end">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleShow("category")}
                              className="me-2"
                            >
                              Modifica
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => dispatch(deleteCategory(category.id))}
                            >
                              Elimina
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Piatti */}
          <Col xs={12} md={6} lg={6} xl={6} className="my-2">
            <Card>
              <Card.Header>
                <h3 className="mb-0">
                  <FaUtensils className="me-2" /> Piatti ({adminState.dishes.length})
                </h3>
              </Card.Header>
              <Card.Body>
                <Table striped>
                  <tbody>
                    {adminState.dishes.map((dish) => (
                      <tr key={dish.id}>
                        <td>{dish.name}</td>
                        <td>{dish.categoryType}</td>
                        <td>
                          <div className="d-flex justify-content-end">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleShow("dish")}
                              className="me-2"
                            >
                              Modifica
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={async () => {
                                await dispatch(deleteDish(dish.id));
                                await dispatch(fetchDishes());
                              }}
                            >
                              Elimina
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Prenotazioni */}
          <Col xs={12} md={12} lg={12} xl={12} className="my-2">
            <Card>
              <Card.Header>
                <h3 className="mb-0">
                  <FaCalendarCheck className="me-2" /> Prenotazioni ({adminState.reservations.length})
                </h3>
              </Card.Header>
              <Card.Body>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Data</th>
                      <th>Coperti</th>
                      <th>Stato</th>
                      <th className="d-flex justify-content-end">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminState.reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{reservation.nome}</td>
                        <td>{reservation.data}</td>
                        <td>{reservation.persone}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              reservation.annullata ? "danger" : reservation.confermata ? "success" : "warning"
                            }`}
                          >
                            {reservation.annullata ? "ANNULLATA" : reservation.confermata ? "CONFERMATA" : "IN ATTESA"}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-end">
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => dispatch(confirmReservation(reservation.codicePrenotazione))}
                              disabled={reservation.stato === "CONFERMATA"}
                            >
                              Conferma
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="ms-2"
                              onClick={() => dispatch(cancelReservation(reservation.codicePrenotazione))}
                              disabled={reservation.stato === "ANNULLATA"}
                            >
                              Annulla
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modali */}
        <Modal show={showCategoryModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Gestione Categoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome Categoria</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il nome della categoria"
                  value={categoryData.categoryType}
                  onChange={(e) => setCategoryData({ categoryType: e.target.value.toUpperCase() })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={handleCategorySubmit}>
              Salva
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDishModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Gestione Piatto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleDishSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome Piatto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il nome del piatto"
                  value={dishData.name}
                  onChange={(e) => setDishData({ ...dishData, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Composizione</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci la composizione"
                  value={dishData.composition}
                  onChange={(e) => setDishData({ ...dishData, composition: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                  value={dishData.categoryType}
                  onChange={(e) => setDishData({ ...dishData, categoryType: e.target.value })}
                >
                  <option value="">Seleziona una categoria</option>
                  {adminState.categories.map((category) => (
                    <option key={category.categoryType} value={category.categoryType}>
                      {category.categoryType}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Prezzo</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Inserisci il prezzo"
                  value={dishData.price}
                  onChange={(e) => setDishData({ ...dishData, price: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Immagine</Form.Label>
                <Form.Control type="file" onChange={handleDishImageSelect} />
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

        <Modal show={showImageModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Carica Immagine</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Seleziona Immagine</Form.Label>
                <Form.Control type="file" onChange={handleFileSelect} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={handleImageUpload}>
              Carica
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default DashboardAdmin;
