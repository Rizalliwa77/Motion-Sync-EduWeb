import { db } from '../firebase/config';
import { 
    collection, 
    query, 
    where, 
    orderBy, 
    getDocs, 
    addDoc, 
    updateDoc,
    doc,
    deleteDoc 
} from 'firebase/firestore';

export const messageService = {
    async getMessages(userType) {
        const messagesRef = collection(db, 'messages');
        const q = query(
            messagesRef,
            where('participants', 'array-contains', userType),
            orderBy('timestamp', 'desc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    async sendMessage(messageData) {
        const enhancedMessage = {
            ...messageData,
            participants: ['student', 'educator'],
            timestamp: new Date(),
            conversationId: messageData.replyToId || new Date().getTime(),
            read: false
        };
        
        return await addDoc(collection(db, 'messages'), enhancedMessage);
    },

    async getConversation(conversationId) {
        const messagesRef = collection(db, 'messages');
        const q = query(
            messagesRef,
            where('conversationId', '==', conversationId),
            orderBy('timestamp', 'asc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    async updateMessageStar(messageId, starred) {
        const messageRef = doc(db, 'messages', messageId);
        return await updateDoc(messageRef, { starred });
    },

    async deleteMessages(messageIds) {
        const deletePromises = messageIds.map(id => 
            deleteDoc(doc(db, 'messages', id))
        );
        return Promise.all(deletePromises);
    },

    async markMessagesAsRead(messageIds, userType) {
        const updatePromises = messageIds.map(id => {
            const messageRef = doc(db, 'messages', id);
            const updateData = {};
            updateData[`readBy${userType.charAt(0).toUpperCase() + userType.slice(1)}`] = true;
            return updateDoc(messageRef, updateData);
        });
        return Promise.all(updatePromises);
    }
}; 