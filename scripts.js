document.addEventListener('DOMContentLoaded', function() {
    // Initialize confetti effect on welcome page
    if (document.getElementById('confetti-container')) {
        const confettiSettings = {
            target: 'confetti-container',
            max: 150,
            size: 1.5,
            animate: true,
            props: ['circle', 'square', 'triangle', 'line'],
            colors: [[255, 133, 162], [255, 192, 203], [255, 240, 243], [255, 92, 138]],
            clock: 25,
            rotate: true,
            width: window.innerWidth,
            height: window.innerHeight,
        };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
    }
    
    // Countdown Timer
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // Set the birthday date - modify this to the actual birthday
        const birthday = new Date('2025-03-15T00:00:00').getTime();
        
        // Update the countdown every second
        const countdownTimer = setInterval(function() {
            const now = new Date().getTime();
            const distance = birthday - now;
            
            // If the birthday has passed, show zeros
            if (distance < 0) {
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                clearInterval(countdownTimer);
                return;
            }
            
            // Calculate time units
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the countdown
            document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
        }, 1000);
    }
    
    // Gift Box Animation
    const giftBox = document.getElementById('gift-box');
    if (giftBox) {
        giftBox.addEventListener('click', function() {
            this.classList.toggle('opened');
            
            // Play confetti when gift is opened
            if (this.classList.contains('opened')) {
                const confettiSettings = {
                    target: 'confetti-container',
                    max: 200,
                    size: 1.5,
                    animate: true,
                    props: ['circle', 'square', 'triangle', 'line'],
                    colors: [[255, 133, 162], [255, 192, 203], [255, 240, 243], [255, 92, 138]],
                    clock: 25,
                    rotate: true,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
                const confetti = new ConfettiGenerator(confettiSettings);
                confetti.render();
                
                setTimeout(() => {
                    confetti.clear();
                }, 5000);
            }
        });
    }
    
    // Spin the Wheel
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin-button');
    const wheelResult = document.getElementById('wheel-result');
    
    if (wheel && spinButton) {
        let canSpin = true;
        let deg = 0;
        
        const prizes = [
            'Free Hug',
            'Movie Night',
            'Dinner Date',
            'Secret Gift',
            'Coffee Break',
            'Road Trip'
        ];
        
        spinButton.addEventListener('click', function() {
            if (!canSpin) return;
            
            // Reset result
            wheelResult.textContent = '';
            
            // Disable spinning
            canSpin = false;
            
            // Calculate a random spin between 5-10 rotations
            const spins = 5 + Math.random() * 5;
            const newDeg = deg + (spins * 360);
            
            // Smooth animation
            wheel.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
            wheel.style.transform = `rotate(${newDeg}deg)`;
            
            // Update current degree
            deg = newDeg;
            
            // Once the spinning is done, show the result
            setTimeout(() => {
                // Calculate which prize was won
                const actualDeg = deg % 360;
                const prizeIndex = Math.floor(actualDeg / (360 / prizes.length));
                const prize = prizes[prizeIndex];
                
                // Show result
                wheelResult.textContent = `You won: ${prize}!`;
                
                // Enable spinning again
                canSpin = true;
                
                // Show confetti for win
                const confettiSettings = {
                    target: 'confetti-container',
                    max: 100,
                    size: 1.5,
                    animate: true,
                    props: ['circle', 'square', 'triangle', 'line'],
                    colors: [[255, 133, 162], [255, 192, 203], [255, 240, 243], [255, 92, 138]],
                    clock: 25,
                    rotate: true,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
                const confetti = new ConfettiGenerator(confettiSettings);
                confetti.render();
                
                setTimeout(() => {
                    confetti.clear();
                }, 3000);
            }, 3000);
        });
    }
    
    // Photo Gallery Slideshow
    const photoItems = document.querySelectorAll('.photo-item');
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    const autoPlayBtn = document.getElementById('auto-play');
    
    if (photoItems.length > 0 && prevSlideBtn && nextSlideBtn && autoPlayBtn) {
        let currentSlide = 0;
        let slideInterval;
        let isPlaying = false;
        
        // Initialize gallery (hide all except first)
        for (let i = 1; i < photoItems.length; i++) {
            photoItems[i].style.display = 'none';
        }
        
        function showSlide(index) {
            // Hide all slides
            for (let i = 0; i < photoItems.length; i++) {
                photoItems[i].style.display = 'none';
                photoItems[i].style.opacity = '0';
            }
            
            // Show current slide with fade in effect
            photoItems[index].style.display = 'block';
            setTimeout(() => {
                photoItems[index].style.opacity = '1';
                photoItems[index].style.transition = 'opacity 0.5s ease';
            }, 50);
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % photoItems.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + photoItems.length) % photoItems.length;
            showSlide(currentSlide);
        }
        
        function toggleAutoPlay() {
            if (isPlaying) {
                clearInterval(slideInterval);
                autoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            } else {
                slideInterval = setInterval(nextSlide, 3000);
                autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }
        }
        
        // Event listeners
        nextSlideBtn.addEventListener('click', nextSlide);
        prevSlideBtn.addEventListener('click', prevSlide);
        autoPlayBtn.addEventListener('click', toggleAutoPlay);
    }
    // Video Gallery Slideshow
    const videoItems = document.querySelectorAll('.video-item');
    
    // Background Music Control
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    if (musicToggle && backgroundMusic) {
        let isMusicPlaying = false;
        
        musicToggle.addEventListener('click', function() {
            if (isMusicPlaying) {
                backgroundMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                backgroundMusic.play().catch(e => {
                    console.log('Audio play failed:', e);
                });
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            
            isMusicPlaying = !isMusicPlaying;
        });
    }
    
    // Mini Photos Functionality
    const miniPhotos = document.querySelectorAll('.mini-photo');
    
    if (miniPhotos.length > 0) {
        miniPhotos.forEach(photo => {
            photo.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                
                // Create fullscreen view
                const fullscreenView = document.createElement('div');
                fullscreenView.className = 'fullscreen-view';
                fullscreenView.style.position = 'fixed';
                fullscreenView.style.top = '0';
                fullscreenView.style.left = '0';
                fullscreenView.style.width = '100%';
                fullscreenView.style.height = '100%';
                fullscreenView.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                fullscreenView.style.zIndex = '2000';
                fullscreenView.style.display = 'flex';
                fullscreenView.style.justifyContent = 'center';
                fullscreenView.style.alignItems = 'center';
                
                // Create image element
                const fullImg = document.createElement('img');
                fullImg.src = imgSrc;
                fullImg.style.maxWidth = '90%';
                fullImg.style.maxHeight = '90%';
                fullImg.style.borderRadius = '10px';
                fullImg.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
                
                // Create close button
                const closeBtn = document.createElement('button');
                closeBtn.textContent = 'X';
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '20px';
                closeBtn.style.right = '20px';
                closeBtn.style.backgroundColor = 'var(--primary-pink)';
                closeBtn.style.color = 'white';
                closeBtn.style.border = 'none';
                closeBtn.style.borderRadius = '50%';
                closeBtn.style.width = '40px';
                closeBtn.style.height = '40px';
                closeBtn.style.fontSize = '20px';
                closeBtn.style.cursor = 'pointer';
                
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(fullscreenView);
                });
                
                // Append elements
                fullscreenView.appendChild(fullImg);
                fullscreenView.appendChild(closeBtn);
                
                // Add to body
                document.body.appendChild(fullscreenView);
            });
        });
    }
    
    // Dark Mode Toggle
    function createDarkModeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        toggle.style.position = 'fixed';
        toggle.style.bottom = '20px';
        toggle.style.right = '20px';
        toggle.style.width = '40px';
        toggle.style.height = '40px';
        toggle.style.borderRadius = '50%';
        toggle.style.backgroundColor = 'var(--primary-pink)';
        toggle.style.color = 'white';
        toggle.style.border = 'none';
        toggle.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.1)';
        toggle.style.zIndex = '1000';
        toggle.style.cursor = 'pointer';
        
        toggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                toggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                toggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        
        document.body.appendChild(toggle);
    }
    
    // Create dark mode toggle
    createDarkModeToggle();
});

