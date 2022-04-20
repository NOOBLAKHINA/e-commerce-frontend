import React, {Fragment,useEffect} from 'react'
import { CgMouse } from 'react-icons/all'
import Product from './productCard.js' 
import './Home.css'
import Metadata from '../layout/metadata.js'
import { clearErrors, getProductDetails,newReview } from '../../actions/productAction.js'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layout/Loader/loader'
import {toast} from  'react-toastify'
import ProductCard from './productCard.js'
// import {useAlert} from 'react-alert'
const Home = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      //  alert.error(error);
      toast.error(error)
      dispatch(clearErrors());
    }
    dispatch(getProductDetails());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (<Loader/>) : (
        <Fragment>
        <Metadata title='Ecommerce'/>
        <div className='banner'>
          <p>Welcome to Ecommerce</p>
          <h1>find amazing products below</h1>
          <a href='#container'>
            <button>
                Scroll <CgMouse/>
            </button>
          </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className='container' id='container'>
              {
                products && products.map((product) => {
                  return <ProductCard key={product._id} product ={product}/>
                })
          }
      </div>
      </Fragment>
      )}
</Fragment>
  )
}

export default Home
