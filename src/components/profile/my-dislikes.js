/**
 * @file Implements MyDislikes Component for displaying all tuits that user disliked
 */
import Tuits from "../tuits";
import * as service from "../../services/dislikes-service"
import {useEffect, useState} from "react";

/**
 * Implements MyDislikes Component for displaying all tuits that user disliked
 * This page will require user to be logged in
 * @returns {JSX.Element}
 */
const MyDislikes = () => {
    /**
     *  to maintain all dislikedTuits state
     */
    const [dislikedTuits, setDislikedTuits] = useState([]);
    /**
     * Calling dislikes service for retrieving all tuit disliked by "me"
     */
    const findTuitsIDislike = () => {
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => {
                setDislikedTuits(tuits);
            })
    }

    useEffect(() => {
        findTuitsIDislike()
    }, [])

    return (
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    )
}

export default MyDislikes