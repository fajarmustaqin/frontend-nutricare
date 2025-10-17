import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
      no_hp: data.telepon.replace("+62", "0"),
      password: data.password,
    };
    
    const { REACT_APP_API_URL } = process.env;
    console.log('🔗 API URL:', REACT_APP_API_URL);
    console.log('📤 User login data:', body);
    
    try {
      const result = await axios.post(`${REACT_APP_API_URL}/users/login`, body);
      console.log('📥 Login response:', result.data);
      
      const { token } = result.data;
      if (token) {
        setDisabled(false)
        setCookie("token", token);
        console.log('✅ User login successful, redirecting...');
        Navigate("/");
      } else if(result.data === "user is not exist") {
        setDisabled(false)
        setAlert(true)
        setAlertmsg("Nomor telepon belum terdaftar")
      } else if(result.data === "invalid") {
        setDisabled(false)
        setAlert(true)
        setAlertmsg("Password salah")
      } else {
        setDisabled(false)
        setAlert(true)
        setAlertmsg("Login gagal, silakan coba lagi")
      }
    } catch (error) {
      setDisabled(false)
      console.error('❌ User login error:', error);
      console.error('📄 Error response:', error.response?.data);
      
      setAlert(true)
      if (error.response?.status === 500) {
        setAlertmsg("Terjadi kesalahan server")
      } else {
        setAlertmsg("Terjadi kesalahan, silakan coba lagi")
      }
    }
  };
  
  

  return (
    <Layout>
      <div className="login-container">
        <div className="login-background">
          <div className="gradient-overlay"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>

        <div className="login-content">
          <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
              <div className="col-12 col-lg-10 col-xl-8">
                <div className="login-card">
                  <div className="row g-0 h-100">
                    {/* Left Side - Logo & Branding */}
                    <div className="col-lg-6 login-left">
                      <div className="login-brand">
                        <div className="brand-logo">
                          <img src={logo_awal} alt="NutriCare Logo" className="logo-img" />
                        </div>
                        <div className="brand-content">
                          <h1 className="brand-title">
                            <span className="gradient-text">Nutri</span>Care
                          </h1>
                          <p className="brand-subtitle">
                            Kelola nutrisi dan kesehatan Anda dengan mudah
                          </p>
                          <div className="brand-features">
                            <div className="feature-item">
                              <i className="fas fa-heart"></i>
                              <span>Tracking Nutrisi</span>
                            </div>
                            <div className="feature-item">
                              <i className="fas fa-leaf"></i>
                              <span>Eco-Friendly</span>
                            </div>
                            <div className="feature-item">
                              <i className="fas fa-chart-line"></i>
                              <span>Progress Monitoring</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="col-lg-6 login-right">
                      <div className="login-form-container">
                        <div className="form-header">
                          <h2 className="form-title">Selamat Datang!</h2>
                          <p className="form-subtitle">Masuk ke akun Anda untuk melanjutkan</p>
                        </div>

                        {/* Alert */}
                        <div className={`alert-modern ${alert ? "show" : ""}`}>
                          <div className="alert-content">
                            <i className="fas fa-exclamation-triangle"></i>
                            <span>{alertmsg}</span>
                          </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                          <div className="form-group">
                            <label htmlFor="telepon" className="form-label">
                              <i className="fas fa-phone"></i>
                              Nomor Telepon
                            </label>
                            <div className="input-wrapper">
                              <div className="input-icon">
                                <i className="fas fa-phone"></i>
                              </div>
                              <input
                                type="text"
                                className={`form-input ${errors.telepon ? "error" : ""}`}
                                {...register("telepon", {
                                  required: "Nomor Telepon tidak boleh kosong",
                                  pattern: {
                                    value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/i,
                                    message: "Nomor Telepon tidak valid",
                                  },
                                })}
                                placeholder="Masukkan nomor telepon Anda"
                                id="telepon"
                                autoComplete="off"
                                onKeyUp={() => trigger("telepon")}
                              />
                            </div>
                            {errors.telepon && (
                              <div className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {errors.telepon.message}
                              </div>
                            )}
                          </div>

                          <div className="form-group">
                            <label htmlFor="password" className="form-label">
                              <i className="fas fa-lock"></i>
                              Kata Sandi
                            </label>
                            <div className="input-wrapper">
                              <div className="input-icon">
                                <i className="fas fa-lock"></i>
                              </div>
                              <input
                                type={showPassword ? "text" : "password"}
                                className={`form-input ${errors.password ? "error" : ""}`}
                                {...register("password", {
                                  required: "Password tidak boleh kosong",
                                })}
                                placeholder="Masukkan kata sandi Anda"
                                id="password"
                                autoComplete="off"
                              />
                              <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisiblity}
                              >
                                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                              </button>
                            </div>
                            {errors.password && (
                              <div className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {errors.password.message}
                              </div>
                            )}
                          </div>

                          <div className="form-options">
                            <label className="checkbox-wrapper">
                              <input
                                type="checkbox"
                                onChange={togglePasswordVisiblity}
                                checked={showPassword}
                                className="checkbox-input"
                              />
                              <span className="checkbox-custom"></span>
                              <span className="checkbox-label">Tampilkan Kata Sandi</span>
                            </label>
                          </div>

                          <button
                            type="submit"
                            className={`login-btn ${disabled ? "loading" : ""}`}
                            disabled={disabled}
                          >
                            {disabled ? (
                              <>
                                <div className="btn-spinner"></div>
                                <span>Memproses...</span>
                              </>
                            ) : (
                              <>
                                <i className="fas fa-sign-in-alt"></i>
                                <span>Masuk</span>
                              </>
                            )}
                          </button>
                        </form>

                        <div className="form-footer">
                          <p className="signup-text">
                            Belum punya akun?{" "}
                            <Link to="/sign-up" className="signup-link">
                              Daftar Sekarang
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .login-container {
            position: relative;
            min-height: 100vh;
            width: 100%;
            overflow: hidden;
          }

          .login-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 1;
          }

          .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              45deg,
              rgba(102, 126, 234, 0.8) 0%,
              rgba(118, 75, 162, 0.8) 50%,
              rgba(59, 130, 246, 0.6) 100%
            );
          }

          .floating-shapes {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
          }

          .shape {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            animation: float 6s ease-in-out infinite;
          }

          .shape-1 {
            width: 80px;
            height: 80px;
            top: 10%;
            left: 10%;
            animation-delay: 0s;
          }

          .shape-2 {
            width: 120px;
            height: 120px;
            top: 20%;
            right: 15%;
            animation-delay: 2s;
          }

          .shape-3 {
            width: 60px;
            height: 60px;
            bottom: 30%;
            left: 20%;
            animation-delay: 4s;
          }

          .shape-4 {
            width: 100px;
            height: 100px;
            bottom: 20%;
            right: 30%;
            animation-delay: 1s;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          .login-content {
            position: relative;
            z-index: 2;
            min-height: 100vh;
            display: flex;
            align-items: center;
          }

          .login-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 30px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            overflow: hidden;
            min-height: 600px;
          }

          .login-left {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 60px 40px;
            position: relative;
          }

          .login-left::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><pattern id="grain" width="100" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="30" cy="5" r="0.5" fill="white" opacity="0.05"/><circle cx="50" cy="15" r="0.8" fill="white" opacity="0.08"/><circle cx="70" cy="8" r="0.6" fill="white" opacity="0.06"/><circle cx="90" cy="12" r="0.7" fill="white" opacity="0.07"/></pattern></defs><rect width="100" height="20" fill="url(%23grain)"/></svg>');
            pointer-events: none;
          }

          .login-brand {
            text-align: center;
            position: relative;
            z-index: 2;
          }

          .brand-logo {
            margin-bottom: 30px;
          }

          .logo-img {
            max-width: 200px;
            width: 100%;
            filter: brightness(0) invert(1);
            opacity: 0.9;
          }

          .brand-title {
            font-size: 3rem;
            font-weight: 800;
            color: white;
            margin-bottom: 15px;
            line-height: 1.1;
          }

          .gradient-text {
            background: linear-gradient(45deg, #FFD700, #FFA500);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .brand-subtitle {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 40px;
            line-height: 1.6;
          }

          .brand-features {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .feature-item {
            display: flex;
            align-items: center;
            gap: 15px;
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
          }

          .feature-item i {
            font-size: 1.2rem;
            color: #FFD700;
          }

          .login-right {
            padding: 60px 50px;
            display: flex;
            align-items: center;
          }

          .login-form-container {
            width: 100%;
          }

          .form-header {
            text-align: center;
            margin-bottom: 40px;
          }

          .form-title {
            font-size: 2.2rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 10px;
          }

          .form-subtitle {
            color: #718096;
            font-size: 1rem;
            margin: 0;
          }

          .alert-modern {
            background: linear-gradient(135deg, #fed7d7, #feb2b2);
            border: none;
            border-radius: 15px;
            padding: 15px 20px;
            margin-bottom: 30px;
            transform: translateY(-10px);
            opacity: 0;
            transition: all 0.3s ease;
          }

          .alert-modern.show {
            transform: translateY(0);
            opacity: 1;
          }

          .alert-content {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #c53030;
            font-weight: 600;
          }

          .login-form {
            margin-bottom: 30px;
          }

          .form-group {
            margin-bottom: 25px;
          }

          .form-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 10px;
            font-size: 0.9rem;
          }

          .form-label i {
            color: #667eea;
          }

          .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }

          .input-icon {
            position: absolute;
            left: 20px;
            color: #a0aec0;
            z-index: 2;
          }

          .form-input {
            width: 100%;
            padding: 18px 20px 18px 50px;
            border: 2px solid #e2e8f0;
            border-radius: 15px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: #f8fafc;
          }

          .form-input:focus {
            outline: none;
            border-color: #667eea;
            background: white;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          .form-input.error {
            border-color: #e53e3e;
            background: #fed7d7;
          }

          .password-toggle {
            position: absolute;
            right: 20px;
            background: none;
            border: none;
            color: #a0aec0;
            cursor: pointer;
            padding: 5px;
            transition: color 0.3s ease;
          }

          .password-toggle:hover {
            color: #667eea;
          }

          .error-message {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #e53e3e;
            font-size: 0.85rem;
            margin-top: 8px;
          }

          .form-options {
            margin-bottom: 30px;
          }

          .checkbox-wrapper {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            font-size: 0.9rem;
            color: #4a5568;
          }

          .checkbox-input {
            display: none;
          }

          .checkbox-custom {
            width: 20px;
            height: 20px;
            border: 2px solid #e2e8f0;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            background: white;
          }

          .checkbox-input:checked + .checkbox-custom {
            background: #667eea;
            border-color: #667eea;
          }

          .checkbox-input:checked + .checkbox-custom::after {
            content: '✓';
            color: white;
            font-size: 12px;
            font-weight: bold;
          }

          .login-btn {
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            position: relative;
            overflow: hidden;
          }

          .login-btn:not(.loading):hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
          }

          .login-btn.loading {
            cursor: not-allowed;
            opacity: 0.8;
          }

          .btn-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .form-footer {
            text-align: center;
            padding-top: 20px;
          }

          .signup-text {
            color: #718096;
            margin: 0;
            font-size: 0.95rem;
          }

          .signup-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .signup-link:hover {
            color: #764ba2;
            text-decoration: underline;
          }

          @media (max-width: 991px) {
            .login-left {
              display: none;
            }

            .login-right {
              padding: 40px 30px;
            }

            .login-card {
              border-radius: 20px;
            }

            .form-title {
              font-size: 1.8rem;
            }
          }

          @media (max-width: 576px) {
            .login-right {
              padding: 30px 20px;
            }

            .form-title {
              font-size: 1.6rem;
            }

            .brand-title {
              font-size: 2.2rem;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}
