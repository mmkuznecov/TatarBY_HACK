<script>
  import { db, fv } from "../firebase.js";
  import { createEventDispatcher } from "svelte";

  let errorMessage = "";
  let user_query = "";
  let errorFound = false;
  let fetchDone = false;
  let recent_chats = [];
  export let selectedUser;
  export let userSelected;
  let dev = "raz0229";
  export let noMessages;
  export let name;
  let fetchedIds = [];

  let title;
  let text;

  let dispatch = createEventDispatcher();

  const addUser = () => {
    let x = document.querySelector(".container"); //gets auto-generated classname from container
    let svelteClass = x.className.substring(10);

    errorFound = true;
    errorMessage = "Searching...";

    db.collection("accounts")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().username == user_query.toLowerCase()) {
            errorFound = false;
            errorMessage = "";

            db.collection("messages")
              .doc(name)
              .update({
                recent_chats: fv.arrayUnion({
                  name: user_query.toLowerCase(),
                  time: new Date().toDateString().substring(4, 10),
                  msg: "Most recent message appears here...",
                  notSeen: false,
                }),
              })
              .then(() => {
                fetchData();
                user_query = "";
              });
          } else {
            errorMessage = "User doesn't exist";
          }
        });
      });
  };

  //records changes in recent_chats
  db.collection("messages")
    .doc(name)
    .onSnapshot((doc) => {
      fetchData(); //updates recent_chats
    });

  const fetchData = () => {
    fetchDone = false;
    db.collection("messages")
      .doc(name)
      .get()
      .then((doc) => {
        recent_chats = Object.values(doc.data().recent_chats);
        fetchDone = true;
      });
  };
  fetchData();

  const selectActive = (e) => {
    userSelected = true;
    noMessages = false;
    clearMessages();
    fetchedIds = [];

    let z = document.querySelector(".centerImage");
    z.style.display = "none";

    let x = document.querySelector(".inbox_people");
    let svelteClass = x.className.substring(13);

    let y = document.querySelector(".active_chat");
    if (!(y == null)) y.setAttribute("class", `chat_list ${svelteClass}`);

    let button = document.querySelector(".msg_send_btn");
    button.removeAttribute("disabled");

    let i = 0;
    for (i in e.path) {
      if (
        e.path[i].className == `chat_list ${svelteClass}` ||
        e.path[i].className == `chat_list ${svelteClass} dev_chat`
      ) {
        e.path[i].setAttribute("class", `chat_list active_chat ${svelteClass}`);
        selectedUser = e.path[i].innerText.split(/(\s+)/)[0]; //gets username
      }
    }

    //check if there are any messages between two
    db.collection("messages")
      .doc(name + "-" + selectedUser)
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.exists) {
          noMessages = true;
        }
      });

    //if receipent has deleted his/her account
    db.collection("messages")
      .doc(selectedUser + "-" + name)
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.exists) {
          alertify(
            "Warning!",
            "Receipent has deleted his/her account and can no longer receive your messages",
            "#fecb7f"
          );
        }
      });

    //records changes in a particular document
    db.collection("messages")
      .doc(name + "-" + selectedUser)
      .onSnapshot((doc) => {
        userSelected = false;
        let i = 0;

        for (i; i < doc.data()[selectedUser].length; i++) {
          let fetchedMsg = doc.data()[selectedUser][i];

          if (
            fetchedMsg.type == "sent" &&
            !fetchedIds.includes(fetchedMsg.id)
          ) {
            dispatch("sentEvent", [
              fetchedMsg.msg,
              fetchedMsg.time,
              fetchedMsg.id,
              fetchedMsg.type,
            ]);
            fetchedIds = fetchedIds.concat(fetchedMsg.id);
          } else if (
            fetchedMsg.type == "received" &&
            !fetchedIds.includes(fetchedMsg.id)
          ) {
            dispatch("receivedEvent", [fetchedMsg.msg, fetchedMsg.time]);
            fetchedIds = fetchedIds.concat(fetchedMsg.id);
          }
        }
      });
  };

  const alertify = (head, message, color) => {
    const msg = document.querySelector(".alerti");
    msg.style.display = "block";

    msg.style.backgroundColor = color;
    title = head;
    text = message;
  };

  const clearMessages = () => {
    document.querySelectorAll(".incoming_msg").forEach((e) => e.remove());
    document.querySelectorAll(".outgoing_msg").forEach((e) => e.remove());
  };
</script>

<div class="alerti" style="display: none;">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">
    &times;</span
  >
  <strong> {title} </strong>
  {text}
</div>

