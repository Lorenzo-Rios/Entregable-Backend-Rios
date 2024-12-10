export const chatViewAdapter = {
    async getChatMessages() {
        try {
            // Simula datos del chat o llama a un servicio real.
            const messages = [
                { user: 'Alice', message: 'Hello!' },
                { user: 'Bob', message: 'Hi there!' }
            ];
            return { messages };
        } catch (error) {
            console.error('Error en chatViewAdapter:', error);
            throw error;
        }
    }
};