const axios = require('axios')
const qs = require('querystring');
import utils from "./Utils";

const win = global as any;
class HttpService {
    constructor() {
        win.requests = win.requests || [];
    }

    createJqReq(url, headers, type, data = undefined) {
        let objReq: any = {
            url,
            method: type,
            headers,
            data
        };
        if (headers["Content-Type"] === "application/json" && type !== "GET") {
            objReq.data = JSON.stringify(data)
            objReq.processData = false;
        }

        if (headers["Content-Type"] === "application/x-www-form-urlencoded" && type !== "GET") {
            objReq.data = qs.stringify(data)
        }

        return objReq;
    }

    handleError(ex) {
        if (ex.response && ex.response.data && ex.response.data.message) {
            throw new Error(ex.response.data.message)
        }
        else {
            throw new Error(ex.message)
        }
    }

    handleSuccess(data) {
        try {
            return data.data;
        }
        catch (ex) {
            return data
        }
    }

    async get(url, headers = {}) {
        try {
            let data = await axios(this.createJqReq(url, headers, "GET"));
            return this.handleSuccess(data);
        }
        catch (ex) {
            this.handleError(ex);
        }

    }

    async post(url, data, headers = {}) {
        headers = { "Content-Type": "application/json", ...headers }
        try {
            let responseData = await axios(this.createJqReq(url, headers, "POST", data));
            return this.handleSuccess(responseData);
        }
        catch (ex) {
            this.handleError(ex);
        }

    }

    async put(url, data, headers = {}) {
        headers = { "Content-Type": "application/json", ...headers }
        try {
            let responseData = await axios(this.createJqReq(url, headers, "PUT", data));
            return this.handleSuccess(responseData);
        }
        catch (ex) {
            this.handleError(ex);
        }

    }

    async delete(url, data, headers = {}) {
        headers = { "Content-Type": "application/json", ...headers }
        try {
            let responseData = await axios(this.createJqReq(url, headers, "DELETE", data));
            return this.handleSuccess(responseData);
        }
        catch (ex) {
            this.handleError(ex);
        }

    }

}

const http = new HttpService();
export default http;