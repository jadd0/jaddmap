<script lang="ts">
	import Draggable from './components/draggable/+page.svelte';
	let nodes: { type: string; num: number }[] = [];

	function addItem() {
		const node = {
			type: 'node',
			num: nodes.length,
		};
		nodes = [...nodes, node];
	}
</script>

<body>
	<div id="controls">
		<button on:click={addItem}>New node</button>
	</div>
	<div id="canvas">
		{#each nodes as node}
			<Draggable>
				<h1>Drag Me</h1>
			</Draggable>
		{/each}
	</div>
</body>
