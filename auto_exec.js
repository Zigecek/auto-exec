const { exec } = require("child_process");
const comms = [
  // zigger
  "screen -dmS hook webhook -hooks /home/pi/hooks/hook-zigger.json -verbose -port 4905",
  "screen -dmS smee smee -u https://smee.io/MqLQPA0dxRqTyNE -t http://localhost:4905/hooks/zigger-github -p 4905",
  // auto_exec
  "screen -dmS hook webhook -hooks /home/pi/hooks/hook-auto-exec.json -verbose -port 4905",
  "screen -dmS smee smee -u https://smee.io/oQmzFAr9A5H1rPWH -t http://localhost:4905/hooks/auto-exec-github -p 4905",
];
const schComms = ["pm2 restart bot"];
const schedule = require("node-schedule");

///////////////////////////////////////////////////////

eachExec(comms);

const autoSchedule = schedule.scheduleJob({ hour: 2, minute: 33 }, () => {
  eachExec(schComms);
});

function commandExec(command) {
  console.log(command);
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }
    console.log(stdout);
    console.error(stderr);
  });
}

function eachExec(cms) {
  var cmms = cms;
  if (cmms.length == 0) return;
  commandExec(cmms.shift());
  setTimeout(() => {
    eachExec(cmms);
  }, 5000);
}
