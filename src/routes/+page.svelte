<script lang="ts">
	import Draggable from './components/draggable/+page.svelte';

	let nodes: { type: string; num: number; top: number; left: number }[] = [];
	let moving: boolean = false;
	let currentNum: any = 0;

	function createNode() {
		let last: number = 0;
		if (nodes.length != 0) {
			last = nodes[nodes.length - 1].num + 1;
		}

		const node = {
			type: 'node',
			num: last,
			top: 100,
			left: 100,
		};
		nodes = [...nodes, node];
		console.log(nodes);
	}

	function deleteNode(e: any) {
		const idNum: number = getNode(e);
		console.log(idNum);

		nodes = [...nodes.filter((value) => value.num != idNum)];
		console.log(nodes);
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
		if (stroke) {
			ctx.strokeStyle = stroke;
		}

		if (width) {
			ctx.lineWidth = width;
		}

		ctx.beginPath();
		ctx.moveTo(...begin);
		ctx.lineTo(...end);
		ctx.stroke();
	}

  function drawLines() {
    
  }

	function onMouseDown(e: any) {
		console.log('hjfdkf');
		const idNum = getNode(e);
		currentNum = idNum;
		moving = true;
	}

	function onMouseMove(e: any) {
		// const idNum = getNode(e);
		let obj = nodes.find((value) => value.num == currentNum);

		if (obj == undefined) return;

		if (moving) {
			console.log(e.movementX, e.movementY);
			obj.left += e.movementX;
			obj.top += e.movementY;
		}

		nodes[currentNum] = obj;

		const canvas = <HTMLCanvasElement>document.getElementById('canvas');
		if (canvas == undefined) return;

		console.log(canvas);
		if (canvas.getContext) {
			let ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let node of nodes) {
				if (node.num == obj.num) continue;
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
		console.log('hbfdshbf');
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
		width: 100px;
		height: 100px;
		z-index: 1;
		/* background: black */
	}

	.draggable:active {
		background: blue;
		transform: scale(1.1);
		z-index: 999;
	}
</style>
