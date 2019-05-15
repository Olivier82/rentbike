const Countdown = {
	timer: 0, // durée de la réservation en millisecondes
	currentTime: 0, // heure actuelle
	deadLine: 0, // heure de fin de la réservation
	distance: 0,
	counter: undefined,
	minutes : 0,
	secondes: 0,

	init: function() {
		this.counter = document.getElementById('countdown');
		this.deadLine = new Date().getTime();
		this.timer = 1200000;

		setInterval(() => {
            this.decompte();
        }, 1000);
	},

	decompte: function() {
		this.currentTime = new Date().getTime(); // Récupération de l'heure actuelle en millisecondes

		this.distance = (this.deadLine + this.timer) - this.currentTime; // Différence entre le temps de la réservation et l'heure actuelle

		this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
		this.secondes = Math.floor((this.distance % (1000 * 60)) / 1000);

		document.getElementById('countdown').innerHTML = "Temps restants " + this.minutes + " minutes et " + this.secondes + " secondes";

		if (this.distance < 0 ) {
			clearInterval(x);
			document.getElementById('countdown').innerHTML = " La réservation a expirée.";
		}
	},
};


export default Countdown;
