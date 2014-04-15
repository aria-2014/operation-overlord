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