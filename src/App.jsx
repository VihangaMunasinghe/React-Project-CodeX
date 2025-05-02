import { BrowserRouter as Router, Route, Routes } from "react-router";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="overflow-hidden">
			<Header />
			<Routes>
				<Route path="/" element={<Home />}></Route>
			</Routes>
			<Sidebar />
			<Footer />
		</div>
	);
}

export default App;
