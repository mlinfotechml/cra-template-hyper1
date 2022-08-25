import axios from "axios";
import format from "date-fns/format";
import parse from "date-fns/parse";
import * as path from "path";
import { unescape } from "querystring";
import swal from "sweetalert2";
import enums from "../enums";

const xml_special_to_escaped_one_map = {
  "&": "&amp;",
  '"': "&quot;",
  "<": "&lt;",
  ">": "&gt;",
};

const escaped_one_to_xml_special_map = {
  "&amp;": "&",
  "&quot;": "",
  "&lt;": "<",
  "&gt;": ">",
};
class Utils {
  groupByObject(lstAry, property) {
    var objResult = {};
    lstAry.forEach((item) => {
      if (!objResult[item[property]]) objResult[item[property]] = [item];
      else objResult[item[property]].push(item);
    });
    return objResult;
  }

  cleanErrorString(string) {
    return string?.replace(/Evaluation failed:/gi, "");
  }

  parseErrorString(error) {
    if (typeof error === "string") {
      return error;
    }
    if (typeof error.Error === "string") {
      return error.Error;
    }
    if (typeof error.message === "string") {
      return error.message;
    }
    if (typeof error.Message === "string") {
      return error.Message;
    }
    if (typeof error.CustomErrorMessage === "string") {
      return error.CustomErrorMessage;
    }
    if (error.ObjException && typeof error.ObjException.Message === "string") {
      return error.ObjException.Message;
    }
    return error.toStrign();
  }

  extractLimitOffsetSort(req: any) {
    let { limit, offset, sort, sortOrder } = req.query;
    let obj: any = { sort: null, limit: 0, offset: 0 };
    if (sort) {
      obj.sort = {};
      obj.sort[sort] = sortOrder == "ASC" ? 1 : -1;
    }
    if (limit) {
      obj.limit = parseInt(limit) || 0;
    }
    if (offset) {
      obj.offset = parseInt(offset) || 0;
    }
    return obj;
  }

  extractFromDateToDate(req, dateField = "date") {
    let dateMatch = {
      date: {
        $gte: new Date(0),
        $lt: new Date(),
      },
    };
    if (req.query.fromDate) {
      dateMatch.date.$gte = this.floorDate(req.query.fromDate);
    }

    if (req.query.toDate) {
      dateMatch.date.$lt = this.ceilDate(req.query.toDate);
    }
    return dateMatch;
  }

  ceilDate(date) {
    let newDate = new Date(date);
    newDate.setHours(23);
    newDate.setMinutes(59);
    newDate.setSeconds(59);
    return newDate;
  }

  floorDate(date) {
    let newDate = new Date(date);
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    return newDate;
  }

  getBase64FromDataURI(str = "") {
    let index = str.indexOf(";base64,");
    return str.substr(index + ";base64,".length);
  }

