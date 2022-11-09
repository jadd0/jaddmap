<script lang="ts">
	// TODO display menu to customise the node
	/* DISPLAY MENU
				- change text
				- change colour

		 DOUBLE CLICK
				- add node to clicked node
				- need to change line to base off which is parent node

		 fix lines
		 make zoomable
		 make saveable
		 make login
		 make ability to change colours
		*/

	let nodes: {
		type: string;
		num: number;
		top: number;
		left: number;
		parentNum: any;
	}[] = [];
	let moving: boolean = false;
	let currentNum: any = 0;
	let number: number = 0;

	function rightClick(e: any) {
		e.preventDefault();
		const idNum = getNode(e);
		console.log(idNum);
	}

	function createNode(parent: number) {
		number += 1;
		console.log(parent);
		const node = {
			type: 'node',
			num: number,
			top: 100,
			left: 100,
			parentNum: parent,
		};
		// console.log(nodes.push(node))
		nodes.push(node);
		nodes = nodes;
		drawLines();
		// console.log('last', nodes);
	}

	function deleteNode(e: any) {
		const idNum: number = getNode(e);
		if (idNum == 1) {
			return;
		}
		console.log(idNum);
		console.log('first', nodes);

		nodes = [...nodes.filter((value) => value != undefined)];
		nodes = [...nodes.filter((value) => value.num != idNum)];

		drawLines();
		console.log('last', nodes);
	}

	function getNode(e: any) {
		let id: any = '';
		if (e.originalTarget.tagName == 'H1') {
			id = e.originalTarget.parentNode.id;
		} else {
			id = e.originalTarget.id;
		}

		const idNum: number = id.split('num')[1];

		return idNum;
	}

	function drawLine(
		ctx: any,
		begin: any,
		end: any,
		stroke = 'black',
		width = 1
	) {
		let start = { x: begin[0], y: begin[1] };
		let cp1 = { x: start.x * 1.02, y: start.y * 1.29 };
		let cp2 = { x: end[0] * 0.84, y: end[1] * 0.53 };
		let end1 = { x: end[0], y: end[1] };

		// TODO make a point outside of node to connect to (like minemeister)


		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end1.x, end1.y);
		ctx.lineWidth = end[0] === nodes[0].left ? '5' : '3';
		ctx.stroke();

		// if (end[0] > begin[0]) {
		// 	ctx.quadraticCurveTo(begin[0] + 200, begin[1] + 10, end[0] + 10, end[1]);
		// 	ctx.lineWidth = end[0] === nodes[0].left ? '5' : '3';
		// 	ctx.stroke();
		// 	return;
		// }

		// ctx.quadraticCurveTo(begin[0] - 200, begin[1] - 10, end[0] + 10, end[1]);
		// ctx.lineWidth = end[0] === nodes[0].left ? '5' : '3';
		// ctx.stroke();
		// ctx.bezierCurveTo(0.02, 0.29, 0.94, 0.53);

		// ctx.lineTo(nodes[0].left, nodes[0].top);
	}

	function drawLines() {
		const canvas = <HTMLCanvasElement>document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let node: number = 0;
		for (let node = 0; node < nodes.length; node++) {
			if (node == 0) continue;
			const parent = nodes.find((value) => value.num == nodes[node].parentNum);
			drawLine(
				ctx,
				[nodes[node].left, nodes[node].top],
				[parent.left, parent.top],
				'green',
				5
			);
		}
	}

	function onMouseDown(e: any) {
		const idNum = getNode(e);
		currentNum = idNum;
		moving = true;
	}

	function onMouseMove(e: any) {
		// const idNum = getNode(e);

		let obj = nodes.find((value) => value.num == currentNum);

		if (obj == undefined) return;

		if (moving) {
			obj.left += e.movementX;
			obj.top += e.movementY;
		}
		// console.log(nodes)
		// nodes[currentNum] = obj;
		nodes = [...nodes];
		// console.log(nodes)
		const canvas = <HTMLCanvasElement>document.getElementById('canvas');
		if (canvas == undefined) return;

		if (canvas.getContext) {
			let ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let node = 0; node < nodes.length; node++) {
				if (nodes[node].num == obj.num || node == 0) continue;
				// console.log(node == 0)
				ctx = canvas.getContext('2d');

				const parent = nodes.find(
					(value) => value.num == nodes[node].parentNum
				);
				if (parent == undefined) {
					console.log('oops, no parent');
				}
				drawLine(
					ctx,
					[nodes[node].left, nodes[node].top],
					[parent.left, parent.top],
					'green',
					5
				);
			}
			if (obj == nodes[0]) return;
			const parent = nodes.find((value) => value.num == obj.parentNum);
			drawLine(ctx, [obj.left, obj.top], [parent.left, parent.top], 'green', 5);
		}
	}

	function onMouseUp() {
		currentNum = null;
		moving = false;
	}

	function rename() {
		console.log('hel');
	}
</script>

<svelte:window
	on:contextmenu={rightClick}
	on:mouseup={onMouseUp}
	on:mousemove={onMouseMove}
/>

<body>
	<div id="controls">
		<button
			on:click={() => {
				createNode(1);
			}}>New node</button
		>
	</div>

	<!-- <div class="actionsContainer">
		<div class="option top" on:click={rename}>
			<h2>Rename</h2>
		</div>
		<div class="option">

		</div>
		<div class="option">

		</div>
		<div class="option">

		</div>
		<div class="option bottom">

		</div>
	</div> -->

	<canvas id="canvas" width="2000" height="1000" />
	<div id="canvas1" width="2000" height="1000">
		{#each nodes as node}
			<div
				on:dblclick={() => {
					createNode(node.num);
				}}
			>
				<section
					on:mousedown={onMouseDown}
					style="left: {node.left}px; top: {node.top}px;"
					class="draggable"
					id="num{node.num}"
				>
					Drag me {node.num}
				</section>
			</div>
		{/each}
	</div>
</body>

<style>
	.actionsContainer {
		width: 220px;
		height: 280px;
		background: #141414;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 15px;
		position: absolute;
	}

	.option {
		height: 50px;
		width: 90%;
		border-radius: 5px;
		background: none;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 0.2s ease-in-out;
		cursor: pointer;
	}

	.option:hover {
		background: #404040;
	}

	h2 {
		color: white;
	}

	#canvas1 {
		width: 100vw;
		height: 100vh;
		z-index: 0;
		background: white;
	}

	canvas {
	}
	.draggable {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: absolute;
		transition: transform 0.2s;
		background: red;
		width: 10px;
		height: 10px;
		z-index: 1;
		/* background: black */
	}

	.draggable:active {
		background: blue;
		transform: scale(1.1);
		z-index: 999;
	}
</style>
