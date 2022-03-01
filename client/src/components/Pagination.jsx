import React from "react";


function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul>
                {pageNumbers.map(number => {
                    return <li key={number}>
                        <p onClick={()=> paginate(number)}>
                            {number}
                        </p>
                    </li>;
                })}
            </ul>
        </nav>
    );
}


export default Pagination;