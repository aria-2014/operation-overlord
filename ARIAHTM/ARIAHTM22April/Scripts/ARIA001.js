$(document).ready(function() {

		// browser history start
		
		if(window.history && window.history.pushState){
		  window.history.pushState( {tab: "#home"}, '#home');
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
	  
		  $( "#twitter, #azuremkt, #flickr, #localnotes, #animation, #contact, #help, #calendar, #about").hide().addClass("hidden"); 
		  $("#home").addClass("visible");
		  
		  $("nav").click(function(event){ 
			target = $(event.target);
			if(target.is(("nav li a") || ("nav li ul li a"))){   
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
		// browser history end 

		
		// carousel start
		function carouselNormalization() {
			var items = $('#myCarousel .item'), //grab all slides
			heights = [], //create empty array to store height values
			tallest; //create variable to make note of the tallest slide

			if (items.length) {
			
				function normalizeHeights() {
					items.each(function() { //add heights to array
						heights.push($(this).height()); 
					});
					tallest = Math.max.apply(null, heights); //cache largest value
					items.each(function() {
						$(this).css('min-height',tallest + 'px');
					});
				};
				normalizeHeights();

				$(window).on('resize orientationchange', function () {
					tallest = 0, heights.length = 0; //reset vars
					items.each(function() {
						$(this).css('min-height','0'); //reset min-height
					}); 
					normalizeHeights(); //run it again 
				});
			}
		}

		carouselNormalization() 
		
        // carousel end

        // text content start

		function showPlacesToGo(data) {
		    var list = "";
		    $.each(data, function () {
		        list += this.Desc;
		    });
		    $('#divPlacesToGo').replaceWith(list);
		}
		function showThingsToDo(data) {
		    var list = "";
		    $.each(data, function () {
		        list += this.Desc;
		    });
		    $('#divThingsToDo').replaceWith(list);
		}
		function showWhereToStay(data) {
		    var list = "";
		    $.each(data, function () {
		        list += this.Desc;
		    });
		    $('#divWhereToStay').replaceWith(list);
		}
		function showWhatsOn(data) {
		    var list = "";
		    $.each(data, function () {
		        list += this.Desc;
		    });
		    $('#divWhatsOn').replaceWith(list);
		}


		$.getJSON('/ARIA001/GetPlacesToGoJSON', null, function (data) { showPlacesToGo(data); });
		$.getJSON('/ARIA001/GetThingsToDoJSON', null, function (data) { showThingsToDo(data); });
		$.getJSON('/ARIA001/GetWhereToStayJSON', null, function (data) { showWhereToStay(data); });
		$.getJSON('/ARIA001/GetWhatsOnJSON', null, function (data) { showWhatsOn(data); });

        // text content end

});