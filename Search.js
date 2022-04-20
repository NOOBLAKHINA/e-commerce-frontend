import React, { Fragment, useState } from "react"
import products from "./Products"
import MetaData from "../layout/metadata"
import "./Search.css"
import { useHistory } from "react-router-dom"
const Search = () => {
	const [keyword, setKeyword] = useState("")
  let history = useHistory()
  // history(/products)
  const searchSubmitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			history.push(`/products/${keyword}`)
		} else {
			history.push("/products")
		}
	}
	return (
		<Fragment>
			<MetaData title="Search A Product -- Ecommerce" />
			<form className="searchBox" onSubmit={searchSubmitHandler}>
				<input
					type="text"
					placeholder="Search a Product ..."
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<input type="submit" value="Search"></input>
			</form>
		</Fragment>
	)
}

export default Search
