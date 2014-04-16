$(document).ready(function() {

		if(window.history && window.history.pushState){
		  window.history.pushState( {tab: "#welcome"}, '#welcome');
		  window.onpopstate = function(event) {  
			if(event.state){
			  var tab = (event.state["tab"]);
			  $(".visible")
				.removeClass("visible")
				.addClass("hidden")
				.hide();
			  $(tab)
				.removeClass("hidden")
				.addClass("visible")
				.show();
			}
		  };
		};


		$(function(){
	  
		  $("#locations, #products, #contact, #about").hide().addClass("hidden"); 
		  $("#welcome").addClass("visible");
		  
		  $("nav").click(function(event){ 
			target = $(event.target);
			if(target.is("nav a")){   
			  event.preventDefault();
			  if ( $(target.attr("href")).hasClass("hidden") ){  
			  
				if(window.history && window.history.pushState){
				  var tab = $(target).attr("href");  
				  var stateObject = {tab: tab};
				  window.history.pushState(stateObject, tab);  
				};
			  
				$(".visible").removeClass("visible").addClass("hidden").hide();
				$(target.attr("href")).removeClass("hidden").addClass("visible").show();
			  };
			};  
		  });
		  
		});

});









// Create a div to hold the control.
var controlDiv = document.createElement('div');

// Set CSS styles for the DIV containing the control
// Setting padding to 5 px will offset the control
// from the edge of the map.
controlDiv.style.padding = '5px';

// Set CSS for the control border.
var controlUI = document.createElement('div');
controlUI.style.backgroundColor = 'white';
controlUI.style.borderStyle = 'solid';
controlUI.style.borderWidth = '2px';
controlUI.style.cursor = 'pointer';
controlUI.style.textAlign = 'center';
controlUI.title = 'Click to set the map to Home';
controlDiv.appendChild(controlUI);

// Set CSS for the control interior.
var controlText = document.createElement('div');
controlText.style.fontFamily = 'Arial,sans-serif';
controlText.style.fontSize = '12px';
controlText.style.paddingLeft = '4px';
controlText.style.paddingRight = '4px';
controlText.innerHTML = '<strong>Home</strong>';
controlUI.appendChild(controlText);