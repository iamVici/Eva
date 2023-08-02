const bigBall = document.querySelector(".cursor__ball--big");
const smallBall = document.querySelector(".cursor__ball--small");
const hoverables = document.querySelectorAll(".hoverable");

// Listeners
document.body.addEventListener("mousemove", onMouseMove);
hoverables.forEach(item => {
  item.addEventListener("mouseenter", onMouseHover);
  item.addEventListener("mouseleave", onMouseHoverOut);
});

// Move the cursor
function onMouseMove(e) {
  TweenMax.to(bigBall, 0.4, {
    x: e.pageX - 15,
    y: e.pageY - 15
  });
  TweenMax.to(smallBall, 0.1, {
    x: e.pageX - 5,
    y: e.pageY - 13
  });

  // Manually trigger a wheel event
  const wheelEvent = new WheelEvent("wheel", {
    deltaX: e.movementX,
    deltaY: e.movementY
  });
  document.body.dispatchEvent(wheelEvent);
}

// Hover an element
function onMouseHover() {
  TweenMax.to(bigBall, 0.3, {
    scale: 4
  });
}

function onMouseHoverOut() {
  TweenMax.to(bigBall, 0.3, {
    scale: 1
  });
}
