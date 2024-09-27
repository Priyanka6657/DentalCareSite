document.addEventListener('DOMContentLoaded', () => {
    // Load client data from localStorage
    let clients = localStorage.getItem('clients');
    clients = clients ? JSON.parse(clients) : [];

    const clientList = document.getElementById('client-list');
    const appointmentForm = document.getElementById('appointment-form');

    // Function to display client data in the table
    function displayClients() {
        clientList.innerHTML = '';
        clients.forEach((client) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>${client.number}</td>
                <td>${client.date}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteClient('${client.email}')">Delete</button></td>
            `;
            clientList.appendChild(row);
        });
    }

    // Call the displayClients function initially to populate the table
    displayClients();

    // Function to delete a client
    window.deleteClient = (email) => {
        if (confirm('Are you sure you want to delete this client?')) {
            clients = clients.filter(client => client.email !== email);
            localStorage.setItem('clients', JSON.stringify(clients));
            displayClients();
        }
    };

    // Form submit event
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const date = document.getElementById('date').value;

        // Check if the appointment already exists in the table
        const existingAppointment = clients.find(client => client.email === email && client.number === number && client.date === date);

        if (existingAppointment) {
            // Appointment already exists, show alert message
            alert('You are already appointed.');
            return; // Stop further execution
        }

        // Add the new client to the array
        clients.push({ name, email, number, date });

        // Update localStorage
        localStorage.setItem('clients', JSON.stringify(clients));

        // Update the table
        displayClients();

        // Reset form inputs
        appointmentForm.reset();

        // Show success message
        alert('Appointment added successfully!');
    });
});
