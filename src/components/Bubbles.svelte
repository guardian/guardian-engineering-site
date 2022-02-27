<script lang="ts">
  const count = 12;
  const wrap = 250;
  const bubbles = Array(count);

  let scroll: number = -1;
  let height: number = 600;

  let ready = false;
  $: !ready && (ready = scroll >= 0);

  const speed = (index: number) => {
    switch (index % (count / 4)) {
      case 0:
        return 2.8;
      case 1:
        return 0.9;
      case 2:
        return 1.6;
    }
  };
  const top = (index: number) => (index * wrap * 2) / count;
  const left = (index: number) => {
    switch (index % (count / 2)) {
      case 0:
        return 99;
      case 1:
        return 7;
      case 2:
        return 6;
      case 3:
        return 90;
      case 4:
        return 1;
      case 5:
        return 5;
      case 6:
        return 96;
    }
  };

  const layer = (index: number) => (speed(index) > 1 ? 1 : -1);
</script>

<svelte:window bind:scrollY={scroll} bind:innerHeight={height} />

<aside>
  {#each bubbles as _, index}
    <div
      class={`${index % 2 === 1 ? "green" : "blue"} ${ready && "ready"}`}
      style={`
        --top: ${top(index)}vh;
        --left: ${left(index)}vw;
        --scroll: ${-(((speed(index) * 100 * scroll) / height) % wrap)}vh;
        --speed: ${speed(index)};
        --layer: ${layer(index)};
        --degrees: ${((index % count) * 360) / 6}deg;
      `}
    />
  {/each}
</aside>

<style>
  @media (prefers-reduced-motion: no-preference) {
    div {
      width: calc(var(--speed) * 4rem);
      height: calc(var(--speed) * 4rem);
      line-height: 4rem;
      background-color: aquamarine;
      color: black;
      border-radius: 100%;
      text-align: center;
      position: fixed;
      z-index: var(--layer);
      top: var(--top);
      transform: translate(-50%, calc(var(--scroll)));
      left: var(--left);
      opacity: 0;
    }
    div.ready {
      transition: opacity 300ms;
      opacity: calc(1 + 0.5 * var(--layer));
    }

    .blue {
      background-image: linear-gradient(
        var(--degrees),
        #20c9ef 0%,
        #905ae9 100%
      );
    }

    .green {
      background-image: linear-gradient(
        var(--degrees),
        #45cfed 0%,
        #ffe500 100%
      );
    }
  }
</style>
