/**
 * @file Implements the service layer that helps fetch dislikes remote API
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

/**
 * PUT method for toggling dislikes (dislikes/ undo the dislikes) to a tuit
 * @param uid User's primary key
 * @param tid Tuit's primary key
 * @returns {Promise<AxiosResponse<any>>} Status on whether tuit is disliked or undoing the dislikes
 * successfully or not
 */
export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data)

/**
 * GET method for retrieving all tuits disliked by a particular user
 * @param uid User's Primary key
 * @returns {Promise<AxiosResponse<any>>} JSON array contains all tuits disliked by this user
 */
export const findAllTuitsDislikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data)