import React from "react"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"
import createKey from "./createKey"
import ForgotPassword from "./ForgotPassword"
import GerarValor from "./GeraValor"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import Profile from "./Profile"
import GenerationQRCode from "./QRCode"
import Signup from "./Signup"
import UpData from "./UpdateData"
import UpdateProfile from "./UpdateProfile"



function App() {
  return (

    <Container
      className="d-flex align-items-center justify-content-center "
      style={{ minHeight: "100vh" }} >
      <div className="p-3 mb-2 w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              {<PrivateRoute exact path="/" component={Profile} />}
              <Route path="/profile" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/createKey" component={createKey} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/UpData" component={UpData} />
              <Route path="/GerarValor" component={GerarValor} />
              <Route path="/QRCode:idKey" component={GenerationQRCode} />
            </Switch>
          </AuthProvider>
        </Router>

      </div>
    </Container>

  )
}

export default App
