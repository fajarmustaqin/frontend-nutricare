import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import "../style/profile.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../helpers";
import Layout from "../layouting/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getUSER } from "../redux/actions/action.User";

export default function EditProfile() {
	const [alert, setAlert] = useState(false);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.UserReducer);
	const { User } = profile;

	useEffect(() => {
		const timeId = setTimeout(() => {
			// After 3 seconds set the show value to false
			setAlert(false);
		}, 5000);

		return () => {
			clearTimeout(timeId);
		};
	}, [alert]);

	const token = getCookie("token");
	const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();

	// Fetch user data on component mount
	useEffect(() => {
		dispatch(getUSER()).then(() => {
			setLoading(false);
		});
	}, [dispatch]);

	// Set default values when User data is loaded
	useEffect(() => {
		if (User && !loading) {
			console.log("User data loaded:", User);
			console.log("Aktivitas Fisik data:", User.aktivitasFisik);
			setValue("nama_lengkap", User.nama || "");
			setValue("umur", User.umur || "");
			setValue("jeniskelamin", User.jeniskelamin || "");
			setValue("berat", User.berat || "");
			setValue("tinggi", User.tinggi || "");
			setValue("aktivitasFisik", User.aktivitasFisik || "");
		}
	}, [User, loading, setValue]);

	const { REACT_APP_API_URL } = process.env;
	let Navigate = useNavigate();

	const onSubmit = async (entitas) => {
		console.log("Form submitted with data:", entitas);
		try {
			let { nama_lengkap, umur, jeniskelamin, berat, tinggi, aktivitasFisik } =
				entitas;

			const body = {
				nama: nama_lengkap,
				umur: umur,
				jeniskelamin: jeniskelamin,
				berat: berat,
				tinggi: tinggi,
				aktivitasFisik: aktivitasFisik,
			};

			console.log("Sending data to backend:", body);
			console.log("API URL:", REACT_APP_API_URL);
			console.log("Token:", token ? "Present" : "Missing");
			
			const auth = { headers: { Authorization: `Bearer ${token}` } };
			const { data } = await axios.patch(
				`${REACT_APP_API_URL}/editprofile`,
				body,
				auth
			);
			
			console.log("Backend response:", data);
			
			if (data.message === "success") {
				// Refresh user data after successful update
				dispatch(getUSER());
				Navigate("/profile");
			} else {
				setAlert(true);
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			console.error("Error response:", error.response?.data);
			setAlert(true);
		}
	};

	const onError = (errors) => {
		console.log("Form validation errors:", errors);
	};
	if (loading) {
		return (
			<Layout>
				<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
					<div className="text-center">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
						<p className="mt-3 text-muted">Memuat data profile...</p>
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="container d-block">
				<div className="container">
					<Link
						className="text-decoration-none text-black py-3 d-flex"
						to="/profile"
					>
						<i className="fas fa-chevron-left text-decoration-none my-auto me-2"></i>
						<h5 className="text-decoration-none my-auto fw-bold">
							{" "}
							Edit Profile
						</h5>
					</Link>
				</div>
				{/* Alert */}
				<div
					className={`alert alert-danger align-items-center mt-4 ${
						alert ? "show" : "d-none"
					}`}
					role="alert"
				>
					<div>Profil gagal diubah, silahkan cek kembali !</div>
				</div>

				{/* Form Validation Errors */}
				{Object.keys(errors).length > 0 && (
					<div className="alert alert-warning mt-4" role="alert">
						<h6>Form validation errors:</h6>
						<ul className="mb-0">
							{Object.entries(errors).map(([field, error]) => (
								<li key={field}>{field}: {error.message}</li>
							))}
						</ul>
					</div>
				)}
				<img
					src="https://www.pinclipart.com/picdir/big/220-2207735_avatars-clipart-generic-user-woman-people-icon-png.png"
					className="rounded mx-auto d-block mx-5 my-5"
					height="100px"
					alt="women"
				></img>
				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<div className="mb-3">
						<label htmlFor="nama_lengkap" className="form-label">
							Nama
						</label>
						<input
							type="text"
							className="form-control"
							id="nama_lengkap"
							placeholder="Nama Anda"
							defaultValue={User?.nama || ""}
							{...register("nama_lengkap", {
								required: "Nama lengkap tidak boleh kosong",
							})}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="umur" className="form-label">
							Umur
						</label>
						<input
							type="number"
							className="form-control"
							id="umur"
							placeholder="dalam tahun"
							defaultValue={User?.umur || ""}
							{...register("umur", {
								required: "Umur tidak boleh kosong",
							})}
						/>
						<div className="mb-3 mt-3">
							<label htmlFor="jeniskelamin">Jenis Kelamin</label>
							<select
								className="form-control "
								id="jeniskelamin"
								placeholder="Jenis Kelamin"
								defaultValue={User?.jeniskelamin || ""}
								{...register("jeniskelamin", {
									required: "Jenis Kelamin tidak boleh kosong",
								})}
							>
								<option value="">Pilih Jenis Kelamin</option>
								<option value={"laki-laki"}>Laki-Laki</option>
								<option value={"perempuan"}>Perempuan</option>
							</select>
						</div>

						<div className="mb-3 mt-3">
							<label htmlFor="berat" className="form-label">
								Berat Badan (kg)
							</label>
							<input
								type="number"
								className="form-control"
								id="berat"
								placeholder="masukan angka saja"
								defaultValue={User?.berat || ""}
								{...register("berat", {
									required: "Berat badan tidak boleh kosong",
								})}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="tinggi" className="form-label">
								Tinggi Badan (cm)
							</label>
							<input
								type="number"
								className="form-control"
								id="tinggi"
								placeholder="masukan angka saja"
								defaultValue={User?.tinggi || ""}
								{...register("tinggi", {
									required: "Tinggi badan tidak boleh kosong",
								})}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="aktivitasFisik" className="form-label">
								Aktivitas Fisik
							</label>
							<select
								className="form-control "
								id="aktivitasFisik"
								value={watch("aktivitasFisik") || User?.aktivitasFisik || ""}
								onChange={(e) => {
									console.log("Aktivitas Fisik changed to:", e.target.value);
									setValue("aktivitasFisik", e.target.value);
								}}
								{...register("aktivitasFisik", {
									required: "Aktivitas Fisik tidak boleh kosong",
								})}
								aria-label="Default select example"
							>
								<option value="">Pilih Aktivitas</option>
								<option value="1.2">Jarang Berolahraga</option>
								<option value="1.3">Kadang-kadang Berolahraga</option>
								<option value="1.4">Sering Berolahraga</option>
							</select>
						</div>
					</div>
					<div className="text-end">
						<Button type="submit" btnclass="btn btn-primary mt-4 mb-5">
							Simpan
						</Button>
					</div>
				</form>
			</div>
		</Layout>
	);
}
