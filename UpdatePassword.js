import React, { Fragment, useState, useEffect } from "react"
import "./UpdatePassword.css"
import Loader from "../layout/Loader/loader"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, updatePassword } from "../../actions/userAction"
import { toast } from "react-toastify"
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants"
import MetaData from "../layout/metadata"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

const UpdatePassword = ({ history }) => {
	const dispatch = useDispatch()

	const { error, isUpdated, loading } = useSelector(state => state.profile)

	const [showOldPassword, setShowOldPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const updatePasswordSubmit = e => {
		e.preventDefault()

		const myForm = new FormData()

		myForm.set("oldPassword", oldPassword)
		myForm.set("newPassword", newPassword)
		myForm.set("confirmPassword", confirmPassword)

		dispatch(updatePassword(myForm))
	}
	const togglePassword = () => {
		setShowOldPassword(!showOldPassword)
		setShowNewPassword(!showNewPassword)
		setShowConfirmPassword(!showConfirmPassword)
	}
	useEffect(() => {
		// if (error) {
		// 	// problem
		// 	toast.error(error)
		// 	dispatch(clearErrors())
		// }
		if (isUpdated) {
			toast.success("Profile Updated Successfully")

			history.push("/account")

			dispatch({
				type: UPDATE_PASSWORD_RESET,
			})
		}
	}, [dispatch, error, history, isUpdated])

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Change Password" />
					<div className="updatePasswordContainer">
						<div className="updatePasswordBox">
							<h2 className="updatePasswordHeading">Update Profile</h2>

							<form
								className="updatePasswordForm"
								onSubmit={updatePasswordSubmit}>
								<div className="loginPassword">
									<VpnKeyIcon />
									<input
										type={showOldPassword ? "text" : "password"}
										placeholder="Old Password"
										required
										value={oldPassword}
										onChange={e => setOldPassword(e.target.value)}
									/>
									<button onClick={togglePassword} type="button">
										{showOldPassword ? <Visibility /> : <VisibilityOff />}
									</button>
								</div>

								<div className="loginPassword">
									<LockOpenIcon />
									<input
										type={showNewPassword ? "text" : "password"}
										placeholder="New Password"
										required
										value={newPassword}
										onChange={e => setNewPassword(e.target.value)}
									/>
									<button onClick={togglePassword} type="button">
										{showNewPassword ? <Visibility /> : <VisibilityOff />}
									</button>
								</div>
								<div className="loginPassword">
									<LockIcon />
									<input
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirm Password"
										required
										value={confirmPassword}
										onChange={e => setConfirmPassword(e.target.value)}
									/>
									<button onClick={togglePassword} type="button">
										{showConfirmPassword ? <Visibility /> : <VisibilityOff />}
									</button>
								</div>
								<input
									type="submit"
									value="Change"
									className="updatePasswordBtn"
								/>
							</form>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

export default UpdatePassword
