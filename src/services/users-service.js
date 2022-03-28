/**
 * @file Implements the service layer that helps fetch users remote API
 */
import axios from "axios";
// const BASE_URL = "https://cs5500-node-a3.herokuapp.com/api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

/**
 * POST method to create a new user
 * @param user A new user object with all required attributes
 * @returns {Promise<AxiosResponse<any>>} JSON contains the new User that was
 * inserted into the database or error status
 */
export const createUser = (user) =>
    axios.post(USERS_API, user)
        .then(response => response.data);

/**
 * GET method for getting all users
 * @returns {Promise<AxiosResponse<any>>} JSON array cotains all users
 */
export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

/**
 * GET method for getting a particular user
 * @param uid User's primary key
 * @returns {Promise<AxiosResponse<any>>} JSON object contains the user that matches the user id
 */
export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

/**
 * DELETE method for deleting a particular user
 * @param uid User's primary key
 * @returns {Promise<AxiosResponse<any>>} status on whether user is removed
 */
export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

/**
 * DELETE method for deleting a particular user by their name (For testing)
 * @param username User's username
 * @returns {Promise<AxiosResponse<any>>} status on whether user is removed
 */
export const deleteUsersByUsername = (username) =>
  axios.get(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

/**
 * POST method for retrieving a user by credentials
 * @param credentials User's credentials
 * @returns {Promise<AxiosResponse<any>>} JSON object contains the user or the error status
 */
export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;