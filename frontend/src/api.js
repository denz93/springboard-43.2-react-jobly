import axios from "axios";
const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:3001";
/**
 * @typedef {Object} Company
 * @property {string} handle
 * @property {string} name
 * @property {string} description
 * @property {number} numEmployees
 * @property {string} logoUrl
 * 
 * @typedef {Object} Job 
 * @property {string} id
 * @property {string} title
 * @property {number} salary
 * @property {number} equity
 * 
 */
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export default class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token.replaceAll(/"/g, '')}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /**
   * Get details on a company by handle.
   * 
   * @param {string} handle 
   * @returns {Promise<Company>}
   */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  /**
   * 
   * @param {string} byName 
   * @returns {Promise<Company[]>}
   */
  static async getCompanies(byName='') {
    const url = byName && byName.length > 0 ? `companies?name=${byName}` : 'companies';
    let res = await this.request(url);
    return res.companies;
  }

  /**
   * 
   * @param {string} byTitle 
   * @returns {Promise<Job[]>}
   */
  static async getJobs(byTitle='') {
    const url = byTitle.length > 0 ? `jobs?title=${byTitle}` : 'jobs';
    let res = await this.request(url);
    return res.jobs;
  }

   /**
    * Create a new user account.
    *
    * This function sends a POST request to the 'auth/signup' endpoint with the user's
    * data and returns a promise that resolves with a token upon successful account creation.
    *
    * @param {Object} data The user data to be sent for account creation.
    * @returns {Promise<string>} A promise that resolves with the signup token.
    */
  static async signup(data) {
    let res = await this.request('auth/register', data, 'POST');
    return res.token;
  }

  static async signin(data) {
    let res = await this.request('auth/token', data, 'POST');
    return res.token;
  }

  /**
   * @typedef {Object} User 
   * @property {string} username
   * @property {string} email
   * @property {string} firstName
   * @property {string} lastName
   * @property {boolean} isAdmin
   * @property {number[]} applications
   * 
   * @param {string} username 
   * @returns {Promise<User>}
   */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, 'PATCH');
    return res.user;
  }

  static async applyJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'POST');
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = localStorage.getItem('token') || '';
