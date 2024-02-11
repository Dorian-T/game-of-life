window.onload = () => {
	game = new Game(100, 100);
}


// Functions

// positive modulo
function mod(n, m) {
	return ((n % m) + m) % m;
}

// get date and time
function getTime() {
	let date = new Date();
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + "-" + date.getMilliseconds();
}