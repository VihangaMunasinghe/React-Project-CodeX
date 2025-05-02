import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext.jsx";
import { CurrencyContext } from "../contexts/CurrencyContext.jsx";
import { Link } from "react-router";
import Logo from "../assets/img/logo.svg";
import { BsBag } from "react-icons/bs";

const Header = () => {
	// header state
	const [isActive, setIsActive] = useState(false);
	const { itemAmount } = useContext(CartContext);

	// currency state
	const { currency } = useContext(CurrencyContext);

	// event listener
	useEffect(() => {
		window.addEventListener("scroll", () => {
			window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
		});
	});

	return (
		<header
			className={`${
				isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
			} fixed w-full z-10 lg:px-8 transition-all`}
		>
			<div className="container mx-auto flex items-center justify-between h-full">
				<Link to={"/"}>
					<div className="flex items-center">
						<img src={Logo} alt="" className="w-[40px]" />
						<span className="ms-4">Urban Loom</span>
					</div>
				</Link>

				<div className="flex items-center gap-4">
					{/* currency select */}
					<select
						value={currency}
						onChange={() => {}}
						className="border border-slate-800 rounded-md px-3 py-2 focus:outline-none text-slate-800 text-sm"
						aria-label="Select currency"
					>
						<option value="USD">🇺🇸 USD</option>
						<option value="EUR">🇪🇺 EUR</option>
						<option value="GBP">🇬🇧 GBP</option>
					</select>

					{/* cart */}
					<div
						onClick={() => {}}
						className="cart-btn cursor-pointer flex relative"
						role="button"
						aria-label="cart"
					>
						<BsBag className="text-2xl" />
						<div className="bg-slate-800 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
							{itemAmount}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
