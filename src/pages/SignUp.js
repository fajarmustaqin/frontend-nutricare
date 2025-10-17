import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layouting/Layout";
import "../style/SignUp.css";
import axios from "axios";
import { getCookie, setCookie } from "../helpers";

export default function SignUp() {
  const { REACT_APP_API_URL } = process.env;
  const google_cookie = getCookie("email");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  
  let Navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [disabled, setDisabled] = useState(false)

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
    console.log('📤 Registration form data:', data);
    
    let { nama_lengkap, no_hp, password, konfirmasi_password, berat, tinggi, umur, aktivitasFisik, jeniskelamin } = data;
    
    // Validate password confirmation
    if (konfirmasi_password !== password) {
      setDisabled(false)
      setError("konfirmasi_password", {
        message: "Password tidak sesuai",
      });
      return;
    }

    try {
      if (google_cookie) {
        // Google registration
        const body = {
          email: google_cookie,
          jeniskelamin: jeniskelamin,
          umur: umur,
          tinggi: tinggi,
          berat: berat,
          aktivitasFisik: aktivitasFisik,
        };
        
        console.log('📤 Google registration data:', body);
        const response = await axios.patch(`${REACT_APP_API_URL}/users/register/google`, body);
        console.log('📥 Google registration response:', response.data);
        
        if (response.data.message === "success") {
          setDisabled(false)
          document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          setCookie("token", response.data.token);
          console.log('✅ Google registration successful, redirecting...');
          Navigate("/");
        } else {
          setDisabled(false)
          setAlert(true);
          setAlertMsg("Registrasi Google gagal, silakan coba lagi");
        }
      } else {
        // Regular registration
        no_hp = no_hp.replace("+62", "0");
        const body = {
          nama: nama_lengkap,
          no_hp: no_hp,
          jeniskelamin: jeniskelamin,
          password: password,
          umur: umur,
          tinggi: tinggi,
          berat: berat,
          aktivitasFisik: aktivitasFisik,
        };
        
        console.log('📤 Regular registration data:', body);
        const response = await axios.post(`${REACT_APP_API_URL}/users/register`, body);
        console.log('📥 Registration response:', response.data);
        
        if (response.data.message === "success") {
          setDisabled(false)
          setCookie("token", response.data.token);
          console.log('✅ Registration successful, redirecting...');
          Navigate("/");
        } else if (response.data === "duplicate email") {
          setDisabled(false)
          setAlert(true);
          setAlertMsg("Nomor telepon sudah terdaftar");
          console.log('⚠️ Duplicate phone number');
        } else {
          setDisabled(false)
          setAlert(true);
          setAlertMsg("Registrasi gagal, silakan coba lagi");
          console.log('⚠️ Registration failed:', response.data);
        }
      }
    } catch (error) {
      setDisabled(false)
      console.error('❌ Registration error:', error);
      console.error('📄 Error response:', error.response?.data);
      
      if (error.response?.data?.err) {
        console.log('Server error:', error.response.data.err);
      }
      
      setAlert(true);
      setAlertMsg("Terjadi kesalahan server, silakan coba lagi");
    }
  };


  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };

  return (
    <Layout>
      <div className="signup-container">
        <div className="signup-background">
          <div className="gradient-overlay"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>

        <div className="signup-content">
          <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
              <div className="col-12 col-lg-10 col-xl-8">
                <div className="signup-card">
                  {/* Full Width Registration Form */}
                  <div className="signup-right">
                      <div className="signup-form-container">
                        <div className="form-header">
                          <h2 className="form-title">Buat Akun Baru</h2>
                          <p className="form-subtitle">
                            {google_cookie ? "Lengkapi data Anda untuk melanjutkan" : "Isi form di bawah untuk mendaftar"}
                          </p>
                        </div>

                        {/* Alert */}
                        <div className={`alert-modern ${alert ? "show" : ""}`}>
                          <div className="alert-content">
                            <i className="fas fa-exclamation-triangle"></i>
                            <span>{alertMsg || "Terjadi kesalahan, silakan coba lagi"}</span>
                          </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                          <div className="form-row">
                            {/* Left Column */}
                            <div className="form-column">
                              {!google_cookie && (
                                <>
                                  <div className="form-group">
                                    <label htmlFor="nama_lengkap" className="form-label">
                                      <i className="fas fa-user"></i>
                                      Nama Lengkap
                                    </label>
                                    <div className="input-wrapper">
                                      <div className="input-icon">
                                        <i className="fas fa-user"></i>
                                      </div>
                                      <input
                                        type="text"
                                        className={`form-input ${errors.nama_lengkap ? "error" : ""}`}
                                        {...register("nama_lengkap", {
                                          required: "Nama Lengkap tidak boleh kosong",
                                        })}
                                        placeholder="Masukkan nama lengkap Anda"
                                        id="nama_lengkap"
                                        autoComplete="off"
                                      />
                                    </div>
                                    {errors.nama_lengkap && (
                                      <div className="error-message">
                                        <i className="fas fa-exclamation-circle"></i>
                                        {errors.nama_lengkap.message}
                                      </div>
                                    )}
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="no_hp" className="form-label">
                                      <i className="fas fa-phone"></i>
                                      Nomor Telepon
                                    </label>
                                    <div className="input-wrapper">
                                      <div className="input-icon">
                                        <i className="fas fa-phone"></i>
                                      </div>
                                      <input
                                        type="text"
                                        className={`form-input ${errors.no_hp ? "error" : ""}`}
                                        {...register("no_hp", {
                                          required: "Nomor Telepon tidak boleh kosong",
                                          pattern: {
                                            value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/i,
                                            message: "Nomor Telepon tidak valid",
                                          },
                                        })}
                                        placeholder="Masukkan nomor telepon Anda"
                                        id="no_hp"
                                        autoComplete="off"
                                      />
                                    </div>
                                    {errors.no_hp && (
                                      <div className="error-message">
                                        <i className="fas fa-exclamation-circle"></i>
                                        {errors.no_hp.message}
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
                                          minLength: {
                                            value: 6,
                                            message: "Password minimal 6 karakter",
                                          },
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

                                  <div className="form-group">
                                    <label htmlFor="konfirmasi_password" className="form-label">
                                      <i className="fas fa-lock"></i>
                                      Konfirmasi Kata Sandi
                                    </label>
                                    <div className="input-wrapper">
                                      <div className="input-icon">
                                        <i className="fas fa-lock"></i>
                                      </div>
                                      <input
                                        type={showPassword ? "text" : "password"}
                                        className={`form-input ${errors.konfirmasi_password ? "error" : ""}`}
                                        {...register("konfirmasi_password", {
                                          required: "Konfirmasi Password tidak boleh kosong",
                                        })}
                                        placeholder="Konfirmasi kata sandi Anda"
                                        id="konfirmasi_password"
                                        autoComplete="off"
                                      />
                                    </div>
                                    {errors.konfirmasi_password && (
                                      <div className="error-message">
                                        <i className="fas fa-exclamation-circle"></i>
                                        {errors.konfirmasi_password.message}
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Right Column */}
                            <div className="form-column">
                              <div className="form-group">
                                <label htmlFor="jeniskelamin" className="form-label">
                                  <i className="fas fa-venus-mars"></i>
                                  Jenis Kelamin
                                </label>
                                <div className="input-wrapper">
                                  <div className="input-icon">
                                    <i className="fas fa-venus-mars"></i>
                                  </div>
                                  <select
                                    className={`form-input ${errors.jeniskelamin ? "error" : ""}`}
                                    {...register("jeniskelamin", {
                                      required: "Jenis Kelamin tidak boleh kosong",
                                    })}
                                    id="jeniskelamin"
                                  >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="laki-laki">Laki-Laki</option>
                                    <option value="perempuan">Perempuan</option>
                                  </select>
                                </div>
                                {errors.jeniskelamin && (
                                  <div className="error-message">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.jeniskelamin.message}
                                  </div>
                                )}
                              </div>

                              <div className="form-group">
                                <label htmlFor="umur" className="form-label">
                                  <i className="fas fa-birthday-cake"></i>
                                  Umur
                                </label>
                                <div className="input-wrapper">
                                  <div className="input-icon">
                                    <i className="fas fa-birthday-cake"></i>
                                  </div>
                                  <input
                                    type="number"
                                    className={`form-input ${errors.umur ? "error" : ""}`}
                                    {...register("umur", {
                                      required: "Umur tidak boleh kosong",
                                    })}
                                    placeholder="Masukkan umur Anda"
                                    id="umur"
                                    min="1"
                                    max="120"
                                  />
                                  <span className="input-suffix">tahun</span>
                                </div>
                                {errors.umur && (
                                  <div className="error-message">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.umur.message}
                                  </div>
                                )}
                              </div>

                              <div className="form-row-inline">
                                <div className="form-group">
                                  <label htmlFor="berat" className="form-label">
                                    <i className="fas fa-weight"></i>
                                    Berat Badan
                                  </label>
                                  <div className="input-wrapper">
                                    <div className="input-icon">
                                      <i className="fas fa-weight"></i>
                                    </div>
                                    <input
                                      type="number"
                                      className={`form-input ${errors.berat ? "error" : ""}`}
                                      {...register("berat", {
                                        required: "Berat tidak boleh kosong",
                                      })}
                                      placeholder="Berat"
                                      id="berat"
                                      min="1"
                                      max="300"
                                    />
                                    <span className="input-suffix">kg</span>
                                  </div>
                                  {errors.berat && (
                                    <div className="error-message">
                                      <i className="fas fa-exclamation-circle"></i>
                                      {errors.berat.message}
                                    </div>
                                  )}
                                </div>

                                <div className="form-group">
                                  <label htmlFor="tinggi" className="form-label">
                                    <i className="fas fa-ruler-vertical"></i>
                                    Tinggi Badan
                                  </label>
                                  <div className="input-wrapper">
                                    <div className="input-icon">
                                      <i className="fas fa-ruler-vertical"></i>
                                    </div>
                                    <input
                                      type="number"
                                      className={`form-input ${errors.tinggi ? "error" : ""}`}
                                      {...register("tinggi", {
                                        required: "Tinggi badan tidak boleh kosong",
                                      })}
                                      placeholder="Tinggi"
                                      id="tinggi"
                                      min="50"
                                      max="250"
                                    />
                                    <span className="input-suffix">cm</span>
                                  </div>
                                  {errors.tinggi && (
                                    <div className="error-message">
                                      <i className="fas fa-exclamation-circle"></i>
                                      {errors.tinggi.message}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="form-group">
                                <label htmlFor="aktivitasFisik" className="form-label">
                                  <i className="fas fa-running"></i>
                                  Aktivitas Fisik
                                </label>
                                <div className="input-wrapper">
                                  <div className="input-icon">
                                    <i className="fas fa-running"></i>
                                  </div>
                                  <select
                                    className={`form-input ${errors.aktivitasFisik ? "error" : ""}`}
                                    {...register("aktivitasFisik", {
                                      required: "Aktivitas Fisik tidak boleh kosong",
                                    })}
                                    id="aktivitasFisik"
                                  >
                                    <option value="">Pilih Aktivitas Fisik</option>
                                    <option value="1.2">Jarang Berolahraga</option>
                                    <option value="1.3">Kadang-kadang Berolahraga</option>
                                    <option value="1.4">Sering Berolahraga</option>
                                  </select>
                                </div>
                                {errors.aktivitasFisik && (
                                  <div className="error-message">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.aktivitasFisik.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {!google_cookie && (
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
                          )}

                          <button
                            type="submit"
                            className={`signup-btn ${disabled ? "loading" : ""}`}
                            disabled={disabled}
                          >
                            {disabled ? (
                              <>
                                <div className="btn-spinner"></div>
                                <span>Memproses...</span>
                              </>
                            ) : (
                              <>
                                <i className="fas fa-user-plus"></i>
                                <span>Daftar Sekarang</span>
                              </>
                            )}
                          </button>
                        </form>

                        <div className="form-footer">
                          <p className="signin-text">
                            Sudah punya akun?{" "}
                            <Link to="/sign-in" className="signin-link">
                              Masuk di sini
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

        <style jsx>{`
          .signup-container {
            position: relative;
            min-height: 100vh;
            width: 100%;
            overflow: hidden;
          }

          .signup-background {
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

          .signup-content {
            position: relative;
            z-index: 2;
            min-height: 100vh;
            display: flex;
            align-items: center;
          }

          .signup-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 30px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            overflow: hidden;
            min-height: 600px;
            max-width: 800px;
            margin: 0 auto;
          }

          .signup-right {
            padding: 60px 50px;
            width: 100%;
          }

          .signup-form-container {
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

          .signup-form {
            margin-bottom: 30px;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }

          .form-column {
            display: flex;
            flex-direction: column;
            gap: 25px;
          }

          .form-row-inline {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          .form-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 12px;
            font-size: 1rem;
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
            left: 22px;
            color: #a0aec0;
            z-index: 2;
            font-size: 1.1rem;
          }

          .form-input {
            width: 100%;
            padding: 22px 20px 22px 55px;
            border: 2px solid #e2e8f0;
            border-radius: 15px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            background: #f8fafc;
            min-height: 60px;
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

          .input-suffix {
            position: absolute;
            right: 22px;
            color: #a0aec0;
            font-size: 1rem;
            font-weight: 600;
            z-index: 2;
          }

          .password-toggle {
            position: absolute;
            right: 22px;
            background: none;
            border: none;
            color: #a0aec0;
            cursor: pointer;
            padding: 8px;
            transition: color 0.3s ease;
            font-size: 1.1rem;
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

          .signup-btn {
            width: 100%;
            padding: 22px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            position: relative;
            overflow: hidden;
            min-height: 65px;
          }

          .signup-btn:not(.loading):hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
          }

          .signup-btn.loading {
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

          .signin-text {
            color: #718096;
            margin: 0;
            font-size: 0.95rem;
          }

          .signin-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .signin-link:hover {
            color: #764ba2;
            text-decoration: underline;
          }

          @media (max-width: 991px) {
            .signup-right {
              padding: 40px 30px;
            }

            .signup-card {
              border-radius: 20px;
              max-width: 100%;
            }

            .form-title {
              font-size: 1.8rem;
            }

            .form-row {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .form-row-inline {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }

          @media (max-width: 576px) {
            .signup-right {
              padding: 30px 20px;
            }

            .form-title {
              font-size: 1.6rem;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}