  setTimeout(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  verifyRequiredSettingOjbect(requiredSettings = [], settings) {
    let settingsNotProvided = requiredSettings.filter(
      (key) => settings[key] === undefined
    );
    if (settingsNotProvided.length > 0)
      throw new Error(
        `Required "${settingsNotProvided.join()}" Keys are not provided. `
      );
  }

  // function that create error object
  resError(err, message = "") {
    return {
      resType: "THT",
      status: false,
      err: err,
      message: message,
    } as any;
  }

  // function that create success object
  resSuccess(obj, message = "") {
    return {
      resType: "THT",
      status: true,
      data: obj,
      message: message,
    } as any;
  }

  convertAryToObj(ary: string[], value: any = "") {
    let obj: any = {};
    ary.forEach((item) => (obj[item] = value));
    return obj;
  }
  createObject<T extends readonly string[]>(
    steps: T
  ): Record<T[number], object> {
    const typed = {} as Record<string, string>;
    steps.forEach((step) => (typed[step] = step));
    return typed as unknown as Record<T[number], object>;
  }

  toLowerCaseSafe(str = "") {
    return str ? str.toLowerCase() : "";
  }

  toUpperCaseSafe(str = "") {
    return str ? str.toUpperCase() : "";
  }

  getLastDigit(str: string, lastDigit: number = 4) {
    return str?.substr(str.length - lastDigit, lastDigit) || "";
  }

  toFixedNumber(n: any, decimal: number = 3) {
    if (parseFloat(n)) {
      return parseFloat(parseFloat(n).toFixed(decimal));
    }
    return n;
  }

  encodeXml(string) {
    if (!string) return "";
    return string.replace(/([&"<>])/g, function (str, item) {
      return xml_special_to_escaped_one_map[item];
    });
  }

  decodeXml(string) {
    return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g, function (str, item) {
      return escaped_one_to_xml_special_map[item];
    });
  }
  convertFromWindowsPathToLinuxPath(str: string) {
    var isWin = process.platform === "win32";
    if (isWin)
      // Do not replace in win
      return str;
    return "files/" + str?.replace(/:|\\/g, "/") || "";
  }

  getPercentage(value: any = 0, percentage: any = 0) {
    value = parseFloat(value) || 0;
    percentage = parseFloat(percentage) || 0;
    return (value / 100) * percentage || 0;
  }
  tryJSONParse(string) {
    try {
      return JSON.parse(string);
    } catch (ex) {
      return null;
    }
  }

  async safe(cb) {
    try {
      if (cb) return await cb();
    } catch (ex) {}
  }

  parseAndFormatDate = (date: any, formatString: string) => {
    if (!date) return "";
    let parseDate = new Date(date);
    if (!parseDate || parseDate?.toString() === "Invalid Date") return "";
    return format(parseDate, formatString);
  };

  convertToSystemDateFormate = (date) => {
    return this.parseAndFormatDate(date, "MM/DD/YYYY");
  };

  convertToYYYYMMDDFormat = (date, useServerTimezone = false) => {
    return this.parseAndFormatDate(date, "YYYY-MM-DD");
  };

  convertToYYYYMMDDHHMMSSFormat = (date) => {
    return this.parseAndFormatDate(date, "YYYY-MM-DD HH:mm:ss");
  };

  convertToSystemDateTimeFormate = (date, showSeconds = false) => {
    return this.parseAndFormatDate(date, `MM/DD/YYYY hh:mm${showSeconds ? ":ss" : ""} A`);
  };

  showAlert(msg, type, option: any = {}) {
    try {
      if (typeof msg !== "string") {
        msg = this.parseErrorString(msg);
        if (!msg) msg = "Error: " + JSON.stringify(msg);

        console.log("showAlert: ", msg, JSON.stringify(msg), type);
        // return swal("Unknown Error: Message must be string", "error")
      }

      let title = "";
      let message = msg;
      let icon = "info";

      if (enums.ALERT_TYPE.SUCCESS === type) icon = "success";
      if (enums.ALERT_TYPE.ERROR === type) icon = "error";
      if (enums.ALERT_TYPE.INFO === type) icon = "info";
      if (enums.ALERT_TYPE.WARNING === type) icon = "warning";
      let options = {
        icon: icon,
        title: title,
        timer: option.timeout,
        html: message,
        ...option,
      };
      return swal.fire(options);
    } catch (ex) {
      console.log(ex, msg, type);
      return new Promise((resolve) => resolve({}));
    }
  }
  showInfo(msg, options) {
    // this.snackbarError(msg)
    this.showAlert(msg, enums.ALERT_TYPE.INFO, options);
  }

  showError(msg, options) {
    // this.snackbarError(msg)
    this.showAlert(msg, enums.ALERT_TYPE.ERROR, options);
  }

  showWarning(msg, options) {
    // this.snackbarWarning(msg)
    this.showAlert(msg, enums.ALERT_TYPE.WARNING, options);
  }

  showSuccess(msg, options) {
    // this.snackbarSuccess(msg)
    this.showAlert(msg, enums.ALERT_TYPE.SUCCESS, options);
  }

  showConfirm(
    title,
    description = "",
    icon = "warning",
    dangerMode = false,
    objOptions: any = {}
  ) {
    return new Promise((resolve) => {
      let options = {
        title,
        icon,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Reject`,
        ...objOptions,
      };
      if (description) options.text = description;
      swal.fire(options).then((result) => {
        if (!result.isConfirmed) resolve(false);
        resolve(true);
      });
    });
  }
}

const utils = new Utils();

export default utils;
