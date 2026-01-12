import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

const DetailsPage = (props) => {
    const {productId} = useParams();

    console.log(window.location.pathname.split('/'), productId);
    const products = useSelector(store => store.productReducer.products[window.location.pathname.split('/')[2]]);

    console.log(products);
    

    useEffect(() => {
        
    }, [])
    
    return (
        <div>
            This is the Details Page
        </div>
    );
};

export default DetailsPage;