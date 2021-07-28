export interface IFriends {
  [id: string]: IFriend;
}
export interface IFriend {
  isOnline: boolean,
  name: string,
}
export interface IProps {
  friend: {
    id: string,
    name: string,
  },
}

interface IObserver {
  id: string;
  callbacks: ICallback[];
}
type ICallback = (friend: IFriend) => void;

// init some friends
const friends: IFriends = {
  '1': {
    isOnline: false,
    name: 'yuhui',
  },
  '2': {
    isOnline: false,
    name: 'yunhui',
  },
  '3': {
    isOnline: true,
    name: 'xiaohan',
  },
  '4': {
    isOnline: true,
    name: 'sun',
  },
};

// observers
const observers: IObserver[] = [];

const ChatAPI = {
  subscribeToFriendStatus: (friendId: string, callback: ICallback): void => {
    if (!friends[friendId]) {
      console.error(`no ${friendId} found in friends: ${JSON.stringify(friends)}`);
      return;
    }
    console.log(`subscribed to friendId: ${friendId}`);

    let index = -1;
    for (let i = 0, l = observers.length; i < l; i++) {
      if (observers[i].id === friendId) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      console.log('first time subscribe to this friend');
      observers.push({
        id: friendId,
        callbacks: [],
      });
      index = observers.length - 1;
    } else {
      console.warn(`already have ${observers[index].callbacks.length} callbacks for this friend, add another callback...`);
    }

    observers[index].callbacks.push(callback);
  },
  unsubscribeFromFriendStatus: (friendId: string, callback: ICallback): void => {
    let index = -1;
    for (let i = 0, l = observers.length; i < l; i++) {
      if (observers[i].id === friendId) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      console.error(`unsubscribe failed, since cannot find given friendId ${friendId} in current observers.`);
      return;
    }

    console.log(`unsubscribed friendId: ${friendId}, current callbacks: ${observers[index].callbacks.length}`);
    // find the given callback
    let k = -1;
    for(let j = 0, l = observers[index].callbacks.length; j < l; j++) {
      if (observers[index].callbacks[j] === callback) {
        k = j;
        break;
      }
    }
    if (k === -1) {
      console.error('cannot find give callback in the callbacks.');
      return;
    }

    observers[index].callbacks.splice(k, 1);
    console.log(`successfully unsubscribed callback for ${friendId}, callbacks left: ${observers[index].callbacks.length}`);

    if (observers[index].callbacks.length === 0) {
      // no callbacks, remove this observer
      observers.splice(index, 1);
    }
  },
};

setInterval(() => {
  for(const id in friends) {
    if (Math.random() < 0.5) {
      // change friend status
      friends[id].isOnline = !friends[id].isOnline;
      const friendStr = `${friends[id].name}(id: ${id})`;
      // console.log(`ChatAPI: friend ${friendStr} status changed to ${friends[id].isOnline ? 'online' : 'offline'}`);

      // find if there's observer has interests on him
      let index = -1;
      for (let i = 0, l = observers.length; i < l; i++) {
        if (observers[i].id === id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        // console.log(`no observer has interests on friend: ${friendStr}.`);
        continue;
      }
      
      console.log(`observer at index ${index} has interests on him, execute ${observers[index].callbacks.length} callbacks...`);
      for (const callback of observers[index].callbacks) {
        callback(friends[id]);
      }
    }
  }
}, 3000);

export default ChatAPI;
