(()=>{const e=function(){const e=new Date("2019-05-24 00:00:00"),t=new Date;t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0);const s=(t.getTime()-e.getTime())/864e5+1;return console.log(`宝宝，今天是💕的第${s}天`),s}();document.getElementsByClassName("days")[0].textContent=`宝宝，第${e}天啦！`})();