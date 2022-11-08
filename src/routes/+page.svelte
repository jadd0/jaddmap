<script lang="ts">
	// TODO work out why not removed from array NEED TO UPDATE NODES
	let nodes: { type: string; num: number; top: number; left: number }[] = [];
	let moving: boolean = false;
	let currentNum: any = 0;
	let number: number = 0;

	function createNode() {
		console.log('first', nodes);
		// let last: number = 0;

		// if (nodes.length != 0) {
		// 	last = nodes[nodes.length - 1].num + 1;
		// }

		// console.log(last)
		number += 1;

		const node = {
			type: 'node',
			num: number,
			top: 100,
			left: 100,
		};
		// console.log(nodes.push(node))
		nodes.push(node);
		nodes = nodes;
		drawLines();
		console.log('last', nodes);
	}

	function deleteNode(e: any) {
		const idNum: number = getNode(e);
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
		// if (stroke) {
		// 	ctx.strokeStyle = stroke;
		// }

		// if (width) {
		// 	ctx.lineWidth = width;
		// }

		// ctx.beginPath();
		// ctx.moveTo(...begin);
		// ctx.lineTo(...end);
		// ctx.stroke();
		// var ctx = demo.getContext('2d'),
		// var c = document.getElementById('myCanvas');
		// ctx = c.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(begin[0], begin[1]);
		ctx.quadraticCurveTo(200, 200, 100, 200);
		ctx.lineWidth = '5';
		ctx.stroke();
	}

	function drawLines() {
		const canvas = <HTMLCanvasElement>document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let node of nodes) {
			if (node == undefined) continue;
			drawLine(
				ctx,
				[node.left, node.top],
				[nodes[0].left, nodes[0].top],
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
		const canvas = <HTMLCanvasElement>document.getElementById('canvas');
		if (canvas == undefined) return;

		if (canvas.getContext) {
			let ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let node of nodes) {
				if (node == undefined || node.num == obj.num) continue;
				ctx = canvas.getContext('2d');
				drawLine(
					ctx,
					[node.left, node.top],
					[nodes[0].left, nodes[0].top],
					'green',
					5
				);
			}
			drawLine(
				ctx,
				[obj.left, obj.top],
				[nodes[0].left, nodes[0].top],
				'green',
				5
			);
		}
	}

	function onMouseUp() {
		currentNum = null;
		moving = false;
	}
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<body>
	<div id="controls">
		<button on:click={createNode}>New node</button>
	</div>
	<canvas id="canvas" width="2000" height="1000" />
	<div id="canvas1" width="2000" height="1000">
		{#each nodes as node}
			<div on:dblclick={deleteNode}>
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
		width: 50px;
		height: 50px;
		z-index: 1;
		/* background: black */
	}

	.draggable:active {
		background: blue;
		transform: scale(1.1);
		z-index: 999;
	}
</style>
