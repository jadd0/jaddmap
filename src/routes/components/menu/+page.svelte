<script lang="ts">
	import { Menu } from '../../../classes/menu.js';
	export let data: any;
	let renameTrue: boolean = false;

	const menu = new Menu(data.id, data.left, data.top, data.currentValue);
	console.log('heloo');
	console.log(menu);

	function rename() {
		renameTrue = true;
	}
</script>

<!-- <div class="container"> -->
<div
	class="actionsContainer"
	id="menu"
	style="top:{data.top}px; left:{data.left + 140}px"
>
	<div class="option top" id="menu" on:click={rename}>
		{#if renameTrue}
			<input type="text" />
		{:else}
			<h2>Rename</h2>
		{/if}
	</div>
	<div class="option" id="menu">
		<h2>Add Node</h2>
	</div>
	<div class="option" id="menu" />
	<div class="option" id="menu" />
	<div class="option bottom" id="menu" />
</div>

<!-- </div> -->
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
		z-index: 999;
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
		font-size: 20px;
	}

	input {
		background: none;
		border: none;
		font-size: 15px;
	}

	input:active {
		border: none;
	}
</style>
