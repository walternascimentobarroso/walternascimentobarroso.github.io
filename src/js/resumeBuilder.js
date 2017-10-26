'Use Strict';

var bio = {
	name: "Walter Nascimento Barroso",
	role: "Full Stack developer",
	contacts: {
		linkedin: {
			name: "Walter",
			url: "https://www.linkedin.com/walternascimentobarroso"
		},
		email: "walternascimentobarroso@gmail.com",
		github: {
			name: "Walter",
			url: "https://github.com/walternascimentobarroso"
		},
		location: "Boa Vista - RR / Brasil"
	},
	image: "https://avatars2.githubusercontent.com/u/8291055",
	welcomeMessage: "cont...",
	skills: ["HTML", "CSS", "JavaScript", "PHP", "C/C++", "Wordpress", "Gulp"]
}; //end of bio data

var work = {
	jobs: [{
			employer: "Freelance",
			title: "Freelance Full Stack developer",
			location: "Boa Vista - RR / Brasil",
			dates: "Agosto 2014 - Present",
			url: "http://walternascimentobarroso.github.io/",
			description: "Desenvolvimento de Sites e aplicativos.",
			images: ["https://avatars2.githubusercontent.com/u/8291055"]
		},
		{
			employer: "W3B Softwares",
			title: "Full Stack developer",
			location: "Boa Vista - RR / Brasil",
			dates: "Agosto 2017 - Present",
			url: "http://w3bsoftwares.com/",
			description: "Planejamento, time e produto.",
			images: ["img/w3b.png"]
		}
	]
};

var projects = {
	projects: [{
		title: "Portfolio Project 1",
		dates: "June 2017",
		description: "The first project.",
		url: "http://tarodotblank.github.io/Project-1/",
		images: ["https://avatars2.githubusercontent.com/u/8291055"]
	}]
};

var education = {
	schools: [{
		name: "Udacity Online University",
		location: "Mountain View, CA, US",
		major: "Front-End Web Development",
		dates: "May 2017- Current",
		degree: "",
		images: ""
	}]
};

var data = "%data%";
var $header = $("#header");
var $topContacts = $("#topContacts");
var $footerContacts = $("#footerContacts");
var $workExperience = $("#workExperience");
var $projects = $("#projects");
var $education = $("#education");


//Uses jQuery plugin "Sticky" to stick the top navigation to the top of the page when scrolling down, and unsticks when scroll up
$(document).ready(function () {
	$("#topNav").sticky({
		topSpacing: 0
	});
});

/* To try to exceed project expectations, I added a floating “Back to Top” button by adapting code from two websites (cotswoldphoto and html-tuts). */
$(window).scroll(function () {
	if ($(this).scrollTop() !== 0) {
		$('#toTop').fadeIn('slow');
	} else {
		$('#toTop').fadeOut('slow');
	}
});

$('#toTop').click(function () {
	$('html, body').animate({
		scrollTop: 0
	}, 600);
	return false;
});

//Automatically scrolls to element when clicked on the top navigation
$('a[href^="#"]').on('click', function (event) {

	var target = $($(this).attr('href'));

	if (target.length) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: target.offset().top
		}, 1000);
	}

});

//helper functions designed to reduce code repeition as suggested by first project reviewer
function replaceAndAppend(rawHTML, target, insertion, destination, insertionURL, urltarget) {

	var formattedHTML = rawHTML.replace(target, insertion);

	//if the information contains a link
	if (insertionURL) {
		formattedHTML = formattedHTML.replace(urltarget, insertionURL);
	}
	destination.append(formattedHTML);
}

function replaceAndPrepend(rawHTML, target, insertion, destination) {
	var formattedHTML = rawHTML.replace(target, insertion);
	destination.prepend(formattedHTML);
}

function appendArray(rawHTML, target, insertion, destination) {
	for (var item = 0; item < insertion.length; item++) {
		var formattedItem = rawHTML.replace(target, insertion[item]);
		destination.append(formattedItem);
	}

}

//Displays name, role, profile picture, contact info, welcome message, and skills.
bio.display = function () {
	//Appends info from bio data to variables in helper.js
	replaceAndAppend(HTMLemail, data, bio.contacts.email, $topContacts);
	replaceAndAppend(HTMLlinkedin, data, bio.contacts.linkedin.name, $topContacts, bio.contacts.linkedin.url, "#");
	replaceAndAppend(HTMLgithub, data, bio.contacts.github.name, $topContacts, bio.contacts.github.url, "#");
	replaceAndAppend(HTMLlocation, data, bio.contacts.location, $topContacts);

	//Appends info to header
	replaceAndPrepend(HTMLheaderRole, data, bio.role, $header);
	replaceAndPrepend(HTMLheaderName, data, bio.name, $header);
	replaceAndAppend(HTMLbioPic, data, bio.image, $header);
	replaceAndAppend(HTMLwelcomeMsg, data, bio.welcomeMessage, $header);

	//Appends info to footer Contacts
	replaceAndAppend(HTMLemail, data, bio.contacts.email, $footerContacts);
	replaceAndAppend(HTMLlinkedin, data, bio.contacts.linkedin.name, $footerContacts, bio.contacts.linkedin.url, "#");
	replaceAndAppend(HTMLgithub, data, bio.contacts.github.name, $footerContacts, bio.contacts.github.url, "#");

	$header.append(HTMLskillsStart);
	appendArray(HTMLskills, data, bio.skills, $("#skills"));
}; //end header.display


