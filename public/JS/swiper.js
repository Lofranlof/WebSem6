document.addEventListener('DOMContentLoaded', function() {
var swiper = new Swiper(".mySwiper", {
    effect: "flip",
    grabCursor: true,
    pagination: {
    el: ".swiper-pagination",
    },
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
});

// Get last slide and set up random audio functionality
var lastSlide = document.getElementById("lastSlide");
var audioElement = document.getElementById("randomAudio");
var audioSources = [
    "AUDIO/audio1.mp3",
    "AUDIO/audio2.mp3",
    "AUDIO/audio3.mp3",
    "AUDIO/audio4.mp3",
    "AUDIO/audio5.mp3",
    "AUDIO/audio6.mp3",
    "AUDIO/audio7.mp3",
    "AUDIO/audio8.mp3",
    "AUDIO/audio9.mp3",
    // Add more audio sources as needed
];

// Event listener for clicking on the last slide
lastSlide.addEventListener("click", function () {
    // Get a random audio source
    var randomIndex = Math.floor(Math.random() * audioSources.length);
    var randomAudioSource = audioSources[randomIndex];

    // Set the source of the audio element
    audioElement.src = randomAudioSource;

    // Play the audio
    audioElement.play();
});
})