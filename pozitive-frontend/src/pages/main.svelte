<script>
    import ClickOutside from 'svelte-click-outside';
    let isClicked = false;

    function onClickOutside() {
        if (isClicked == false) {
            isClicked = true;
            console.log(isClicked);
        }
        else {
            isClicked = false;
            console.log(isClicked);
        }
    }
</script>

<header>
    
    <div class="header">
        <a href="main" style="text-decoration: none">
            <img src="./assets/ALGA.svg" alt="logo-svg">
        </a>

        <a href="/" class="header-button" style="text-decoration: none">Теркәлү</a>
    </div>

   <div class="b-marquee">
    <div class="b-marquee__text">Туган телне кадерләгән халык кадерле булыр Туган телне кадерләгән халык кадерле булыр</div>
  </div>
</header>

<div class="main">
<button on:click={onClickOutside}>
    {#if isClicked == false}
        <div class="main-block">
            <h2>Татар телен
                өйрәнү өчен
                мәктәп</h2>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="to-russian-img" src="./assets/clik2.png" />
            <p>Наводите на текст, чтобы переводить его на русский</p>
        </div>
    {:else}
        <div class="main-block">
            <h2>Обучение татарскому языку</h2>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="to-russian-img" src="./assets/clik2.png" />
            <p>Наводите на текст, чтобы переводить его на русский</p>
        </div>
    {/if}   
</button>
<button on:click={onClickOutside}>
    <div class="reg-class">
        {#if isClicked == false}
            <div class="reg-block">
                <h2>Жәмгыятькә кушыл</h2>
                <!-- svelte-ignore a11y-missing-attribute -->
                <img class="to-russian-img" src="./assets/button.svg" />
                <img class="reg-img" src="./assets/img.png" />
            </div>
        {:else}
            <div class="reg-block">
                <h2>Присоединиться к сообществу</h2>
                <!-- svelte-ignore a11y-missing-attribute -->
                <img class="to-russian-img" src="./assets/button.svg" />
                <img class="reg-img" src="./assets/img.png" />
            </div>
        {/if}   
    </div>
</button>
</div>

<style>
    button {
        padding: 0;
        border: none;
        font: inherit;
        color: inherit;
        background-color: transparent;
        /* отображаем курсор в виде руки при наведении; некоторые
        считают, что необходимо оставлять стрелочный вид для кнопок */
        cursor: pointer;
        margin: 0;
    }

    .main {
        display: flex;
        flex-direction: column;
    }

    .reg-class {
        border-top: 2px solid #181818;
        border-bottom: 2px solid #181818;
        width: 100%;
    }

    .reg-img {
        border-left: 2px solid #181818;
        border-right: 2px solid #181818;
        margin-left: 20%;
    }

    .reg-class h2 {
        font-size: 44px;
    }

    .to-russian-img {
        margin-left: 104px;
    }

    button:active, button:focus {
        outline: none;
        background-color: transparent;
    }

    button::-moz-focus-inner {
        border: 0;
        background-color: transparent;
    }

    header {
        border-bottom: 2px solid #181818;
    }

    .main-block {
        display: flex;
        align-items: center;
        padding-bottom: 40px;
        width: 80%;
        border-right: 2px solid #181818;
    }

    .reg-block {
        display: flex;
        align-items: center;
        width: 100%;
    }

    h2 {
        color: #181818;
        max-width: 634px;
        font-size: 80px;
        margin-top: 30px;
        margin-left: 20px;
        text-align: left;
    }

    p {
        font-family: Museocyr;
        font-size: 24px;
        max-width: 319px;
        text-align: left;
        color: #181818;
        margin-top: 60px;
        margin-right: 100px;
    }

    .header {
        display: flex;
        align-items: center;
        padding: 40px;
    }

    .header-button {
		margin: 0;
		padding: 0;
		width: 170px;
		padding: 10px;
		margin-left: 40px;
		color: #F9F9F9;
        font-family: Museocyr;
		border: none;
		background-color: #181818;
		font-size: 24px;
        border-radius: 43px;
        margin-left: 80%;
        text-align: center;
	}

    .block {     
		float: right;
        right: 0;
        background-color: #181818;
        color: #fff;
        height: 100vh;
        padding: 30px;
	} 

	.vertical-lr {     
        font-family: "Benzin-Bold";
        font-size: 40px;
		writing-mode: vertical-lr; 
        height: 100vh;
	}

    .b-marquee {
        top: 0;
        right: 0;
        font-family: 'Segoe UI', sans-serif;
        white-space: nowrap;
        overflow: hidden;
        background: #181818;
        color: #fff;
        padding: 10px;
        position: absolute;
        margin-bottom: 10px;
    }

    .b-marquee__text {
            -webkit-animation: animMarquee 5s linear infinite;
            animation: animMarquee 3s linear infinite;
            font-family: "Benzin-Bold";
            font-size: 40px;
            writing-mode: vertical-lr; 
            height: 100vh;
    }

    @keyframes animMarquee {
        0% {
            -webkit-transform: translateY(100%);
            transform: translateY(100%);
        }
        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }
</style>