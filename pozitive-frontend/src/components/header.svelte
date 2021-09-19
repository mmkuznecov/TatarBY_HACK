

<script>
    export let name;
    import UserMenu from "./userMenu.svelte";
    let isUser = 0;
    export let accNotFound;
</script>

{#if accNotFound}
<header>
    <a href="main" style="text-decoration: none">
        <img src="./assets/ALGA.svg" alt="logo-svg">
    </a>
    <!-- <a href="education">Обучение</a>
    <UserMenu bind:name /> -->

   <div class="b-marquee">
    <div class="b-marquee__text">керегез һәм хәзер өйрәнә башлагыз</div>
  </div>
</header>
{:else}
<header>
    <a href="/" style="text-decoration: none">
        <img src="./assets/ALGA.svg" alt="logo-svg">
    </a>
    <a href="education">Обучение</a>
    <UserMenu bind:name />

   <div class="b-marquee">
    <div class="b-marquee__text">керегез һәм хәзер өйрәнә башлагыз</div>
  </div>
</header>
{/if}
<style>
    header {
        border-bottom: 2px solid #181818;
    }

    a, img {
        padding: 20px;
    }

    .block {     
		float: right;
        right: 0;
        background-color: #181818;
        color: #fff;
        height: 100vh;
        padding: 30px;
	} 

	.vertical-lr {     
        font-family: "Benzin-Bold";
        font-size: 40px;
		writing-mode: vertical-lr; 
        height: 100vh;
	}

    .b-marquee {
        float: right;
    font-family: 'Segoe UI', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    background: #181818;
    color: #fff;
    padding: 10px;
    position: relative;
    margin-bottom: 10px;
    }

    .b-marquee__text {
            -webkit-animation: animMarquee 5s linear infinite;
            animation: animMarquee 3s linear infinite;
            font-family: "Benzin-Bold";
            font-size: 40px;
            writing-mode: vertical-lr; 
            height: 100vh;
    }

    @keyframes animMarquee {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            -webkit-transform: translateY(60%);
            transform: translateY(60%);
        }
    }
</style>