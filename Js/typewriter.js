let textList = ["Identidade Visual", "Website", "Stream Pack", "Social Media"];
let currentIndex = 0;
let textPosition = 0;
let waitEndOfText = false;
let endOfTextWaitTime = 1000; 

let destination = document.getElementById('typewriter');
let text = textList[currentIndex];

function typeWriter() {
  if (!waitEndOfText) {
    if (textPosition < text.length) {
      destination.textContent += text[textPosition];
      textPosition++;
    } else {
      waitEndOfText = true;
      setTimeout(function(){
        destination.textContent = '';
        currentIndex++;
        if (currentIndex == textList.length) {
          currentIndex = 0;
        }
        text = textList[currentIndex];
        textPosition = 0;
        waitEndOfText = false;
      }, endOfTextWaitTime);
    }
  }
}

setInterval(typeWriter, 200);