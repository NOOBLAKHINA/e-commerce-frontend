import React, { Fragment, useState } from "react"
import "./header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import DashBoardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../../actions/userAction"
import BackDrop from "@material-ui/core/Backdrop"
const UserOptions = ({ user }) => {
	console.log(user);
	const { cartItems } = useSelector(state => state.cart)
	const [open, setOpen] = useState(false)
	let history = useHistory()
	const dispatch = useDispatch()

	const options = [
		{ icon: <ListAltIcon />, name: "Orders", func: orders },
		{ icon: <PersonIcon />, name: "Profile", func: account },
		{
			icon: (
				<ShoppingCartIcon
					style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
				/>
			),
			name: `Cart(${cartItems.length})`,
			func: cart,
		},
		{ icon: <ExitToAppIcon />, name: "LogOut", func: logoutUser },
	]
	if (user.role === "admin") {
		options.unshift({
			icon: <DashBoardIcon />,
			name: "dashboard",
			func: dashboard,
		})
	}
	function dashboard() {
		history.push("/admin/dashboard")
	}
	function orders() {
		history.push("/orders")
	}
	function account() {
		history.push("/account")
	}
	function cart() {
		history.push("/cart")
	}
	function logoutUser() {
		dispatch(logOut())
		toast.success("Logout successfull")
	}
	return (
		<Fragment>
			<BackDrop open={open} style={{ zIndex: "11" }} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				style={{ zIndex: "11" }}
				open={open}
				direction="down"
				className="speedDial"
				icon={
					<img
						className="speedDialIcon"
						src={
							user.avatar.url || user.avtar.url
								? user.avatar.url || user.avtar.url
								: "/Profile.png"
						}
						alt="Profile"
					/>
					// avatar .url not being shown need to correct it(user is undefined)
				}>
				{options.map(item => (
					<SpeedDialAction
						key={item.name}
						icon={item.icon}
						tooltipTitle={item.name}
						onClick={item.func}
						tooltipOpen={window.innerWidth <= 600 ? true : false}
					/>
				))}
			</SpeedDial>
		</Fragment>
	)
}

export default UserOptions
