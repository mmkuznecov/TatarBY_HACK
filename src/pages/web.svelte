<script>
  import { db, fv } from "../firebase.js";
  import Chatbar from "./chatbar.svelte";
  import Header from "../components/header.svelte";

  let inpMessage = "";
  let selectedUser = "";
  let userSelected;
  let noMessages;

  export let name;

  let title = "";
  let text = "";
  let msgId;
  let msgTime;

  let sent_msgs = [];
  let received_msgs = [];

  const renderMessage = () => {
    if (!(inpMessage == "")) {
      const usersRef = db.collection("messages").doc(name + "-" + selectedUser);
      const usersRef2 = db
        .collection("messages")
        .doc(selectedUser + "-" + name);

      usersRef.get().then((docSnapshot) => {
        msgId = makeid();
        msgTime = formatAMPM(new Date());

        if (docSnapshot.exists) {
          usersRef
            .update({
              [selectedUser]: fv.arrayUnion({
                id: msgId,
                time: msgTime,
                msg: inpMessage,
                type: "sent",
              }),
            })
            .then(() => {
              inpMessage = "";
            });

          usersRef2.update({
            [name]: fv.arrayUnion({
              id: msgId,
              time: msgTime,
              msg: inpMessage,
              type: "received",
            }),
          });
        } else {
          usersRef
            .set({
              [selectedUser]: fv.arrayUnion({
                id: msgId,
                time: msgTime,
                msg: inpMessage,
                type: "sent",
              }),
            })
            .then(() => {
              inpMessage = "";
            }); // create the document

          usersRef2.set({
            [name]: fv.arrayUnion({
              id: msgId,
              time: msgTime,
              msg: inpMessage,
              type: "received",
            }),
          });
        }
      });
    }
  };
  // mes.detail[0]  name  selectedUser
  function updateRecent(msgContent, user, selected, seen) {
    db.collection("messages")
      .doc(user)
      .get()
      .then((doc) => {
        let recent_chats = doc.data().recent_chats;

        let i = 0;
        for (i in recent_chats) {
          if (recent_chats[i].name == selected) {
            recent_chats[i].msg = `${msgContent.substring(0, 35)}...`;
            recent_chats[i].time = new Date().toDateString().substring(4, 10);
            recent_chats[i].notSeen = seen;

            db.collection("messages").doc(user).update({
              recent_chats: recent_chats,
            });
          }
        }
      });
  }

  function makeid() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const renderMessageSent = (mes) => {
    let outgoing = document.createElement("div");
    let sent = document.createElement("div");
    let text = document.createElement("p");
    let time = document.createElement("span");
    let msg = document.querySelector(".msg_history");

    let x = document.querySelector(".container"); //gets auto-generated classname from container
    let svelteClass = x.className.substring(10);

    let write_msg = document.querySelector(".write_msg"); //clears input box
    write_msg.value = "";

    outgoing.setAttribute("class", `outgoing_msg ${svelteClass}`);
    outgoing.setAttribute("id", `outgoing_msg`);
    sent.setAttribute("class", `sent_msg ${svelteClass}`);
    time.setAttribute("class", `time_date_2 ${svelteClass}`);

    // button options
    let span = document.createElement("span");
    span.setAttribute("class", "rmenu");
    let but1 = document.createElement("button");
    but1.textContent = "Copy";
    let but2 = document.createElement("button");
    but2.textContent = "Undo";
    let but3 = document.createElement("button");
    but3.textContent = "Delete";

    but1.style.cssText =
      "color: #333;outline: none;background: none;border-radius: 30px;padding: 5px 10px 5px 10px;cursor: pointer;";
    but2.style.cssText =
      "color: #333;outline: none;background: none;border-radius: 30px;padding: 5px 10px 5px 10px;cursor: pointer;";
    but3.style.cssText =
      "color: #333;outline: none;background: none;border-radius: 30px;padding: 5px 10px 5px 10px;cursor: pointer;";

    // copy message to clipboard
    but1.addEventListener("click", () => {
      copyToClip(mes.detail[0]);
      span.style.display = "none";
    });

    // undo message; delete from name-selectedUser and selectedUser-name
    but2.addEventListener("click", () => {
      db.collection("messages")
        .doc(name + "-" + selectedUser)
        .update({
          [selectedUser]: fv.arrayRemove({
            id: mes.detail[2],
            msg: mes.detail[0],
            time: mes.detail[1],
            type: mes.detail[3],
          }),
        });
      db.collection("messages")
        .doc(selectedUser + "-" + name)
        .update({
          [name]: fv.arrayRemove({
            id: mes.detail[2],
            msg: mes.detail[0],
            time: mes.detail[1],
            type: "received",
          }),
        })
        .then(() => {
          span.style.display = "none";
          alertify("Deleted!", "Message deleted for everyone", "#68d3ff");
        });
      outgoing.style.display = "none";
    });

    // delete message from name-SelectedUser
    but3.addEventListener("click", () => {
      db.collection("messages")
        .doc(name + "-" + selectedUser)
        .update({
          [selectedUser]: fv.arrayRemove({
            id: mes.detail[2],
            msg: mes.detail[0],
            time: mes.detail[1],
            type: mes.detail[3],
          }),
        })
        .then(() => {
          span.style.display = "none";
          alertify("Deleted!", "Message deleted for you", "#68d3ff");
        });
      outgoing.style.display = "none";
    });

    span.appendChild(but1);
    span.appendChild(but2);
    span.appendChild(but3);

    span.style.display = "none";
    span.style.justifyContent = "center";

    outgoing.addEventListener("click", () => {
      let i = 0;
      let x = document.getElementsByClassName("rmenu");

      if (span.style.display == "flex") {
        for (i; i < x.length; i++) {
          x[i].style.display = "none";
        }
      } else {
        span.style.display = "flex";
      }
    });

    text.textContent = mes.detail[0]; // message content

    let str = mes.detail[0];
    while(/\p{Extended_Pictographic}/u.test(str)) { 
      str = str.replace(/\p{Extended_Pictographic}/u, '') 
      }
    str = str.replace(/\s/g, '');
    if (str == '') {
      text.style.fontSize = '30px';
    }

    text.setAttribute("class", `${svelteClass}`);
    time.textContent = mes.detail[1]; // time sent

    text.appendChild(time);
    sent.appendChild(text);
    outgoing.appendChild(sent);
    msg.appendChild(outgoing);
    msg.appendChild(span);

    var elem = document.getElementById("data");
    elem.scrollTop = elem.scrollHeight;

    updateRecent(mes.detail[0], name, selectedUser, false);
    updateRecent(mes.detail[0], selectedUser, name, true);
  };

  const renderMessageReceived = (mes) => {
    let outgoing = document.createElement("div");
    let sent = document.createElement("div");
    let text = document.createElement("p");
    let time = document.createElement("span");
    let msg = document.querySelector(".msg_history");

    let x = document.querySelector(".container"); //gets auto-generated classname from container
    let svelteClass = x.className.substring(10);

    outgoing.setAttribute("class", `incoming_msg ${svelteClass}`);
    sent.setAttribute("class", `received_msg ${svelteClass}`);
    time.setAttribute("class", `time_date_2 ${svelteClass}`);

    // button options
    let span = document.createElement("span");
    span.setAttribute("class", "rmenu");
    let but1 = document.createElement("button");
    but1.textContent = "Copy";
    but1.style.cssText =
      "color: #333;outline: none;background: none;border-radius: 30px;padding: 5px 10px 5px 10px;cursor: pointer;";

    // copy message to clipboard
    but1.addEventListener("click", () => {
      copyToClip(mes.detail[0]);
      span.style.display = "none";
    });

    span.appendChild(but1);
    span.style.display = "none";
    span.style.justifyContent = "center";

    outgoing.addEventListener("click", () => {
      let i = 0;
      let x = document.getElementsByClassName("rmenu");

      if (span.style.display == "flex") {
        for (i; i < x.length; i++) {
          x[i].style.display = "none";
        }
      } else {
        span.style.display = "flex";
      }
    });

    text.textContent = mes.detail[0]; //message content

    let str = mes.detail[0];
    while(/\p{Extended_Pictographic}/u.test(str)) { 
      str = str.replace(/\p{Extended_Pictographic}/u, '') 
      }
    str = str.replace(/\s/g, '');
    if (str == '') {
      text.style.fontSize = '30px';
    }

    text.setAttribute("class", `${svelteClass}`);
    time.textContent = mes.detail[1]; //time sent

    text.appendChild(time);
    sent.appendChild(text);
    outgoing.appendChild(sent);

    msg.appendChild(outgoing);
    msg.appendChild(span);

    var elem = document.getElementById("data");
    elem.scrollTop = elem.scrollHeight;

    updateRecent(mes.detail[0], name, selectedUser, true);
    updateRecent(mes.detail[0], selectedUser, name, false);
  };

  const alertify = (head, message, color) => {
    const msg = document.querySelector(".alert");
    msg.style.display = "block";

    msg.style.backgroundColor = color;
    title = head;
    text = message;
  };

  const showPanel = () => {
    let x = document.getElementById("inbox_people");
    let z = document.querySelector(".mesgs");

    if (x.style.display == "none") x.style.display = "block";
    else x.style.display = "none";

    z.addEventListener("click", () => {
      x.style.display = "none";
    });
  };

  const copyToClip = (txt) => {
    txt = document.createTextNode(txt);
    var m = document;
    var w = window;
    var b = m.body;
    b.appendChild(txt);
    if (b.createTextRange) {
      var d = b.createTextRange();
      d.moveToElementText(txt);
      d.select();
      m.execCommand("copy");
    } else {
      var d = m.createRange();
      var g = w.getSelection;
      d.selectNodeContents(txt);
      g().removeAllRanges();
      g().addRange(d);
      m.execCommand("copy");
      g().removeAllRanges();
    }
    txt.remove();
  };

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime =
      hours +
      ":" +
      minutes +
      " " +
      ampm +
      " | " +
      date.toDateString().substring(4, 10);
    return strTime;
  };

  const pressEnterAsSend = (e) => {
    // 13 is the {Enter} keycode.
    if (e.keyCode === 13) {
      document.getElementById("msg-send-btn").click();
    }
  };
