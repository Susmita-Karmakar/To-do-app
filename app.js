$(document).ready(function(){

	var firebaseConfig = {
    apiKey: "AIzaSyBdCPpwpl0FkeHJmZ_C6ShlM_htMeGocBI",
    authDomain: "sus-2-do.firebaseapp.com",
    databaseURL: "https://sus-2-do.firebaseio.com",
    projectId: "sus-2-do",
    storageBucket: "sus-2-do.appspot.com",
    messagingSenderId: "347685120657",
    appId: "1:347685120657:web:55c182a8c430d45bc3ad30"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let todo = firebase.database().ref('todo');

  todo.on('value',function(snapshot){
  	console.log(snapshot.val());

  	let data = snapshot.val()

  	$('#pending').html('');
  	$('#completed').html('');

  	for(let key in data){

  		if(data[key].Status==="Pending"){
  			$('#pending').append(`
  			<div class="card">
				<div class="card-body">
					<h6>${data[key].Task}</h6>
					<button data-id="${key}" class="btn btn-secondary btn-sm edit">Edit</button>
					<button data-id="${key}" class="btn btn-danger btn-sm delete">Delete</button>
					<button data-id="${key}" class="btn btn-success btn-sm complete">Completed</button>
				</div>
			</div>
  			`);
  		}else{
  			$('#completed').append(`
  				<div class="card">
					<div class="card-body">
						<h6>${data[key].Task}</h6>
						
					</div>
				</div>
  				`);
  		}

  		
  	};
  })

  $('#add-task').click(function(){
  	
  	let task = $('#task-input').val();

  	let todoRef = todo.push({
  		Task:task,
  		Status:'Pending'
  	});

  	$('#task-input').val('');
  	alert("Task added");

  });


  // Event Delegation 

  // For deletion

  $('#pending').on('click','.delete',function(){

  	let taskId = $(this).data("id");
  	// alert(taskId);

  	// Delete that particular task

  	firebase.database().ref('todo/' + taskId).remove();

  });


  // For complete

  $('#pending').on('click','.complete',function(){

  	let taskId = $(this).data("id");

  	// Delete that particular task

  	firebase.database().ref('todo/' + taskId).update({
  		Status:'Completed'
  	});

  });


  



})