<div id="inbox_people" class="inbox_people">
  <div class="headind_srch">
    <div class="srch_bar">
      <div class="stylish-input-group">
        <input
          type="text"
          class="search-bar"
          bind:value={user_query}
          placeholder="Enter username"
        />
        <span class="input-group-addon">
          <button class="addUserButton" type="button" on:click={addUser}>
            <b>+</b>
          </button>
        </span>
      </div>
    </div>
    {#if errorFound}
      <p style="font-family: sans-serif; color: crimson;">{errorMessage}</p>
    {/if}
  </div>
  <div class="inbox_chat">
    <div class="chat_list active_chat" style="display: none;">
      <div class="chat_people">
        <div class="chat_ib">
          <h5><span class="chat_date" /></h5>
          <p />
        </div>
      </div>
    </div>

    <!-- Loading Spinner -->
    {#if !fetchDone}
      <div class="loader">Loading...</div>
    {/if}

    {#if fetchDone}
      {#each recent_chats as account}
        <div
          class="chat_list"
          class:dev_chat={dev == account.name}
          on:click={selectActive}
        >
          <div class="chat_people">
            <div class="chat_ib">
              <h5>
                {account.name}
                <span class="chat_date"> {account.time} </span>
                {#if account.notSeen}
                  <span id="circle" style="font-weight: bolder;">&nbsp;</span>
                {/if}
              </h5>
              <p>{account.msg}</p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .addUserButton:hover {
    color: #68d391;
    background: #fff;
  }

  #circle {
    width: 10px;
    height: 10px;
    background: #ff6868;
    margin-right: 15px;
    border-radius: 50%;
  }

  .inbox_people {
    display: block;
    background: #e5e5ff none repeat scroll 0 0;
    float: left;
    overflow: hidden;
    transition: all 0.5s ease 0s;
    width: 60%;
    border-right: 1px solid #c4c4c4;
    height: 80vh;
    animation: blink 1.5s infinite 100ms;
    animation-iteration-count: 1;
  }

  @keyframes blink {
    from {
      transform: translateX(-400px);
    }
    to {
      transform: translateX(0px);
    }
  }

  .srch_bar {
    display: inline-block;
    text-align: left;
    width: 100%;
  }
  .headind_srch {
    padding: 10px 29px 10px 20px;
    overflow: hidden;
    border-bottom: 1px solid #c4c4c4;
  }

  .srch_bar input {
    border: 1px solid #cdcdcd;
    outline: none;
    border-width: 0 0 1px 0;
    width: 100%;
    padding: 2px 0 4px 6px;
    background: none;
  }
  .srch_bar .input-group-addon button {
    padding: 0;
  }

  .addUserButton {
    background: #68d391 none repeat scroll 0 0;
    border: medium none;
    outline: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    font-size: 24px;
    width: 23px;
    transition: all 0.3s ease 0s;
  }

  .alerti {
    position: fixed;
    top: 10px;
    left: 10px;
    padding: 20px;
    color: white;
    z-index: 5;
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

  .srch_bar .input-group-addon {
    margin: 0 0 0 -27px;
  }

  .chat_ib h5 {
    font-size: 15px;
    color: #464646;
    margin: 0 0 8px 0;
  }
  .chat_ib h5 span {
    font-size: 13px;
    float: right;
  }
  .chat_ib p {
    font-size: 14px;
    color: #989898;
    margin: auto;
  }

  .chat_ib {
    float: left;
    padding: 0 0 0 15px;
    width: 88%;
  }

  .chat_people {
    overflow: hidden;
    clear: both;
  }
  .chat_list {
    border-bottom: 1px solid #c4c4c4;
    margin: 0;
    font-family: "Ubuntu";
    padding: 18px 0 10px 16px;
    transition: all 0.3s ease 0s;
    cursor: pointer;
  }
  .inbox_chat {
    height: 550px;
    overflow-y: scroll;
  }

  .active_chat {
    background: #fff;
  }

  .dev_chat {
    background: #fecb7f;
  }

  /* Spinner CSS */
  .loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: #ffffff;
    background: -moz-linear-gradient(
      left,
      #ffffff 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: -webkit-linear-gradient(
      left,
      #ffffff 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: -o-linear-gradient(
      left,
      #ffffff 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: -ms-linear-gradient(
      left,
      #ffffff 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: linear-gradient(
      to right,
      #ffffff 10%,
      rgba(255, 255, 255, 0) 42%
    );
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background: #e5e5ff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  /*CUSTOM SCROLL BAR*/
  /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(189, 186, 186);
    border-radius: 20px;
    transition: all 3.3s ease 0s;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(105, 104, 104);
  }
</style>
