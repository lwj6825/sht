export default class PointLine {
    constructor() {
      this.canvas = document.querySelector('#canvas');
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight -4;
      this.minLength = 200;
      this.rRange = 10;
      this.minR = 4;
      this.number = 50;
      this.pointArr = [];
      this.colorArr = ['#f9dcd7', '#d7ede8', '#d8d8d8', 'pink'];
      this.addPiont();
      this.loop();
    }
  
    addPiont() {
      for (let i = 0; i < this.number; i++) {
        this.pointArr.push({
          x: Math.floor(this.canvas.width * Math.random()),
          y: Math.floor(this.canvas.height * Math.random()),
          r: Math.floor(this.rRange * Math.random()) + this.minR,
          mx: Math.floor(Math.random() * 3) - 2,
          my: Math.floor(Math.random() * 3) - 2,
          color: this.colorArr[Math.floor(Math.random() * this.colorArr.length)]
        })
      }
    }
  
    drawPoint(x, y, r, color) {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.arc(x, y, r, 0, Math.PI * 2, false);
      this.ctx.fill();
    }
  
    drawLine(x1, y1, x2, y2) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#ebeef5';
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  
    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.pointArr.forEach((point) => {
        this.pointArr.forEach((endPonit) => {
          if (Math.pow(point.x - endPonit.x, 2) + Math.pow(point.y - endPonit.y, 2) < Math.pow(this.minLength, 2)) {
            this.drawLine(point.x, point.y, endPonit.x, endPonit.y)
          }
        })
      })
      this.pointArr.forEach((point) => {
        this.drawPoint(point.x, point.y, point.r, point.color);
      })
    }
  
    move() {
      this.pointArr.forEach((point) => {
        point.x += point.mx;
        point.y += point.my;
        if (point.x >= (this.canvas.width - point.r) || (point.x - point.r) < 0) {
          point.mx = -point.mx;
          return
        }
        if (point.y >= (this.canvas.height - point.r) || (point.y - point.r) < 0) {
          point.my = -point.my;
          return
        }
      })
    }
  
    loop() {
      this.move();
      this.render();
      // const requestId = requestAnimationFrame(this.loop.bind(this));
      const requestId = requestAnimationFrame(() => {this.loop()});
    }
  
  }
  