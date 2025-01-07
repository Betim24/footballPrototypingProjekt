<script>
  import axios from "axios";
  export let data = { stadiums: [] };

  // State for showing the form
  let showAddForm = false;

  // State for showing the success popup
  let showSuccessPopup = false;

  // Stadium details for the form
  let newStadium = {
    name: "",
    city: "",
    capacity: "",
    teams: "",
    photo: "",
  };

  // Function to handle adding a stadium
  function addStadium() {
    axios
      .post("/api/stadium", newStadium)
      .then((response) => {
        console.log(response.data);

        // Add new stadium to the local data array for immediate update
        data.stadiums = [
          ...data.stadiums,
          { ...newStadium, capacity: parseInt(newStadium.capacity, 10) },
        ];

        // Reset the form and hide it
        newStadium = { name: "", city: "", capacity: "", teams: "" };
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
        alert("An error occurred while adding the stadium.");
      });
  }
</script>

<h1>Schweizer Stadien im Profifussball</h1>
<table class="table">
  <thead>
    <tr>
      <th>Stadion</th>
      <th>Name</th>
      <th>City</th>
      <th>Capacity</th>
      <th>Teams</th>
    </tr>
  </thead>
  <tbody>
    {#each data.stadiums as stadium, index}
      <tr>
        <td>
          <img 
            src={"/images/Stadien/" + stadium.photo} alt="" width="100" onerror={(e) => e.target.src = '/images/Stadien/alternativ.jpg'} />
        </td>
        <td>{stadium.name}</td>
        <td>{stadium.city}</td>
        <td>{stadium.capacity}</td>
        <td>{stadium.teams}</td>
      </tr>
    {/each}
  </tbody>
</table>

<!-- Button to Show Add Stadium Form -->
<button onclick={() => (showAddForm = true)} class="btn btn-primary">Add Stadium</button>

<!-- Add Stadium Form -->
{#if showAddForm}
  <div class="modal">
    <div class="modal-content">
      <h2>Add Stadium</h2>
      <form onsubmit={addStadium}>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" bind:value={newStadium.name} required />
        </div>
        <div>
          <label for="city">City:</label>
          <input type="text" id="city" bind:value={newStadium.city} required />
        </div>
        <div>
          <label for="capacity">Capacity:</label>
          <input type="number" id="capacity" bind:value={newStadium.capacity} required />
        </div>
        <div>
          <label for="teams">Teams:</label>
          <input type="text" id="teams" bind:value={newStadium.teams} required />
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
    <p>Stadium added successfully!</p>
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

  .btn {
    margin-top: 1rem;
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-primary {
    background: #007bff;
    color: white;
  }

  .btn-success {
    background: #28a745;
    color: white;
  }

  .btn-secondary {
    background: #6c757d;
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
