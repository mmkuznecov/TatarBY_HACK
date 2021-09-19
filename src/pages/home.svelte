<script>
	import { db } from "../firebase.js";
	import Web from "./web.svelte";
	import Header from "../components/header.svelte";

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
					errorMessage = "Введено неправильное имя пользователя или пароль";
					const error = document.querySelector(".alert");
					error.style.display = "block";
				}
			});
	};
</script>

<Header {accNotFound}/>

{#if accNotFound}
	<div class="alert" style="display: none;">
		<span
			class="closebtn"
			onclick="this.parentElement.style.display='none';"
		>
			&times;</span
		>
		<strong>Ошибка.</strong>
		{errorMessage}
	</div>
	<div class="main">
		<div class="container-main">
			<h2>Керергә</h2>
			<form class="frm" on:submit={submitHandler}>
				<input
					id="name"
					type="text"
					placeholder="Имя пользователя"
					required
					bind:value={name}
				/>
				<input
					id="password"
					type="password"
					placeholder="Пароль"
					required
					bind:value={password}
				/>
				<button class="button"
					><span class="buttonText">Керергә</span>
					{#if loading}
						<div class="lds-ellipsis">
							<div />
							<div />
							<div />
							<div />
						</div>
					{/if}
				</button>
				<a class="link" href="signup">Ерак</a>
			</form>
		</div>
	</div>
	<div class="text-decoration"></div>
{:else}
	<Web bind:name />
{/if}

<style>
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

	:root {
        --primary-color: #F43737;
        --primary-color-2: #019A47;
        --primary-color-3: #FFCB00;
    }

	h2 {
		font-size: 80px;
		margin-left: 40px;
		color: #181818;
		margin-bottom: 24px;
	}

	.main {
		display: grid;
		border-left: 2px solid #181818;
		height: 100vh;
		margin-left: 10%;
		padding: 0;
	}

	.container-main {
		font-family: "Ubuntu", sans-serif;
		margin: 0;
		margin-top: 96px;
		padding: 0;
		width: 100%;
	}
	
	.forget,
	#a {
		margin: 20px;
		font-family: "Roboto", sans-serif;
		font-size: 16px;
		text-decoration: none;
		color: #181818;
	}

	#a:hover {
		color: #181818;
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

	input:first-child {
		border-bottom: none;
	}

	input::placeholder {
		color: rgba(0, 0, 0, 0.4);
		font-family: Museocyr;
		font-size: 38px;
	}

	.link {
		padding: 15px;
		font-family: 'Benzin', regular;
		text-align: center;
		color: #181818;
		font-size: 24px;
	}

	.button {
		margin: 0;
		margin-top: 40px;
		padding: 0;
		width: 170px;
		padding: 10px;
		margin-left: 40px;
		color: #F9F9F9;
		border: none;
		background-color: #181818;
		font-size: 24px;
	}

	.button:hover {
		background-color: rgb(129, 129, 129);
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
		font-size: 24px;
	}

	.alert {
		position: fixed;
		top: 10px;
		left: 10px;
		padding: 20px;
		background-color: var(--primary-color);
		color: white;
		width: 350px;
	}

	.closebtn {
		margin-left: 15px;
		color: white;
		font-weight: bold;
		float: right;
		font-size: 22px;
		line-height: 82px;
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
