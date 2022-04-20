import React, { Fragment, useState, useEffect } from "react"
import "./ResetPassword.css"
import Loader from "../layout/Loader/loader"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, resetPassword } from "../../actions/userAction"
import { toast } from "react-toastify"
import MetaData from "../layout/metadata"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

const ResetPassword = ({ history,match }) => {
	const dispatch = useDispatch()

	const { error, success, loading } = useSelector(state => state.forgotPassword)

	const [showPasswords,setShowPasswords] = useState(false)
  

	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const resetPasswordSubmit = e => {
		e.preventDefault()

		const myForm = new FormData()

		myForm.set("password", password)
		myForm.set("confirmPassword", confirmPassword)

		dispatch(resetPassword(match.params.token,myForm))
	}
	const togglePassword = () => {
		setShowPasswords(!showPasswords)
	}
	useEffect(() => {
		if (error) {
		// 	// problem
		  console.error({error})
			toast.error("Unable to reset your password")
			// toast.error(error) this line isn't working
			dispatch(clearErrors())
		}
		if (success) {
			toast.success("Password Updated Successfully")

			history.push("/login")

					
    }
	}, [dispatch, error, history,success ])

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Change Password" />
					<div className="resetPasswordContainer">
						<div className="resetPasswordBox">
							<h2 className="resetPasswordHeading">Reset Password</h2>

							<form
								className="resetPasswordForm"
								onSubmit={resetPasswordSubmit}>
								<div >
									<LockOpenIcon />
									<input
										type={showPasswords ? "text" : "password"}
										placeholder=" Password"
										required
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
									<button onClick={togglePassword} type="button">
										{showPasswords? <Visibility /> : <VisibilityOff />}
									</button>
								</div>

								<div className="loginPassword">
									<LockIcon />
									<input
										type={showPasswords ? "text" : "password"}
										placeholder="Confirm Password"
										required
										value={confirmPassword}
										onChange={e => setConfirmPassword(e.target.value)}
									/>
									<button onClick={togglePassword} type="button">
										{showPasswords ? <Visibility /> : <VisibilityOff />}
									</button>
								</div>
								
								<input
									type="submit"
									value="Update"
									className="resetPasswordBtn"
								/>
							</form>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

export default ResetPassword
