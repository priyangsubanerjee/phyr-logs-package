class Logger {
  constructor(sid, pid) {
    this.success = function (key = "", description = "") {
      if (key.length == 0) {
        throw new Error("Log key parameter is empty");
      } else if (key == null) {
        throw new Error("Log description parameter is null");
      }
      sendLogs("success", key, description, sid, pid, false);
    };
  }
}

function sendLogs(
  type = "success",
  text = "",
  description = "",
  sid,
  pid,
  notify = false
) {
  let date = new Date().toISOString();
  let log = {
    type: type,
    text: text,
    description: description,
    date: date,
    sid: sid,
    pid: pid,
    notify: notify,
  };

  fetch("https://phyr-logs.vercel.app/api/log", {
    method: "POST",
    body: JSON.stringify(log),
  });
}

module.exports = Logger;
