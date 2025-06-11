document.addEventListener('DOMContentLoaded', () => {

    // Get all the elements we need
    const modal = document.getElementById('movieModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalExtraDetails = document.getElementById('modalExtraDetails');
    const timerContainer = document.getElementById('timer-container');
    const closeButton = document.querySelector('.close-button');
    const movieCards = document.querySelectorAll('.movie-card');

    let timerId = null; // To store the timer interval

    // Function to open the modal and populate it with data
    const openModal = (card) => {
        // Get data from the clicked card's data-* attributes
        const title = card.dataset.title;
        const imgSrc = card.dataset.img;
        const description = card.dataset.description;
        const details = card.dataset.details;
        const downloadLink = card.dataset.downloadLink;

        // Populate the modal with the data
        modalTitle.textContent = title;
        modalImg.src = imgSrc;
        modalDescription.textContent = description;
        modalExtraDetails.textContent = details;
        
        // Show the modal
        modal.style.display = 'block';
        
        // Start the timer
        startTimer(downloadLink);
    };

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
        // IMPORTANT: Clear the timer if the modal is closed early
        if (timerId) {
            clearInterval(timerId);
        }
        // Clear the timer container for the next use
        timerContainer.innerHTML = '';
    };

    // Function to start the 10-second timer
    const startTimer = (downloadLink) => {
        let timeLeft = 10;
        timerContainer.innerHTML = `<p class="timer-text">Download will start in ${timeLeft} seconds...</p>`;

        timerId = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                timerContainer.innerHTML = `<p class="timer-text">Download will start in ${timeLeft} seconds...</p>`;
            } else {
                clearInterval(timerId); // Stop the timer
                // Show the download button
                timerContainer.innerHTML = `<a href="${downloadLink}" class="download-button" target="_blank">Download Now</a>`;
            }
        }, 1000); // Run every 1 second
    };

    // Add click event listeners to all movie cards
    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card);
        });
    });

    // Add click event to the close button
    closeButton.addEventListener('click', closeModal);

    // Add click event to the modal background (to close it)
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

});
