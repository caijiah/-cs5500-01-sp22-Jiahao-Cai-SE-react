/**
 * @file Implements the service layer that deal with authentication from remote API
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AUTH_API = `${BASE_URL}/api/auth`

const api = axios.create({
    withCredentials: true
});

/**
 * POST method for logging the user
 * @param credentials User's credentials (username, password) for login
 * @returns {Promise<AxiosResponse<any>>} JSON contains User's profile or error status
 */
export const login = (credentials) =>
    api.post(`${AUTH_API}/login`, credentials)
        .then(response => response.data)

/**
 * POST method for register a new user
 * @param user a new User with all required attributes
 * @returns {Promise<AxiosResponse<any>>} JSON contains User's profile or error status
 */
export const signup = (user) =>
    api.post(`${AUTH_API}/signup`, user)
        .then(response => response.data)

/**
 * POST method for retrieving user's profile stored in server session
 * @returns {Promise<AxiosResponse<any>>} JSON contains User's profile or error status
 */
export const profile = () =>
    api.post(`${AUTH_API}/profile`)
        .then(response => response.data)

/**
 * POST method for logout
 * @returns {Promise<AxiosResponse<any>>} Status
 */
export const logout = () =>
    api.post(`${AUTH_API}/logout`)
        .then(response => response.data)