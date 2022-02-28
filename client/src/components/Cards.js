import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/* React-redux */
import { getAll  } from "../redux/actions";
import DogCard from "./DogCard";
import OnSearch from "./OnSearch";
import Pagination from "./Pagination";

const Cards = () => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState(1); //We set the page the user want to see
    const [postsPerPage] = useState(8); // The amount of pages the user see. Not change

    useEffect(()=>{
        dispatch(getAll())
    },[dispatch])

    const pages = useSelector(state => state.dogs) // like setPosts

    const idxLast = current * postsPerPage;
    const idxFirst = idxLast - postsPerPage;
    const page = pages.slice(idxFirst, idxLast);

    return (
        <div>
        <OnSearch/>
        <DogCard dogs={page} />
        <Pagination paginate={setCurrent} postsPerPage={postsPerPage} totalPosts={pages.length}/>
        </div>
    )
}

export default Cards;