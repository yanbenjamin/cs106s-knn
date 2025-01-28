
console.log("Run sanityCheck() in the console to perform automated tests",
            " (please note that they're not comprehensive!)");

function testDistance(){
	const eps = 1e-3; // epsilon to accommodate possible floating-point errors
	let numFailedTests = 0;
	let checkSquareRoot = false;
	let checkIndex0 = false;
	let checkLastIndex = false;

	function logSuccess(sample1, sample2, distance, expectedDistance, stepByStep){
	        console.log("✅ calculateDistance matches reference solution for inputs: ",
	                        "\nsample1 = " + JSON.stringify(sample1),
	                        "\nsample2 = " + JSON.stringify(sample2),
	                        "\n\nOutput Distance = " + JSON.stringify(distance),
	                        "\nExpected Distance = " + JSON.stringify(expectedDistance) + " ← " + stepByStep
                );
    	}

	function logError(sample1, sample2, distance, expectedDistance, stepByStep){
		console.log("❌ calculateDistance does not match reference solution for inputs: ",
	                        "\nsample1 = " + JSON.stringify(sample1),
	                        "\nsample2 = " + JSON.stringify(sample2),
	                        "\n\nOutput Distance = " + JSON.stringify(distance),
	                        "\nExpected Distance = " + JSON.stringify(expectedDistance) + " ← " + stepByStep
	     	); 
	}

	function runUnitTestDistance(sample1, sample2, expectedOutput, stepByStep){
	    let output = calculateDistance(sample1, sample2);
	    if (Math.abs(expectedOutput - output) < eps){
	    	logSuccess(sample1, sample2, output, expectedOutput, stepByStep);
	    	//console.log("✅ calculateDistance([" + sample1 + "],[" + sample2 + "]) => " + output + ". Matches reference solution!"); 
	    	return 0; // all good!
	    }
	  	
	  	//flags specific possible errors by analyzing the output
	  	logError(sample1, sample2, output, expectedOutput, stepByStep);
	    //console.log("❌ calculateDistance([" + sample1 + "],[" + sample2 + "]) => " + output + ". Expected: " + expectedOutput); 
	    if (Math.abs(expectedOutput**2 - output) < Math.sqrt(eps)) checkSquareRoot = true;
	    if (Math.abs(expectedOutput - output) < 1) checkLastIndex = true;
	    if (Math.abs(expectedOutput - output)**2 > 9**2 * (sample1.length - 2)) checkIndex0 = true;
	    return 1; 
	}    

	numFailedTests += runUnitTestDistance([1000, 0, 0, 0, 0, 0, 0],[3005, 0, 0, 0, 0, 0, 1], 
									0.0, "sqrt((0-0)^2+(0-0)^2+(0-0)^2+(0-0)^2+(0-0)^2)");

	numFailedTests += runUnitTestDistance([1000, 2.0, 0],[3005, 5.0, 1], 
									3.0, "sqrt((2-5)^2)");

	numFailedTests += runUnitTestDistance([1000, -2.0, 2.0, 0],[3005, 2.0, 5.0, 1], 
									5.0, "sqrt((-2-2)^2+(2-5)^2)");

	numFailedTests += runUnitTestDistance([1000, -2.0, 2.0, 0.0, 0],[3005, 2.0, 5.0, 12.0, 1], 
									13.0, "sqrt((-2-2)^2+(2-5)^2+(0-12)^2)");

	if (checkSquareRoot) console.log("🔎 Quick check: did you square root the Euclidean sum?");
	if (checkIndex0) console.log("🔎 Quick check: did you make sure to leave out index 0?");
	if (checkLastIndex) console.log("🔎 Quick check: did you make sure to leave out the last index?")

	if (numFailedTests === 0){
		console.log("✅ All 4 tests for calculateDistance passed!",
						"\n---------------------------");
		return 0;
	}
	console.log("🫠 " + (4 - numFailedTests) + " out of 4 tests for calculateDistance passed, you got this!",
						"\n---------------------------");
	return 1;
}



