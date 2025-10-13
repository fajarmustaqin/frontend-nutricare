import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo_awal from "../images/Opening.png";
import "../style/SignIn.css";
import Layout from "../layouting/Layout";
import axios from "axios";
import { setCookie } from "../helpers";

export default function SignIn() {
  let Navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false)
  
  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };
  const [alert, setAlert] = useState(false);
  const [alertmsg, setAlertmsg] = useState("")
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setAlert(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alert]);

  const onSubmit = async (data) => {
    setDisabled(true)
    const body = {
      email: data.email,
      password: data.password,
    };
    
    const { REACT_APP_API_URL } = process.env;
    console.log('🔗 API URL:', REACT_APP_API_URL);
    console.log('📤 Login data:', body);
    
    try {
      const result = await axios.post(`${REACT_APP_API_URL}/admin/login`, body);
      console.log('📥 Login response:', result.data);
      
      const { token } = result.data;
      if (token) {
        setDisabled(false)
        setCookie("token", token);
        console.log('✅ Admin login successful, redirecting to dashboard...');
        Navigate("/admin/dashboard");
      } else {
        setDisabled(false)
        setAlert(true)
        setAlertmsg("Login gagal, periksa kredensial Anda")
      }
    } catch (error) {
      setDisabled(false)
      console.error('❌ Login error:', error);
      console.error('📄 Error response:', error.response?.data);
      
      if (error.response?.status === 404) {
        setAlert(true)
        setAlertmsg("Admin tidak ditemukan")
      } else if (error.response?.status === 401) {
        setAlert(true)
        setAlertmsg("Password salah")
      } else {
        setAlert(true)
        setAlertmsg("Terjadi kesalahan, silakan coba lagi")
      }
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <main className="d-flex min-vh-100 justify-content-center align-items-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10 col-xl-8 shadow rounded-6">
                    <div className="row justify-content-center py-md-0 py-5">
                      <div className="text-center d-md-none">
                        <h3>Masuk</h3>
                        <p className="text-secondary mt-1 mb-2">Login admin</p>
                      </div>
                      <div className="col-lg-5 col-md-5 col-7 p-2 my-auto">
                        <img src={logo_awal} className="img-fluid w-100" alt="property pict" />
                      </div>

                      <div className="col-lg-5 col-md-6 col-12 p-lg-5 px-4 pe-lg-2 py-md-5">
                        <div className="mb-4 d-none d-md-block">
                          <h2 className="">Masuk</h2>
                          <p className="text-secondary mt-1">login admin</p>
                        </div>
                        {/* Alert */}
                        <div className={`alert alert-danger align-items-center mt-4 ${alert ? "show" : "d-none"}`} role="alert">
                          <div>{alertmsg}</div>
                        </div>

                        <form noValidate onSubmit={handleSubmit(onSubmit)} id="loginForm">
                          <div className="mb-3">
                            <label htmlFor="text" className="form-label">
                            Email
                            </label>
                            <div className="input-group mb-1">
                              <span className="input-group-text" id="basic-addon1">
                                <i className="far fa-at"></i>
                              </span>
                              <input
                                className={`form-control ${errors.email && "invalid"}`}
                                {...register("email", {
                                required: "Alamat Email tidak boleh kosong",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Alamat Email tidak valid",
                                },
                                })}
                                placeholder="Alamat Email"
                                id="email"
                                autoComplete="off"
                                onKeyUp={() => {
                                trigger("email");
                                }}
                              />
                            </div>
                          </div>

                          <div className="mb-2">
                            <label htmlFor="password" className="form-label">
                              Kata Sandi
                            </label>
                            <div className="input-group mb-1">
                              <span className="input-group-text" id="basic-addon1">
                                <i className="far fa-lock"></i>
                              </span>
                              <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${errors.password && "invalid"}`}
                                {...register("password", {
                                  required: "Password tidak boleh kosong",
                                })}
                                placeholder="masukan kata sandi"
                                id="password"
                                autoComplete="off"
                              />
                            </div>
                            {errors.password && <small className="text-danger">{errors.password.message}</small>}
                          </div>

                          <div className="mb-3 form-check">
                            <input type="checkbox" onClick={() => togglePasswordVisiblity()} className="form-check-input" id="showPassword" />
                            <label className="form-check-label" htmlFor="showPassword">
                              <p>Tampilkan Kata Sandi</p>
                            </label>
                          </div>

                          <div className="d-grid col-12 mt-md-4 mt-3">
                            <button
                              type="submit"
                              className={`btn btn-sm btn-main ${disabled ? 'disabled' : ''}`}
                              style={{ backgroundColor: "#067cc6", fontSize: "16px", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.05), 0 6px 20px 0 rgba(0,0,0,0.19)", borderRadius: "8px", padding: "15px 18px;", color: "white" }}
                            >
                              Masuk
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
