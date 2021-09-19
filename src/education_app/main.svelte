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

<div class="quiz-section">
  {#each questions as question}
    <img src="assets/quiz.png" />
    <div>{question.question}</div>
    <input bind:value={answer_input} placeholder="Введите ваш ответ здесь">
    <button id="submit-button" on:click={checkAnswer(answer_input, question.answer, question.question_id)}>Ответить</button>
  {/each}
</div>

<style>
  .correct_button {
    background: green;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
</style>