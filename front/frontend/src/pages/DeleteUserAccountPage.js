import React, { useState } from "react";
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Logout,
  userAccountDelete,
  checkTokenValidation,
} from "../actions/userActions";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { USER_DELETE_RESET } from "../constants";
import "../styles/AccountPage.css";

function DeleteUserAccount() {
  let history = useNavigate();
  const dispatch = useDispatch();
  const [myPassword, setMyPassword] = useState("");

  // reducer de inicio de sesión
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  // reducer para eliminar cuenta de usuario
  const deleteUserAccountReducer = useSelector(
    (state) => state.userDeleteReducer
  );
  const { success, loading, error } = deleteUserAccountReducer;

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: userInfo.id,
      password: myPassword,
    };
    dispatch(checkTokenValidation());
    dispatch(userAccountDelete(userData));
  };

  if (success) {
    alert("Cuenta eliminada exitosamente.");
    dispatch({
      type: USER_DELETE_RESET,
    });
    dispatch(Logout()); // acción
    history("/login");
    window.location.reload();
  }

  return (
    <div className="account-page">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3>Confirme su contraseña para eliminar su cuenta.</h3>
          {loading && (
            <div className="loading-container">
              <h5>Por favor espere</h5>
              <Spinner animation="border" />
            </div>
          )}
          {error && <Message variant="danger">¡Contraseña incorrecta!</Message>}
          <div className="mt-4">
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={myPassword}
                  onChange={(e) => setMyPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="danger">
                Confirmar eliminación
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DeleteUserAccount;
