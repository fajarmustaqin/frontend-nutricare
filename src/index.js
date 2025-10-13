import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Routers from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundary";
import { checkEnvVariables } from "./helpers/envCheck";

// Check environment variables on startup
console.log('🚀 Starting NutriCare Application...');
const envCheck = checkEnvVariables();

if (!envCheck.isValid) {
	console.error('⚠️ WARNING: Missing environment variables!');
	console.error('Create a .env file with: REACT_APP_API_URL=http://localhost:8080');
}

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<BrowserRouter>
				<Provider store={store}>
					<Routers />
				</Provider>
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById("root")
);
