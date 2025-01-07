<script>
  import { onMount } from "svelte";

  // Reactive variables
  let title = "Erleben Sie Groundhopping hautnah!";
  let stadiums = [];
  let games = [];
  let showStadiums = false;
  let showGames = false;

  // New game form inputs
  let newDate = "";
  let newTime = "";
  let newHomeTeam = "";
  let newAwayTeam = "";
  let newStadium = "";
  let newScore = "";
  let newVisited = false;

  // Fetch Stadiums CSV
  async function fetchStadiums() {
    const response = await fetch("/stadiums");
    const text = await response.text();

    // Parse CSV
    const rows = text.split("\n").slice(1); // Skip header
    stadiums = rows.map(row => {
      const [name, city, capacity, teams] = row.split(",");
      return { name, city, capacity, visited: false };
    });

    showStadiums = true;
  }

  // Fetch Games CSV
  async function fetchGames() {
    const response = await fetch("/matches");
    const text = await response.text();

    // Parse CSV
    const rows = text.split("\n").slice(1); // Skip header
    games = rows.map(row => {
      const [homeTeam, awayTeam, date, stadium, score] = row.split(",");
      return { 
        homeTeam, 
        awayTeam, 
        date: formatDate(date), 
        time: "TBA", // Default time if not available
        stadium, 
        score, 
        visited: false // Default visited
      };
    });

    showGames = true;
  }

  // Format ISO date to YYYY-MM-DD
  function formatDate(isoDate) {
    return isoDate.split("T")[0]; // Extract only date part
  }

  // Toggle visited status for a game
  function toggleVisited(index) {
    games[index].visited = !games[index].visited;

    // Check if any game in a stadium is visited
    const stadiumName = games[index].stadium;
    const stadium = stadiums.find(s => s.name === stadiumName);
    if (stadium) {
      stadium.visited = games.some(game => game.stadium === stadiumName && game.visited);
    }
  }

  // Add a new game
  function addGame() {
    if (newDate && newTime && newHomeTeam && newAwayTeam && newStadium && newScore) {
      // Add the new game
      games.push({
        homeTeam: newHomeTeam,
        awayTeam: newAwayTeam,
        date: newDate,
        time: newTime,
        stadium: newStadium,
        score: newScore,
        visited: newVisited
      });

      // Enable the associated stadium if marked visited
      const stadium = stadiums.find(s => s.name === newStadium);
      if (stadium) {
        stadium.visited = newVisited;
      }

      // Clear the form
      newDate = "";
      newTime = "";
      newHomeTeam = "";
      newAwayTeam = "";
      newStadium = "";
      newScore = "";
      newVisited = false;
    } else {
      alert("Bitte füllen Sie alle Felder aus!");
    }
  }
</script>

<main>
  <!-- Welcome Section -->
  <section id="welcome">
    <div class="welcome-container">
      <h1>{title}</h1>
      <p>
        "Groundhopping im Fußball ist mehr als nur Stadien zu besuchen – es ist die Leidenschaft, die Vielfalt des Sports zu erleben, einzigartige Atmosphären zu entdecken und unvergessliche Geschichten von der Reise zu sammeln."
      </p>

      <!-- Buttons -->
      <div class="button-container">
        <a class="btn" href="/stadiums">Zu den Stadien</a>
        <a class="btn" href="/matches">Zu den Spielen</a>
      </div>
    </div>
  </section>

  <!-- Other sections can remain unchanged -->
</main>

<style>
  /* Style für die Welcome Section */
  #welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh; /* Vertikal zentrieren */
    flex-direction: column;
    padding: 50px;
    background-image: url("/images/startseite1.jpg"); /* Hintergrundbild */
    background-size: cover; /* Bild füllt den gesamten Container */
    background-position: center; /* Bild wird zentriert */
    color: white; /* Weißer Text für bessere Lesbarkeit */
  }

  .welcome-container {
    max-width: 800px;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.6); /* Transparenter Hintergrund für besseren Kontrast */
    padding: 20px;
    border-radius: 10px;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px; /* Abstand zwischen den Buttons */
  }

  .btn {
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    transition: background-color 0.3s;
  }

  .btn:hover {
    background-color: #0056b3;
  }
</style>
