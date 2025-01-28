
function plotResults(trainData, testData, K){
	document.addEventListener("DOMContentLoaded", function() {

		const BENIGN_COLOR = "rgb(204, 255, 153)"; 
		const MALIGNANT_COLOR = "rgb(255, 210, 210)";
		const NOLABEL_COLOR = "white"

		const table = document.createElement("table");
	  	const tableBody = document.createElement("tbody");

	  	const topRow = document.createElement("tr");
	  	const topCell1 = document.createElement("td"); topCell1.innerHTML = "Test Sample ID"; //topCell1.style.textDecoration = "bold";
	  	const topCell2 = document.createElement("td"); topCell2.innerHTML = "Predicted Label"
	  	const topCell3 = document.createElement("td"); topCell3.innerHTML = "Actual Label"
	  	const topCell4 = document.createElement("td"); topCell4.innerHTML = "Correct?"
	  	const topCell5 = document.createElement("td"); topCell5.innerHTML = "K-Nearest Neighbors (K=" + K + ")";

	  	topRow.appendChild(topCell1); topRow.appendChild(topCell4); 
	  	topRow.appendChild(topCell3); topRow.appendChild(topCell2); topRow.appendChild(topCell5);
	  	topRow.style.backgroundColor = "rgb(230, 230, 230)";
	  	tableBody.appendChild(topRow)

	    for (let testSample of testData){

	    	let predLabel = predictSample(testSample, trainData, K);
			let correctLabel = testSample[testSample.length - 1];
			let closestKPoints = getClosestKPoints(testSample, trainData, K);

	    	const row = document.createElement("tr");

	    	const cell_1 = document.createElement("td");
	    	cell_1.innerHTML = "🔬" + testSample[0];

	    	const cell_2 = document.createElement("td");
	    	let spanLeft = document.createElement("span");
	    	spanLeft.innerHTML = (predLabel === 0) ? "Benign": (predLabel == 1) ? "Malignant": "None";
	    	spanLeft.style.backgroundColor = (predLabel === 0) ? BENIGN_COLOR: (predLabel == 1) ? MALIGNANT_COLOR: NOLABEL_COLOR; //"rgb(255, 255, 143)": "rgb(207, 159, 255)";
	    	spanLeft.style.borderRadius = "4px";
	    	cell_2.appendChild(spanLeft);

	    	const cell_3 = document.createElement("td");
	    	let span = document.createElement("span");
	    	span.innerHTML = (correctLabel === 0) ? "Benign": (correctLabel == 1) ? "Malignant": "None";
	    	span.style.backgroundColor = (correctLabel === 0) ? BENIGN_COLOR: (correctLabel == 1) ? MALIGNANT_COLOR: NOLABEL_COLOR; //"rgb(255, 255, 143)": "rgb(207, 159, 255)";
	    	span.style.borderRadius = "4px";
	    	cell_3.appendChild(span);

	    	//cell_3.innerHTML = (correctLabel === 0) ? "Benign": "Malignant";

	    	const cell_4 = document.createElement("td");
	    	cell_4.innerHTML = (predLabel === correctLabel) ? "✅": "❌";

	    	const cell_5 = document.createElement("td");

	    	function getSpan(neighbor){
	    		const neighborSpan = document.createElement("span");
	    		neighborSpan.innerHTML = "🔬 " + neighbor.id + " "; //(neighbor.label === 0) ? "Benign": "Malignant";
	    		neighborSpan.style.backgroundColor = (neighbor.label === 0) ? BENIGN_COLOR: MALIGNANT_COLOR; //"rgb(255, 255, 143)": "rgb(207, 159, 255)";
	    		neighborSpan.style.borderRadius = "4px";
	    		neighborSpan.style.border = "gray solid 1px";
	    		neighborSpan.style.marginRight = "7px";
	    		return neighborSpan;
	    	}

	    	for (let neighborPoint of closestKPoints){
	    		cell_5.appendChild(getSpan(neighborPoint));
	    	}


	    	row.appendChild(cell_1); row.appendChild(cell_4);
	    	row.appendChild(cell_3); row.appendChild(cell_2); row.appendChild(cell_5);

	    	tableBody.appendChild(row);


			
			let text = document.createElement("p");
			text.innerHTML = predLabel + " | " + correctLabel + " | " + JSON.stringify(closestKPoints) + "\n";

		}

		table.appendChild(tableBody);

		document.body.appendChild(table);

	});
}

