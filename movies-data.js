// movies-data.js

// NAYI MOVIE ADD KARNE KE LIYE, NEECHE DIYE GAYE FORMAT MEIN EK NAYA OBJECT ADD KAREIN.
// Sabse nayi movie ko list mein sabse UPAR rakhein.

// movies-data.js
const movies = [
    { // NAYI MOVIE KA DATA YAHAN PASTE KAREIN AUR EDIT KAREIN
        id: "Raid_2", // Ek unique ID, kuch bhi rakh sakte hain (e.g., movie-ka-naam-2024)
        title: "Raid_2",
        poster: "raid 2.jpg", // images/ folder mein poster ka path
        releaseDate: "27 June 2024",
        genre: "Sci-fi, Action, Drama",
        director: "Nag Ashwin",
        cast: "Prabhas, Amitabh Bachchan, Kamal Haasan, Deepika Padukone, Disha Patani",
        description: "In 1989 Rajasthan, IPS officer Patnaik raids a palace but fails. After requesting a bribe, he's transferred to Bhoj, where he investigates Dada Bhai, a respected local figure. Suspended after a failed raid, he uncovers hidden truths.",
        // IMPORTANT: Yahan woh FINAL download link daalein jo timer ke baad khulna chahiye
        // Yeh woh link hai jo aap pehle DAILY_DOWNLOAD_LINK mein daal rahe the.
        // Ab har movie ka apna alag final link hoga.
        // Example: "https://linksense.in/YOUR_KALKI_LINK"
        actualDownloadLink: "https://example.com/kalki-download-link"
    },
   
    {
        id: "movie2",
        title: "ब्रह्मास्त्र (Brahmastra)",
        poster: "images/movie-poster-2.jpg", // images/ folder mein poster ka path
        releaseDate: "9 सितम्बर 2022",
        genre: "फैंटेसी, एक्शन, एडवेंचर",
        director: "अयान मुखर्जी",
        cast: "रणबीर कपूर, आलिया भट्ट, अमिताभ बच्चन",
        description: "शिवा, एक डीजे, अपनी शक्तियों की खोज करता है और ब्रह्मास्त्र की रक्षा के लिए एक प्राचीन समाज से जुड़ता है...",
        actualDownloadLink: "https://example.com/brahmastra-download-link" // Example link
    },
    {
        id: "movie1",
        title: "पठान (Pathaan)",
        poster: "images/movie-poster-1.jpg", // images/ folder mein poster ka path
        releaseDate: "25 जनवरी 2023",
        genre: "एक्शन, थ्रिलर",
        director: "सिद्धार्थ आनंद",
        cast: "शाहरुख खान, दीपिका पादुकोण, जॉन अब्राहम",
        description: "पठान, एक भारतीय जासूस, एक खतरनाक आतंकवादी संगठन के नेता को रोकने के लिए एक मिशन पर है...",
        actualDownloadLink: "https://example.com/pathaan-download-link" // Example link
    },
    // Nayi movies yahan add karte jaayein, upar wale format ko copy-paste karke.
];
