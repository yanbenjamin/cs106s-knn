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
 *  > trainSample: A Number array, e.g., [2003, 3.0, ..., 2.0, 0], note same length!
 * 
 * Returns: 
 * 	> (Number): The Euclidean distance, excluding index 0 and the last index,
 	    e.g., for the Params examples above, sqrt((2.0 - 3.0)^2 + ... + (5.0 - 2.0)^2)
 */
function calculateDistance(testSample, trainSample){
	/* TODO: delete the line below and write your own code here! */
	let distance = 0;
    for (let i = 1; i < testSample.length - 1; i++){ // ignores first and last index
        distance += Math.pow(testSample[i] - trainSample[i], 2);
    }
    return Math.sqrt(distance);
}


/** Function: findNearestPoints 
 * This function returns the K closest points (and their labels) in trainSamples to input testSample.
 * An example return array may look like, for K = 3:
 * 
 * 	[{"id": 1001, "distance": 2.5, "label": 1}, {"id": 1007, "distance": 2.8, "label": 0},
 *       {"id": 1005, "distance": 3.1, "label": 0}]  
 * 
 * A recommended strategy is as follows:
 *   (1) For each trainSample point, compute its distance with testSample. For this, use calculateDistance()!
 *       To keep track of each point's distance, add an object of the form below to array pointDistances,
 * 		 		{"id": <sample id #>, "distance": <distance>, "label": <label>} 
 * 		 
 * 		 Note - The ID # and label can be extracted via the 0th and last index of trainSample, respectively. 
 * 
 *   (2) Then, sort the points in pointDistances from smallest to largest distances, and return a subarray
 *       of the first K elements (i.e. the K points with smallest / closest distance).
 *
 * - Tips: For sorting, look at the lecture slides! To add an element to an array, use .push().
 *	   To take a subarray from index start (inclusive) to end (exclusive), use .slice(start,end)
 * ----------------------------
 * Params: 
 *   > testSample: A number array, e.g., [1001, 2.0,..., 5.0, 1], from testData.
 *   > trainSamples: An array of training points, each formatted identically to testSample
 *   > K: An Integer, for number of closest points to obtain
 *		
 * Returns: 
 * 	 > (Array[Object]): An array representing the K closest points, of the form above
*/
function findNearestPoints(testSample, trainSamples, K){
	let pointDistances = [];
	
	for (let trainSample of trainSamples){
		// TODO: add an object to pointDistances here, as described in part (1) of the strategy
		let distance = calculateDistance(testSample, trainSample);
		let label = trainSample[trainSample.length - 1]; // last element (see Note above)
		let id = trainSample[0]; // 0th element

		pointDistances.push({"id": id, "distance": distance, "label": label});
	}

	// TODO: delete the line below and write your code for part (2) of the strategy!

	//sort points from lowest to highest distance (input is a comparison function, see slides for more detail)
	pointDistances.sort((pointA, pointB) => pointA.distance - pointB.distance);

	// subarray of first K points (due to sorting, this is the closest K points)
	return pointDistances.slice(0, K); 
}


/** Function: predictSample 
 * This functions brings everything together to classify any given tumor sample. As steps,
 *
 *   (1) Makes a call to findNearestPoints() above - starter code does this already!
 *   (2) TODO: Iterate over the returned K nearest points, and keep track of / count how many
 *       are labeled benign (0) and how many labeled malignant (1). 
 *   (3) TODO: Return the label with the majority.
 * 
 * Tips - We can use .label to obtain the label attribute of each point, e.g., point.label 
 *        To loop over an array, we can write, e.g., for (let point of nearestPoints){...}
 * ----------------------------
 * Params: 
 *   > testSample: A Number array, e.g., [1001, 2.0,...,5.0, 1], from testData.
 *   > trainSamples: An array of training points, each formatted identically to testSample
 *   > K: An Integer, for number of closest points to look at 
 * Returns: 
 * 	 > (Number): predicted label, either 0 (BENIGN_LABEL) or 1 (MALIGNANT_LABEL)
*/
function predictSample(testSample, trainSamples, K){
	// an array of the K nearest points, that we should loop over
	let nearestPoints = findNearestPoints(testSample, trainSamples, K);
	
	// TODO: delete the line below & write your own code here for Steps (2) and (3)!
	let benign = 0; // counter of label 0 / BENIGN_LABEL
	let malignant = 0; // counter of label 1 / MALIGNANT_LABEl
	for (let point of nearestPoints){
		if (point.label === BENIGN_LABEL) benign++;
		else malignant++;
	}
	// voting occurs (picks majority label), note constants defined at very top of file
	if (benign > malignant) return BENIGN_LABEL;
	else return MALIGNANT_LABEL;
}


/* no need to modify anything beyond this point! */

KNN();

function KNN(){ // runs the classifier over all test points, outputs the performance
	console.log("Run runTests() in the console to perform automated tests",
		" (please note that they're not comprehensive!)");
		
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