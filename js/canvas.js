export default class Canvas {
  constructor() {
    this.canvasNode = document.getElementById('canvas');
    this.ctx = this.canvasNode.getContext('2d'); //récupère le contexte de l'objet
    this.ctx.clearRect(0, 0, 400, 300);
    this.started = false;
    this.paint = false;
    this.prevCursorX = undefined;
    this.prevCursorY = undefined;
    this.reserveButton = document.querySelector('.btn-reserve');
    this.btnReset = document.querySelector('.btn-reset');

    const offsetCanvas = this.canvasNode.getBoundingClientRect();

    this.canvasOffsetLeft = offsetCanvas.x;
    this.canvasOffsetTop = offsetCanvas.y;
    this.addEventListener();
  }

  // Add event listener
  addEventListener() {
    this.canvasNode.addEventListener('mousedown', (e) => {
      this.ctx.beginPath();
      const cursorX = e.clientX - this.canvasOffsetLeft;
      const cursorY = e.clientY - this.canvasOffsetTop;

      this.ctx.moveTo(cursorX, cursorY);

      this.prevCursorX = cursorX;
      this.prevCursorY = cursorY;
      this.paint = true;

      // Affichage du bouton réservation
      document.querySelector('#reserveButton').style.display = 'inline';
  });

    // Mouvement de la souris sur le Canvas
    this.canvasNode.addEventListener('mousemove', (e) => {
      this.drawLine(e);
    });

    // Relachement du click de la souris
    this.canvasNode.addEventListener('mouseup', () => {
      this.paint = false;
      this.ctx.closePath();
    });

    // Effacer le canvas et masquer le bouton réservation
    this.btnReset.addEventListener('click', () => {
      this.redraw();
      document.querySelector('#reserveButton').style.display = 'none';
    });
  }

  // Fonction du click
  drawLine(event) {
    if (!this.paint) {
      return;
    }

    const cursorX = event.clientX - this.canvasOffsetLeft;
    const cursorY = event.clientY - this.canvasOffsetTop;

    this.ctx.quadraticCurveTo(this.prevCursorX, this.prevCursorY, cursorX, cursorY);
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = '3';
    this.ctx.stroke();
    this.ctx.moveTo(this.prevCursorX, this.prevCursorY);
    this.prevCursorX = cursorX;
    this.prevCursorY = cursorY;
  };

  // Réinitialisation du canvas
  redraw() {
    this.ctx.clearRect(0, 0, 400, 300);
  };
}
