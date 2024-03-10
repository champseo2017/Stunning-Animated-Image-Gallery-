var images = document.querySelector(".images"); // หา element ที่มี class .images
var isDown = false; // ตรวจสอบว่าเมาส์ถูกกดหรือไม่
var isTouch = false; // ตรวจสอบว่ามีการสัมผัสหรือไม่
var prevX = 0; // ตำแหน่ง X เริ่มต้น
var prevY = 0; // ตำแหน่ง Y เริ่มต้น
var currentX = images.offsetWidth / -2; // ตำแหน่ง X ปัจจุบันของ images
var currentY = images.offsetHeight / -2; // ตำแหน่ง Y ปัจจุบันของ images

var currentXtmp = 0; // ตำแหน่ง X ชั่วคราว
var currentYtmp = 0; // ตำแหน่ง Y ชั่วคราว

var onDown = (e) => {
  prevX = e.clientX; // บันทึกตำแหน่ง X เมื่อเมาส์กด
  prevY = e.clientY; // บันทึกตำแหน่ง Y เมื่อเมาส์กด
  isDown = true; // ตั้งค่าเมาส์เป็นกด
};

var onMove = (e) => {
  if (!isDown) return; // ถ้าเมาส์ไม่ได้กด ไม่ทำอะไร
  // คำนวณตำแหน่งใหม่ และจำกัดให้อยู่ในขอบเขต
  // คำนวณ delTaX และ delTaY เพื่อหาค่าตำแหน่งใหม่สำหรับการเคลื่อนที่ของ images
  var delTaX = Math.min(
    Math.max(e.clientX - prevX + currentX, -images.offsetWidth), // คำนวณตำแหน่ง X ใหม่ และใช้ Math.max เพื่อจำกัดค่าต่ำสุดไม่ให้น้อยกว่า -images.offsetWidth
    0 // ใช้ Math.min เพื่อจำกัดค่าสูงสุดไม่ให้เกิน 0
  );
  var delTaY = Math.min(
    Math.max(e.clientY - prevY + currentY, -images.offsetHeight), // คำนวณตำแหน่ง Y ใหม่ และใช้ Math.max เพื่อจำกัดค่าต่ำสุดไม่ให้น้อยกว่า -images.offsetHeight
    0 // ใช้ Math.min เพื่อจำกัดค่าสูงสุดไม่ให้เกิน 0
  );
  // ส่วนนี้ทำหน้าที่คำนวณตำแหน่งใหม่สำหรับ images โดยพิจารณาจากตำแหน่งเดิมและการเคลื่อนที่ของเมาส์
  // และจำกัดตำแหน่งใหม่ไม่ให้เกินขอบเขตที่กำหนด เพื่อไม่ให้ images ถูกลากออกจากพื้นที่ที่มองเห็นได้

  currentXtmp = delTaX; // อัปเดตตำแหน่ง X ชั่วคราว
  currentYtmp = delTaY; // อัปเดตตำแหน่ง Y ชั่วคราว

  // ทำการเคลื่อนที่ images
  images.animate(
    {
      transform: `translate(${delTaX}px, ${delTaY}px)`,
    },
    {
      duration: isTouch ? 0 : 800, // ถ้าสัมผัสใช้เวลา 0, ไม่งั้น 800 ms
      fill: "forwards", // รักษาสถานะหลัง animation
    }
  );
};

var onUp = (e) => {
  currentX = currentXtmp; // อัปเดตตำแหน่ง X ปัจจุบัน
  currentY = currentYtmp; // อัปเดตตำแหน่ง Y ปัจจุบัน
  isDown = false; // ตั้งค่าเมาส์เป็นไม่กด
};

// กำหนด event handlers สำหรับการกดเมาส์, เคลื่อนที่เมาส์, และปล่อยเมาส์
this.onmousedown = onDown;
this.onmousemove = onMove;
this.onmouseup = onUp;
