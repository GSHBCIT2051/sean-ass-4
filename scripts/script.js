// JavaScript Document
var people;

var personHTML = "";

// load the json data to memory
$.getJSON( "data/people.json", function( json ) {
	people = json;
 });

// iterate through all of the names to find the ones that match your search query
// Names are split into first and last names then evaluated separetely
function checkAllNames(letters){
	personHTML = "";
	letters = letters.toLowerCase();
	if (letters.length < 1 ){
		letters = "###";
	}
	$.each(people,function(){
		var fullname = this.name;
		var lastname = this.name.split(/\s+/).pop();
		//console.log(names);
		if (checkSingleName(fullname ,lastname, letters)==true){
			addPerson(this);
		};
		
	});
};

// Check against the full name, if not matching check first and last
// If there is a match return true
function checkSingleName(fullname, lastname, letters){
	var result = false;
	var re = new RegExp('^'+letters);


	if(fullname.toLowerCase().match(re) != null || lastname.toLowerCase().match(re) != null){
			result = true;
			return result;
	}

	return result;
};


function addPerson(person){
	personHTML += '<div class="person"> <div class="picture"><img src="'+person.picture+'" alt="'+person.name+'"></div> <div class="info"><ul><li><b>Name: </b>'+person.name+'</li><li><b>Company: </b>'+person.company+'</li><li><b>Email: </b><a href="mailto:'+person.email+'">'+person.email+'</a></li></ul><h2>About:</h2><p>'+person.about+'</p></div></div>';
};


function addPeopleToPage(){
	$('#people').html(personHTML);
};

function searchAllPeople(){
	var letters = $('#input_name').val();
	checkAllNames(letters);
	addPeopleToPage();
};

// check the regex against the letters entered.
$('#input_name').keyup(function(c){
	searchAllPeople();
});

$('#btn_submit').click(function(){
	searchAllPeople();
	return false;
});


