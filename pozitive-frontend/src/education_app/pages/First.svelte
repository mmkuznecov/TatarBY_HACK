<script>
  import { debug } from "svelte/internal";
  
      let answer_input;
      let questions = [
        {
          question_id: '0',
          question: "Введите слово с картинки",
          answer: "test"
        }
      ]
  
      const checkAnswer = (answer_input, correct_answer, question_id) => {
        if (answer_input == correct_answer) {
          let x = document.getElementById("submit-button");
          x.setAttribute("class", "correct_button");
          console.log(correct_answer);
        }
      }
  </script>
  
  <a href="/" class="a-class"><img src="assets/arrowbefore.svg" class="arrow-before" /></a>
  <div class="quiz-section">
    <a href="zero">Уровень 1</a>
  </div>
  
  <style>
    .correct_button {
      background: green;
    }

    .a-class {
      background-color: transparent;
      text-decoration: none;
    }
  
    .arrow-before {
      padding: 10px;
    }
  
    span {
      font-family: Benzin-Bold;
      font-size: 24px;
      color: #181818;
    }
  
    img {
      max-width: 500px;
    }
  
    input {
      font-family: Museocyr;
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
      text-align: center;
    }
  
    input::placeholder {
      color: rgba(0, 0, 0, 0.4);
      font-family: Museocyr;
      font-size: 38px;
      text-align: center;
    }
  
    .quiz-section {
      position: absolute;
      top: 40%;
      float: center;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
  
    a { 
      margin: 0;
      padding: 10px;
      margin-top: 20px;
      width: 170px;
      color: #F9F9F9;
      font-family: Museocyr;
      border: none;
      background-color: #181818;
      font-size: 24px;
      border-radius: 43px;
      text-align: center;
    }
  
  </style>