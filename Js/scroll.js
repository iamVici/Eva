window.sections = Array.from(document.getElementsByClassName('section'));
let nextSectionScroll = 0;

console.log(sections); // Verifique se as seções estão sendo obtidas corretamente

const sectionPositions = [];
window.currentSectionIndex = 0; // Mova para o escopo global

// Calculate the total width of all the sections
const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);

// Set the width of the wrapper div dynamically
wrapper.style.width = `${totalWidth}px`;

// Add event listeners for horizontal scrolling
window.addEventListener('resize', calculateSectionPositions);

// Calculate the positions of each section
calculateSectionPositions();

function handleScroll(event) {
    console.log("Scroll event:", event); // Verifique se os eventos de rolagem estão funcionando corretamente

    // Get the current scroll position
    const currentScroll = wrapper.scrollLeft;
    console.log("Current scroll:", currentScroll); // Verifique o valor de currentScroll

    // Calculate the index of the next section based on the current scroll position and scroll direction
    let nextSectionIndex;
    if (event.deltaY < 0) {
        nextSectionIndex = Math.max(window.currentSectionIndex - 1, 0);
    } else {
        nextSectionIndex = Math.min(sectionPositions.findIndex((position) => position > currentScroll), sections.length - 1);
    }
    console.log("Next section index:", nextSectionIndex); // Verifique o valor de nextSectionIndex

    // Calculate the scroll position of the next section
    nextSectionScroll = sectionPositions[nextSectionIndex];
    console.log("Next section scroll:", nextSectionScroll); // Verifique o valor de nextSectionScroll

    // Use the ScrollToPlugin to smoothly scroll to the next section
    gsap.to(wrapper, {
        scrollLeft: nextSectionScroll,
        duration: 0.8,
        ease: Power2.easeOut,
        onComplete: function() {
            window.currentSectionIndex = nextSectionIndex; // Atualize a seção atual após a rolagem
        }
    });
}

function calculateSectionPositions() {
    sectionPositions.length = 0;

    sections.forEach((section) => {
        const position = section.offsetLeft;
        sectionPositions.push(position);
    });
}

// Add event listeners for horizontal scrolling
wrapper.addEventListener('wheel', handleScroll);
wrapper.addEventListener('touchmove', handleScroll);
