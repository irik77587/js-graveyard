const db = new PouchDB('task');
const printTask = (doc) => {
    var completion = `<p class="bg-danger px-3 rounded-top text-white mb-0">Incompleted</p>`
    var markable = ``
    if (doc.completed) {
        completion = `<p class="bg-success px-3 rounded-top text-white mb-0">Completed</p>`
        markable = ` disabled`
    }
    var format = `
	<div class="col-md-12 my-3">
		${completion}
		<div class="border rounded-bottom mt-0 pt-3 bg-light">
			<p class="px-3">${doc.task}</p>
			<div class="d-flex justify-content-end">
				<button class="btn btn-success mb-2 mx-2${markable}" onclick="mark_by_Id_as_complete('${doc._id}')">Mark as Complete</button>
				<button class="btn btn-danger mb-2 mx-2 ml-auto" onclick="delete_task_by_Id_from_db('${doc._id}')">Delete Task</button>
			</div>
		</div>
	</div>`;
    $(format).prependTo('#list-of-task');
}
// Zero fragment
const refresh_list_of_task = () => {
    $('#list-of-task').html('');
    serve_from_db();
}
// First fragment
const serve_from_db = () => {
    //const db = new PouchDB('tasks');
    db.allDocs({ include_docs: true })
        .then(result => result.rows.forEach((row, index) => printTask(row.doc)))
}
const delete_task_by_Id_from_db = taskId => {
    db.get(taskId)
        .then(doc => db.remove(doc._id, doc._rev))
        .then(refresh_list_of_task())

}
// Second fragment
const save_task_to_db = task => {
    var doc = { 'task': task, 'completed': false, '_id': Date.now().toString() }
    db.put(doc).then(result => console.log(result))
    printTask(doc)
}
const mark_by_Id_as_complete = taskId => {
    db.get(taskId).then(doc => {
            doc.completed = true;
            return db.put(doc)
        })
        .then(refresh_list_of_task())

}
const post_task_to_db = () => {
    var message = $('#new-task').val();
    if (message.toString()) {
        var task = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").toString(); //.replace(/(\r\n|\n|\r)/gm, '&#13;&#10;');
        save_task_to_db(task);
        $('#new-task').val('');
    }
}
// All declaration complete, processing starts here
$(serve_from_db);
$('#new-task-button').click(post_task_to_db);
$('#inputGroupSelectSort').change(() => {
    var selected = $('#inputGroupSelectSort').val();
    if (selected == 'Newest') $('#list-of-task').attr('class', 'row my-3');
    if (selected == 'Oldest') $('#list-of-task').attr('class', 'row my-3 flex-column-reverse')
});



// db.allDocs({ include_docs : true })
// .then( result => result.rows.forEach( ( row, index ) => console.log( row.doc ) ) )
// .catch( err => console.log( err ) )

// db.put( { "_id" : Date.now().toString(), "task" : doc.task } )
// For output use Date(parseInt(_id)).toUTCString()
