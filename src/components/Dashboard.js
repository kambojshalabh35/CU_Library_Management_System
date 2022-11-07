import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import { Link } from "react-router-dom";
import spinner from "../images/loadingSpinner.gif";
import { AuthContext } from "../context/Auth";

const Dashboard = (props) => {
	const { user } = useContext(AuthContext);
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTitle, setSearchTitle] = useState("");

	useEffect(() => {
		if (!user) {
			props.history.push("/");
		}
		setIsLoading(true);
		const unsubscribe = firebase
			.firestore()
			.collection("books")
			.onSnapshot(
				(snapshot) => {
					const allBooks = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					setBooks(allBooks);
					setIsLoading(false);
				},
				function (error) {
					console.log("error");
				}
			);
		return () => unsubscribe();
	}, [user, props.history]);
	return isLoading ? (
		<div className="spinner">
			<img src={spinner} alt="loading-spinner" />
		</div>
	) : (
		<div className="row">
			<div className="col s12 m3 left-panel" style={{height:"70vh"}}>
				<h4>Manage Books</h4>
				<Link
					to="/add/book"
					className="waves-effect waves-light btn red darken-3 hoverable"
					style={{ margin: "10px 0px" }}
				>
					ADD BOOK <i className="material-icons right">add</i>
				</Link>

				<div className="input-field">
					<input
						id="title"
						type="text"
						className="validate"
						value={searchTitle}
						onChange={(e) => setSearchTitle(e.target.value)}
					/>
					<label htmlFor="title">Search Book</label>
				</div>
			</div>
			<div className="col s12 m9 right-panel" style={{padding:"30px"}}>
				{books.length > 0 ? (
					<div className="row" style={{ padding: "16px" }}>
						{books
							.filter((book) =>
								book.title.toLowerCase().includes(searchTitle.toLowerCase())
							)
							.map((book) => (
								<div className="col s12 m4" key={book.id}>
									<div className="card grey lighten-5 z-depth-1 hoverable">
										<div className="card-image">
											<img
												src={book.imageURL}
												style={{ height: "250px" }}
												alt={book.author}
											/>
										</div>

										<div className="card-action center">
											<Link
												to={`/book/${book.id}`}
												className="btn green accent-4 hoverable"
											>
												View Details{" "}
												<i className="material-icons right">arrow_forward</i>
											</Link>
										</div>
									</div>
								</div>
							))}
					</div>
				) : (
					<h3>No books available</h3>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
