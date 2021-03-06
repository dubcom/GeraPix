import React, { useRef, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import logo from '../image/logo.png'


export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, logout, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Senha não são iguais. Digite novamente")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Ocorreu um erro na alteração")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Falha para fazer logout")
    }
  }

  return (
    <>
      <Card className="shadow bg-dark rounded p-3">
        <div className="w-100 text-right">
          <Button className="mr-03 badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>
        </div>
        <Card.Body className="text-light">
          <div className="text-center">
            <img src={logo} alt="Gera pix" width="200" />
          </div>

          <h5 className="text-center mt-4">Atualizar dados</h5>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" >
              <Form.Label className="text-light mb-0" >E-mail</Form.Label>
              <Form.Control
                className="form-control-sm"
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-0 mb-0">Senha</Form.Label>
              <Form.Control
                className="form-control-sm"
                type="password"
                ref={passwordRef}
                placeholder="Nova senha"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label className="mb-0">Confirmar senha</Form.Label>
              <Form.Control
                className="form-control-sm"
                type="password"
                ref={passwordConfirmRef}
                placeholder="Repita sua senha"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Atualizar
            </Button>
          </Form>
        </Card.Body>
        <div className="pl-3 pr-3 row justify-content-between">
          <Link to="/UpData" > Atualizar Chave PIX </Link>
          <Link to="/">Cancelar</Link>
        </div>
      </Card>

    </>
  )
}
