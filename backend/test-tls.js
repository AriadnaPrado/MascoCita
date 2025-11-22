const tls = require('tls');

const DB_HOST = 'mascocita-db.ct8ui22coaxu.us-east-1.rds.amazonaws.com';
const DB_PORT = 3306;

console.log(`Attempting TLS connection to ${DB_HOST}:${DB_PORT}...`);

const options = {
    rejectUnauthorized: false
};

const socket = tls.connect(DB_PORT, DB_HOST, options, () => {
    console.log('✅ TLS Connection established successfully!');
    console.log('Cipher:', socket.getCipher());
    socket.end();
});

socket.setTimeout(5000);

socket.on('timeout', () => {
    console.log('❌ Connection timed out.');
    socket.destroy();
});

socket.on('error', (err) => {
    console.log('❌ Connection error:', err.message);
});
