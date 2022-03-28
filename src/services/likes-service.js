/**
 * @file Implements the service layer that helps fetch likes remote API
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

/**
 * PUT method for toggling likes (likes / undo the likes) to a tuit
 * @param uid User's primary key
 * @param tid Tuit's primary key
 * @returns {Promise<AxiosResponse<any>>} Status on whether tuit is liked or undoing the like
 * successfully or not
 */
export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const findAllTuitsLikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/likes`)
        .then(response => response.data)