</script>

<div class="alert" style="display: none;">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">
    &times;</span>
  <strong> {title} </strong>
  {text}
</div>

<div class="container">
  <div class="messaging">
    <Chatbar
        on:sentEvent={renderMessageSent}
        on:receivedEvent={renderMessageReceived}
        bind:selectedUser
        bind:noMessages
        bind:userSelected
        bind:name
      />
    <div class="inbox_msg">
      <div class="mesgs">
        <div id="data" class="msg_history">
          <img
            class="centerImage"
            src="https://i.ibb.co/pJ2rYpr/start-chat.png"
            alt="Start chat"
          />

          {#if noMessages}
            <img
              class="centerImage2"
              src="https://i.ibb.co/gMrSpT4/warning-no-messages.png"
              alt="No messages to show"
            />
          {/if}

          {#if userSelected}
            <div class="loader">Loading...</div>
          {/if}

          {#if selectedUser != ""}
            <div class="sticky">Chat with '{selectedUser}' &darr;</div>
          {/if}

          <div class="incoming_msg" style="display: none;">
            <div class="received_msg">
              <p><span class="time_date_2" /></p>
            </div>
          </div>

          <div class="outgoing_msg" style="display: none;">
            <div class="sent_msg">
              <p><span class="time_date_2" /></p>
            </div>
          </div>
        </div>
        <div class="type_msg">
          <div class="input_msg_write">
            <input
              type="text"
              class="write_msg"
              placeholder="Type a message"
              on:keyup={pressEnterAsSend}
              bind:value={inpMessage}
            />
            <button
              id="msg-send-btn"
              class="msg_send_btn"
              type="button"
              disabled
              on:click={renderMessage}
              ><i class="fa fa-paper-plane-o" aria-hidden="true" /></button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  div.sticky {
    position: -webkit-sticky;
    position: sticky;
    z-index: 1;
    top: 0;
    width: 98%;
    border-radius: 50px;
    background-color: #f9f9f9;
    padding: 20px;
    text-align: center;
    font-family: sans-serif;
    font-size: 22px;
  }

  .alert {
    position: fixed;
    top: 10px;
    left: 10px;
    padding: 20px;
    color: white;
    width: 300px;
    z-index: 4;
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

  .container {
    padding-right: 0px !important;
    padding-left: 0px !important;
    max-width: 100%;
    margin: auto;
    transition: all 0.3s ease 0s;
    transition-property: all;
  }

  .inbox_msg {
    border-top: 1px solid #c4c4c4;
    clear: both;
    overflow: hidden;
  }

  .time_date_2 {
    float: right;
    font-size: 11px;
    margin: 10px 10px 0 15px;
  }

  .mesgs {
    background: #fff;
    padding: 0;
  }

  .centerImage {
    display: block;
    width: 50%;
    margin-top: 175px;
    margin-left: auto;
    margin-right: auto;
  }

  .centerImage2 {
    display: block;
    width: 40%;
    margin-top: 150px;
    margin-left: auto;
    margin-right: auto;
  }

  .sent_msg p {
    background: #68d391 none repeat scroll 0 0;
    border-radius: 25px;
    font-size: 14px;
    margin: 0;
    color: #fff;
    word-break: break-word;
    padding: 8px 8px 8px 15px;
    width: fit-content;
    float: right;
  }

  .received_msg p {
    background: #827ffe none repeat scroll 0 0;
    border-radius: 25px;
    font-size: 14px;
    margin: 0;
    margin-left: 14px;
    color: #fff;
    word-break: break-word;
    padding: 8px 8px 8px 15px;
    width: fit-content;
    float: left;
  }

  .incoming_msg {
    overflow: hidden;
    margin: 5px 0 5px;
    animation: popup 0.5s;
  }
  .received_msg {
    float: left;
    margin-right: 15px;
    width: 50%;
  }

  .outgoing_msg {
    position: relative;
    overflow: hidden;
    margin: 5px 0 5px;
    animation: popup 0.5s;
  }
  .sent_msg {
    float: right;
    margin-right: 15px;
    width: 50%;
  }

  .input_msg_write input {
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    border: medium none;
    border-top: solid 1px #4c4c4c;
    outline: none;
    color: #4c4c4c;
    font-size: 15px;
    min-height: 48px;
    max-width: 60%;
    transition: all 0.6s ease 0s;
  }

  .input_msg_write input:focus {
    border-top: solid 1px #827ffe;
  }

  .type_msg {
    border-top: 1px solid #c4c4c4;
    position: relative;
  }
  .msg_send_btn {
    background: #68d391 none repeat scroll 0 0;
    border: medium none;
    outline: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    font-size: 17px;
    height: 33px;
    position: absolute;
    right: 0;
    top: 11px;
    width: 33px;
    transition: all 0.3s ease 0s;
  }
  .msg_send_btn:hover,
  .msg_send_btn:focus {
    color: #68d391;
    background: #fff;
  }

  .msg_send_btn:disabled {
    background: #8f8e8e;
    color: #fff;
    cursor: not-allowed;
  }

  .messaging {
    padding: 0;
    display: flex;
  }
  .msg_history {
    height: 80vh;
    overflow-y: auto;
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

  /*Popup animation*/

  @keyframes popup {
    0% {
      transform: scale(5) rotate(0);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    50% {
      transform: scale(1) rotate(-0.2deg);
      opacity: 1;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0.5);
    }
    75% {
      transform: scale(1) rotate(0.2deg);
      opacity: 1;
      box-shadow: 0 0 250px rgba(241, 241, 241, 0.5);
    }
    100% {
      transform: scale(1) rotate(0);
      opacity: 1;
      box-shadow: 0 0 500px rgba(241, 241, 241, 0);
    }
  }

  /* Spinner CSS */
  .loader {
    font-size: 10px;
    margin: 50px auto;
    margin-top: 250px;
    text-indent: -9999em;
    width: 10em;
    height: 10em;
    border-radius: 50%;
    background: #827ffe;
    background: -moz-linear-gradient(
      left,
      #827ffe 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: -webkit-linear-gradient(
      left,
      #827ffe 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: -o-linear-gradient(
      left,
      #827ffe 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: -ms-linear-gradient(
      left,
      #827ffe 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: linear-gradient(
      to right,
      #827ffe 10%,
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
    background: #827ffe;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background: #fff;
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
</style>
