import React, { useState, useEffect } from 'react';
import ChatAPI, { IFriend, IProps } from './chat-api';

function FriendStatus(props: IProps): JSX.Element {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  useEffect(() => {
    function handleStatusChange(status: IFriend) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return <p>{props.friend.name} {isOnline ? 'Online' : 'Offline'}</p>;
}

export default FriendStatus;