function testKClosestNeighbors(){
	// shouldn't run tests for this function until all tests above pass
	let numFailedTests = 0;

	function logSuccess(testSample, trainData, K, neighbors, correctNeighbors){
	        console.log("✅ getClosestKPoints matches point IDs of reference solution, for inputs: ",
	                        "\ntestSample = " + JSON.stringify(testSample),
	                        "\ntrainData = " + JSON.stringify(trainData),
	                        "\nK = " + K,
	                        "\n\nOutput Neighbors = " + JSON.stringify(neighbors),
	                        "\nExpected Neighbors = " + JSON.stringify(correctNeighbors)
                );
    	}

    function logSizeError(testSample, trainData, K, neighbors){
        console.log("❌ getClosestKPoints output does not contain K points, for inputs: ",
                        "\ntestSample = " + JSON.stringify(testSample),
                        "\ntrainData = " + JSON.stringify(trainData),
                        "\nK = " + K,
                        "\n\nOutput Neighbors = " + JSON.stringify(neighbors), 
                        "\n# of Neighbors = " + neighbors.length + " ‼️"
            );
	}

	function logError(testSample, trainData, K, neighbors, correctNeighbors){
        console.log("❌ getClosestKPoints does not match point IDs of reference solution, for inputs: ",
                        "\ntestSample = " + JSON.stringify(testSample),
                        "\ntrainData = " + JSON.stringify(trainData),
                        "\nK = " + K,
                        "\n\nOutput Neighbors = " + JSON.stringify(neighbors),
                        "\nExpected Neighbors = " + JSON.stringify(correctNeighbors)
            );
	}

	function runUnitTest(testSample, trainData, K, correctNeighbors){

		let neighbors = getClosestKPoints(testSample, trainData, K);
		if (neighbors.length != correctNeighbors.length){
			logSizeError(testSample, trainData, K, neighbors);
			return 1;
		}

		//checking the ids
		let neighborIDs = neighbors.map(point => point.id);
		let correctIDs = correctNeighbors.map(point => point.id);
		neighborIDs.sort((a,b) => (a-b));
		correctIDs.sort((a,b) => (a-b));

		for (let i = 0; i < neighborIDs.length; i++){
			if (neighborIDs[i] !== correctIDs[i]){
				logError(testSample, trainData, K, neighbors, correctNeighbors);
				return 1;
			}
		}

		logSuccess(testSample, trainData, K, neighbors, correctNeighbors);		
        return 0; // success!
    };

    numFailedTests += runUnitTest([100, 4, 0], [[101, 7, 0]], 1, 
    					[{"id": 101, "distance": 3, "label": 0}]);

    numFailedTests += runUnitTest([100, 4, 0], [[101, 7, 0], [103, 5, 0], [105, 9, 1]], 1, 
    					[{"id": 103, "distance": 1, "label": 0}]);

    numFailedTests += runUnitTest([100, 4, 0], [[107, 8, 1], [103, 5, 0], [105, 9, 1], [101, 5, 0]], 2, 
    					[{"id": 103, "distance": 1, "label": 0}, {"id": 101, "distance": 3, "label": 0}]);

	if (numFailedTests === 0){
		console.log("✅ All 3 tests for getClosestKPoints passed!",
						"\n----------------------------------");
		return 0;
	}
	console.log("🫠 " + (3 - numFailedTests) + " out of 3 tests for getClosestKPoints passed, you got this!",
						"\n---------------------------");
	return 1;
}



function testKNNPredictor(){
	// shouldn't run tests for this function until all tests above pass
	let numFailedTests = 0;

	function logSuccess(testSample, trainData, K, predLabel, correctLabel, neighborLabels, correctNeighborLabels){
        console.log("✅ predictSample matches reference solution for inputs: ",
                        "\ntestSample = " + JSON.stringify(testSample),
                        "\ntrainData = " + JSON.stringify(trainData),
                        "\nK = " + K,
                        "\n\nOutput Label = " + predLabel + " (Neighbor Labels = " + JSON.stringify(neighborLabels) + ")",
                        "\nExpected Label = " + correctLabel + " (Neighbor Labels = " + JSON.stringify(correctNeighborLabels) + ")"
            );
	}

	function logError(testSample, trainData, K, predLabel, correctLabel, neighborLabels, correctNeighborLabels){
        console.log("❌ predictSample does not reference solution for inputs: ",
                        "\ntestSample = " + JSON.stringify(testSample),
                        "\ntrainData = " + JSON.stringify(trainData),
                        "\nK = " + K,
                        "\n\nOutput Label = " + predLabel + " (Neighbor Labels = " + JSON.stringify(neighborLabels) + ")",
                        "\nExpected Label = " + correctLabel + " (Neighbor Labels = " + JSON.stringify(correctNeighborLabels) + ")"
            );
	}

	function runUnitTest(testSample, trainData, K, correctLabel, correctNeighborLabels){

		let neighbors = getClosestKPoints(testSample, trainData, K);
		let neighborLabels = neighbors.map(point => point.label);
		neighborLabels.sort((a,b) => (a-b));

		let predLabel = predictSample(testSample, trainData, K);

		if (predLabel === correctLabel){
			logSuccess(testSample, trainData, K, predLabel, correctLabel, neighborLabels, correctNeighborLabels);		
        	return 0; // success!
		}

		logError(testSample, trainData, K, predLabel, correctLabel, neighborLabels, correctNeighborLabels);
		return 1;
    };

    numFailedTests += runUnitTest([100, 4, 0], [[101, 7, 0]], 
    				1, 0, [0]);

    numFailedTests += runUnitTest([100, 4, 0], [[101, 7, 0], [103, 5, 0], [105, 9, 1]], 
    				3, 0, [0,0,1]);

	numFailedTests += runUnitTest([100, 9, 0], [[101, 7, 0], [102, 8, 1], [103, 5, 0], [104, 3, 1], [105, 9, 1]], 
					3, 1, [0,1,1]);

	if (numFailedTests === 0){
		console.log("✅ All 3 tests for predictSample passed!",
						"\n----------------------------------");
		return 0;
	}
	console.log("🫠 " + (3 - numFailedTests) + " out of 3 tests for predictSample passed, you got this!",
						"\n---------------------------");
	return 1;
}

function sanityCheck(){
	let fail1 = testDistance();
	let fail2 = testKClosestNeighbors();
	let fail3 = testKNNPredictor();

	if (!fail1 && !fail2 && !fail3) console.log("🎉🎉🎉 All 10 tests pass, woo hoo!");
}

