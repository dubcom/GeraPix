import firebase from "firebase";
import "firebase/database";
import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../image/logo.png";

export default function GerarValor() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [newPix, setPix] = useState(""); // Stores the raw numeric string for the database
  const [displayValue, setDisplayValue] = useState(""); // Stores the formatted string for display
  const [newTextId, setTextId] = useState("Gerapix");
  const [newMessage, setMessage] = useState("Gerapix");

  const handleChange = (values) => {
    const {value, floatValue} = values;
    // value is the formatted string, floatValue is the number
    setDisplayValue(value || ""); // Update display with formatted value
    if (floatValue !== undefined) {
      setPix(floatValue.toString()); // Store the unformatted number string for database
    } else {
      setPix(""); // Handle empty or invalid input
    }
  };

  const handleOnBlur = () => {
    // When blurring, if there's a valid number in newPix,
    // format it to two decimal places for display.
    // The actual newPix value for the database is already set by handleChange.
    if (newPix) {
      const numericValue = parseFloat(newPix);
      if (!isNaN(numericValue)) {
        // Format with comma for decimal, as per Brazilian convention for display
        const formattedForDisplay = numericValue.toFixed(2).replace('.', ',');
        setDisplayValue(`R$ ${formattedForDisplay}`);
      } else {
        setDisplayValue(""); // Clear display if not a valid number
      }
    } else {
        setDisplayValue(""); // Clear display if newPix is empty
    }
  };


  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Falha ao fazer logout");
    }
  }

  const user = firebase.auth().currentUser;
  async function handCreatPix(event) {
    event.preventDefault();

    // Ensure newPix is a string with a period as decimal separator for Firebase
    const valueForFirebase = parseFloat(newPix).toFixed(2);

    const firebaseClient = {
      valorPix: valueForFirebase, // Use the processed newPix
      authorId: currentUser.uid,
      textId: newTextId,
      message: newMessage,
      date: new Date().toUTCString(),
    };

    const created = await firebase
      .database()
      .ref(`clients/${user?.uid}/PixCreated/`)
      .push(firebaseClient);

    console.log(created.key);
    history.push("/QRCode/" + created.key);
  }

  return (
    <>
      <Card className="text-white shadow bg-secondary rounded mb-2">
        <div className="w-100 text-right">
          <Button
            className="mr-03 badge badge-secondary"
            variant="link"
            onClick={handleLogout}
          >
            SAIR
          </Button>
        </div>
        <Card.Body>
          <div className="text-center">
            <img src={logo} alt="Gera pix" width="200" />
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
        </Card.Body>
      </Card>
      <Card.Footer className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        <div className="user-info text-center mb-4">
          <Form>
            <Form.Group className="mb-4" id="chave">
              <Form.Label className="mb-0">
                <h4>Valor da conta</h4>
              </Form.Label>
              <small className="form-text text-muted">
                {/* Consider if this helper text is still needed or how it should display */}
                {/* R${newPix} Digite o valor do PIX */}
                Digite o valor do PIX
              </small>

              <CurrencyFormat
                className="form-control"
                name="pixValue" // Changed name for clarity, though not strictly necessary
                placeholder="R$ 0,00"
                value={displayValue} // Use displayValue for the input field
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true} // explicitly true
                prefix="R$ "
                onValueChange={handleChange} // handleChange now manages both newPix and displayValue
                onBlur={handleOnBlur} // onBlur now primarily updates displayValue
              />

              <small className="form-text text-right text-muted">
                Digite mensagem para o cliente
              </small>
              <Form.Control
                type="text"
                name="newTextId"
                required
                placeholder="Digite um Identificador da venda"
                onChange={(event) => setTextId(event.target.value)}
              />
              <small className="form-text text-right text-muted">
                Digite um identificador da venda
              </small>
              <Form.Control
                type="text"
                name="newMessage"
                required
                placeholder="Mensagem para o cliente"
                onChange={(event) => setMessage(event.target.value)}
              />
            </Form.Group>
            <Button onClick={handCreatPix} className="w-100" type="submit">
              CRIAR QR-CODE
            </Button>
          </Form>
        </div>
        <div className="pl-3 pr-3 row justify-content-between mt-4">
          <Link className="btn btn-primary btn-sm" to="/UpData">
            Atualizar chave
          </Link>
          <Link to="/update-profile" className="btn btn-primary btn-sm mt-8">
            Atualizar senha
          </Link>
        </div>
      </Card.Footer>
    </>
  );
}
