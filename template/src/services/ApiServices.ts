import Config from "../config";
import http from "./HttpService";

const win = global as any;
class ApiServices {
  constructor() {}
  withWindowCache(
    apiFunction: any,
    key: string,
    expireDateOrExpireAfterInMinutes: any = null
  ) {
    return async (...args: any[]) => {
      let data = win[key];
      if (data) {
        return data;
      }
      data = await apiFunction(...args);
      win[key] = data;
      return data;
    };
  }

  abortRequest(requestId: string) {
    const win = window as any;
    if (win.requests[requestId] && win.requests[requestId].abort) {
      win.requests[requestId].abort();
      delete win.requests[requestId];
    }
  }

  windowCacheKey = {
    StateList: "StateList",
  };

  clearWindowCache(key: string) {
    win[key] = undefined;
  }

  clearAllCache = () => {
    Object.keys(this.windowCacheKey).forEach((key) => {
      win[key] = undefined;
    });
  };

  // Create your api from here. 
  async login() {
    return http.post(Config.API_URL + "/api/login", {});
  }
}
const api = new ApiServices();
export default api;