document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.photo-row');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    let currentIndex = 0;

    function showRow(index) {
        rows.forEach(row => row.classList.remove('active'));
        rows[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % rows.length;
        showRow(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + rows.length) % rows.length;
        showRow(currentIndex);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const songItems = document.querySelectorAll('.song-item');

    songItems.forEach(songItem => {
        const playButton = songItem.querySelector('.play-button');
        const songSrc = songItem.getAttribute('data-src');

        playButton.addEventListener('click', () => {
            // Set the audio source
            audioPlayer.src = songSrc;

            // Play the song
            audioPlayer.play();

            // Update play button icon
            document.querySelectorAll('.play-button').forEach(button => {
                button.innerHTML = '<i class="fas fa-play"></i>';
            });
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        });
    });

    // Pause song when audio ends
    audioPlayer.addEventListener('ended', () => {
        document.querySelectorAll('.play-button').forEach(button => {
            button.innerHTML = '<i class="fas fa-play"></i>';
        });
    });
});

let currentlyPlaying = null;
let currentButton = null;

function playSong(songSrc, buttonElement) {
    const audioElement = buttonElement.parentElement.nextElementSibling.querySelector('audio');
    const iconElement = buttonElement.querySelector('i');

    if (currentlyPlaying && currentlyPlaying !== audioElement) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        currentButton.querySelector('i').classList.replace('fa-pause', 'fa-play');
    }

    if (audioElement.paused) {
        audioElement.play();
        iconElement.classList.replace('fa-play', 'fa-pause');
        currentlyPlaying = audioElement;
        currentButton = buttonElement;
    } else {
        audioElement.pause();
        iconElement.classList.replace('fa-pause', 'fa-play');
        currentlyPlaying = null;
        currentButton = null;
    }
}