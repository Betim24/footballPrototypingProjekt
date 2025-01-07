<script>
    let { data, form } = $props();
  </script>
  
  <h1>Spiele (ID: {data.match._id})</h1>
  <a href="/matches">Zurück</a>
  <form class="mt-3" method="POST" action="?/update">
    <input type="hidden" name="_id" value={data.match._id} />
    <div class="mb-3">
      <label class="form-label" for="">Date</label>
      <input
        name="name"
        bind:value={data.match.date}
        class="form-control"
        type="text"
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="">HomeTeam</label>
      <input
        name="city"
        bind:value={data.match.homeTeam}
        class="form-control"
        type="text"
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="">AwayTeam</label>
      <input
        name="capacity"
        bind:value={data.match.awayTeam}
        class="form-control"
        type="text"
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="">Stadium</label>
      <input
        name="name"
        bind:value={data.match.stadium}
        class="form-control"
        type="text"
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="">Score</label>
      <input
        name="result"
        bind:value={data.match.score}
        class="form-control"
        type="text"
      />
    </div>
    <button class="btn btn-primary">Save</button>
  </form>
  
  {#if form?.success}
    <p>Match updated</p>
  {/if}