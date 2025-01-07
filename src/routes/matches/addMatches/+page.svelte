<script>
    let { form } = $props();
  </script>
  
  <a href="/matches">Zurück</a>
  <h1>Neues Spiel hinzufügen</h1>
  <form method="POST" action="?/addMatches">
    <div class="mb-3">
      <label for="" class="form-label">Date</label>
      <input name="date" class="form-control" type="text" />
    </div>
    <div class="mb-3">
      <label for="" class="form-label">HomeTeam</label>
      <input name="team" class="form-control" type="text" />
    </div>
    <div class="mb-3">
      <label for="" class="form-label">AwayTeam</label>
        <input name="team" class="form-control" type="text" />
    </div>
    <div class="mb-3">
      <label for="" class="form-label">Stadium</label>
        <input name="stadium" class="form-control" type="text" />
    </div>
    <div class="mb-3">
      <label for="" class="form-label">Score</label>
        <input name="score" class="form-control" type="text" />
    </div>
    <button type="submit" class="btn btn-primary"> Spiel hinzufügen </button>
  </form>
  
  {#if form?.success}
    <p>Spiel hinzugefügt</p>
  {/if}