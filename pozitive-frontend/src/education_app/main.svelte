<script>
import { debug } from "svelte/internal";


    let answer_input;
    let questions = [
      {
        question_id: '0',
        question: "Первый вопрос",
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

{#each questions as question}
  <div>{question.question}</div>
  <input bind:value={answer_input}>
  <button id="submit-button" on:click={checkAnswer(answer_input, question.answer, question.question_id)}>{answer_input}</button>
{/each}

<style>
  .correct_button {
    background: green;
  }
</style>