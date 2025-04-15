// Function to capture all click events and page views
function captureEvent(event) {
    // Get the current timestamp
    const timestamp = new Date().toISOString();

    // Determine the type of event: click or view
    let eventType = 'click';
    if (event.type === 'DOMContentLoaded' || event.type === 'load') {
        eventType = 'view';
    }

    // Determine the event object (i.e., the element clicked)
    let eventObject = '';
    if (event.target.tagName) {
        eventObject = event.target.tagName.toLowerCase();  // Get the tag of the clicked element
        // Check for specific elements and add their class names or IDs for more details
        if (event.target.classList.length > 0) {
            eventObject += ' (Class: ' + event.target.classList[0] + ')';
        }
        if (event.target.id) {
            eventObject += ' (ID: ' + event.target.id + ')';
        }
    }

    // Print the captured data in the console
    console.log(`Timestamp: ${timestamp}, Event Type: ${eventType}, Event Object: ${eventObject}`);
}

// Add event listeners to capture clicks on the page
document.addEventListener('click', captureEvent);

// Capture page view event (DOMContentLoaded) when the page is loaded
window.addEventListener('DOMContentLoaded', captureEvent);
