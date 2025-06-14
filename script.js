document.addEventListener('DOMContentLoaded', () => {

    // ========= ELEMENT SELECTIONS =========
    const filterLinks = document.querySelectorAll('.nav-link');
    const movieCards = document.querySelectorAll('.movie-card');
    const modal = document.getElementById('movieModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalExtraDetails = document.getElementById('modalExtraDetails');
    const timerContainer = document.getElementById('timer-container');
    const closeButton = document.querySelector('.close-button');

    let timerId = null; 

    // ===================================
    // ========= FILTER LOGIC =========
    // ===================================
    filterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            filterLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            const selectedFilter = link.dataset.filter;

            movieCards.forEach(card => {
                const cardCategories = card.dataset.category;
                if (selectedFilter === 'all' || cardCategories.includes(selectedFilter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ========================================
    // ========= MODAL POPUP LOGIC =========
    // ========================================

    // Modal ko kholne wala function
    const openModal = (card) => {
        if (!card) return; // Agar card na mile to kuch na kare
        
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
        document.body.style.overflow = 'hidden'; // Stop background scroll
        startTimer(downloadLink);
    };

    // Modal ko band karne wala function
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable background scroll
        if (timerId) {
            clearInterval(timerId); 
        }
        timerContainer.innerHTML = ''; 
        // URL se movie hash ko hatao taaki URL clean ho jaye
        history.pushState("", document.title, window.location.pathname + window.location.search);
    };

    // Timer shuru karne wala function
    const startTimer = (downloadLink) => {
        let timeLeft = 20;
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

    // ===============================================
    // ========= URL HANDLING & CLICK EVENTS =========
    // ===============================================

    // Har movie card par click event
    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.dataset.id;
            // URL hash ko update karo, isse 'hashchange' event trigger hoga
            window.location.hash = `movie=${movieId}`;
        });
    });

    // Function to check URL and open modal
    const checkUrlForMovie = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#movie=')) {
            const movieId = hash.substring(7); // '#movie=' ke baad ka text nikalo
            const cardToOpen = document.querySelector(`.movie-card[data-id='${movieId}']`);
            if (cardToOpen) {
                openModal(cardToOpen);
            }
        }
    };

    // Jab hash change ho (user back/forward kare ya link pe click ho) to modal kholo/band karo
    window.addEventListener('hashchange', checkUrlForMovie);

    // Page load hote hi URL check karo
    checkUrlForMovie();
    
    // Close button par click
    closeButton.addEventListener('click', closeModal);

    // Modal ke bahar click karne par modal band ho
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});
