<script>
  import { db, fv } from "../firebase.js";

  let showUserMenu = false;
  let showModal = false;
  let title = "";
  let text = "";
  export let name;

  const delData = () => {
    showModal = !showModal;

    db.collection("accounts")
      .where("username", "==", name)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          db.collection("accounts")
            .doc(doc.id)
            .delete()
            .then(() => {
              alertify("Success!", "Account has been deleted", "#68d391");
              setTimeout(() => {
                location.replace("/");
              }, 2000);
            })
            .catch((error) => {
              alertify(
                "Something went wrong!",
                "Account not deleted",
                "#d36868"
              );
            });
        });
      });

    db.collection("messages")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let delQuery = doc.id.split("-")[0];

          if (delQuery == name) {
            db.collection("messages").doc(doc.id).delete();
          }
        });
      });
  };

  const alertify = (head, message, color) => {
    const msg = document.querySelector(".alertify");
    msg.style.display = "block";

    msg.style.backgroundColor = color;
    title = head;
    text = message;
  };
</script>

<div class="alertify" style="display: none;">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">
    &times;</span
  >
  <strong> {title} </strong>
  {text}
</div>

<button id="menu-button2" on:click={() => (showUserMenu = !showUserMenu)}>
  <span id="accName">{name}</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-user"
    ><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle
      cx="12"
      cy="7"
      r="4"
    /></svg
  ></button
>

