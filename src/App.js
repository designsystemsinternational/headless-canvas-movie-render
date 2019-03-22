import React, { Component } from 'react';
import bruce from './images/bruce.jpg';

import css from './App.css';

const w = 500;
const h = 350;

class App extends Component {
	constructor(props) {
		super(props);
		this.draw = this.draw.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);

		this.textPos = 0;
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		console.log('mounted');
		this.ctx = this.canvasRef.current.getContext('2d', { alpha: false });
		this.draw();
	}

	start() {
		console.log('starting');
		this.capturer = new CCapture({ format: 'webm' });
		this.capturer.start();
	}

	stop() {
		console.log('stopping');
		this.capturer.stop();
		this.capturer.save();
	}

	draw() {
		requestAnimationFrame(this.draw);

		this.textPos = this.textPos > w ? 0 : this.textPos + 1;

		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, w, h);
		this.ctx.font = `80px Arial`;
		this.ctx.fillStyle = '#FF0000';
		this.ctx.fillText('Bruce Springsteen', this.textPos, h);
		this.ctx.fillText('Bruce Springsteen', 500 - this.textPos, 57);

		if (this.capturer) {
			this.capturer.capture(this.canvasRef.current);
		}
	}

	render() {
		return (
			<div className={css.root}>
				<div>
					<button onClick={this.start}>Start</button>
					<button onClick={this.stop}>Stop</button>
				</div>
				<canvas width={w} height={h} ref={this.canvasRef} />
			</div>
		);
	}
}

export default App;
