import React, { useState } from 'react';
import './App.css';

// Encryption function
const stringEncryption = (text, key) => {
    let cipherText = '';
    const cipher = [];

    // Compute the cipher values based on text and key
    for (let i = 0; i < key.length; i++) {
        cipher[i] = (text.charCodeAt(i) - 'A'.charCodeAt(0) + key.charCodeAt(i) - 'A'.charCodeAt(0)) % 26;
    }

    // Convert cipher values back to characters
    for (let i = 0; i < key.length; i++) {
        const x = cipher[i] + 'A'.charCodeAt(0);
        cipherText += String.fromCharCode(x);
    }

    return cipherText;
};

// Decryption function
const stringDecryption = (s, key) => {
    let plainText = '';
    const plain = [];

    // Compute the plain values based on cipher and key
    for (let i = 0; i < key.length; i++) {
        plain[i] = (s.charCodeAt(i) - 'A'.charCodeAt(0) - (key.charCodeAt(i) - 'A'.charCodeAt(0)) + 26) % 26;
    }

    // Convert plain values back to characters
    for (let i = 0; i < key.length; i++) {
        const x = plain[i] + 'A'.charCodeAt(0);
        plainText += String.fromCharCode(x);
    }

    return plainText;
};

function App() {
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const [output, setOutput] = useState('');
    const [isEncrypted, setIsEncrypted] = useState(true);

    const handleEncrypt = () => {
        // Check if key is not empty
        if (key.length === 0) {
            alert("Key cannot be empty!");
            return;
        }
        const encryptedMessage = stringEncryption(message.toUpperCase(), key.toUpperCase());
        setOutput(encryptedMessage);
        setIsEncrypted(true);
        resetFields();
    };

    const handleDecrypt = () => {
        // Check if key is not empty
        if (key.length === 0) {
            alert("Key cannot be empty!");
            return;
        }
        const decryptedMessage = stringDecryption(message.toUpperCase(), key.toUpperCase());
        setOutput(decryptedMessage);
        setIsEncrypted(false);
        resetFields();
    };

    const resetFields = () => {
        setMessage('');
        setKey('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-300 p-4">
            <header className="flex flex-col items-center mb-2 mt-[40px]">
                <h1 className="text-4xl border-b-2 font-bold text-white">One-Time Pad Encryption</h1>
            </header>

            <div className="mt-10 bg-white p-8 rounded-xl">
                <textarea
                    className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message here"
                />
                <input
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Enter your key here"
                />
                <div className="flex font-bold justify-center mt-2 space-x-4 mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleEncrypt}
                    >
                        Encrypt
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={handleDecrypt}
                    >
                        Decrypt
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-2">{isEncrypted ? 'Encrypted Message' : 'Decrypted Message'}</h2>
                <textarea
                    className="w-full h-32 p-2 border border-gray-300 rounded mb-4 bg-gray-50"
                    readOnly
                    value={output}
                    placeholder="Output will be displayed here"
                />
            </div>
        </div>
    );
}

export default App;
