<script>
    import { db, fv } from "../firebase.js";

    let name = "";
    let email = "";
    let pswd = "";
    let cpswd = "";
    let pet = "";
    let birthplace = "";
    let food = "";
    let hasNoError = true;
    let title = "";
    let text = "";

    const submitHandler = (e) => {
        //clears error messages
        errorHandler("");

        if (pswd.length < 5) {
            errorHandler("Password should be minimum 5 characters");
            hasNoError = false;
        }

        if (hasNoError) {
            const usersRef = db
                .collection("messages")
                .doc(name.toLowerCase() + "-" + "raz0229");
            const usersRef2 = db
                .collection("messages")
                .doc("raz0229" + "-" + name.toLowerCase());
            const mesg =
                "Hi! :) Welcome to MessengeRAZ. This is RAZ (Developer of MessengeRAZ). You can use this chat to report bugs or give feedback. Over!";

            db.collection("accounts").add({
                username: name.toLowerCase(),
                email: email.toLowerCase(),
                password: pswd,
                food: food.toLowerCase(),
                birthplace: birthplace.toLowerCase(),
                pet: pet.toLowerCase(),
            });

            db.collection("messages")
                .doc(name.toLowerCase())
                .set({
                    recent_chats: fv.arrayUnion({
                        name: "raz0229",
                        time: new Date().toDateString().substring(4, 10),
                        msg: "Hi! Welcome to MessengeRAZ. This...",
                        notSeen: true,
                    }),
                });

            db.collection("messages")
                .doc("raz0229")
                .update({
                    recent_chats: fv.arrayUnion({
                        name: name.toLowerCase(),
                        time: new Date().toDateString().substring(4, 10),
                        msg: "Special access to dev only",
                        notSeen: true,
                    }),
                });

            usersRef.set({
                raz0229: fv.arrayUnion({
                    id: makeid(),
                    time: formatAMPM(new Date()),
                    msg: mesg,
                    type: "received",
                }),
            });
            usersRef2
                .set({
                    [name.toLowerCase()]: fv.arrayUnion({
                        id: makeid(),
                        time: formatAMPM(new Date()),
                        msg: mesg,
                        type: "sent",
                    }),
                })
                .then(() => {
                    alertify("Success!", "Account has been created", "#68d391");
                });

            clearForm();
        } else {
            clearForm();
            alertify("Something went wrong!", "Try again", "#d36868");
        }
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

    function makeid() {
        var text = "";
        var possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );

        return text;
    }

    const clearForm = () => {
        const form = document.querySelector("#frm");
        form.name.value = "";
        form.email.value = "";
        form.password.value = "";
        form.cpassword.value = "";
        form.birthplace.value = "";
        form.pet.value = "";
        form.food.value = "";
    };

    const alertify = (head, message, color) => {
        const msg = document.querySelector(".alert");
        msg.style.display = "block";

        msg.style.backgroundColor = color;
        title = head;
        text = message;
    };

    const errorHandler = (str) => {
        const err = document.querySelector(".para");
        err.textContent = "";

        let errorMessage = document.createElement("p");
        errorMessage.textContent = str;

        err.appendChild(errorMessage);
    };

    const usernameCheck = (val) => {
        errorHandler("");
        hasNoError = true;

        // restrict spaces and special characters in username
        var patt = /[^\w]/g;
        if (patt.test(name)) {
            errorHandler("Username can't have spaces or some characters");
            hasNoError = false;
        }

        db.collection("accounts")
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.data().username == val) {
                        errorHandler("Username taken");
                        hasNoError = false;
                    }

                    if (doc.data().email == val) {
                        errorHandler(
                            "Account already registered. Try logging in"
                        );
                        hasNoError = false;
                    }
                });
            });
    };
</script>

<div class="alert" style="display: none;">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">
        &times;</span
    >
    <strong> {title} </strong>
    {text}
</div>
<div class="container">
    <a href="/" style="text-decoration: none"
        ><span class="login-text">MessengeRAZ<span class="dot">.</span></span
        ></a
    >
    <form
        id="frm"
        on:submit|preventDefault={pswd == cpswd
            ? submitHandler
            : () => errorHandler("Password does not match")}
    >
        <input
            id="name"
            name="name"
            type="text"
            placeholder="Username"
            on:keyup={usernameCheck(name)}
            bind:value={name}
            required
        />
        <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            on:keyup={usernameCheck(email)}
            bind:value={email}
            required
        />
        <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            bind:value={pswd}
            required
        />
        <input
            id="cpassword"
            name="cpassword"
            type="password"
            placeholder="Confirm Password"
            bind:value={cpswd}
            required
        />
        <p
            class="para"
            style="font-family: sans-serif; font-size: 17px; color: crimson"
        />
        <div class="line" />
        <input
            id="pet"
            type="text"
            placeholder="Your Pet's name"
            bind:value={pet}
            required
        />
        <input
            id="birthplace"
            type="text"
            placeholder="Your birthplace"
            bind:value={birthplace}
            required
        />
        <input
            id="food"
            type="text"
            placeholder="Your favorite food"
            bind:value={food}
            required
        />
        <p class="skip"><a id="a" href="/">Skip this step</a></p>
        <button class="button button2">Create Account</button>
    </form>
    <div class="line" />
    <a class="link" id="a" href="/">LOGIN</a>
</div>

<style>
    .container {
        font-family: "Ubuntu", sans-serif;
        margin: 5rem auto;
        display: grid;
        justify-content: center;
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

    #a {
        text-decoration: none;
        color: white;
    }

    .dot {
        color: #827ffe;
    }

    input {
        line-height: 1.2;
        font-size: 18px;
        display: block;
        width: 100%;
        background: 0 0;
        height: 62px;
        padding: 0 20px 0 38px;
        background-color: #f7f7f7;
    }

    input::placeholder {
        color: #a9adaf;
        font-family: "Ubuntu", sans-serif;
    }

    input:required {
        border-color: #68d391;
    }

    .link {
        width: 100%;
        padding: 15px;
        text-align: center;
        color: #f7f7f7;
        background-color: #827ffe;
    }

    .button {
        width: 100%;
        padding: 15px;
        color: #f7f7f7;
        background-color: #827ffe;
    }

    .button:hover,
    .link:hover {
        background-color: #403866;
    }

    .line {
        align-items: center;
        border-bottom: 1px solid #dadde1;
        display: flex;
        margin: 20px 0 20px 0;
        text-align: center;
    }

    .button2 {
        background-color: #68d391;
        margin-top: 10px;
    }

    .button2:hover {
        background-color: #38663a;
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
</style>
