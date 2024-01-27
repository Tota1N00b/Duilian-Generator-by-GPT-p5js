let encryptedApiKey =
    "U2FsdGVkX18kKQe8+8Lt52JsCXgit3mUK0oibk6IJKpbKoN+cxCg/el4I+sN8EuwWZp4geQVa0b8mIZqkea5s6wyxczVcpRRkz4ggOstbz4=";

function decryptApiKey() {
    const passphrase = apiKeyInput.value();
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedApiKey, passphrase);
        const decryptedApiKey = bytes.toString(CryptoJS.enc.Utf8);

        console.log(decryptedApiKey);
        if (decryptedApiKey) {
            apiKey = decryptedApiKey;
            // Use the decrypted API key for your API calls here
        } else {
            console.error("Invalid password or corrupted encrypted key");
        }
    } catch (e) {
        console.error("Decryption failed", e);
    }
}
