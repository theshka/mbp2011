// step wizard
function stepWizard(step){
	switch(step)
	{
		case 0:
		  if ($(window).width() < 768) {
			   $('html, body').animate({scrollTop: $("#stepIcon1").offset().top}, 500);
			}
			else {
				$('html, body').animate({scrollTop: $("#petition").offset().top}, 1000);
			}
		  break;
		case 1:
		  document.getElementById("stepIcon1").className = "margin-top img-circle stepComplete";
		  $('html, body').animate({scrollTop: $("#about").offset().top}, 800);
		  break;
		case 2:
		  document.getElementById("stepIcon2").className = "icon-large fa fa-check stepComplete";
		  //$( ".icon-wrapper" ).css( "background-color", "#009966" );
		  if ($(window).width() < 768) {
			   $('html, body').animate({scrollTop: $("#tweet-tim").offset().top}, 500);
			}
			else {
			}
		  break;
		case 3:
		  document.getElementById("stepIcon3").className = "icon-large fa fa-check stepComplete";
		  if ($(window).width() < 768) {
		  $('html, body').animate({scrollTop: $("#apple-feedback").offset().top}, 500);
		  }
			else {
			}
		  break;
		case 4:
		  document.getElementById("stepIcon4").className = "icon-large fa fa-check stepComplete";
		  if ($(window).width() < 768) {
		  $('html, body').animate({scrollTop: $("#facebook-group").offset().top}, 500);
		  }
			else {
			}
		  break;
		case 5:
		  document.getElementById("stepIcon5").className = "icon-large fa fa-check stepComplete";
		  if ($(window).width() < 768) {
		  $('html, body').animate({scrollTop: $("#survey-link").offset().top}, 500);
		  }
			else {
			}
		  break;
		case 6:
		  document.getElementById("stepIcon6").className = "icon-large fa fa-check stepComplete";
		  if ($(window).width() < 768) {
		  $('html, body').animate({scrollTop: $("#testimonials").offset().top}, 500);
		  }
			else {
			}
		  break;
	};
};
