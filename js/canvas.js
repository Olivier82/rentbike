export default class Canvas {
  constructor() {
    this.canvasNode = document.getElementById('canvas');
    this.ctx = this.canvasNode.getContext('2d'); //récupère le contexte de l'objet
    this.ctx.clearRect(0, 0, 600, 300);
    this.started = false;
    this.paint = false;
    this.prevCursorX = undefined;
    this.prevCursorY = undefined;
    this.btnReset = document.querySelector('.btn-reset');
    this.drawing();
  }

  // Dessin
  drawing () {
    this.canvasNode.addEventListener('mousedown', (e) => {
      this.ctx.beginPath();
      const cursorX = e.clientX - this.canvasNode.offsetLeft;
      const cursorY = e.clientY - this.canvasNode.offsetTop;

      this.ctx.moveTo(cursorX, cursorY);

      this.prevCursorX = cursorX;
      this.prevCursorY = cursorY;
      this.paint = true;
    });

    // Mouvement de la souris sur le Canvas
    this.canvasNode.addEventListener('mousemove', (e) => {
      this.drawLine(e);
    });

    // Relachement du click de la souris
    this.canvasNode.addEventListener('mouseup', (e) => {
      this.paint = false;
      this.ctx.closePath();
    });
  }

  // Fonction du click
  drawLine(event) {
    if (this.paint) {
      const cursorX = event.clientX - this.canvasNode.offsetLeft;
      const cursorY = event.clientY - this.canvasNode.offsetTop;

      this.ctx.quadraticCurveTo(this.prevCursorX, this.prevCursorY, cursorX, cursorY);
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = '3';
      this.ctx.stroke();
      this.ctx.moveTo(this.prevCursorX, this.prevCursorY);
      this.prevCursorX = cursorX;
      this.prevCursorY = cursorY;
    }
  };

  // Réinitialisation du canvas
  redraw() {
    this.ctx.clearRect(0, 0, 600, 300);
  }
}
