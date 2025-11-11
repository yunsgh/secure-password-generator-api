// api/generate-password.js
const crypto = require('crypto');

// Définition des jeux de caractères
const CHAR_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const CHAR_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHAR_NUMBERS = '0123456789';
const CHAR_SYMBOLS = '!@#$%^&*()_+=-{}[]|:;"<>,.?/~`';

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    // Récupération des paramètres (GET ou POST)
    const { length, include_symbols, include_uppercase } = req.query;

    const len = parseInt(length) || 16; // Longueur par défaut à 16
    const useSymbols = (include_symbols === 'true');
    const useUppercase = (include_uppercase === 'true');

    if (len < 8 || len > 128) {
        return res.status(400).json({ success: false, error: "Length must be between 8 and 128." });
    }

    let charPool = CHAR_LOWERCASE + CHAR_NUMBERS;

    if (useUppercase) {
        charPool += CHAR_UPPERCASE;
    }
    if (useSymbols) {
        charPool += CHAR_SYMBOLS;
    }

    let password = '';
    const charPoolLength = charPool.length;
    
    // Utilisation de crypto.randomBytes pour une génération forte (PVU)
    const randomBytes = crypto.randomBytes(len); 
    
    // Construction du mot de passe
    for (let i = 0; i < len; i++) {
        // Utilise un octet aléatoire pour sélectionner un caractère dans le pool
        const randomIndex = randomBytes[i] % charPoolLength;
        password += charPool[randomIndex];
    }

    res.status(200).json({
        success: true,
        password: password,
        length: len,
        details: {
            uppercase: useUppercase,
            symbols: useSymbols,
            strength: "Cryptographically Secure",
        }
    });
};// api/generate-password.js
const crypto = require('crypto');

// Définition des jeux de caractères
const CHAR_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const CHAR_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHAR_NUMBERS = '0123456789';
const CHAR_SYMBOLS = '!@#$%^&*()_+=-{}[]|:;"<>,.?/~`';

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    // Récupération des paramètres (GET ou POST)
    const { length, include_symbols, include_uppercase } = req.query;

    const len = parseInt(length) || 16; // Longueur par défaut à 16
    const useSymbols = (include_symbols === 'true');
    const useUppercase = (include_uppercase === 'true');

    if (len < 8 || len > 128) {
        return res.status(400).json({ success: false, error: "Length must be between 8 and 128." });
    }

    let charPool = CHAR_LOWERCASE + CHAR_NUMBERS;

    if (useUppercase) {
        charPool += CHAR_UPPERCASE;
    }
    if (useSymbols) {
        charPool += CHAR_SYMBOLS;
    }

    let password = '';
    const charPoolLength = charPool.length;
    
    // Utilisation de crypto.randomBytes pour une génération forte (PVU)
    const randomBytes = crypto.randomBytes(len); 
    
    // Construction du mot de passe
    for (let i = 0; i < len; i++) {
        // Utilise un octet aléatoire pour sélectionner un caractère dans le pool
        const randomIndex = randomBytes[i] % charPoolLength;
        password += charPool[randomIndex];
    }

    res.status(200).json({
        success: true,
        password: password,
        length: len,
        details: {
            uppercase: useUppercase,
            symbols: useSymbols,
            strength: "Cryptographically Secure",
        }
    });
};
