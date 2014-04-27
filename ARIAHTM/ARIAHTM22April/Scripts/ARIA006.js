$(function() { 

	// Database reference
	var db = null;

	// Creates a connection to the local database
	function connectToDB()
	{
		try {
			if (!window.openDatabase) {
				alert('Databases are not supported in this browser.');
				return false;
			} else {
				db = window.openDatabase('ARIA2014Notes', '1.0', 'ARIA2014Notes Database', 1024*1024*3);
				return true;
			}
		} catch(e) {
			if (e == 2) {
				// Version number mismatch.
				alert("Invalid database version.");
			} else {
				alert("Unknown error " + e + ".");
			}
			return false;
		}
	};

	//Create the table method
	function createNotesTable()
	{
		db.transaction(function(tx){
			var varDummy;
			tx.executeSql(
			"CREATE TABLE notes (id INTEGER \PRIMARY KEY, title TEXT, note TEXT)", [],
				function(){ 
					//alert('Notes database created successfully!');
					varDummy = 0;				
				},
				function(tx, error){ 
					//alert(error.message); 
					varDummy = 0;
				} 
			);
		});	
	};
	
	//Drop the table method
	/*
	function dropNotesTable()
	{	
		db.transaction(function(tx){
			tx.executeSql(
			"DROP TABLE notes;", [],
				function(){ 
					alert('Notes table dropped successfully!');		
				},
				function(tx, error){ 
					alert('Notes table dropped failure!');		
				} 
			);
		});	
	};
	*/

	//Insert record into Table.
	function insertNote(title, note)
	{
		db.transaction(function(tx){
			tx.executeSql("INSERT INTO notes (title, note) VALUES (?, ?)", [title.val(), note.val()],
				function(tx, result){ 
					var id = result.insertId ;
					//alert('Record ' + id+ ' saved!');
					title.attr("data-id", result.insertId );
					addToNotesList(id, title.val());
					$("#delete_button").show();
					newNote();      
				},
				function(){ 
					alert('The note could not be saved.'); 
				}
			);
		});
	};


	/* update record into Table. Takes the Title field and Note field
		which are both jQuery objects. The id to update is a custom data
		attribute on the title field.
	*/

	function updateNote(title, note)
	{
		var id = title.attr("data-id");
		db.transaction(function(tx){
		tx.executeSql("UPDATE notes set title = ?, note = ? where id = ?", [title.val(), note.val(), id],
				function(tx, result){ 
					//alert('Record ' + id + ' updated!');
					$("#notes>li[data-id=" + id + "]").html(title.val());
					newNote();
				},
				function(){ 
					alert('The note was not updated!');
				}
			);
		});
	};


	//remove record from Table.
	function deleteNote(title)
	{
		var id = title.attr("data-id");
		db.transaction(function(tx){
			tx.executeSql("DELETE from notes where id = ?", [id],
					function(tx, result){ 
					//alert('Record ' + id + ' deleted!');
					$("#notes>li[data-id=" + id + "]").remove();
					newNote();
				},
				function(){ 
					alert('The note was not deleted!');
				}
			);
		});
	};

	
	// Adds the list item to the list of notes, given an id and a title.
	function addToNotesList(id, title){
		var notes = $("#notes");
		var item = $("<li>");
		item.attr("class", "list-group-item");
		item.attr("data-id", id);
		item.html(title);   
		notes.append(item);
	};


	// loads all records from the notes table of the database;
	function fetchNotes(){
		db.transaction(function(tx) {
			tx.executeSql('SELECT id, title, note FROM notes', [],
				function(SQLTransaction, data){
					for (var i = 0; i < data.rows.length; ++i) {
						var row = data.rows.item(i);
						var id = row['id'];
						var title = row['title'];

						addToNotesList(id, title);
					}
				});
			});
	};

	// loads a single note from the notes table using the given id
	function loadNote(id){
		db.transaction(function(tx) {
			tx.executeSql('SELECT id, title, note FROM notes where id = ?', [id],
				function(SQLTransaction, data){
					var row = data.rows.item(0);
					var title = $("#title");
					var note = $("#note");

					title.val(row["title"]);
					title.attr("data-id", row["id"]);
					note.val(row["note"]);
					$("#delete_button").show();

				}
			);
		});
	}

	// Clears out the form and removes the "delete" button
	function newNote(){
		$("#delete_button").hide();
		var title = $("#title");
		title.removeAttr("data-id");
		title.val("");
		var note = $("#note");
		note.val("");
	}

		// Clears out the form and removes the "delete" button
	function contNoteInit(){
	
		createNotesTable();
		fetchNotes();

		$("#save_button").click(function(event){
			event.preventDefault();
			var title = $("#title");
			var note = $("#note");
    
			if(title.attr("data-id")){
				updateNote(title, note);
			}else{
				insertNote(title, note);
			}
		});

  
		$("#delete_button").click(function(event){
			event.preventDefault();
			var title = $("#title");
			deleteNote(title);
		});
  
		$("#notes").click(function(event){
			if ($(event.target).is('li')) {
			var element = $(event.target);
			loadNote(element.attr("data-id"));
			}
    
		});
  
		$("#new_button").click(function(event){
			event.preventDefault();
			newNote();
		});
  
		newNote();  
	}

	$(function(){
			
		if ( connectToDB() ) {
			$("#localnotesstart").attr("href", "#localnotes");
			contNoteInit();
		}
		else {
			$("#localnotesstart").attr("href", "#localnotesalt");
		}

	});

}); 
