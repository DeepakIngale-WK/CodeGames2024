const flowchartTd = `flowchart TD`;
const flowchartLr = `flowchart LR`;
const connectString = `-->`;
let hashSet = new Set();
let flowchartHttpTemplate = $('#template').html();
let currentFlowChartSelection = flowchartTd;

function showContainer() {
	var chartSelection = document.getElementById("chartSelection");
	var container = document.getElementById("container");
	container.innerHTML = "";
	switch (chartSelection.value) {
		case "flowchart":
			showFlowChartFields();
			$("#myIframe").hide();
			$('#actionDiv').hide();
			addRow();
			$('#actionDiv').prop('class', 'col-md-6');
			break;
		case "sequenceDiagram":
			hideFlowChartFields();
			$("#myIframe").show();
			GenerateChart(getDefaultSequenceDiagramTag());
			$('#actionDiv').prop('class', 'col-md-12');
			break;
		default:
			$(".flowchartDirection").hide();
			$("#myIframe").hide();
			$("#dvButtons").hide();
			$("#txtTitle").hide();
			$('#actionDiv').hide();
			break;
	}
}

function addRow() {
	var container = document.getElementById("container");
	var newRow = document.createElement("div");
	newRow.className = "row";
	newRow.innerHTML = flowchartHttpTemplate;
	container.appendChild(newRow);

	if (container.childElementCount > 1) {
		var dropdown = newRow.querySelector(".nodeDropdown");
		var text = newRow.querySelector(".nodeText");

		dropdown.value = newRow.previousElementSibling.querySelector(".linkNodedropdown").value;
		text.value = newRow.previousElementSibling.querySelector(".linkNodeText").value;
	}
}

function deleteRow(row) {
	while (row && row.className !== "row") {
		row = row.parentNode;
	}
	if (row) {
		row.parentNode.removeChild(row);
	}
}

window.handleOptionChange = function (option) {
	if (option == 'td') {
		currentFlowChartSelection = flowchartTd;
	}
	else if (option == 'lr') {
		currentFlowChartSelection = flowchartLr;
	}
}

function parseMermaidLanguage() {
	hashSet = new Set();
	var $container = $("#container");
	var $rows = $container.find(".row");
	var mermaidLanguage = `${currentFlowChartSelection}\n`;

	$rows.each(function () {
		var $row = $(this);

		var $nodeSelection = $row.find(".nodeDropdown").val();
		var $nodeSelection2 = $row.find(".nodeText").val();
		var $nodeSelection3 = $row.find(".arrowText").val();
		var $nodeSelection4 = $row.find(".linkNodedropdown").val();
		var $nodeSelection5 = $row.find(".linkNodeText").val();

		if($nodeSelection2 === "" || $nodeSelection5 === ""){
			alert("Please enter node description");
			return false;
		};

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

	return mermaidLanguage;
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

function hideFlowChartFields() {
	$("#dvButtons").hide();
	$("#txtTitle").hide();
	$(".flowchartDirection").hide();
	container.innerHTML = "";
}

function showFlowChartFields() {
	$("#dvButtons").show();
	$("#txtTitle").show();
	$(".flowchartDirection").show();
}

function getDefaultSequenceDiagramTag() {
	return `
		sequenceDiagram
		participant C as Customer
		participant W as Website
		participant S as Server
		participant D as Database
	 
		C->>W: Browse items
		W->>S: Request item data
		S->>D: Query item data
		D-->>S: Return item data
		S-->>W: Return item data
		W-->>C: Display items
	 
		C->>W: Add item to cart
		W->>S: Update cart
		S->>D: Update cart
		D-->>S: Confirm cart update
		S-->>W: Confirm cart update
		W-->>C: Display updated cart
	 
		C->>W: Checkout
		W->>S: Request payment process
		S->>D: Process payment
		D-->>S: Confirm payment
		S-->>W: Confirm payment
		W-->>C: Display receipt`;
}
