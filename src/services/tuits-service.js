/**
 * @file Implements the service layer that helps fetch tuits remote API
 */
import axios from "axios";
// const BASE_URL = "https://cs5500-node-a3.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

/**
 * Uses GET to retrieve all tuits from remote sever
 * @returns {Promise<AxiosResponse<any>>} Body formatted as JSON array containing all the tuits
 */
export const findAllTuits = () =>
    api.get(TUITS_API)
        .then(response => response.data);

/**
 * Uses GET to retrieve a tuit by its primary key
 * @param tid Tuit's primary key
 * @returns {Promise<AxiosResponse<any>>} Body formatted as JSON containing the tuit
 */
export const findTuitById = (tid) =>
    api.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

/**
 * Uses GET to retrieve tuits posted by a particular user
 * @param uid User's primary key
 * @returns {Promise<AxiosResponse<any>>} Body formatted as JSON array containing all the tuits
 * that posted by this user
 */
export const findTuitByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

/**
 * Uses POST to create a tuit for a particular user
 * @param uid User's primary key
 * @param tuit Tuit's primary key
 * @returns {Promise<AxiosResponse<any>>} Body formatted as JSON the tuit with
 * all updated attributes inserted in the database
 */
export const createTuitByUser = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

/**
 * Uses POST to update a tuit
 * @param tid Tuit's primary key
 * @param tuit A tuit object with all updated attributes
 * @returns {Promise<AxiosResponse<any>>} Body formatted as JSON the tuit inserted in the database
 */
export const updateTuit = (tid, tuit) =>
    api.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

/**
 * Uses DELETE to remove a tuit from the database
 * @param tid Tuit's Primary key
 * @returns {Promise<AxiosResponse<any>>} Status on whether tuit is removed successfully or not
 */
export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

/**
 * Uses DELETE to remove a tuit by its content (For testing purpose)
 * @param content tuit's content
 * @returns {Promise<AxiosResponse<any>>} Status on whether tuit is removed successfully or not
 */
export const deleteTuitByContent = (content) =>
    api.delete(`${TUITS_API}/byContent/${content}`)
        .then(response => response.data)
