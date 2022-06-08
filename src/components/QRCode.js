import "bootstrap-icons/font/bootstrap-icons.css";
import firebase from 'firebase';
import "firebase/database";
import React, { useState } from "react";
import { Alert, Button, Card, Toast } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from '../image/logo.png';
import Pix from "./Pix";

const QRCode = require('qrcode.react');

export default function GenerationQRCode() {

  const [error, setError] = useState('');
  const [chave, setChave] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [valorPix, setValorPix] = useState('');
  const [textId, setTextId] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const id = useParams().idKey;

  const { logout } = useAuth();
  const history = useHistory();

  const user = firebase.auth().currentUser;
  // Recuperara dados do realtime database 
  const clientsRef = firebase.database().ref();
  const chaveRef = firebase.database().ref();
  async function GetData() {
    const clientList = await clientsRef.child(`clients/${user.uid}/PixCreated/${id}`).get();
    const valorPix = clientList.val().valorPix;
    const message = clientList.val().message;
    const textId = clientList.val().textId;

    setValorPix(valorPix);
    setTextId(textId);
    setMessage(message);

    // get chave do cliente
    const chaveRes = await chaveRef.child(`clients/${user.uid}/key/`).limitToLast(1).get();
    const dataChave = [];
    const dataRes = chaveRes.val();
    for (let id in dataRes) {
      dataChave.push(id, dataRes);
    };
    const resChave = Object.entries((chaveRes.val()) ?? {}).map(([key, value]) => {
      return {
        'chave': value.chave,
        'city': value.city,
        'name': value.name
      }
    }
    );
    setChave(resChave[0].chave);
    setCity(resChave[0].city);
    setName(resChave[0].name);
  };
  GetData();
  // gerar qrcode Payload
  const pix = new Pix(
    chave,
    message.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, ''),
    name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    city.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    textId.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, ''),
    valorPix
  );
  const payload = pix.getPayload();
  //logout incio 
  async function handleLogout() {
    setError("Algo deu errado")
    try {
      await logout()
      history.push("/Login")
    } catch {
      setError("Failed to log out")
    }
  }
  // Toast show 
  function handToast() {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
    navigator.clipboard.writeText(payload)
  }
  return (
    <>
      <Card className="text-light shadow text-center bg-secondary rounded mb-2 ">
        <div className="pl-3 pr-3 row justify-content-between mt-2">
          <Link className="badge badge-secondary" to="/UpData">
            CHAVE</Link>
          <Link to="/GerarValor" className="badge badge-secondary" >
            NOVO PIX </Link>
          <Button className="badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>
        </div>
        <Card.Body>
          <img src={logo} alt="Gera pix" width="200px" />

          {error && <Alert variant="danger">{error}</Alert>}
          <Toast onClose={() => setShow(false)} show={show} delay={2500} autohide top-center className=" top-center text-white bg-success">
            <Toast.Header className="bg-success d-inline-block m-1">
              <img src={logo} alt="Gera pix" width="100" />
              <strong className="me-auto text-white bg-success">   COPIADO     </strong>
            </Toast.Header>
            <Toast.Body>COPIADO COM SUCESSO!</Toast.Body>
          </Toast>
        </Card.Body>
      </Card>
      <Card.Footer className="shadow text-center bg-dark text-white rounded">
        <h6 className="text-center">LER QR-CODE</h6>
        <div className="text-center img-fluid">
          <QRCode value={payload}
            size={280}
            level={"H"}
            includeMargin={true}
            className="text-center img-fluid" />
        </div>

        <div>
          <small> Parar: {name}</small>
        </div>
        <div>
          <small>Valor: {valorPix}</small>
        </div>
        
    
        <Button className="bi bi-clipboard-check badge mr-08 Dark text-white" onClick={handToast}> COPIAR
        </Button>
      </Card.Footer>

    </>
  )
}