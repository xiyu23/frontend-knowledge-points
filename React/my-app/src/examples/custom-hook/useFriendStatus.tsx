import { useState, useEffect } from 'react';
import ChatAPI, { IFriend, IProps } from './chat-api';

function useFriendStatus(props: IProps): boolean {
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

  return isOnline;
}

export default useFriendStatus;
