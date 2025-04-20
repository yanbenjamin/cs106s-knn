/** File: cancer-classify.js
 * ---------------------------
 * Objective is classifying tumor samples as either benign (0) or malignant (1).
 *
 * We use the K-Nearest Neighbors (KNN) algorithm. The core idea is that, for each new point,
 *   (1) We look at the K "most similar" or closest points in the training dataset.
 *   (2) We examine the labels of those K closest points, and do a vote--if a majority are benign, 
 *   the new point is classified as benign; otherwise, the point is classified as malignant.
 *
 * As you code, refresh the Chrome tab on index.html, checking the console to see whether the 
 * tests pass or not, along with model performnce once you complete all TODOs! 
 * Also - see how performance changes with different odd values of K (odd to prevent ties!) */

const K = 3; // number of nearest neighbors to check for each sample 
const BENIGN_LABEL = 0;
const MALIGNANT_LABEL = 1;


/** Function: calculateDistance
 * This function computes the Euclidean distance between two samples i.e. sums up
 * the squared differences between testSample[i] and trainSample[i] for indices 
 * (1 <= i < testSample.length - 1), returning the square root of the resulting sum. 
 * 
 * - NOTE: Index 0 and last index are ignored here, as they aren't inputs (sample ID # and label).
 * - Tips: Math.sqrt() calculates square root, Math.pow(x,y) does exponent x^y.
 * ----------------------------
 * Params: 
 * 	> testSample: A Number array, e.g., [1001, 2.0, ..., 5.0, 1]
 *      > trainSample: A Number array, e.g., [2003, 3.0, ..., 2.0, 0], note same length!
 * 
 * Returns: 
 * 	> (Number): The Euclidean distance, excluding index 0 and the last index,
 	    e.g., for the Params examples above, sqrt((2.0 - 3.0)^2 + ... + (5.0 - 2.0)^2)
 */
function calculateDistance(sample1, sample2){
	/* TODO: delete the line below and write your own code here! */
	return -1;
}

/** Function: getNearestNeighbors 
 * This function returns the K closest points (and their labels) in trainSamples to input testSample.
 * An example return array may look like, for K = 3:
 * 
 * 	[{"id": 1001, "distance": 2.5, "label": 1}, {"id": 1007, "distance": 2.8, "label": 0},
 *       {"id": 1005, "distance": 3.1, "label": 0}]  
 * 
 * A recommended strategy is as follows:
 *   (1) First, iterate through all points in trainSamples, and compute the distance between each point 
 *       (i.e. trainSample) with the testSample point. Hint: Use calculateDistance() from above!
 *
 *       To keep track of each point's distance, add an object of the form below to array pointDistances,
 * 		       {"id": <sample id #>, "distance": <distance>, "label": <label>}
 *	 Note - The ID # and label can be extracted via the 0th and last index of trainSample, respectively. 
 * 
 *   (2) Then, sort the points in pointDistances from smallest to largest distances, and return a
 * 	 subarray of the first K elements (i.e. the K points with smallest / closest distance).
 *
 * - Tips: For sorting, look at the lecture slides! To add an element to an array, use .push().
 	   To take a subarray from index start (inclusive) to end (exclusive), use .slice(start,end)
 ----------------------------
 * Params: 
 *   > testSample: A number array, e.g., [1001, 2.0,..., 5.0, 1], from testData.
 *   > trainSamples: An array of training points, each formatted identically to testSample
 *   > K: An Integer, for number of closest points to obtain
 *		
 * Returns: 
 * 	 > pointDistances: An array representing the K closest points, of the form above
*/
function getNearestNeighbors(testSample, trainSamples, K){
	let pointDistances = [];
	
	for (let trainSample of trainSamples){
		// TODO: populate pointDistances here as described in part (1) of the strategy

	}

	// TODO: delete the line below and write your code for part (2) of the strategy!
	return pointDistances;
}

/** Function: predictSample 
 * This functions brings everything together to classify any given tumor sample. As steps,
 *
 *   (1) Makes a call to getNearestNeighbors() above - starter code does this already!
 *   (2) TODO: Iterate over the returned K nearest neighbors, and keep track of / count how many
 *       are labeled benign (0) and how many labeled malignant (1). 
 *   (3) TODO: Return the label with the majority.
 * 
 * Tips - We can use .label to obtain the label attribute of each point, e.g., point.label 
 *        To loop over an array, we can write, e.g., for (let point of nearestNeighbors){...}
 ----------------------------
 * Params: 
 *   > testSample: A Number array, e.g., [1001, 2.0,...,5.0, 1], from testData.
 *   > trainSamples: An array of training points, each formatted identically to testSample
 *   > K: An Integer, for number of closest points to look at 
 * 
 * Returns: 
 * 	 > (Number): predicted label, either 0 (BENIGN_LABEL) or 1 (MALIGNANT_LABEL)
*/
function predictSample(testSample, trainSamples, K){
	// an array of the K nearest neighbors, that we should loop over
	let nearestNeighbors = getNearestNeighbors(testSample, trainSamples, K);
	
	// TODO: delete the line below & write your own code here for Steps (2) and (3)!
	return -1;
}


/* no need to modify anything beyond this point! */

function KNN(){ // runs the classifier over all test points, outputs the performance
	let numCorrect = 0, numTotal = 0;
	for (let testSample of testData){
		let predLabel = predictSample(testSample, trainData, K);
		let correctLabel = testSample[testSample.length - 1];

		if (correctLabel === predLabel) numCorrect++;
		numTotal++;
	}
	let percentAccuracy = numCorrect / numTotal * 100;
	console.log("Accuracy: ", percentAccuracy.toFixed(2), "%");

	// display results as a table on the HTML page
	plotResults(trainData, testData, K);
}

KNN();
