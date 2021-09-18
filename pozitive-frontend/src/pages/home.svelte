<script>
	import { db } from "../firebase.js";
	import Web from "./web.svelte";

	let name;
	let password = "";
	let loading = false;
	let accNotFound = true;
	let errorMessage;

	const submitHandler = (e) => {
		accNotFound = true;

		const button = document.querySelector(".buttonText");
		button.style.display = "none";

		loading = true;

		e.preventDefault();

		db.collection("accounts")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					if (
						doc.data().username == name &&
						doc.data().password == password
					) {
						accNotFound = false;
					}
				});

				loading = false;
				button.style.display = "block";

				if (accNotFound) {
					errorMessage = "Incorrect username or password.";
					const error = document.querySelector(".alert");
					error.style.display = "block";
				}
			});
	};
</script>

{#if accNotFound}
	<div class="alert" style="display: none;">
		<span
			class="closebtn"
			onclick="this.parentElement.style.display='none';"
		>
			&times;</span
		>
		<strong>Warning!</strong>
		{errorMessage}
	</div>
	<div class="container">
		<a href="/" style="text-decoration: none"
			><span class="login-text"
				>MessengeRAZ<span class="dot">.</span></span
			></a
		>
		<form class="frm" on:submit={submitHandler}>
			<input
				id="name"
				type="text"
				placeholder="Username"
				required
				bind:value={name}
			/>
			<input
				id="password"
				type="password"
				placeholder="Password"
				required
				bind:value={password}
			/>
			<p class="forget"><a id="a" href="recover">Forgot Password?</a></p>
			<button class="button"
				><span class="buttonText">LOGIN</span>
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
		<a class="link" href="signup">Create Account</a>
	</div>
{:else}
	<Web bind:name />
{/if}

<style>
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
	.container {
		font-family: "Ubuntu", sans-serif;
		margin: 10rem auto;
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

	.dot {
		color: #827ffe;
	}

	.forget,
	#a {
		margin: 20px;
		font-family: "Roboto", sans-serif;
		font-size: 16px;
		text-decoration: none;
		text-align: center;
		color: #827ffe;
	}

	#a:hover {
		color: #403866;
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

	input:required {
		border-color: #68d391;
	}

	input::placeholder {
		color: #a9adaf;
		font-family: "Ubuntu";
	}

	.link {
		width: 100%;
		padding: 15px;
		text-align: center;
		color: #f7f7f7;
		background-color: #68d391;
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

	.link:hover {
		background-color: #38663a;
	}

	.alert {
		position: fixed;
		top: 10px;
		left: 10px;
		padding: 20px;
		background-color: #d36868;
		color: white;
		width: 350px;
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
