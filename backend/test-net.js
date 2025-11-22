const net = require('net');

const DB_HOST = 'mascocita-db.ct8ui22coaxu.us-east-1.rds.amazonaws.com';
const DB_PORT = 3306;

console.log(`Attempting raw TCP connection to ${DB_HOST}:${DB_PORT}...`);

const socket = new net.Socket();

socket.setTimeout(5000);

socket.on('connect', () => {
    console.log('✅ TCP Connection established! Waiting for data...');
});

socket.on('data', (data) => {
    console.log('✅ Data received from server!');
    console.log('Length:', data.length);
    console.log('Hex:', data.toString('hex').substring(0, 100)); // Print first 50 bytes
    console.log('Text:', data.toString('utf8').substring(0, 100)); // Print first 100 chars
    socket.end();
});

socket.on('timeout', () => {
    console.log('❌ Connection timed out (No data received).');
    socket.destroy();
});

socket.on('error', (err) => {
    console.log('❌ Connection error:', err.message);
});

socket.connect(DB_PORT, DB_HOST);
