const Countdown = {
	timer: 0, // durée de la réservation en millisecondes
	currentTime: 0, // heure actuelle
	deadLine: 0, // heure de fin de la réservation
	distance: 0,
	counter: undefined,
	minutes : 0,
	secondes: 0,
	interval: undefined,

	init: function() {
		this.counter = document.getElementById('countdown');
		this.deadLine = new Date().getTime();
		this.timer = 1200000;

		this.interval = setInterval(() => {
            this.decompte();
        }, 1000);
	},

	decompte: function() {
		// Récupération de l'heure actuelle en millisecondes
		this.currentTime = new Date().getTime();

		// Différence entre le temps de la réservation et l'heure actuelle
		this.distance = (this.deadLine + this.timer) - this.currentTime;

		this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
		this.secondes = Math.floor((this.distance % (1000 * 60)) / 1000);

		this.counter.innerHTML = "Temps restants " + this.minutes + " minutes et " + this.secondes + " secondes";

		// Enregistrement valeur pour sessionStorage
		sessionStorage.setItem('minutes', this.minutes);
		sessionStorage.setItem('secondes', this.secondes);

		if (this.distance < 0) {
			clearInterval(this.interval);
			this.counter.innerHTML = " La réservation a expirée.";
		}
	},
};

export default Countdown;
