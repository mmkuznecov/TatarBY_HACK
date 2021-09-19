

<script>
    export let name;
    import UserMenu from "./userMenu.svelte";
    let isUser = 0;
</script>

{#if isUser == 0}
<header>
    <a href="/" style="text-decoration: none">
        <img src="./assets/ALGA.svg" alt="logo-svg">
    </a>
    <!-- <a href="education">Обучение</a>
    <UserMenu bind:name /> -->
</header>
{/if}
<style>
header {
    padding: 20px;
    border-bottom: 2px solid #181818;
}
</style>