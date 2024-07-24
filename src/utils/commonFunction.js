import moment from "moment-timezone";

/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta < shiv@ozvid.com >
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
export const acceptOnlyNum = (e) => {
  const re = /[0-9A-F]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
};

export async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // get user Time Zone

export const convertUTCToLocal = (date) => {
  var utcCutoff = moment.utc(date, "YYYYMMDD HH:mm:ss");
  var displayCutoff = utcCutoff.clone().tz(userTimeZone);
  return displayCutoff;
};

export const disablePastDates = () => {
  let dtToday = new Date();
  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  let maxDate = year + "-" + month + "-" + day;
  return maxDate;
};

export const filterPassedTime = (time) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);
  return currentDate.getTime() < selectedDate.getTime();
};