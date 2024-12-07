import React, { useState } from 'react';
import EduSidebar from './sidebar/Edu_Sidebar.jsx';
import '../../styles/Educator/Edu_Messages.css';
import { messageService } from '../../../services/messageService';

const MessageItem = ({ message, onSelect, isSelected, onStar }) => (
    <div className="message-item" onClick={() => onSelect(message.id)}>
        <input 
            type="checkbox" 
            checked={isSelected}
            onChange={(e) => e.stopPropagation()}
            className="message-checkbox"
        />
        <button 
            className={`star-icon ${message.starred ? 'starred' : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                onStar(message.id);
            }}
        >
            ★
        </button>
        <div className="message-info">
            <span className="user-id">{message.sender}</span>
            <span className="message-preview">{message.preview}</span>
        </div>
    </div>
);

const Edu_Messages = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'Student #1',
            preview: 'Question about the upcoming assignment...',
            date: 'June 10',
            starred: false,
            content: 'Hello Professor, I have a question about the upcoming assignment. Could you please clarify the requirements?',
            userType: 'student'
        },
        {
            id: 2,
            sender: 'Student #2',
            preview: 'Regarding today\'s lecture...',
            date: 'June 9',
            starred: true,
            content: 'I missed today\'s lecture due to a doctor\'s appointment. Could you please share the lecture notes?',
            userType: 'student'
        },
        {
            id: 3,
            sender: 'Student #3',
            preview: 'Group project update',
            date: 'June 8',
            starred: false,
            content: 'Here\'s our progress update on the group project. We\'ve completed the first phase.',
            userType: 'student'
        }
    ]);

    const [selectedMessages, setSelectedMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMessage, setActiveMessage] = useState(null);
    const [replyText, setReplyText] = useState('');

    const handleMessageSelect = (messageId) => {
        const message = messages.find(m => m.id === messageId);
        setActiveMessage(message);
    };

    const handleStar = (messageId) => {
        setMessages(messages.map(message => 
            message.id === messageId 
                ? { ...message, starred: !message.starred }
                : message
        ));
    };

    const handleReply = async () => {
        if (replyText.trim() && activeMessage) {
            try {
                await messageService.sendMessage({
                    sender: 'Educator',
                    recipient: activeMessage.sender,
                    preview: replyText.substring(0, 50) + '...',
                    content: replyText,
                    date: new Date().toLocaleString(),
                    starred: false,
                    userType: 'educator',
                    replyToId: activeMessage.conversationId || activeMessage.id,
                    readByStudent: false,
                    readByEducator: true
                });
                setReplyText('');
                
                // Optionally fetch the updated conversation
                if (activeMessage.conversationId) {
                    const conversation = await messageService.getConversation(
                        activeMessage.conversationId
                    );
                    // Update your messages state accordingly
                }
            } catch (error) {
                console.error('Error sending reply:', error);
            }
        }
    };

    const handleBulkAction = (action) => {
        console.log(`Performing ${action} on selected messages:`, selectedMessages);
    };

    return (
        <div className="edu-messages-container">
            <EduSidebar />
            <div className="messages-content">
                <h1 className="messages-title">Messages</h1>
                
                <div className="messages-header">
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <div className="messages-stats">
                            <span>{messages.length} Total</span>
                            <span>{messages.filter(m => m.starred).length} Starred</span>
                            <span>{selectedMessages.length} Selected</span>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="action-btn delete">Delete</button>
                        <button className="action-btn mark-read">Mark as Read</button>
                    </div>
                </div>

                <div className="messages-view">
                    <div className="messages-list">
                        {messages
                            .filter(message => 
                                message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                message.preview.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map(message => (
                                <MessageItem
                                    key={message.id}
                                    message={message}
                                    onSelect={handleMessageSelect}
                                    isSelected={selectedMessages.includes(message.id)}
                                    onStar={handleStar}
                                />
                            ))
                        }
                    </div>

                    <div className="message-detail">
                        {activeMessage ? (
                            <div className="active-message">
                                <div className="message-header">
                                    <h2 className="sender-name">{activeMessage.sender}</h2>
                                    <span className="message-date">{activeMessage.date}</span>
                                </div>
                                <div className="message-content">{activeMessage.content}</div>
                                <div className="reply-section">
                                    <textarea
                                        placeholder="Type your reply..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="reply-textarea"
                                    />
                                    <button className="reply-button" onClick={handleReply}>Send Reply</button>
                                </div>
                            </div>
                        ) : (
                            <div className="no-message">
                                Select a message to view details
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edu_Messages;
