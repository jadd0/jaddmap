<script lang="ts">
  export let data: any = '';
	export let left: number = 100;
	export let top: number = 100;
  
	let moving: boolean = false;
	
	function onMouseDown() {
		moving = true;

	}
	
	function onMouseMove(e: any) {
    
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
    console.log(left, top)
	}
	
	function onMouseUp() {
		moving = false;
	}
	
// 	$: console.log(moving);
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />


<section on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;" class="draggable" id="num{data}">
	<slot></slot>
</section>


<style>
	.draggable {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: absolute;
    transition: transform 0.1s;
    background: red;
	}

  .draggable:active {
    background: blue;
    transform: scale(1.1);
    z-index: 999;
  }
</style>