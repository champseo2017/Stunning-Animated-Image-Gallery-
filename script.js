var images = document.querySelector(".images");
var isDown = false;
var isTouch = false;
var prevX = 0;
var prevY = 0;
var currentX = images.offsetWidth / -2;
var currentY = images.offsetHeight / -2;

var currentXtmp = 0;
var currentYtmp = 0;

var onDown = (e) => {
  prevX = e.clientX;
  prevY = e.clientY;
  isDown = true;
};

var onMove = (e) => {
  if (!isDown) return;
  var delTaX = Math.min(
    Math.max(e.clientX - prevX + currentX, -images.offsetWidth),
    0
  );
  var delTaY = Math.min(
    Math.max(e.clientY - prevY + currentY, -images.offsetHeight),
    0
  );

  currentXtmp = delTaX;
  currentYtmp = delTaY;

  images.animate(
    {
      transform: `translate(${delTaX}px, ${delTaY}px)`,
    },
    {
      duration: isTouch ? 0 : 800,
      fill: "forwards",
    }
  );
};

var onUp = (e) => {
  currentX = currentXtmp;
  currentY = currentYtmp;
  isDown = false;
};

this.onmousedown = onDown;
this.onmousemove = onMove;
this.onmouseup = onUp;
