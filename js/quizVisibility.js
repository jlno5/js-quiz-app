var currentHovered = ["JS", "HTML", "CSS", "CS"];

function showList(card) {
	var list = [];
	currentHovered = [card];

	document
		.querySelector(`.difflist.${card.toLowerCase()}`)
		.style = "paddin-bottom: 0px;";
	list = document.querySelectorAll(`.difflist.${card.toLowerCase()} li`);

	for (var i = 0; i < list.length; i++) {
		list[i].style.display = "block";
	}
}

function hideList() {
	for (i of currentHovered) {
		document
			.querySelector(`.difflist.${i.toLowerCase()}`)
			.style = "padding-bottom: 25px;";
	}
	var list = document.querySelectorAll(".difflist li");
	for (var i = 0; i < list.length; i++) {
		list[i].style.display = "none";
	}
}

hideList();
