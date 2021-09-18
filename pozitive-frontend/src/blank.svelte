<script>
    import Home from './pages/home.svelte';

    export let authorized;
    export const loggedIn = authorized;
</script>

<Home {authorized} />
