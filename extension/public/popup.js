// popup.js

// Request screen capture permissions using chrome.desktopCapture
chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], (streamId) => {
    if (!streamId) {
        console.error('Screen capture permission denied');
        return;
    }

    // Access the captured screen using the streamId
    navigator.mediaDevices.getUserMedia({
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            }
        }
    })
    .then((stream) => {
        // Handle the screen capture stream (e.g., start recording)
    })
    .catch((error) => {
        console.error('Error accessing screen capture stream:', error);
    });
});

// Request audio and video permissions
navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then((stream) => {
        // Handle the audio/video stream (e.g., start recording)
    })
    .catch((error) => {
        console.error('Error accessing audio/video devices:', error);
    });
