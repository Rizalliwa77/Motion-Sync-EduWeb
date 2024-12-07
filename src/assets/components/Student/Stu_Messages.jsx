import React, { useState, useEffect } from 'react';
import StuSidebar from './sidebar/Stu_Sidebar.jsx';
import '../../styles/Student/Stu_Messages.css';
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

const Stu_Messages = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMessage, setActiveMessage] = useState(null);
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await messageService.getMessages('student');
                setMessages(fetchedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const handleMessageSelect = (messageId) => {
        const message = messages.find(m => m.id === messageId);
        setActiveMessage(message);
    };

    const handleStar = async (messageId) => {
        try {
            const message = messages.find(m => m.id === messageId);
            await messageService.updateMessageStar(messageId, !message.starred);
            setMessages(messages.map(message => 
                message.id === messageId 
                    ? { ...message, starred: !message.starred }
                    : message
            ));
        } catch (error) {
            console.error('Error updating star:', error);
        }
    };

    const handleReply = async () => {
        if (replyText.trim() && activeMessage) {
            try {
                await messageService.sendMessage({
                    sender: 'Student',
                    recipient: activeMessage.sender,
                    preview: replyText.substring(0, 50) + '...',
                    content: replyText,
                    date: new Date().toLocaleString(),
                    starred: false,
                    userType: 'student',
                    replyToId: activeMessage.conversationId || activeMessage.id,
                    readByStudent: true,
                    readByEducator: false
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

    const handleBulkAction = async (action) => {
        if (selectedMessages.length === 0) return;
        
        try {
            if (action === 'delete') {
                await messageService.deleteMessages(selectedMessages);
                setMessages(messages.filter(m => !selectedMessages.includes(m.id)));
            } else if (action === 'read') {
                await messageService.markMessagesAsRead(selectedMessages);
                setMessages(messages.map(m => 
                    selectedMessages.includes(m.id) ? {...m, read: true} : m
                ));
            }
            setSelectedMessages([]);
        } catch (error) {
            console.error('Error performing bulk action:', error);
        }
    };

    return (
        <div className="stu-messages-container">
            <StuSidebar />
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
                        <button 
                            className="action-btn delete" 
                            onClick={() => handleBulkAction('delete')}
                            disabled={selectedMessages.length === 0}
                        >
                            Delete
                        </button>
                        <button 
                            className="action-btn mark-read" 
                            onClick={() => handleBulkAction('read')}
                            disabled={selectedMessages.length === 0}
                        >
                            Mark as Read
                        </button>
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
                                    <button onClick={handleReply} className="reply-button">Send Reply</button>
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

export default Stu_Messages;