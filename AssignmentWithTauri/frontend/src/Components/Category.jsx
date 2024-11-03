import React, { useEffect, useState } from 'react'
import "./Css/Category.css"
import { Link } from 'react-router-dom'
import { GetAllProducts } from '../Api/catergoryApi'
export default function Category() {
    const [data, setData] = useState([])
    useEffect(() =>{
        const getCategory = async () =>{
            const response = await GetAllProducts()
            if(response){
                setData(await response.data)
            }
        }
        getCategory()
    },[])
  return (
    <div>
    <h1>Inventory:</h1>
    <div className="category-list">
      {data?.map((category) => (
        <div className="card" key={category._id}>
          <div className="card-header">
            <button
              className="cat-button"
              type="button"
            >
              {category.categoryName}
            </button>
          </div>
          <div className="card-body">
            <p>Description: {category.description}</p>
            <p>Created At: {new Date(category.createdAt).toLocaleDateString()}</p>
            <p>Last Updated: {new Date(category.updatedAt).toLocaleDateString()}</p>
            <div className="button-container">
              <a className="button-update" href={`/category/${category._id}/update`}>
                Update
              </a>
              <button
                className="button-delete"
                
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Link className="button-add" to="/category/insert">
      Add Category
    </Link>
  </div>
  )
}
