import React, { useState } from "react";
import { Card, Button, Alert, Toast } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css"



import "firebase/database";
import firebase from 'firebase';

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
  const [menseger, setMenseger] = useState('');
  const [show, setShow] = useState(false);

  const { logout } = useAuth();
  const history = useHistory();

  const user = firebase.auth().currentUser;
  // Recuperara dados do realtime database 
  const clientsRef = firebase.database().ref();
  const chaveRef = firebase.database().ref();
  async function GetData() {
    const clientList = await clientsRef.child(`clients/${user.uid}/PixCreated/`).limitToLast(1).get();
    const dataClient = [];
    const data = clientList.val();
    for (let id in data) {
      dataClient.push(id, data);
    };
    const resPix = Object.entries(clientList.val() ?? {}).map(([key, value]) => {
      return {
        'menseger': value.menseger,
        'textId': value.textId,
        'valorPix': value.valorPix
      }
    }
    );
    setMenseger(resPix[0].menseger);
    setTextId(resPix[0].textId);
    setValorPix(resPix[0].valorPix);
    // get chave do cliente
    const chaveRes = await chaveRef.child(`clients/${user.uid}/key/`).get();
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
    menseger.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    city.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    textId.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
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
      <Card className="text-light shadow text-center bg-secondary rounded mb-2">
        <div className="pl-3 pr-3 row justify-content-between">
          <Link className="badge badge-secondary" to="/UpData">EDITAR CHAVE</Link>
          <Link to="/GerarValor" className="badge badge-secondary" >
            CRIAR NOVO PIX
          </Link>
          <Button className="badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>
        </div>
        <Card.Body>
          <img src={logo} alt="Gera pix" width="200px" />
          <Toast onClose={() => setShow(false)}
            show={show} d
            elay={3000}
            autohide top-center className=" top-center text-white bg-success">
            <Toast.Header className="bg-success d-inline-block m-1">
              <img src={logo} alt="Gera pix" className="img-fluid bi bi-clipboard-check" width="100px" />

            </Toast.Header>
            <Toast.Body>COPIADO COM SUCESSO!</Toast.Body>
          </Toast>
          {error && <Alert variant="danger">{error}</Alert>}
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