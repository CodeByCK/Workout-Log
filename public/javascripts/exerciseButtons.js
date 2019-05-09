

//===========================delete==========================
let deleteBtns = document.querySelectorAll("#delete-btn");
for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener("click", (e) => {
    let exerciseId = e.target.attributes.exerciseid.value;
    axios.post('/deleteExercise', { exerciseId }).then(result => {
      location.reload();
    })
  })
}



//==============================edit ============================
let editBtns = document.querySelectorAll("#edit-btn");
for (let i = 0; i < editBtns.length; i++) {
  editBtns[i].addEventListener("click", (e) => {
    let exerciseId = e.target.attributes.exerciseid.value;

    let data = JSON.parse(e.target.attributes.data.value);
    console.log(data)

    document.querySelector("#editModal").innerHTML = `
<div class="modal fade" id="editExercise" tabindex="-1" role="dialog" aria-labelledby="editExerciseLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editExerciseLabel">Add Exercise</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/editExercise" method="POST" id="edit">
          <input type="text" class="form-control" name="name" value="${data.name}"><br>
          <input type="text" class="form-control" name="reps" value="${data.reps}"><br>
          <input type="text" class="form-control" name="sets" value="${data.sets}"><br>
          <input type="text" class="form-control" name="weight" value="${data.weight}"><br>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="submitEdit" exerciseId=${exerciseId}>Save Changes</button>
      </div>
    </div>
  </div>
</div>`

    document.querySelector('#submitEdit').addEventListener("click", (e) => {
      let exerciseId = e.target.attributes.exerciseid.value
      let name = document.querySelector('#edit > input:nth-child(1)').value
      let reps = document.querySelector('#edit > input:nth-child(3)').value
      let sets = document.querySelector('#edit > input:nth-child(5)').value
      let weight = document.querySelector('#edit > input:nth-child(7)').value

      axios.post('/editExercise', { exerciseId, name, reps, sets, weight }).then(() => {
        location.reload()
      });
    })
  })
}