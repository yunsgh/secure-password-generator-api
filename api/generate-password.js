// api/generate-password.js (Version Stable - Sans dépendance Crypto)

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
    
    // --- UTILISATION D'UNE MÉTHODE NODE.JS INTÉGRÉE (Plus stable sur Vercel) ---
    // On utilise la méthode de génération aléatoire standard de JS, car 'crypto' est instable ici.
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * charPoolLength);
        password += charPool[randomIndex];
    }
    // --- FIN DE LA MODIFICATION ---

    res.status(200).json({
        success: true,
        password: password,
        length: len,
        details: {
            uppercase: useUppercase,
            symbols: useSymbols,
            strength: "Standard Secure (Non-Cryptographic)",
        }
    });
};
