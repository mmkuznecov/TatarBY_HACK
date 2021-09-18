

<script>
    export let name;
    import UserMenu from "./userMenu.svelte";
</script>

<header>
    <a href="/" style="text-decoration: none">
        <img src="./assets/ALGA.svg" alt="logo-svg">
    </a>
    <a href="education">Обучение</a>
    <UserMenu bind:name />
</header>

<style>

</style>