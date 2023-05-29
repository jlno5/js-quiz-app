function quizSubmition(e) {
	e.preventDefault();

	let allradioInputs = document.querySelectorAll('input[type="radio"]'),
		allCategoriesCheck = {},
		allSolved = true,
		questions = [],
		allTextInputs = document.querySelectorAll('input[type="text"]:not([disabled])'); // bc not selecting answer

	// check if all question has an answer ticked else output message // only the multiple choice questions
	for (let i of allradioInputs) {
		let name = i.name;
		if (allCategoriesCheck[name] === 1) continue;
		allCategoriesCheck[name] = 0;
		if (i.checked) {
			allCategoriesCheck[name] = 1;
		}
	}
	// loops thrugh the not answered questions
	for (let key in allCategoriesCheck) {
		document.getElementById(key).innerHTML = "";
		if (allCategoriesCheck[key] === 0) {
			allSolved = false;
			document.getElementById(key).innerHTML =
				"Bitte beantworte diese Frage!";
			document.getElementById(key).style = "color: red;";
		}
	}

	// checks the answers of the text inputs
	// the regex pattern for answering is in the label stored
	// the perfect answer is stored in an extra text input in a div with the classes forHTML + correct-code
	for (let i of allTextInputs) {
		if (i.value === "") {
			document.getElementById(i.name).innerHTML =
				"Bitte beantworte diese Frage!";
			document.getElementById(i.name).style = "color: red;";
			allSolved = false; // so it breakes the function later
			continue;
		}

		const solution = document.querySelector(`label[for='${i.id}']`).textContent; // regex pattern style
		const regexPattern = new RegExp(solution);
		document.getElementById(i.id).disabled = true;

		if (regexPattern.test(i.value)) {
			questions.push(true);
			document.getElementById(i.id).style = "background: rgba(255, 195, 0, 0.3);";
		} else {
			questions.push(false);
			document.getElementById(i.id).style = "background: rgba(255, 0, 0, 0.3);";

			// shows the div with the correct code
			document
				.querySelector(`div.${i.name}`)
				.classList
				.remove("correct-code");
		}
	}

	// validation for all questions answered; for checking if correct
	if (allSolved === false) return;

	// deactives all not ticked radio buttons, so no other answer can get ticked
	for (i of allradioInputs) {
		if (!i.checked) i.disabled = true;
		document.getElementById(i.name).innerHTML = "";
		if (i.className === "correct")
			document.querySelector(`label[for="${i.id}"]`).style =
				"color: lime;";
		if (i.checked && i.className !== "correct") {
			document.querySelector(`label[for="${i.id}"]`).style =
				"color: #EE4B2B;";
			questions.push(false);
		}
		if (i.checked && i.className === "correct") questions.push(true);
	}

	// summary
	let correctSolved = questions.filter((i) => i === true).length,
		questionCount = questions.length,
		ratioCorrectAllQuestions = correctSolved / questionCount;

	// set the summary to the end of the page
	document.getElementById("summary-container").className = "quiz-container";
	document.getElementById("summary-message").innerHTML = `Du hast ${correctSolved} von ${questionCount} Fragen richtig beantwortet.`;
	document.getElementById("summary-message").style = `color:  ${
		ratioCorrectAllQuestions >= 0.8
			? "lime;"
			: "#EE4B2B;"
	}`;

	console.log([correctSolved, ratioCorrectAllQuestions]);
	console.log(localStorage.getItem("QuizScore"));

	// QuizScore: {"JSQ_L1": [ [4, 0.75, 134...], [4, 0.75, 135...], [5, 0.8, 144...], [3, 0.5, 152...] ]}
	// [correctSolvedQuestions, ratioCorrectAllQuestions, timestamp]
	
	const storage = localStorage.getItem("QuizScore");
	let obj = storage == null ? {} : JSON.parse(storage);

	if (typeof quizID === 'undefined') {
		console.log("There is no ID for the Quiz defined.");
		return;
	}

	const timestamp = new Date().getTime();

	if (obj[quizID] && obj[quizID].length > 0) obj[quizID].push([correctSolved, ratioCorrectAllQuestions, timestamp]);
	else obj[quizID] = [[correctSolved, ratioCorrectAllQuestions, timestamp]];

	localStorage.setItem("QuizScore", JSON.stringify(obj));
}