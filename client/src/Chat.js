import React, { useMemo } from 'react';

function ChatApp({ messages }) {
  const processedMessages = useMemo(() => {
    return messages.filter(msg => msg.isActive);
  }, [messages]);

  return (
    <div>
      {processedMessages.map(msg => (
        <p key={msg.id}>{msg.text}</p>
      ))}
    </div>
  );
}

export default ChatApp;