import { useState } from 'react';
import axiosConfig from "../../axiosConfig";

export default function AdminDeckPage() {
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosConfig.post('/createDeck', {
                deck_name: deckName,
                deck_description: deckDescription
            });
            setDeckName(''); // Reset form
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Deck Management</h1>
            
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="deckName" className="block text-gray-700 mb-2">
                        Deck Name
                    </label>
                    <input
                        type="text"
                        id="deckName"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter deck name"
                        required
                    />
                <div className="mb-4">
                    <label htmlFor="deckDescription" className="block text-gray-700 mb-2">
                        Deck Description
                    </label>
                    <textarea
                        id="deckDescription"
                        value={deckDescription}
                        onChange={(e) => setDeckDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter deck description"
                        rows={3}
                        required
                    />
                </div>
                </div>

                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Create Deck
                </button>
            </form>
        </div>
    )
}