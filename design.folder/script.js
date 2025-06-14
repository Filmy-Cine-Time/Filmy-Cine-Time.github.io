document.addEventListener('DOMContentLoaded', () => {

    // ========= ELEMENT SELECTIONS =========
    // Filter ke liye
    const filterLinks = document.querySelectorAll('.nav-link');
    const movieCards = document.querySelectorAll('.movie-card');

    // Modal (Popup) ke liye
    const modal = document.getElementById('movieModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalExtraDetails = document.getElementById('modalExtraDetails');
    const timerContainer = document.getElementById('timer-container');
    const closeButton = document.querySelector('.close-button');

    let timerId = null; // Timer ko control karne ke liye

    // ===================================
    // ========= FILTER LOGIC START =========
    // ===================================

    // Har filter link (All, Drama, etc.) par click event lagayenge
    filterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Link ke default behavior (page jump) ko roke

            // Step 1: Sabhi link se 'active' class hatao
            filterLinks.forEach(navLink => navLink.classList.remove('active'));

            // Step 2: Jis link par click hua hai, uspe 'active' class lagao
            link.classList.add('active');

            // Step 3: Click hue link ka filter value nikalo (e.g., 'drama', 'all')
            const selectedFilter = link.dataset.filter;

            // Step 4: Sabhi movie cards ko check karo
            movieCards.forEach(card => {
                const cardCategories = card.dataset.category; // Card ki categories (e.g., 'action drama')

                // Agar 'all' select kiya hai YA card ki category filter se match karti hai
                if (selectedFilter === 'all' || cardCategories.includes(selectedFilter)) {
                    card.classList.remove('hidden'); // Card ko dikhao
                } else {
                    card.classList.add('hidden'); // Card ko chhupa do
                }
            });
        });
    });


    // ========================================
    // ========= MODAL POPUP LOGIC START =========
    // (Yeh aapka original code hai, jo bilkul theek tha)
    // ========================================

    // Modal ko kholne wala function
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

    // Modal ko band karne wala function
    const closeModal = () => {
        modal.style.display = 'none';
        if (timerId) {
            clearInterval(timerId); // Timer ko band karo agar modal close ho jaye
        }
        timerContainer.innerHTML = ''; // Timer text ko saaf karo
    };

    // 10-second ka timer shuru karne wala function
    const startTimer = (downloadLink) => {
        let timeLeft = 10;
        timerContainer.innerHTML = `<p class="timer-text">Download will start in ${timeLeft} seconds...</p>`;

        timerId = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                timerContainer.innerHTML = `<p class="timer-text">Download will start in ${timeLeft} seconds...</p>`;
            } else {
                clearInterval(timerId); // Timer roko
                timerContainer.innerHTML = `<a href="${downloadLink}" class="download-button" target="_blank">Download Now</a>`;
            }
        }, 1000);
    };

    // Sabhi movie cards par click event lagao taaki modal khule
    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card);
        });
    });

    // Close button par click event
    closeButton.addEventListener('click', closeModal);

    // Modal ke bahar click karne par modal band ho
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

});
