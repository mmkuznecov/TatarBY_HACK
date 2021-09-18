<script>
    import { db } from "../firebase.js";
    let password = "";
    let cpassword = "";
    let error = "";
    export let id = "";

    const redirect = () => {
        if (password != cpassword) {
            error = "Password does not match";
        } else if (password.length < 5) {
            error = "Password should be minimum 5 chars";
        } else {
            db.collection("accounts")
                .doc(id)
                .update({
                    password: password,
                })
                .then(() => {
                    location.replace("/");
                });
        }
    };
</script>

<div class="back-drop">
    <div class="model">
        <h2>Recover Password</h2>
        <input
            type="password"
            placeholder="Enter new password"
            bind:value={password}
        />
        <input
            type="password"
            placeholder="Confirm new password"
            bind:value={cpassword}
        />
        <p style="color: crimson; font-family: sans-serif;">{error}</p>
        <button class="link" on:click={redirect}>Recover and Login</button>
    </div>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

    .back-drop {
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        margin: -88px 0 0 -8px;
    }

    h2 {
        margin-bottom: 30px;
    }

    input {
        width: 90%;
        display: block;
        border: none;
        border-bottom: 2px solid #ebebeb;
        padding: 5px 0;
        color: #222;
        margin: 0 10px 31px 20px;
        font-family: "Roboto", sans-serif;
    }

    input:focus {
        border-color: #827ffe;
        outline: none;
    }

    .link {
        padding: 15px;
        width: 100%;
        font-family: "Ubuntu";
        color: #f7f7f7;
        border-radius: 10px;
        background-color: #827ffe;
    }

    .link:hover {
        background-color: #403866;
    }

    .model {
        padding: 10px;
        border-radius: 10px;
        max-width: 400px;
        margin: 10% auto;
        text-align: center;
        background: white;
    }
</style>
