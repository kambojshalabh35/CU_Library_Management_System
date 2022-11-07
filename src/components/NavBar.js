import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import firebase from "../firebaseConfig";

const NavBar = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className="navbar-fixed">
			<nav className="red darken-1">
				<div className="container nav-wrapper">
					<Link to="/books">
						<span className="brand-logo">CU Library Management System</span>
					</Link>
					{user !== null ? (
						<ul className="right">
							<li>
								<button
									className="btn white black-text waves-effect waves-red"
									onClick={() => firebase.auth().signOut()}
								>
									Logout
								</button>
							</li>
						</ul>
					) : null}
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
