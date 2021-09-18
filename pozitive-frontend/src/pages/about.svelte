<script>

</script>

<div class="about-section">
    <div class="headContainer">
      <a href="/" style="text-decoration: none">
        <span class="login-text">MessengeRAZ<span class="dot">.</span></span><span class="beta">Beta</span>
    </a>
    </div>
    <p>A simple text-based chatting web app</p>
    <p>MessengeRAZ Beta is a very simple and open-source chatting app built as an individual project
       on top of the Svelte framework and connected with Google's Firestore Cloud Storage with
       very intuitive responsive UI and other modern features. Not recommended for personal use
       as it comes with many vulnerabilities and security concerns that were not taken care of
       during the development. However, You can fork this project on GitHub and extend security
       features such as authentication and optimize the code as you wish. :)

    </p>
  </div>
  
  <h2 style="text-align:center">Contact the developer</h2>
  <div class="row">
    <div class="column">
      <div class="card">
        <img src="https://i.ibb.co/qjMY3ky/raz0229.png" alt="raz0229" style="width:100%">
        <div class="container">
          <h2>raz0229</h2>
          <p class="title">Full-Stack Developer</p>
          <p>I have no life...</p>
          <p>raja.zafar229@gmail.com</p>
          <p><a style="text-decoration: none; color: white;" href="https://raz0229.github.io"><button class="button">Contact and Profile</button></a></p>
        </div>
      </div>
    </div>
</div>

<p style="font-family: cabin; text-align: center; padding:5%; color: #bbb9b9;">Copyright &copy; MessengeRAZ 2021.</p>


<style>
 .headContainer {
  position: relative;
 }

 .login-text {
    display: table-caption;
    margin-top: 5px;
		font-size: 30px;
    font-family: 'Ubuntu';
		color: #2e2e2e;
		line-height: 1.2;
		text-transform: uppercase;
		width: 100%;
		/*display: block; text-align: center; */
	}

	.dot {
		color: #827ffe;
	}

  .beta {
    border: solid 1px #68d391;
    border-radius: 5px;
    position: absolute;
    margin-left: 10px;
    top: 20%;
    padding: 2px 5px 2px 5px;
    font-size: 12px;
    background-color: #f7f7f7;
  }
 
p {
  font-family: sans-serif;
}

h2 {margin-top: 2rem;}

img {
  width: 50% !important;
  display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #f7f7f7;
  color: #2e2e2e;
}

.container {
  padding: 0 16px;
}

.row {
  justify-content: center;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}   
</style>