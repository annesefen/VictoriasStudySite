// Cleaned version of flashcards-scripts.js for biology decks

document.addEventListener('DOMContentLoaded', () => {
    // Search Decks
    const searchBar = document.getElementById('deck-search');
    const decks = document.querySelectorAll('.deck');

    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        decks.forEach(deck => {
            const deckName = deck.getAttribute('data-name').toLowerCase();
            deck.style.display = deckName.includes(query) ? 'block' : 'none';
        });
    });

    // Flashcard Data - add tags like ['#biology', '#ch1']
    const flashcardData = {
        'biology-ch1': [
            { question: "What is the basic unit of life?", answer: "The cell.", tags: ['#biology', '#ch1'] },
            { question: "What molecule carries genetic information?", answer: "DNA.", tags: ['#biology', '#ch1'] }
        ],
        'biology-ch2': [
            { question: "What are the four main types of macromolecules?", answer: "Carbohydrates, lipids, proteins, and nucleic acids.", tags: ['#biology', '#ch2'] },
            { question: "What is the function of enzymes?", answer: "They speed up chemical reactions by lowering activation energy.", tags: ['#biology', '#ch2'] }
        ]
    };

    // Modal Elements
    const modal = document.getElementById('flashcard-modal');
    const modalClose = modal.querySelector('.close-btn');
    const flashcardElement = modal.querySelector('.flashcard');
    const flashcardFront = modal.querySelector('.front p');
    const flashcardBack = modal.querySelector('.back p');
    const prevCardBtn = document.getElementById('prev-card');
    const nextCardBtn = document.getElementById('next-card');
    const shuffleBtn = document.getElementById('shuffle-deck');

    let currentDeck = [];
    let currentCardIndex = 0;
    let isFlipped = false;

    // Load Flashcard
    function loadCard() {
        if (!currentDeck.length) return;
        const card = currentDeck[currentCardIndex];
        flashcardFront.textContent = card.question;
        flashcardBack.textContent = card.answer;
        isFlipped = false;
        flashcardElement.classList.remove('flipped');
    }

    // Open Deck
    document.querySelectorAll('.view-deck-btn').forEach(button => {
        button.addEventListener('click', () => {
            const deckName = button.getAttribute('data-deck');
            currentDeck = flashcardData[deckName] || [];
            currentCardIndex = 0;
            loadCard();
            modal.classList.remove('hidden');
        });
    });

    // Modal Controls
    modalClose.addEventListener('click', () => modal.classList.add('hidden'));

    flashcardElement.addEventListener('click', () => {
        isFlipped = !isFlipped;
        flashcardElement.classList.toggle('flipped', isFlipped);
    });

    prevCardBtn.addEventListener('click', () => {
        if (!currentDeck.length) return;
        currentCardIndex = (currentCardIndex - 1 + currentDeck.length) % currentDeck.length;
        loadCard();
    });

    nextCardBtn.addEventListener('click', () => {
        if (!currentDeck.length) return;
        currentCardIndex = (currentCardIndex + 1) % currentDeck.length;
        loadCard();
    });

    shuffleBtn.addEventListener('click', () => {
        if (!currentDeck.length) return;
        currentDeck = [...currentDeck].sort(() => Math.random() - 0.5);
        currentCardIndex = 0;
        loadCard();
    });
});
