<script>
  import { db } from "../firebase";
  import Modal from "./modal.svelte";

  let question = "";
  let answer = "";
  let email = "";
  let showModal = false;
  let loading = false;
  let title = "";
  let text = "";
  let id = "";

  const submitHandler = (e) => {
    const button = document.querySelector(".buttonText");
    button.style.display = "none";

    loading = true;

    db.collection("accounts")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let d = doc.data();
          let a = answer.toLowerCase();
          if (d.email == email.toLowerCase()) {
            if (d.birthplace == a || d.pet == a || d.food == a) {
              showModal = true;
              id = doc.id;
            } else {
              alertify("Sorry!", "Incorrect email or answer", "#d36868");
            }
          }
        });

        loading = false;
        button.style.display = "block";
      });
  };

  const alertify = (head, message, color) => {
    const msg = document.querySelector(".alert");
    msg.style.display = "block";

    msg.style.backgroundColor = color;
    title = head;
    text = message;
  };
</script>

<div class="alert" style="display: none;">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">
    &times;</span
  >
  <strong> {title} </strong>
  {text}
</div>
{#if showModal}
  <Modal {id} />
{/if}
<div class="container">
  <a href="/" style="text-decoration: none"
    ><span class="login-text">MessengeRAZ<span class="dot">.</span></span></a
  >
  <form class="frm" on:submit|preventDefault={submitHandler}>
    <label class="omrs-input-underlined">
      <span class="omrs-input-label"><strong>Enter your Email:</strong></span>
      <input id="#inp" type="email" bind:value={email} required />
    </label>
    <p style="font-family: sans-serif; font-size: 17px; color: #2e2e2e">
      Answer a security question:
    </p>
    <select id="select" bind:value={question}>
      <option value="pet">Your pet's name?</option>
      <option value="birthplace">Your birthplace?</option>
      <option value="food">Your favorite food?</option>
    </select>
    <input
      style="margin-bottom: 2rem;"
      class="question"
      type="text"
      bind:value={answer}
      required
    />
    <button class="button"
      ><span class="buttonText">Recover Acccount</span>
      {#if loading}
        <div class="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      {/if}
    </button>
  </form>
  <div class="line" />
  <a class="link" href="/">LOGIN</a>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

  .container {
    font-family: "Ubuntu", sans-serif;
    margin: 10rem auto;
    display: grid;
    justify-content: center;
  }

  input {
    font-family: sans-serif;
  }

  #select {
    font-family: sans-serif;
    font-size: 18px;
    width: 100%;
    background-color: #f7f7f7;
    padding: 18px 0 18px 18px;
    border: none;
  }

  .login-text {
    font-size: 30px;
    color: #2e2e2e;
    line-height: 1.2;
    margin-bottom: 10%;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    display: block;
  }

  .dot {
    color: #827ffe;
  }

  .button {
    width: 100%;
    padding: 15px;
    color: #f7f7f7;
    background-color: #827ffe;
  }

  .button:hover {
    background-color: #403866;
  }

  a {
    color: white;
    text-decoration: none;
  }

  .line {
    align-items: center;
    border-bottom: 1px solid #dadde1;
    display: flex;
    margin: 20px 0 20px 0;
    text-align: center;
  }

  .link {
    width: 100%;
    padding: 15px;
    text-align: center;
    color: #f7f7f7;
    background-color: #68d391;
  }

  .link:hover {
    background-color: #38663a;
  }

  /** BEGIN: Non Openmrs CSS **/
  @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

  :root {
    --omrs-color-ink-medium-contrast: rgba(19, 19, 21, 0.6);
    --omrs-color-interaction: #827ffe;
    --omrs-color-interaction-minus-two: rgba(73, 133, 224, 0.12);
    --omrs-color-bg-low-contrast: #eff1f2;
    --omrs-color-ink-high-contrast: #121212;
  }

  /* Input*/
  .omrs-input-underlined > input,
  .question {
    border: none;
    border-bottom: 0.125rem solid var(--omrs-color-ink-medium-contrast);
    width: 100%;
    height: 2rem;
    font-size: 1.0625rem;
    padding-left: 0.875rem;
    line-height: 147.6%;
    padding-top: 0.825rem;
    padding-bottom: 0.5rem;
  }

  .omrs-input-underlined > input:focus,
  .question {
    outline: none;
  }

  .omrs-input-underlined > .omrs-input-label {
    font-family: "Roboto";
    top: 0.9375rem;
    left: 0.875rem;
    line-height: 147.6%;
    color: var(--omrs-color-ink-medium-contrast);
    transition: top 0.2s;
  }

  .omrs-input-underlined > input:hover,
  .question:hover {
    background: var(--omrs-color-interaction-minus-two);
    border-color: var(--omrs-color-ink-high-contrast);
  }

  .omrs-input-underlined:not(.omrs-input-danger) > input:focus,
  .question:focus {
    border-color: var(--omrs-color-interaction);
  }

  /** DISABLED **/

  .omrs-input-underlined > input:disabled {
    background: var(--omrs-color-bg-low-contrast);
    cursor: not-allowed;
  }

  .alert {
    position: fixed;
    top: 10px;
    left: 10px;
    padding: 20px;
    color: white;
    width: 300px;
  }

  .closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }

  .closebtn:hover {
    color: black;
  }

  /** Button Animation */
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 30px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 10px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
</style>
