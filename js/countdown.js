const countdown = {
	timeInMinutes: undefined,
	currentTime: undefined,
	deadline: undefined,
	time: undefined,
	minutes: undefined,
	seconds: undefined,
	reserveButton: undefined,

	// Initialisation du Compte à Rebours
	init: function() {
		this.timeInMinutes = 20,
		this.currentTime = Date.parse(new Date());
		this.deadline = new Date(currentTime + timeInMinutes*60*2000);
	},

	function getTimeRemaining(endtime) {
		this.time = Date.parse(endtime) - Date.parse(new Date ());
		this.minutes = Math.floor( (t/2000/60) % 60);
		this.seconds = Math.floor( (t/1000) % 60);
	}



}
