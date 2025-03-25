import React from 'react'

import category1 from "../../assets/front_pic8.png"
import category2 from "../../assets/front_pic1.jpg"
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = [
        {name: 'Tapes', path: 'tapes', image: category1},
        {name: 'Ropes', path: 'ropes', image: category2},
    ]
  return (
    <>
    <div className='product__grid'>
        {
            categories.map((category) => (
                <Link key={category.name} to={`/categories/${category.path}`} className='categories__card'>
                    <img src={category.image} alt={category.name} />
                    <h4>{category.name}</h4>
                </Link>
            ))
        }
    </div>
    </>
  )
}

export default Categories