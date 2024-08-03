import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { connect } from "react-redux";
import loginReducer, { addLogin } from "src/reducer/loginReducer";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "src/middleware";

// eslint-disable-next-line react/prop-types
const Login = ({ loginReducer, addLogin, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("123");

  const navigate = useNavigate();

  function send() {
    axios
      .post(`${BaseUrl}/auth/authenticate`, {
        username,
        password
      })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.object));
        sessionStorage.setItem("token", res.data.object.token);
        setUser(res.data?.object);
        navigate("/dashboard");
      })
      // .catch((err) => console.log(err))
      .catch((err) => toast.error("Check username or password !"));
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        autoComplete="username"
                      />
                    </CInputGroup>
                    {console.log(username, password)}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={send} color="primary" className="px-4">
                          Login
                        </CButton>
                        {/*{username === 'admin' && password === '123' ? (*/}
                        {/*  <Link to={'/dashboard'}>*/}
                        {/*    <CButton color="primary" className="px-4">*/}
                        {/*      Login*/}
                        {/*    </CButton>*/}
                        {/*  </Link>*/}
                        {/*) : (*/}
                        {/*  // <Link to={'/dashboard'}>*/}
                        {/*  // <CButton onClick={notify} color="danger" className="px-4">*/}
                        {/*  <CButton onClick={send} color="danger" className="px-4">*/}
                        {/*    Login*/}
                        {/*  </CButton>*/}
                        {/*  // </Link>*/}
                        {/*)}*/}
                        {/*<Link to={'/dashboard'}>*/}
                        {/*  <CButton color="primary" className="px-4">*/}
                        {/*    Login*/}
                        {/*  </CButton>*/}
                        {/*</Link>*/}
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: "44%" }}>
                <CCardBody className="text-center">
                  <div>
                    <h4>Forget password ?</h4>
                    <p>
                      to press button
                      {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod*/}
                      {/*tempor incididunt ut labore et dolore magna aliqua.*/}
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        {/*Register Now!*/}
                        forgot password
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default connect(loginReducer, { addLogin })(Login);

// doniknegmatov51@gmail.com
// aa2224848
