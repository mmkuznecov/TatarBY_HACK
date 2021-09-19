<script>
    import { db, fv } from "../firebase.js";
    import Header from "../components/header.svelte";

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
    let accNotFound = true;

    const submitHandler = (e) => {
        //clears error messages
        errorHandler("");

        if (pswd.length < 5) {
            errorHandler("Пароль должен состоять как минимум из пяти символов");
            hasNoError = false;
        }

        if (hasNoError) {
            const usersRef = db
                .collection("messages")
                .doc(name.toLowerCase() + "-" + "ALGA");
            const usersRef2 = db
                .collection("messages")
                .doc("ALGA" + "-" + name.toLowerCase());
            const mesg =
                "Привет! :) Добро пожаловать в ALGA. Это сервис для изучения татарского языка. Здесь ты можешь общаться с технической поддержкой)";

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
                        name: "ALGA",
                        time: new Date().toDateString().substring(4, 10),
                        msg: "Привет! Добро пожаловать в ALGA...",
                        notSeen: true,
                    }),
                });

            db.collection("messages")
                .doc("ALGA")
                .update({
                    recent_chats: fv.arrayUnion({
                        name: name.toLowerCase(),
                        time: new Date().toDateString().substring(4, 10),
                        msg: "Special access to dev only",
                        notSeen: true,
                    }),
                });

            usersRef.set({
                ALGA: fv.arrayUnion({
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
                    alertify("Успешно!", "Аккаунт зарегистрирован", "#68d391");
                });

            clearForm();
        } else {
            clearForm();
            alertify("Что-то пошло не так!", "Попробуйте еще раз", "#d36868");
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
            errorHandler("Имя пользователя содержит недопустимые символы");
            hasNoError = false;
        }

        db.collection("accounts")
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.data().username == val) {
                        errorHandler("Имя пользователя уже используется");
                        hasNoError = false;
                    }

                    if (doc.data().email == val) {
                        errorHandler(
                            "Аккаунт уже зарегистрирован"
                        );
                        hasNoError = false;
                    }
                });
            });
    };
</script>

<Header {accNotFound} />
<div class="alert" style="display: none;">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">
        &times;</span
    >
    <strong> {title} </strong>
    {text}
</div>
<div class="main">
<div class="container-main">
    <form
        id="frm"
        on:submit|preventDefault={pswd == cpswd
            ? submitHandler
            : () => errorHandler("Пароли не совпадают")}
    >
        <input
            id="name"
            name="name"
            type="text"
            placeholder="Имя пользователя"
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
            placeholder="Пароль"
            bind:value={pswd}
            required
        />
        <input
            id="cpassword"
            name="cpassword"
            type="password"
            placeholder="Подтвердите пароль"
            bind:value={cpswd}
            required
        />
        <input
            id="pet"
            type="text"
            placeholder="Имя первого домашнего животного"
            bind:value={pet}
            required
        />
        <input
            id="birthplace"
            type="text"
            placeholder="Место рождения"
            bind:value={birthplace}
            required
        />
        <input
            id="food"
            type="text"
            placeholder="Любимое блюдо"
            bind:value={food}
            required
        />
        <p class="skip"><a id="a" href="/">Пропустить</a></p>
        <button class="button button2">Регистрация</button>
    </form>
    <a class="link" id="a" href="/">Вход</a>
</div>
</div>

<style>
    :root {
        --primary-color: #F43737;
        --primary-color-2: #019A47;
        --primary-color-3: #FFCB00;
    }

    .main {
        display: grid;
		border-left: 2px solid #181818;
		height: 100vh;
		margin-left: 10%;
		padding: 0;
    }

    .container-main {
		margin: 0;
		margin-top: 96px;
		padding: 0;
		width: 100%;
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
        line-height: 2;
		font-size: 18px;
		display: block;
		width: 100%;
		background: 0 0;
		height: 82px;
		border-left: none;
		outline: none;
		border-top: 2px solid #181818;
		border-bottom: 2px solid #181818;
		border-right: none;
		padding-left: 40px;
		margin: 0;
		font-size: 38px;
    }

    input:last-child {
		border-bottom: none;
	}

    input::placeholder {
        color: rgba(0, 0, 0, 0.4);
		font-family: Museocyr;
		font-size: 38px;
    }

    .link {
        width: 100%;
        padding: 15px;
        text-align: center;
        color: #f7f7f7;
        background-color: var(--primary-color);
    }

    .button {
        width: 100%;
        padding: 15px;
        color: #f7f7f7;
        background-color: var(--primary-color);
    }

    .button:hover,
    .link:hover {
        background-color: var(--primary-color-2);
    }

    .line {
        align-items: center;
        border-bottom: 1px solid #dadde1;
        display: flex;
        margin: 20px 0 20px 0;
        text-align: center;
    }

    .button2 {
        background-color: var(--primary-color-2);
        margin-top: 10px;
    }

    .button2:hover {
        background-color: var(--primary-color-2);
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
