
function plotResults(trainData, testData, K){
	document.addEventListener("DOMContentLoaded", function() {

		const BENIGN_COLOR = "rgb(204, 255, 153)"; 
		const MALIGNANT_COLOR = "rgb(255, 210, 210)";
		const NOLABEL_COLOR = "white"

		const table = document.createElement("table");
	  	const tableBody = document.createElement("tbody");

	  	const topRow = document.createElement("tr");
	  	const topCell1 = document.createElement("td"); topCell1.innerHTML = "Test Sample ID";
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
			let closestKPoints = findNearestPoints(testSample, trainData, K);

	    	const row = document.createElement("tr");

	    	const cell_1 = document.createElement("td");
	    	cell_1.innerHTML = "🔬" + testSample[0];

	    	const cell_2 = document.createElement("td");
	    	let spanLeft = document.createElement("span");
	    	spanLeft.innerHTML = (predLabel === 0) ? "Benign": (predLabel == 1) ? "Malignant": "None";
	    	spanLeft.style.backgroundColor = (predLabel === 0) ? BENIGN_COLOR: (predLabel == 1) ? MALIGNANT_COLOR: NOLABEL_COLOR;
	    	spanLeft.style.borderRadius = "4px";
	    	cell_2.appendChild(spanLeft);

	    	const cell_3 = document.createElement("td");
	    	let span = document.createElement("span");
	    	span.innerHTML = (correctLabel === 0) ? "Benign": (correctLabel == 1) ? "Malignant": "None";
	    	span.style.backgroundColor = (correctLabel === 0) ? BENIGN_COLOR: (correctLabel == 1) ? MALIGNANT_COLOR: NOLABEL_COLOR; 
	    	span.style.borderRadius = "4px";
	    	cell_3.appendChild(span);

	    	const cell_4 = document.createElement("td");
	    	cell_4.innerHTML = (predLabel === correctLabel) ? "✅": "❌";

	    	const cell_5 = document.createElement("td");

	    	function getSpan(neighbor){
	    		const neighborSpan = document.createElement("span");
	    		neighborSpan.innerHTML = "🔬 " + neighbor.id + " "; 
	    		neighborSpan.style.backgroundColor = (neighbor.label === 0) ? BENIGN_COLOR: MALIGNANT_COLOR;
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


function plotResultsExtension(benignPoints, malignantPoints, testData){
	document.addEventListener("DOMContentLoaded", function() {

		function predictFromKMeans(testSample){
			for (let point of benignPoints){ // check if sample ID matches
				if (point[0] === testSample[0]) return BENIGN_LABEL;
			} 
			for (let point of malignantPoints){ // check if sample ID matches
				if (point[0] === testSample[0]) return MALIGNANT_LABEL;
			}
			return -1;
		}

		document.getElementById("title").innerHTML = "Extension: K-Means Algorithm for Cancer Detection"

		const BENIGN_COLOR = "rgb(204, 255, 153)"; 
		const MALIGNANT_COLOR = "rgb(255, 210, 210)";
		const NOLABEL_COLOR = "white"

		const table = document.createElement("table");
	  	const tableBody = document.createElement("tbody");

	  	const topRow = document.createElement("tr");
	  	const topCell1 = document.createElement("td"); topCell1.innerHTML = "Test Sample ID";
	  	const topCell2 = document.createElement("td"); topCell2.innerHTML = "Predicted Label"
	  	const topCell3 = document.createElement("td"); topCell3.innerHTML = "Actual Label"
	  	const topCell4 = document.createElement("td"); topCell4.innerHTML = "Correct?"
	  	const topCell5 = document.createElement("td"); topCell5.innerHTML = "Distance to Cluster Centers";

	  	topRow.appendChild(topCell1); topRow.appendChild(topCell4); 
	  	topRow.appendChild(topCell3); topRow.appendChild(topCell2); topRow.appendChild(topCell5);
	  	topRow.style.backgroundColor = "rgb(230, 230, 230)";
	  	tableBody.appendChild(topRow)

		let benignCenter = (benignPoints.length > 0) ? calculateAverage(benignPoints): null;
		let malignantCenter = (malignantPoints.length > 0) ? calculateAverage(malignantPoints): null;

	    for (let i = 0; i < testData.length; i++){
			
			let testSample = testData[i]; 
			let predLabel = predictFromKMeans(testSample);
			let correctLabel = testSample[testSample.length - 1];
	
	    	const row = document.createElement("tr");

	    	const cell_1 = document.createElement("td");
	    	cell_1.innerHTML = "🔬" + testSample[0];

	    	const cell_2 = document.createElement("td");
	    	let spanLeft = document.createElement("span");
	    	spanLeft.innerHTML = (predLabel === 0) ? "Benign": (predLabel == 1) ? "Malignant": "None";
	    	spanLeft.style.backgroundColor = (predLabel === 0) ? BENIGN_COLOR: (predLabel == 1) ? MALIGNANT_COLOR: NOLABEL_COLOR;
	    	spanLeft.style.borderRadius = "4px";
	    	cell_2.appendChild(spanLeft);

	    	const cell_3 = document.createElement("td");
	    	let span = document.createElement("span");
	    	span.innerHTML = (correctLabel === 0) ? "Benign": (correctLabel == 1) ? "Malignant": "None";
	    	span.style.backgroundColor = (correctLabel === 0) ? BENIGN_COLOR: (correctLabel == 1) ? MALIGNANT_COLOR: NOLABEL_COLOR; 
	    	span.style.borderRadius = "4px";
	    	cell_3.appendChild(span);

	    	const cell_4 = document.createElement("td");
	    	cell_4.innerHTML = (predLabel === correctLabel) ? "✅": "❌";

	    	const cell_5 = document.createElement("td");
			
			if (benignCenter != null && malignantCenter != null){
				let benignDistance = calculateDistance(testSample, benignCenter);
				let malignantDistance = calculateDistance(testSample, malignantCenter);
				let distancesDict = {benign: benignDistance.toFixed(1), malignant: malignantDistance.toFixed(1)}
				
				if (benignDistance < malignantDistance){
					cell_5.innerHTML = "Benign: <span style = 'background-color: " + BENIGN_COLOR + "'>" + benignDistance.toFixed(1) + "</span> , Malignant: " + malignantDistance.toFixed(1)
				} else{
					cell_5.innerHTML = "Benign: " + benignDistance.toFixed(1) + "</span> , Malignant: <span style = 'background-color: " + MALIGNANT_COLOR + "'>" + malignantDistance.toFixed(1)
				}
			}
			
	    	row.appendChild(cell_1); row.appendChild(cell_4);
	    	row.appendChild(cell_3); row.appendChild(cell_2); row.appendChild(cell_5);

	    	tableBody.appendChild(row);
		}

		table.appendChild(tableBody);

		document.body.appendChild(table);

	});
}