/**
 * for propertis in *target*, updates them to the **same** properties in source if the value of that property is valid
 * @param {source object which } source
 * @param {*} target
 */
function isSameObject(source, target) {
  if (typeof source !== 'object' || typeof target !== 'object') {
    console.error(`both source and target should be type of object: source = ${JSON.stringify(source)}, target = ${JSON.stringify(target)}}`);
    return false;
  }
  const keys = Object.keys(target);
  const oldKeys = Object.keys(source);
  if (keys.length !== oldKeys.length) {
    console.log(`property is an object but they got different length: ${oldKeys.length} to ${keys.length}`);
    return false;
  }

  for (let i = 0, l = keys.length; i < l; i++) {
    const k = keys[i];
    const oldVal = source[k];
    const val = target[k];
    const oldType = typeof oldVal;
    const type = typeof val;
    if (!Object.prototype.hasOwnProperty.call(source, k)) {
      // only update the property existing in source
      console.log(`property ${k} is in target, but not found in source`);
      return false;
    }

    if (type !== oldType) {
      // not same type, warning
      console.log(`property ${k}'s type is ${type} in target, but ${oldType} in source`);
      return false;
    }

    if (type !== 'object') {
      if (oldVal !== val) {
        console.log(`property ${k} is not same. changed from ${oldVal} to ${val}`);
        return false;
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
        if (oldArrLen !== newArrLen) {
          console.log(`property ${k} is an array, but they are not same in length: ${oldArrLen} to ${newArrLen}`);
          return false;
        }

        for (let i = 0, l = newArrLen; i < l; i++) {
          const oldVal = oldArr[i];
          const newVal = newArr[i];
          const oldType = typeof oldVal;
          const newType = typeof newVal;
          const propName = `${k}[${i}]`;
          if (oldType !== newType) {
            console.log(`property ${propName} type changed from ${oldType} to ${newType}`);
            return false;
          }

          if (oldType !== 'object') {
            if (oldVal !== newVal) {
              console.log(`property ${propName} changed from ${oldVal} to ${newVal}`);
              return false;
            }
          } else {
            // array or object
            if (Array.isArray(oldVal)) {
              // TODO
              console.warn(`TODO! property ${propName} is an array, we should recursively do update`);
            } else {
              // [1, foo: {name: yuhui}, ]
              // we should update 'foo'
              if (!isSameObject(oldVal, newVal)) {
                console.log(`property ${propName} is an object, but they are different.
                  source = ${JSON.stringify(oldVal)},
                  val = ${JSON.stringify(val)},
                `);
                return false;
              }
            }
          }
        }
      } else {
        if (!isSameObject(oldVal, val)) {
          console.log(`property ${k} is an object, but they are different.
            source = ${JSON.stringify(oldVal)},
            val = ${JSON.stringify(val)},
          `);
          return false;
        }
      }
    }
  }

  return true;
}

function EXP(res, exp) {
  if (res !== exp) {
    console.error(`ASSERT: expected ${exp} but got ${res}`);
  }
}

console.log('\n-----CASE1-----');
var a = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 1, associator_id: {}, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
var b = { nickname: 'Robot115', is_creator: '0', is_host: '1', associate_type: 2, associator_id: {}, role_type: '1', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '2', userType: 2, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
EXP(isSameObject(a, b), false);

console.log('\n-----CASE2-----');
a = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: {}, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
b = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '1', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '2', userType: 2, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
EXP(isSameObject(a, b), false);

console.log('\n-----CASE3-----');
a = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '1234'}, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
b = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '1', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '2', userType: 2, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
EXP(isSameObject(a, b), false);

console.log('\n-----CASE4-----');
a = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123', instance_id: '1' }, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
b = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '1', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '2', userType: 2, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
EXP(isSameObject(a, b), false);


console.log('\n-----CASE5-----');
a = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
b = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123', instance_id: '1' }, role_type: '1', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '2', userType: 2, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
EXP(isSameObject(a, b), false);

console.log('\n-----CASE6-----');
a = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
b = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '1', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '2', userType: 2, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
EXP(isSameObject(a, b), false);

console.log('\n-----CASE7-----');
a = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
b = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636740' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
EXP(isSameObject(a, b), false);

console.log('\n-----CASE8-----');
a = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 254, avatar_type: 0, avatar_token: '', local_record_on: '0' };
b = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 255, avatar_type: 0, avatar_token: '', local_record_on: '0' };
EXP(isSameObject(a, b), false);

console.log('\n-----CASE9-----');
a = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 255, avatar_type: 0, avatar_token: '', local_record_on: '0' };
b = { nickname: 'Robot115', is_creator: '0', is_host: '0', associate_type: 2, associator_id: { app_uid: '123' }, role_type: '3', id: { uid: 'Robot115', app_id: '1400115281', instance_id: '1', user_type: '1', userType: 1, phone_number: '', av_uid: '144115226577636739' }, video_on: '1', audio_on: '0', share_on: '0', video_reason: '0', video_pause: '', audio_reason: '0', audio_pause: '', share_reason: '0', share_pause: '0', handsup: '0', invite_id: '', authType: 1, participation_status: '', participation_status_stamp: '1606338409072', hangup_reason: '', members_seq: 255, avatar_type: 0, avatar_token: '', local_record_on: '0' };
EXP(isSameObject(a, b), true);
