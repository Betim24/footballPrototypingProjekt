<script>
  import axios from "axios";
  import { writable } from 'svelte/store';
    import matches from "../../data.js";

  
  export let data = { matches: [] };

  // Reactive store for visited status
  let visitedStatus = writable(data.matches.map(() => null)); // Initial state: No selection

  // Update visited status
  function updateVisitedStatus(index, status) {
    visitedStatus.update((statuses) => {
      statuses[index] = status;
      return statuses; // Return the updated array
    });
  }

  // State for showing the form
  let showAddForm = false;

  // State for showing the success popup
  let showSuccessPopup = false;

// Stadium details for the form
let newMatches= {
    homeTeam: "",
    awayTeam: "",
    date: "",
    stadium: "",
    score: "",
    photo: "",
    logo1: "",
    logo2: "",
  };

   // Function to handle adding a stadium
   function addMatch() {
    axios
      .post("/api/matches", newMatches)
      .then((response) => {
        console.log(response.data);

        // Add new stadium to the local data array for immediate update
        data.matches = [
          ...data.matches,
          { ...newMatches, score: parseInt(newMatches.score, 10) },
        ];

        // Reset the form and hide it
        newMatches = { homeTeam: "", awayTeam: "", date: "", stadium: "", score: "" };
        showAddForm = false;

        // Show success popup
        showSuccessPopup = true;

        // Hide the success popup after 3 seconds
        setTimeout(() => {
          showSuccessPopup = false;
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred while adding the match.");
      });
  }

</script>


<h1>Meine Spiele</h1>

<!-- Button to Show Add Matches Form -->
<button onclick={() => (showAddForm = true)} class="btn btn-primary">Add Match</button>



<div class="card-container">
  {#each $visitedStatus as status, index}
    <div
      class="card {status === 'visited' ? 'visited' : status === 'not_visited' ? 'not-visited' : ''}"
    >
      <!-- Match Image -->
      <div class="card-image">
        <img
          src={"/images/Stadien/" + data.matches[index].photo} alt="" width="100" onerror={(e) => (e.target.src = "/images/Stadien/alternativ.jpg")} />
      </div>

      <!-- Match Details -->
      <div class="card-details">
        <div class="card-header">
          <h2>{data.matches[index].date} - {data.matches[index].stadium}</h2>
        </div>

        <div class="card-body">
          <!-- Home Team -->
          <div class="team">
            <img src={"/images/Wappen/" + data.matches[index].logo1} alt="" width="100" onerror={(e) => (e.target.src = "/images/Wappen/home.png")} />
            <span>{data.matches[index].homeTeam}</span>
          </div>

          <!-- Score -->
          <div class="score">{data.matches[index].score}</div>

          <!-- Away Team -->
          <div class="team">
            <img src={"/images/Wappen/" + data.matches[index].logo2} alt="" width="100" onerror={(e) => (e.target.src = "/images/Wappen/away.png")} />
            <span>{data.matches[index].awayTeam}</span>
          </div>
        </div>

        <!-- Radio Buttons for Visited Status -->
        <div class="card-actions">
          <label>
            <input
              type="radio"
              name={`visited-${index}`}
              value="visited"
              onchange={() => updateVisitedStatus(index, 'visited')}
              checked={status === 'visited'}
            />
            Besucht
          </label>
          <label>
            <input
              type="radio"
              name={`visited-${index}`}
              value="not_visited"
              onchange={() => updateVisitedStatus(index, 'not_visited')}
              checked={status === 'not_visited'}
            />
            Nicht besucht
          </label>
        </div>
      </div>
    </div>
  {/each}
</div>

{#if showAddForm}
  <div class="modal">
    <div class="modal-content">
      <h2>Add Match</h2>
      <form onsubmit={addMatch}>
        <div>
          <label for="homeTeam">Heimteam:</label>
          <input type="text" id="homeTeam" bind:value={newMatches.homeTeam} required />
        </div>
        <div>
          <label for="awayTeam">Auswärtsteam:</label>
          <input type="text" id="awayTeam" bind:value={newMatches.awayTeam} required />
        </div>
        <div>
          <label for="date">Datum:</label>
          <input type="date" id="date" bind:value={newMatches.date} required />
        </div>
        <div>
          <label for="stadium">Stadion:</label>
          <input type="text" id="stadium" bind:value={newMatches.stadium} required />
        </div>
        <div>
          <label for="score">Ergebnis:</label>
          <input type="text" id="score" bind:value={newMatches.score} required />
        </div>
        <button type="submit" class="btn btn-success">Add</button>
        <button
          type="button"
          onclick={() => (showAddForm = false)}
          class="btn btn-secondary"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
{/if}

<!-- Success Popup -->
{#if showSuccessPopup}
  <div class="success-popup">
    <p>Match added successfully!</p>
  </div>
{/if}

<style>


/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
  }

  .modal-content form div {
    margin-bottom: 1rem;
  }

  .modal-content form label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .modal-content form input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  /* Container for the cards */
  .card-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }

  /* Card Styles */
  .card {
    display: flex;
    flex-direction: row;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    width: 100%; /* Full-width */
    padding: 10px;
    background-color: #ffffff; /* Default white background */
  }

  .card.visited {
    background-color: #d4edda; /* Light green for visited */
    border: 2px solid #28a745;
  }

  .card.not-visited {
    background-color: #f8d7da; /* Light red for not visited */
    border: 2px solid #dc3545;
  }

  .card:hover {
    transform: scale(1.02);
  }

  /* Match Image */
  .card-image {
    width: 40%;
    height: 100%;
    overflow: hidden;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Match Details */
  .card-details {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
  }

  .card-header h2 {
    margin: 0 0 10px;
    font-size: 1.5rem;
    color: #333;
  }

  /* Teams and Score */
  .card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }

  .team {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .team img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 50%;
  }

  .score {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-align: center;
    flex: 1;
  }

  /* Radio Buttons */
  .card-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    align-items: center;
  }

  .card-actions label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  .btn-primary {
    background-color: #007bff;
    color: white;
    margin-bottom: 20px;
    padding: 8px 15px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
  }

  .btn-success {
    background: #28a745;
    color: white;
  }

  /* Success Popup Styles */
  .success-popup {
    position: fixed;
    top: 10%;
    right: 10%;
    background: #28a745;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1100;
    animation: fadeInOut 3s ease;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>