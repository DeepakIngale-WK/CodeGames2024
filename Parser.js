const sequenceDiagramHttpTemplate = `
	<select class="dropdown">
		<option>Node</option>
		<option>Linking Node</option>
	</select>
	<input type="text" class="text" placeholder="Node name">
	<input type="text" class="text" placeholder="Node description">

	<input type="text" class="text" placeholder="Arrow Overhead">

	<select class="dropdown">
		<option>Node</option>
		<option>Linking Node</option>
	</select>
	<input type="text" class="text" placeholder="Link Node name">
	<input type="text" class="text" placeholder="Link Node description">

	<button class="button" onclick="addRow()">+</button>
	<button class="button" onclick="deleteRow(this)">-</button>
`;


function showContainer() {
	var chartSelection = document.getElementById("chartSelection");
	var container = document.getElementById("container");
	if (chartSelection.value === "SequenceDiagram") {
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