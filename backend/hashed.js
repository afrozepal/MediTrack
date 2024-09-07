const bcrypt = require('bcryptjs');

async function hashPassword() {
    const plainPassword = 'admin123'; // Change this to your preferred admin password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Hashed Password:', hashedPassword);
}

hashPassword();
