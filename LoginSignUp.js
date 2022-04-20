import React, { Fragment, useEffect, useRef, useState } from "react"
import "./LoginSignUp.css"
import Loader from "../layout/Loader/loader"
import { Link, useLocation } from "react-router-dom"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, login, register } from "../../actions/userAction"
import { useAlert } from "react-alert"
import { toast } from "react-toastify"
import { useHistory } from "react-router-dom"
import profile from "../../images/Profile.png"
const LoginSignUp = () => {
	// const alert = useAlert()
	let history = useHistory()
	let location = useLocation()
	const { error, loading, isAuthenticated } = useSelector(state => state.user)
	const dispatch = useDispatch()
	const loginTab = useRef(null)
	const registerTab = useRef(null)
	const switcherTab = useRef(null)
	const [loginEmail, setLoginEmail] = useState("")
	const [loginPassword, setLoginPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	})
	// const loading = useSelector((state)=> state.user)
	const { name, email, password } = user
	const [avatar, setAvatar] = useState(null)
	const [avatarPreview, setAvatarPreview] = useState(null)
	const loginSubmit = e => {
		e.preventDefault()
		dispatch(login(loginEmail, loginPassword))
	}
	const togglePassword = () => {
		setShowPassword(!showPassword)
	}
	const registerSubmit = e => {
		e.preventDefault()
		const myForm = new FormData()
		myForm.set("name", name)
		myForm.set("email", email)
		myForm.set("password", password)
		myForm.set("avatar", avatar)
		dispatch(register(myForm))
		console.log("sign up form submitted")
	}
	const registerDataChange = e => {
		if (e.target.name === "avatar" || e.target.name === "avtar") {
			const reader = new FileReader()
			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result)
					setAvatar(reader.result)
					console.log(reader.result)
				}
			}
			reader.readAsDataURL(e.target.files[0])
		} else {
			setUser({ ...user, [e.target.name]: e.target.value })
		}
	}
	const redirect = location.search ? location.search.split("=")[1] : "/account"

	useEffect(() => {
		if (error) {
			console.log(error)
			toast.error(error)
			dispatch(clearErrors())
		}
		if (isAuthenticated) {
			history.push(redirect)
		}
	}, [dispatch, error, history, redirect, isAuthenticated])

	const switchTabs = (e, tab) => {
		if (tab === "login") {
			switcherTab.current.classList.add("shiftToNeutral")
			switcherTab.current.classList.remove("shiftToRight")
			registerTab.current.classList.remove("shiftToNeutralForm")
			loginTab.current.classList.remove("shiftToLeft")
		}
		if (tab === "register") {
			switcherTab.current.classList.add("shiftToRight")
			switcherTab.current.classList.remove("shiftToNeutral")
			registerTab.current.classList.add("shiftToNeutralForm")
			loginTab.current.classList.add("shiftToLeft")
		}
	}
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="LoginSignUpContainer">
						<div className="LoginSignUpBox">
							<div>
								<div className="login_signUp_toggle">
									<p onClick={e => switchTabs(e, "login")}>LOGIN</p>
									<p onClick={e => switchTabs(e, "register")}>REGISTER</p>
								</div>
								<button ref={switcherTab}></button>
							</div>
							<form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
								<div className="loginEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="email"
										required
										value={loginEmail}
										onChange={e => setLoginEmail(e.target.value)}
									/>
								</div>
								<div className="loginPassword">
									<LockOpenIcon />
									<input
										type={showPassword ? "text" : "password"}
										placeholder="Password"
										required
										value={loginPassword}
										onChange={e => setLoginPassword(e.target.value)}
									/>
									<button onClick={togglePassword} type="button">
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</button>
								</div>
								<Link to="/password/forgot">Forgot Password</Link>
								<input type="submit" value="Login" className="loginBtn" />
							</form>
							<form
								className="signUpForm"
								ref={registerTab}
								encType="multipart/form-data"
								onSubmit={registerSubmit}>
								<div className="signUpName">
									<FaceIcon />
									<input
										type="text"
										placeholder="Name"
										required
										name="name"
										value={name}
										onChange={registerDataChange}
									/>
								</div>
								<div className="signUpEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={registerDataChange}
									/>
								</div>
								<div className="signUpPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="password"
										required
										name="password"
										value={password}
										onChange={registerDataChange}
									/>
								</div>
								<div id="registerImage">
									<img src={avatarPreview || profile} alt="AvatarPreview" />
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={registerDataChange}
									/>
								</div>
								<input
									type="submit"
									value="Register"
									className="signUpBtn"
									// disabled={loading ? true : false}
								/>
							</form>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

export default LoginSignUp
