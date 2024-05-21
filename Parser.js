const hashSet = new Set();
const flowchart = `flowchart TD`;
const connectString = `-->`;
let sequenceDiagramHttpTemplate = $('#template').html();

function showContainer() {
	var chartSelection = document.getElementById("chartSelection");
	var container = document.getElementById("container");
	if (chartSelection.value === "flowchart") {
		container.style.display = "block";
		addRow();
	} else {
		container.style.display = "none";
		container.innerHTML = "";
	}
}

function addRow() {
	var container = document.getElementById("container");
	var newRow = document.createElement("div");
	newRow.className = "row";
	newRow.innerHTML = sequenceDiagramHttpTemplate;
	container.appendChild(newRow);
}

function deleteRow(button) {
	var row = button.parentNode;
	var container = row.parentNode;
	container.removeChild(row);
}

function parseMermaidLanguage() {
	var $container = $("#container");
	var $rows = $container.find(".row");
	var mermaidLanguage = `${flowchart}\n`;

	$rows.each(function () {
		var $row = $(this);

		var $nodeSelection = $row.find(".nodeDropdown").val();
		var $nodeSelection2 = $row.find(".nodeText").val();
		var $nodeSelection3 = $row.find(".arrowText").val();
		var $nodeSelection4 = $row.find(".linkNodedropdown").val();
		var $nodeSelection5 = $row.find(".linkNodeText").val();



		$nodeTemplate = getDropDownTemplate($nodeSelection, $nodeSelection2);
		$linkNodeTemplate = getDropDownTemplate($nodeSelection4, $nodeSelection5);

		$arrowText = $nodeSelection3 ? connectString + `|${$nodeSelection3}|` : connectString;

		if (typeof $nodeTemplate === 'undefined' || typeof $linkNodeTemplate === 'undefined') {

		} else {
			mermaidLanguage += `
			${$nodeTemplate} ${$arrowText} ${$linkNodeTemplate}
			`;
			mermaidLanguage += `\n`;
		}

	});

	// var $preview = $("#input");
	// $preview.html(mermaidLanguage);
	GenerateChart(mermaidLanguage);
}

function getDropDownTemplate(value, description) {
	if (typeof value === 'undefined' || typeof description === 'undefined') {
		return;
	}
	const key = value + description.replaceAll(' ', '');

	if (hashSet.has(key)) {
		return key;
	}
	else {
		hashSet.add(key);
		switch (value) {
			case "Start/End":
				return `${key}([${description}])`;
			case "Input/Output":
				return `${key}[/${description}/]`;
			case "Process":
				return `${key}(${description})`;
			case "Decision":
				return `${key}{${description}}`;
		}
	}
}