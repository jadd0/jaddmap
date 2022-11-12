<script lang="ts">
	import Menu from './components/menu/+page.svelte';

	let menuPresent: boolean = false;

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
		currentValue: string;
	}[] = [];
	let moving: boolean = false;
	let currentNum: any = 0;
	let number: number = 0;

	interface menu {
		id: number;
		left: number;
		top: number;
		currentValue: string;
	}

	let currentMenu: menu;

	function click(e: any) {
		const isMenu: boolean = e.originalTarget.id == 'menu' || e.originalTarget.parentNode.id == 'menu'
		
		if (isMenu) return
		menuPresent = false
	}

	function rightClick(e: any) {
		e.preventDefault();
		const idNum: number = getNode(e);
		const node = nodes.find((value) => value.num == idNum);

		if (node == undefined) return;

		currentMenu = {
			id: idNum,
			left: node.left,
			top: node.top,
			currentValue: node.currentValue,
		};
		menuPresent = true;
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
			currentValue: 'click me',
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
		nodeNumber: number
	) {
		let start = { x: begin[0], y: begin[1] };
		let cp1 = { x: start.x * 1.02, y: start.y * 1.29 };
		let cp2 = { x: end[0] * 0.84, y: end[1] * 0.53 };
		let end1 = { x: end[0], y: end[1] };

		// TODO make a point outside of node to connect to (like minemeister)

		// if (end[1] > begin[1]) {
		// console.log(end1.x, nodes[0].left)
		// if (end1.x == nodes[0].left) {
		// 	end1 = { x: end[0] + 100, y: end[1] };
		// 	console.log("strat")
		// }
		// else if (start.x == nodes[0].left) {
		// 	start = { x: begin[0] + 100, y: begin[1] };
		// 	console.log("strat")
		// }
		

		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineWidth = end[0] === nodes[0].left ? '5' : '3';
		if (end[1] > begin[1]) {
			ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end1.x, end1.y);
			ctx.stroke();
			return;
		}

		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end1.x, end1.y);

		ctx.stroke();
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
				node
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

		nodes = [...nodes];
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
					return;
				}
				drawLine(
					ctx,
					[nodes[node].left, nodes[node].top],
					[parent.left, parent.top],
					node
				);
			}
			if (obj == nodes[0]) return;
			const parent = nodes.find((value) => value.num == obj.parentNum);
			drawLine(ctx, [obj.left, obj.top], [parent.left, parent.top], obj.num);
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
	on:mousedown={click}
/>

<body>
	<div id="controls">
		<button
			on:click={() => {
				createNode(1);
			}}>New node</button
		>
	</div>

	<canvas id="canvas" width="2000" height="1000" />

	<div id="canvas1" width="2000" height="1000">
		{#if menuPresent}
			<Menu data={currentMenu} />
		{/if}
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
	@font-face {
		font-family: 'Halvetica';
		src: url('fonts/CircularStd-Book.otf');
	}

	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		width: 100vw;
		/* background-color: #141414; */
		overflow-x: hidden;
	}

	* {
		font-size: 24px;
		text-align: center;
		color: black;
		font-weight: 500 !important;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: Halvetica;
		letter-spacing: -0px !important;
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
		position: absolute;
		transition: transform 0.2s;
		background: red;
		width: auto;
		height: auto;
		padding: 10px;
		border-radius: 10px;
		z-index: 1;
		/* background: black */
	}

	.draggable:active {
		background: blue;
		transform: scale(1.1);
		z-index: 999;
	}
</style>
