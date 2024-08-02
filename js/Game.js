class Game {
	constructor(size, period) {
		this.size = size;
		this.period = period;
		this.paused = true;
		this.generation = 0;
		this.grid = [];

		this.canvas = document.querySelector("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.addEventListeners();
		this.resetGrid();
		this.loop();
	}


	// Events
	addEventListeners() {
		// draw on hover
		this.canvas.addEventListener("mousemove", (e) => {
			if(this.paused) {
				let x = Math.floor(e.offsetX / (this.canvas.width / this.size));
				let y = Math.floor(e.offsetY / (this.canvas.height / this.size));
				this.draw();
				this.ctx.clearRect(x * this.canvas.width / this.size, y * this.canvas.height / this.size, this.canvas.width / this.size, this.canvas.height / this.size);
				this.ctx.beginPath();
				this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
				this.ctx.fillRect(x * this.canvas.width / this.size, y * this.canvas.height / this.size, this.canvas.width / this.size, this.canvas.height / this.size);
				this.ctx.stroke();
			}
		});

		// draw on click
		this.canvas.addEventListener("click", (e) => {
			if(this.paused) {
				let x = Math.floor(e.offsetX / (this.canvas.width / this.size));
				let y = Math.floor(e.offsetY / (this.canvas.height / this.size));
				this.grid[y][x] = this.grid[y][x] == 1 ? 0 : 1;
				this.draw();
			}
		});

		// import button
		document.getElementById("import").addEventListener("click", () => {
			this.pause();
		});
		document.getElementById("import").addEventListener("change", () => {
			this.resetGrid();
			let reader = new FileReader();
			reader.readAsText(document.getElementById("import").files[0],'UTF-8');
			reader.onload = readerEvent => {
				let data = JSON.parse(readerEvent.target.result);
				console.log(data);
				this.size = data.size;
				this.generation = data.generation;
				this.grid = data.grid;
			};
			this.draw();
		});

		// save button
		document.getElementById("save").addEventListener("click", () => {
			this.pause();
			let save = {
				size: this.size,
				generation: this.generation,
				grid: this.grid
			};
			let link = document.createElement('a');
			link.download = 'game-of-life_' + getTime() + '.json';
			link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(save));
			link.click();
			URL.revokeObjectURL(link.href);
		});

		// export button
		document.getElementById("export").addEventListener("click", () => {
			this.pause();
			let link = document.createElement('a');
			link.download = 'game-of-life_' + getTime() + '.png';
			link.href = this.canvas.toDataURL("image/png");
			link.click();
			URL.revokeObjectURL(link.href);
		});

		// play/pause button
		document.getElementById("play").addEventListener("click", () => {
			this.paused = !this.paused;
			document.getElementById("play").title = this.paused ? "Lecture" : "Pause";
			document.querySelector("#play img").src = this.paused ? "../../assets/icon/play.svg" : "../../assets/icon/pause.svg";
		});

		// step button
		document.getElementById("step").addEventListener("click", () => {
			this.pause();
			this.update();
			this.draw();
		});

		// randomize button
		document.getElementById("randomize").addEventListener("click", () => {
			for(let i=0; i<this.size; i++) {
				for(let j=0; j<this.size; j++)
					if(Math.random() > 0.5) this.grid[i][j] = 1;
					else this.grid[i][j] = 0;
			}
			this.generation = 0;
			this.draw();
		});

		// clear button
		document.getElementById("clear").addEventListener("click", () => {
			this.pause();
			for(let i=0; i<this.size; i++)
				for(let j=0; j<this.size; j++)
					this.grid[i][j] = 0;
			this.generation = 0;
			this.draw();
		});
	}


	// Methods

	// reset grid
	resetGrid() {
		this.generation = 0;
		this.grid = [];
		for(let i=0; i<this.size; i++) {
			this.grid.push([]);
			for(let j=0; j<this.size; j++)
				this.grid[i].push(0);
		}
	}

	// loop
	loop() {
		setInterval(() => {
			if(!this.paused) {
				this.update();
				this.draw();
			}
		}, this.period);
	}

	// update
	update() {
		let newGrid = [];
		for(let i=0; i<this.size; i++) {
			newGrid.push([]);
			for(let j=0; j<this.size; j++) {
				let count = this.grid[i][mod(j-1, this.size)]
							+ this.grid[mod(i+1, this.size)][mod(j-1, this.size)]
							+ this.grid[mod(i+1, this.size)][j]
							+ this.grid[mod(i+1, this.size)][mod(j+1, this.size)]
							+ this.grid[i][mod(j+1, this.size)]
							+ this.grid[mod(i-1, this.size)][mod(j+1, this.size)]
							+ this.grid[mod(i-1, this.size)][j]
							+ this.grid[mod(i-1, this.size)][mod(j-1, this.size)];
				if(count == 3 || (count == 2 && this.grid[i][j] == 1)) newGrid[i].push(1);
				else newGrid[i].push(0);
			}
		}
		this.grid = newGrid;
		this.generation++;
	}

	// draw
	draw() {
		this.drawGrid();
		this.drawGeneration();
	}

	// draw grid
	drawGrid() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.beginPath();
		this.ctx.fillStyle = "rgb(0, 0, 0)";
		for(let i=0; i<this.size; i++)
			for(let j=0; j<this.size; j++)
				if(this.grid[i][j]) this.ctx.fillRect(j * this.canvas.width / this.size, i * this.canvas.height / this.size, this.canvas.width / this.size, this.canvas.height / this.size);
		this.ctx.stroke();
	}

	drawGeneration() {
		document.querySelector("section > p").innerHTML = this.generation;
	}

	// pause
	pause() {
		this.paused = true;
		document.getElementById("play").title = "Lecture";
		document.querySelector("#play img").src = "../../assets/icon/play.svg";
	}
};