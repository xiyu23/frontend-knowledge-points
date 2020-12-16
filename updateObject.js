/**
 * for propertis in *target*, updates them to the **same** properties in source if the value of that property is valid
 * @param {source object which } source 
 * @param {*} target 
 */
function updateObject(source, target) {
  if (!this.propertyName) {
    console.error('propertyName is not defined on \'this\'');
    return;
  }

  if (typeof source !== 'object' || typeof target !== 'object') {
    console.error(`both source and target should be type of object: source = ${source}, target = ${target}`);
    return;
  }
  const keys = Object.keys(target);
  keys.forEach(k => {
    const oldVal = source[k];
    const val = target[k];
    const oldType = typeof oldVal;
    const type = typeof val;
    if (!source.hasOwnProperty(k)) {
      // only update the property existing in source
      console.log(`property ${this.propertyName}.${k} is a new property, added onto source`);
      return;
    }

    if (val === null || val === undefined || val === '') {
      // value is meaningless
      return;
    }

    if (type === 'function') {
      // ignore function
      return;
    }

    if (type !== oldType) {
      // not same type, warning
      console.warn(`property ${this.propertyName}.${k}'s type may change from ${oldType} to ${type}`);
      source[k] = val;
      return;
    }

    if (type !== 'object') {
      if (oldVal !== val) {
        console.log(`property ${this.propertyName}.${k} changed from ${oldVal} to ${val}`);
        source[k] = val;
      } else {
        // console.log(`property ${this.propertyName}.${k} not changed: ${oldVal}`);
      }
    } else {
      // array or object
      if (Array.isArray(val)) {
        // [0,1,2], [0,2,3] => [0,2,3]
        // [0,1,2], [0,1,2,3] => [0,1,2,3]
        // [0,1,2], [0,2] => [0,2]
        // [0,[1,2]], [0,[1,3]] => [0,[1,3]]
        // [0, foo: {name:yuhui}], [0, foo: {name:yunhui, gender:male}, ] => [0, foo: {name:yunhui, gender:male}, ]
        const oldArr = oldVal;
        const newArr = val;
        const oldArrLen = oldArr.length;
        const newArrLen = newArr.length;
        for (let i = 0, l = Math.min(oldArrLen, newArrLen); i < l; i++) {
          const oldVal = oldArr[i];
          const newVal = newArr[i];
          const oldType = typeof oldVal;
          const newType = typeof newVal;
          const propName = `${this.propertyName}.${k}[${i}]`;
          if (oldType !== newType) {
            console.warn(`property ${propName} type changed from ${oldType} to ${newType}`);
            oldArr[i] = newArr[i];
          } else {
            if (oldType !== 'object') {
              if (oldVal !== newVal) {
                console.log(`property ${propName} changed from ${oldVal} to ${newVal}`);
                source[k] = val;
              } else {
                console.log(`property ${propName} not changed: ${oldVal}`);
              }
            } else {
              // array or object
              if (Array.isArray(oldVal)) {
                // TODO
                console.warn(`TODO! property ${propName} is an array, we should recursively do update`);
              } else {
                // [1, foo: {name: yuhui}, ]
                // we should update 'foo'
                updateObject.call({ propertyName: propName }, oldVal, newVal);
              }
            }
          }
        }
        if (oldArrLen < newArrLen) {
          // append new elements
          console.log(`property ${this.propertyName} is an array, length extended from ${oldArrLen} to ${newArrLen}`);
          for (let i = oldArrLen; i < newArrLen; i++) {
            oldArr.push(newArr[i]);
          }
        } else if (newArrLen < oldArrLen){
          // splice from oldArr
          console.log(`property ${this.propertyName} is an array, length shorted from ${oldArrLen} to ${newArrLen}`);
          oldArr.splice(newArrLen);
        } else {
          // two arrays have same length
        }
      } else {
        updateObject.call({ propertyName: `${this.propertyName}.${k}`}, oldVal, val);
      }
    }
  });
}

console.log('\n-----CASE-----')
var a = { audio_on: '1', };
var b = { audio_on: '0', };
updateObject.call({ propertyName: 'person' }, a, b);

console.log('\n-----CASE-----')
a = { audio_on: '1', };
b = { audio_on: '0', video_on: '1' };
updateObject.call({ propertyName: 'person' }, a, b);

console.log('\n-----CASE-----')
a = { 
  audio_on: '1',
  id: {
    instance_id: 8,
    user_type: '2',
    app_uid: 'o-JR358eocold2mdMkfu'
  },
  share_on: '0'
};
b = { 
  audio_on: '0',
  id: {
    instance_id: 5,
    user_type: '2',
    app_uid: 'o-JR358eocold2mdMkfu'
  },
  share_on: '1'
};
updateObject.call({ propertyName: 'person' }, a, b);

console.log('\n-----CASE-----')
a = { 
  audio_energy: [87, 23, 56, 33, 46],
};
b = { 
  audio_on: '0',
  audio_energy: [],
};
updateObject.call({ propertyName: 'person' }, a, b);

console.log('\n-----CASE-----')
a = { 
  audio_on: '1',
  audio_energy: 23,
};
b = { 
  audio_on: '',
  video_on: '1'
};
updateObject.call({ propertyName: 'person' }, a, b);



var s = '2020-12-16 17:08:23 1608128103775   1     [in-meeting] this is some logs';



function extractLogLine(line) {
    // e.g 
    //      记录时间         行为触发时间戳 日志级别 日志内容
    // 2020-12-16 17:08:23   1608128103775   1     [in-meeting] this is some logs
    const reg = /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s+|\d{13}\s*|[1-3]\s*|.+/g;
    const res = line.match(reg);

    if (!res || res.length < 1) {
        console.warn(`cannot extract log for line: ${line}`);
        return;
    }

    console.log(res);

    // 期望是2个以上，并且检查一下数据是否合法
    // 一定得有前两个
    // [0] 2020-12-16 17:08:23   
    // [1] 1608128103775   
    // [2] 1     
    // [3] [in-meeting] this is some logs
    const reportTime = res[0];
    const behaviorTs = res[1];
    const logLevel = parseInt(res[2]) || 0; // 0 is default, means we dont have log level
    const content = res[3] || '';

    console.log(`
        reportTime: ${reportTime}
        behaviorTs: ${behaviorTs}
        logLevel: ${logLevel}
        content: ${content}
    `);
}

extractLogLine(s);