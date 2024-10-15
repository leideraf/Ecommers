import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { deleteProduct, getProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import {
  Spinner,
  Row,
  Col,
  Container,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_UPDATE_RESET,
  CARD_CREATE_RESET,
} from "../constants";

function ProductDetailsPage({ history, match }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productDetailsReducer = useSelector(
    (state) => state.productDetailsReducer
  );
  const { loading, error, product } = productDetailsReducer;

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  const deleteProductReducer = useSelector(
    (state) => state.productDeleteReducer
  );
  const { success: productDeletionSuccess } = deleteProductReducer;

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch({ type: PRODUCT_UPDATE_RESET });
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: CARD_CREATE_RESET });
  }, [dispatch, id]);

  const confirmDelete = () => {
    dispatch(deleteProduct(id));
    handleClose();
  };

  useEffect(() => {
    if (productDeletionSuccess) {
      alert("Producto eliminado exitosamente.");
      navigate("/");
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [productDeletionSuccess, dispatch, navigate]);

  return (
    <div>
      {/* Inicio del Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle modal-icon"></i>{" "}
            Confirmación de Eliminación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar este producto{" "}
          <em>"{product.name}"</em>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Confirmar Eliminación
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Fin del Modal */}

      {loading ? (
        <div className="loading-container">
          <h5>Obteniendo detalles del producto</h5>
          <Spinner animation="border" className="ml-2" />
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row>
            <Col md={6}>
              <Card className="product-details-card">
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="product-images"
                />
              </Card>
              {userInfo && userInfo.is_staff && (
                <div className="d-flex mt-2">
                  <Button
                    variant="danger"
                    className="mr-2 w-50"
                    onClick={handleShow}
                  >
                    Eliminar Producto
                  </Button>
                  <Button
                    variant="primary"
                    className="w-50"
                    onClick={() => navigate(`/product-update/${product.id}/`)}
                  >
                    Editar Producto
                  </Button>
                </div>
              )}
            </Col>
            <Col md={6}>
              <h3 className="product-name">{product.name}</h3>
              <hr />
              <p>{product.description}</p>
              <div className="price-container">
                <strong>Precio: </strong>
                <span className="highlighted-price"> ${product.price}</span>
              </div>
            </Col>
            <Col md={6} className="mt-3">
              <h3 className="buy-section-title">Comprar</h3>
              <hr />
              {product.stock ? (
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => navigate(`/product/${product.id}/checkout/`)}
                >
                  Comprar Ahora
                </Button>
              ) : (
                <Message variant="danger">¡Agotado!</Message>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ProductDetailsPage;
