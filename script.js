document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('reportForm');

    reportForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(reportForm);
        const petData = {
            name: formData.get('petName'),
            description: formData.get('description'),
            contact: formData.get('contact'),
            telegramId: formData.get('telegramId')
        };
        console.log(petData);
        reportForm.reset();
        // Send Telegram notification to your own account
        sendTelegramNotification("2038583476", "Lost Pet Report", formatNotificationMessage(petData));
    });

    function sendTelegramNotification(chatId, title, message) {
        const token = '6910388580:AAF9L8M_cGtHqCxojiYRJRNcLd3nfDfUmJ8';
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(title + "\n\n" + message)}`;
        
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error sending Telegram notification:', error));
    }

    function formatNotificationMessage(petData) {
        return `
            Pet's Name: ${petData.name}
            Description: ${petData.description}
            Contact Information: ${petData.contact}
        `;
    }
});

// Discord Bot Integration
client.on('message', async message => {
    if (message.content.toLowerCase() === 'alive') {
        // Send notification to backend server
        notifyBackendServer(message.author.id);
    }
});

// Function to notify backend server
function notifyBackendServer(discordUserId) {
    fetch('https://your-backend-server.com/notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ discordUserId }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to notify backend server');
        }
    })
    .catch(error => {
        console.error('Error notifying backend server:', error);
    });
}
