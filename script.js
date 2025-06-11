document.addEventListener('DOMContentLoaded', () => {

    // --- MODAL LOGIC (Yeh pehle jaisa hi hai) ---
    const modal = document.getElementById('movieModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalExtraDetails = document.getElementById('modalExtraDetails');
    const timerContainer = document.getElementById('timer-container');
    const closeButton = document.querySelector('.close-button');
    let timerId = null; 

    const openModal = (card) => {
        const title = card.dataset.title;
        const imgSrc = card.dataset.img;
        const description = card.dataset.description;
        const details = card.dataset.details;
        const downloadLink = card.dataset.downloadLink;

        modalTitle.textContent = title;
        modalImg.src = imgSrc;
        modalDescription.textContent = description;
        modalExtraDetails.textContent = details;
        
        modal.style.display = 'block';
        startTimer(downloadLink);
    };

    const closeModal = () => {
        modal.style.display = 'none';
        if (timerId) {
            clearInterval(timerId);
        }
        timerContainer.innerHTML = '';
    };

    const startTimer = (downloadLink) => {
        let timeLeft = 10;
        timerContainer.innerHTML = `<p class="timer-text">Download will start in ${timeLeft} seconds...</p>`;
        timerId = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                timerContainer.innerHTML = `<p class="timer-text">Download will start in ${timeLeft} seconds...</p>`;
            } else {
                clearInterval(timerId);
                timerContainer.innerHTML = `<a href="${downloadLink}" class="download-button" target="_blank">Download Now</a>`;
            }
        }, 1000);
    };

    // --- EVENT LISTENERS FOR MODAL ---
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });


    // --- CATEGORY FILTERING LOGIC (Naya Code Yahan hai) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const movieCards = document.querySelectorAll('.movie-card');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent page from jumping

            // Set active class on nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            const filter = link.dataset.filter;

            // Filter the movie cards
            movieCards.forEach(card => {
                const categories = card.dataset.category; // e.g., "drama thriller"
                
                // If filter is 'all' OR the card's categories include the filter
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden'); // Show card
                } else {
                    card.classList.add('hidden'); // Hide card
                }
            });
        });
    });
});
