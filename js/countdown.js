const Countdown = {
	timer: 0, // durée de la réservation en millisecondes
	currentTime: 0, // heure actuelle
	deadLine: 0, // heure de fin de la réservation
	distance: 0,
	counter: undefined,
	minutes : 0,
	secondes: 0,
	millisecondes: 0,
	interval: undefined,

	init(deadLine = new Date().getTime()) {
		this.counter = document.getElementById('countdown');
		this.deadLine = deadLine;
		this.timer = 1200000;
		this.millisecondes = 60000;

		this.interval = setInterval(() => {
			this.decompte();
		}, 1000);
	},

	decompte() {
		// Récupération de l'heure actuelle en millisecondes
		this.currentTime = new Date().getTime();

		// Différence entre le temps de la réservation et l'heure actuelle
		this.distance = (this.deadLine + this.timer) - this.currentTime;

		// Conversion millisecondes en minutes et secondes
		this.minutes = Math.floor(this.distance  / this.millisecondes);
		this.secondes = Math.floor(this.distance % this.millisecondes / 1000);

		this.counter.innerHTML = `Temps restant  ${this.minutes} minutes et ${this.secondes} secondes`;

		// Stockage du compte à rebours dans le sessionStorage
		sessionStorage.setItem('deadLine', this.deadLine);

		if (this.distance === 0) {
			clearInterval(this.interval);
			this.counter.innerHTML = `La réservation a expirée.`;
		}
	},

	loadValues() {
		if (sessionStorage.getItem('station')) {
			this.init(parseInt(sessionStorage.getItem('deadLine')));
		}
	},
};

export default Countdown;
