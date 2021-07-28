import React from 'react';
import { IProps } from './chat-api';
import useFriendStatus from './useFriendStatus';

function FriendItem(props: IProps): JSX.Element {
  const isOnline = useFriendStatus(props);

  return (
    <li style={{ color: isOnline ? 'green' : 'grey' }}>
      {props.friend.name} ({ isOnline ? '在线' : '离线'})
    </li>
  );
}

export default FriendItem;
