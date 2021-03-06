import React, { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import Loader from "../layout/Loader/loader"
import MetaData from "../layout/metadata"
import { Link, useHistory } from "react-router-dom"
import "./Profile.css"
const Profile = ({ history}) => {
	const { user, loading, isAuthenticated } = useSelector(state => state.user)
	console.log(user)
	console.log(loading)
	console.log(isAuthenticated)
	useEffect(() => {
		if (isAuthenticated === false) {
			history.push("/login" )
		}
	}, [history, isAuthenticated])
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					{" "}
					<MetaData title={`${user.name}'s Profile`} />
					<div className="profileContainer">
						<div>
							<h1>My Profile</h1>
							<img src={user.avatar.url} alt={user.name} />
							<Link to="/me/update">Edit Profile</Link>
						</div>
						<div>
							<h4>Full Name</h4>
							<p>{user.name}</p>
						</div>
						<div>
							<h4>Email</h4>
							<p>{user.email}</p>
						</div>
						<div>
							<h4>joined on</h4>
							<p>{String(user.createdAt).substr(0,10)}</p>
						</div>
						<div>
							<Link to="/orders">My orders</Link>
							<Link to="/password/update">Change Password</Link>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

export default Profile