//Work function displays work history
// work.display = function () {
// 	$("#workExperience").append(HTMLworkStart);
// 	if (work.jobs.length) {
// 		for (var job = 0; job < work.jobs.length; job++) {
// 			//appends work information
// 			var workNameAndTitle = work.jobs[job].employer + ": " + work.jobs[job].title;
// 			replaceAndAppend(HTMLworkEmployer, data, workNameAndTitle, $(".work-entry:last"), work.jobs[job].url, "#");
// 			replaceAndAppend(HTMLworkDates, data, work.jobs[job].dates, $(".work-entry:last"));
// 			replaceAndAppend(HTMLworkLocation, data, work.jobs[job].location, $(".work-entry:last"));
// 			replaceAndAppend(HTMLworkDescription, data, work.jobs[job].description, $(".work-entry:last"));

// 			//if there are images for this job entry, itterate through array
// 			if (work.jobs[job].images.length) {
// 				appendArray(HTMLworkImages, data, work.jobs[job].images, $(".work-entry:last"));
// 			}
// 		}
// 	}
// }; //end work display function

work.display = function () {

 	// checks for jobs
 	if (work.jobs.length > 0) {

 		// create div for work experience
 		// and change work-entry div to ul
 		var HTMLworkTimeline = '<ul class="work-entry"></ul>';
		var HTMLworkTimelineItem = '<li class="work timeline__item"></li>';
		$("#workExperience").append(HTMLworkStart).addClass("resume-content");
 		$(".work-entry").replaceWith(HTMLworkTimeline);

 		// loop through work object
		for (var i = 0; i < work.jobs.length; i++) {

 			// format work information
 			var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
 			var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
 			var formattedEmployerTitle = formattedEmployer + ' ' + formattedTitle;
 			var formattedDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
 			var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
 			var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);

 			// display work date and location
 			$(".work-entry:last").append(HTMLworkTimelineItem);
 			$(".timeline__item:last")
 				.append(formattedDates)
 				.append(formattedLocation);

 			// put date and location in one div
 			var workDate = '<span>' + $(".work .date-text").text() + '</span>';
 			var workLocation = '<span>' + $(".work .location-text").text() + '</span>';
 			var workDateLocation = workDate + workLocation;
 			var HTMLworkDateLocation = '<div class="item__date-location">' + workDateLocation + '</div>';
 			$(".timeline__item:last").append(HTMLworkDateLocation);

 			// remove individual date-text and location-text divs
 			$(".work .date-text").remove();
 			$(".work .location-text").remove();

 			// display work information
 			$(".timeline__item:last")
 				.append(formattedEmployerTitle)
				.append(formattedDescription);

 			// change work employer and work title from a link to divs
 			var workEmployerTitle = $(".work a").text().split("-");
 			var workEmployer = '<div class="second-item item__employer">' + workEmployerTitle[0] + '</div>';
 			var workTitle = '<div class="first-item item__title">' + workEmployerTitle[1] + '</div>';
// 			$("a").replaceWith(workTitle + workEmployer);

 			// change work description from paragraph to div
 			var workDescription = '<div class="description item__description">' + $(".work p").text() + '</div>';
 			$("p").replaceWith(workDescription);
 		}
 	}
}

//Displays Projects information to website
projects.display = function () {
	$("#projects").append(HTMLprojectStart);
	if (projects.projects.length) {
		for (var project = 0; project < projects.projects.length; project++) {
			//adds project info
			replaceAndAppend(HTMLprojectTitle, data, projects.projects[project].title, $(".project-entry:last"), projects.projects[project].url, "#");
			replaceAndAppend(HTMLprojectDates, data, projects.projects[project].dates, $(".project-entry:last"));
			replaceAndAppend(HTMLprojectDescription, data, projects.projects[project].description, $(".project-entry:last"));

			//if there are images for this project, itterate through the array
			if (projects.projects[project].images.length) {
				appendArray(HTMLprojectImage, data, projects.projects[project].images, $(".project-entry:last"));
			}
		}
	}
}; //end of projectsCompleted function

education.display = function () {
	$("#education").append(HTMLschoolStart);
	if (education.schools.length) {
		for (var school = 0; school < education.schools.length; school++) {
			replaceAndAppend(HTMLschoolName, data, education.schools[school].name, $(".education-entry:last"));
			replaceAndAppend(HTMLschoolDates, data, education.schools[school].dates, $(".education-entry:last"));
			replaceAndAppend(HTMLschoolLocation, data, education.schools[school].location, $(".education-entry:last"));
			replaceAndAppend(HTMLschoolMajor, data, education.schools[school].major, $(".education-entry:last"));

			//if degree received, add to page
			if (education.schools[school].degree.length) {
				replaceAndAppend(HTMLschoolDegree, data, education.schools[school].degree, $(".education-entry:last"));
			}

			//if school entry has images, display on page
			if (education.schools[school].images.length) {
				appendArray(HTMLschoolImages, data, education.schools[school].images, $(".education-entry:last"));
			}
		}
	}
};

bio.display();
work.display();
projects.display();
education.display();

$("#map-div").append(googleMap);