{#if showUserMenu}
  <div id="myDropdown" class="dropdown-content">
    <a href="/"
      ><svg
        class="logout"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        ><path fill="none" d="M0 0h24v24H0z" /><path
          d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"
          fill="#68d391"
        /></svg
      > Logout</a
    >
    <button
      on:click={() => {
        showModal = !showModal;
        showUserMenu = !showUserMenu;
      }}
      ><svg
        class="delete"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 58.67"
        ><defs
          ><style>
            .cls-1 {
              fill: crimson;
            }
          </style></defs
        ><title>Asset 25</title><g id="Layer_2" data-name="Layer 2"
          ><g id="Layer_1-2" data-name="Layer 1"
            ><path
              class="cls-1"
              d="M61.33,5.33H48V2.67A2.66,2.66,0,0,0,45.33,0H18.67A2.66,2.66,0,0,0,16,2.67V5.33H2.67a2.67,2.67,0,0,0,0,5.34H8v40a8,8,0,0,0,8,8H48a8,8,0,0,0,8-8v-40h5.33a2.67,2.67,0,1,0,0-5.34ZM50.67,50.67A2.67,2.67,0,0,1,48,53.33H16a2.67,2.67,0,0,1-2.67-2.66v-40H50.67Z"
            /><path
              class="cls-1"
              d="M24,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,24,45.33Z"
            /><path
              class="cls-1"
              d="M40,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,40,45.33Z"
            /></g
          ></g
        ></svg
      > Delete Account</button
    >
    <a href="/about"
      ><svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 142 142"
        ><defs
          ><style>
            .cls-1 {
              fill: #2d3e50;
            }
          </style></defs
        ><title>x</title><path
          class="cls-1"
          d="M59.25625,2.65407A14.62972,14.62972,0,1,1,44.62653,17.28379,14.619,14.619,0,0,1,59.25625,2.65407Z"
        /><path
          class="cls-1"
          d="M49.67716,45.027a8.69756,8.69756,0,0,0-7.178,8.56486h0a8.69454,8.69454,0,0,0,8.6967,8.6967h.86206v48.17411H47.40528a7.44163,7.44163,0,0,0-7.44163,7.44163h0a7.44163,7.44163,0,0,0,7.44163,7.44163H80.59472a7.44163,7.44163,0,0,0,7.44163-7.44163h0a7.44163,7.44163,0,0,0-7.44163-7.44163h-4.6019V48.96654a7.50925,7.50925,0,0,0-8.96765-7.3663C59.51679,43.0868,49.97494,44.97466,49.67716,45.027Z"
        /></svg
      >About</a
    >
  </div>
{/if}
{#if showModal}
  <div class="back-drop">
    <div class="model">
      <h3>
        <strong>Delete Account</strong><span
          class="cross"
          on:click={() => (showModal = !showModal)}>&#215;</span
        >
      </h3>
      <div class="alert1">
        <svg
          class="matico"
          width="24px"
          height="24px"
          viewBox="0 0 28 28"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
        >
          <defs />
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            sketch:type="MSPage"
          >
            <g
              id="icon-61-warning"
              sketch:type="MSArtboardGroup"
              fill="crimson"
            >
              <path
                d="M14.3077969,6.05448962 C15.177863,4.64682663 16.5905922,4.65018129 17.4585848,6.05448962 L28.2436741,23.5034768 C29.4052031,25.382692 28.5591104,26.9060969 26.3549711,26.9060969 L5.41141065,26.9060969 C3.20677982,26.9060969 2.35742742,25.388761 3.52270757,23.5034768 L14.3077969,6.05448962 L14.3077969,6.05448962 Z M15.8835643,11.9060969 C15.3312795,11.9060969 14.8835643,12.3591332 14.8835643,12.903127 L14.8835643,18.9090667 C14.8835643,19.4597113 15.3274291,19.9060969 15.8835643,19.9060969 C16.435849,19.9060969 16.8835643,19.4530606 16.8835643,18.9090667 L16.8835643,12.903127 C16.8835643,12.3524825 16.4396994,11.9060969 15.8835643,11.9060969 L15.8835643,11.9060969 Z M15.8835643,23.9060969 C16.435849,23.9060969 16.8835643,23.4583816 16.8835643,22.9060969 C16.8835643,22.3538121 16.435849,21.9060969 15.8835643,21.9060969 C15.3312795,21.9060969 14.8835643,22.3538121 14.8835643,22.9060969 C14.8835643,23.4583816 15.3312795,23.9060969 15.8835643,23.9060969 L15.8835643,23.9060969 Z"
                id="warning"
                sketch:type="MSShapeGroup"
              />
            </g>
          </g>
        </svg>
        This will permanently delete all data in this account and cannot be undone.
      </div>
      <span class="small-text">Account Name</span>
      <div>/accounts/{name}</div>
      <div class="btns">
        <button
          class="myButton cancelbtn"
          on:click={() => (showModal = !showModal)}>Cancel</button
        >
        <button class="myButton" on:click={delData}>Start delete</button>
      </div>
    </div>
  </div>
{/if}

<style>
  h3 {
    font-size: 1.25rem;
    text-align: initial;
    margin-top: 6px;
    margin-left: 5px;
  }

  #menu-button2 {
    float: left;
    margin-left: 5px;
    height: 40px;
    border: none;
    display: flex;
    align-items: center;
    color: #000;
    background-color: rgba(161, 154, 154, 0.1);
    border-radius: 10px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
  }

  #menu-button2:hover {
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    transform: translateY(-7px);
  }

  #menu-button2 > svg {
    width: 30px;
    height: 30px;
  }

  #accName {
    font-family: sans-serif;
    font-size: 15px;
    padding-right: 8px;
  }

  .dropdown-content {
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }

  .dropdown-content a,
  .dropdown-content button {
    color: black;
    padding: 12px 16px;
    text-align: left;
    text-decoration: none;
    display: flex;
  }

  button:hover,
  a:hover {
    background-color: #ddd;
  }

  button {
    outline: none;
    border: none;
  }

  button > svg,
  a > svg {
    height: 24px;
    width: 24px;
    margin-right: 8px;
  }

  .back-drop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }

  .model {
    padding: 10px;
    border-radius: 10px;
    max-width: 400px;
    margin: 10% auto;
    text-align: center;
    box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
      0 6px 10px 4px rgba(60, 64, 67, 0.15) !important;
    background: white;
  }

  .cross {
    font-size: 1.5rem;
    color: #0000008a;
    margin-left: 14rem;
    cursor: pointer;
    font-weight: bolder;
  }

  .cross:hover {
    color: #000;
  }

  .matico {
    margin-right: 5px;
  }

  .alert1 {
    background: #fbe9e7;
    color: crimson;
    font-weight: bolder;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .alertify {
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

  .small-text {
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
  }

  .btns {
    outline: none;
    border-radius: 15px;
    margin-top: 25px;
    margin-left: 180px;
  }

  .myButton {
    background-color: crimson;
    border-radius: 9px;
    border: 1px solid #ffffff;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 15px;
    padding: 6px 15px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #b23e35;
  }
  .myButton:hover {
    background-color: #b23e35;
  }
  .myButton:active {
    position: relative;
    top: 1px;
  }

  .cancelbtn {
    background-color: #fff;
    text-shadow: 0px 1px 0px rgb(0 0 0 / 50%);
    color: rgba(0, 0, 0, 0.1);
  }

  .cancelbtn:hover {
    background-color: rgba(233, 233, 233, 0.397);
  }
</style>
