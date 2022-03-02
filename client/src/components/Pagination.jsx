import React from "react";
import Styles from '../styles/Pagination.module.css';

function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className={Styles.paginationBttns}>
                <li key='firstpage' onClick={()=> paginate(1)}><p>{`<<`}</p></li>
                {pageNumbers.map(number => {
                    return <li key={number}>
                        <p onClick={()=> paginate(number)}>
                            {number}
                        </p>
                    </li>
                })}
                <li key='firstpage' onClick={()=> paginate(pageNumbers.length)}><p>{`>>`}</p></li>
            </ul>
        </nav>
    );
}


export default Pagination;