class Config {
  static get API_URL() {
    return process.env.REACT_APP_API_URL || "";
  }
}

export default Config;
