import { Rating } from '@material-ui/lab'
import React from 'react'
// import ReactStars from 'react-rating-stars-component'
import profilePng from '../../images/Profile.png'
const ReviewCard = ({review}) => {
  
  const options = {
    value: review.ratings,
    readOnly: true,
    precision:0.5
  }
return (
    <div className='reviewCard'>
    <img src={profilePng} alt="user" />
    <p>{review.name}</p>
    <Rating {...options} />
    <span className='reviewCardCommment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
