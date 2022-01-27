const { exec } = require("child_process");
const comms = [
  // kill screens
  "pkill screen",
  // hooks
  "screen -dmS hooks webhook -hooks /home/pi/hooks/hooks.json -verbose -port 4905",
  // zigger
  "screen -dmS smeeZ smee -u https://smee.io/MqLQPA0dxRqTyNE -t http://localhost:4905/hooks/zigger-github -p 4905",
  // auto_exec
  "screen -dmS smeeAE smee -u https://smee.io/oQmzFAr9A5H1rPWH -t http://localhost:4905/hooks/auto-exec-github -p 4905",
  // zigberry
  "screen -dmS smeeZB smee -u https://smee.io/Fb7Zor2K2usM94mz -t http://localhost:4905/hooks/zigberry-github -p 4905",
  // kozooh
  "screen -dmS smeeK smee -u https://smee.io/qyWeiI92z7Si80t3 -t http://localhost:4905/hooks/kozooh-github -p 4905",
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
