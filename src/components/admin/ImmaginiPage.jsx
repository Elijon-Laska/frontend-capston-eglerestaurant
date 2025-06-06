import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, fetchAdminDashboard, deleteImage } from "../../redux/actions/adminActions";
import { Button, Card, Container, Row, Col, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { FaUpload, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import "./ImmaginiPage.css";

const ImmaginiPage = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadImage(selectedFile)).then(() => {
        dispatch(fetchAdminDashboard());
        handleClose();
      });
    }
  };

  const handleClose = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
  };

  // Gestione eliminazione immagine (dato che non è ancora implementata lato backend, mostra alert)
  const handleDeleteImage = (imageUrl) => {
    // Altrimenti quando implementata decommentare la dispatch qui sotto
    // dispatch(deleteImage(imageUrl)).then(() => dispatch(fetchAdminDashboard()));
    alert("Eliminazione immagine non ancora disponibile lato backend.");
  };

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  // Raccogle tutte le immagini dei piatti
  const dishImages = (adminState.dishes || [])
    .filter((dish) => dish.imageUrl)
    .map((dish) => ({
      url: dish.imageUrl,
      label: dish.name,

      id: dish.id,
    }));

  // Raccogle tutte le immagini delle categorie (quando disponibili)
  const categoryImages = (adminState.categories || [])
    .filter((cat) => cat.image)
    .map((cat) => ({
      url: cat.image,
      label: cat.categoryType,
      type: "Categoria",
      id: cat.id,
    }));

  // Unisci immagini e rimuovi duplicati per url
  const allImages = [...dishImages, ...categoryImages].filter(
    (img, idx, arr) => arr.findIndex((i) => i.url === img.url) === idx
  );

  return (
    <div className="immagini-page">
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Gestione Immagini</h1>
          {adminState.loading && <Spinner animation="border" variant="primary" size="sm" className="m-2" />}
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
        </div>

        <div className="mb-4">
          <Button variant="primary" onClick={() => setShowUploadModal(true)}>
            <FaUpload className="me-2" /> Carica Nuova Immagine
          </Button>
        </div>

        <Row>
          {allImages.length === 0 && (
            <Col>
              <Alert variant="info">Nessuna immagine caricata.</Alert>
            </Col>
          )}
          {allImages.map((img) => (
            <Col xs={12} md={6} lg={4} className="mb-4" key={img.url}>
              <Card className="img-card-fixed ">
                <Card.Img variant="top" src={img.url} alt={img.label} className="card-img-top" />
                <Card.Body>
                  <Card.Title>
                    {img.label} <span className="badge bg-secondary">{img.type}</span>
                  </Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteImage(img.url)}
                    disabled // Rimuovere disabled quando deleteImage sarà funzionante
                  >
                    <FaTrash className="me-2" /> Elimina
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showUploadModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Carica Nuova Immagine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile">
              <Form.Label>Seleziona un'immagine</Form.Label>
              <Form.Control type="file" onChange={handleFileSelect} accept="image/*" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>
            Carica
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImmaginiPage;
