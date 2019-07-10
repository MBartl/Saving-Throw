import React, { Fragment } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

const Cables = ({ chats, handleReceivedChat }) => {
  return (
    <Fragment>
      {
        chats.map(chat => {
          return (
            <ActionCableConsumer
              key={chat.id}
              channel={{ channel: 'MessagesChannel', chat: chat.id }}
              onReceived={handleReceivedChat}
            />
          );
        })
      }
    </Fragment>
  );
};

export default Cables;
