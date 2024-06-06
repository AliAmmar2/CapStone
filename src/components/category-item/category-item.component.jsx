import React from "react";
import './category-item.styles.scss'
import { useNavigate } from "react-router-dom";

const CategoryItem = ({category}) =>{

    const {imageUrl,title, route} = category;
    const navigation = useNavigate();
    const navigateHandler = () => navigation(route);

    return(
        <div className="category-container" onClick={navigateHandler}>
            <div className="background-image" style={{
                backgroundImage : `url(${imageUrl})`
            }}/>
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
    
}

export default CategoryItem;