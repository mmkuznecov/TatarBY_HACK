<script>
  import {changePage} from '../../stores';

  export let buttonText = "Select";
  export let callback = () => changePage(+1);
  export let disabled = false;
</script>

<button {disabled} on:click={callback}>{buttonText}</button>

<style>
  button {
    background-color: #3C9294;
    color: #FFFFFF;
    border: 2px solid transparent;
    transition: background-color 0.5s ease;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: calc(var(--plain-fontsize) - 5px);
    padding: 10px 30px;
  }

  button:hover {
    background: #f4f4f4;
    color: #3C9294;
    border-color: #3C9294;
  }

  /*button:focus {*/
  /*  background: gainsboro;*/
  /*}*/

  button:disabled {
    background: #cccccc;
    color: #ffffff;
    border-color: transparent;
  }
</style>