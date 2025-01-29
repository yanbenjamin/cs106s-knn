/** 
 * File: cancer-classify.js
 * ---------------------------
 * Objective is classifying tumor samples as either benign 
 * or malignant, corresponding to labels of 0 and 1, respectively. 
 * 
 * The method we use for classification is the K-Nearest Neighbors 
 * (KNN) algorithm. The idea is that, for each new point we're
 * trying to classify, we look at the K 'most similar' or closest points 
 * in the training dataset. Then, we examine the labels of those K most
 * similar points--if a majority are benign, then we classify the new
 * point are benign. If a majority as malignant, then we classify as malignant.
 * 
 * Refresh Chrome tab on index.html & check console to see whether
 * the preliminary tests pass or not, as well as the model classification 
 * performance once you complete all TODOs! Also, experiment with
 * different odd values of K and how it impacts performance. 
 */


const K = 3; // number of nearest neighbors to check for each sample 


/** Function: calculateDistance
 * This function computes the Euclidean distance between two samples in
 * the dataset. In other words, it should sum up the squared differences 
 * between sample1[i] and sample2[i] for each index i, and return the 
 * square root of the resulting sum. 
 * 
 * However, index 0 and the last index should be ignored, as they represent 
 * the sample ID # and classified label, respectively i.e. not data features.
 * 
 * Tip: Math.sqrt() calculates square root, Math.pow(x,y) does exponent x^y
 * ----------------------------
 * Params: 
 * 	> sample1: A Number array, e.g., [1001, 2.0, 3.0, ..., 2.0, 5.0, 1]
 *  > sample2: A Number array, e.g., [1005, 3.0, 2.0, ..., 1.0, 2.0, 0] 
 * 
 * Returns: 
 * 	> (Number): The Euclidean distance between the two data samples, 
 * 				excluding index 0 and the last index
*/
function calculateDistance(sample1, sample2){
	/* TODO: write your own code here! */
	let distance = 0;
	for (let i = 1; i < sample1.length - 1; i++){ //ignores first and last index
		distance += Math.pow(sample1[i] - sample2[i], 2);
	}
	return Math.sqrt(distance);
}


/** Function: getClosestKPoints 
 * This function searches for and returns the K 'most similar' / closest points in the
 * training dataset to an input test sample. An example return array may look like, for K = 3:
 * 
 * 	[{"id": 1001, "distance": 2.5, "label": 1}, 
 * 	 {"id": 1007, "distance": 2.8, "label": 0},
 *   {"id": 1005, "distance": 3.1, "label": 0}]  
 * 
 * A recommended strategy is as follows:
 *   (1) First, iterate through all points in trainData, and using your helper function
 *		 above, compute the distance between each point (i.e. trainSample) with the testSample point. 
 * 		 
 * 		 You'll want to populate an array pointDistances, by adding a JS object storing the ID #, 
 * 		 distance, and label of the training point (trainSample). The ID # and label can be extracted 
 * 		 via the 0th and last index of trainSample, respectively. 
 * 
 * 	 (2) Then, return a subarray of the K closest points in pointDistances. You'll want to 
 * 		 first sort the elements in pointDistances from smallest to largest distance. 
 * 
 * Notes: For sorting in JavaScript, look at the lecture slides! 
 * 		  To add an element to an array, use .push(). To take a subarray, use .slice(<size>)
 ----------------------------
 * Params: 
 *   > testSample: A number array, e.g., [1001, 2.0,..., 5.0, 1], from testData.
 *   > trainData: Training data, an array of points each identically formatted to testSample
 *   > K: An integer, for number of closest points to obtain
 * 				
 * Returns: 
 * 	 > pointDistances: An array representing the K closest points, where each element 
 * 		   is a JS object with form {"id": <id #>, "distance": <distance>, "label": <label>}
*/

function getClosestKPoints(testSample, trainData, K){
	let pointDistances = [];
	
	for (let trainSample of trainData){
		// TODO: populate pointDistances here as described in part (1) of the strategy
		let distance = calculateDistance(testSample, trainSample);
		let label = trainSample[trainSample.length - 1]; //last element of array
		let id = trainSample[0]; //0th element of array

		pointDistances.push({"id": id, "distance": distance, "label": label});
	}
	// TODO: write your code for part (2) of the strategy!
	
	//sort points from lowest to highest distance (inside is a compact function in JS)
	pointDistances.sort((pointA, pointB) => pointA.distance - pointB.distance);

	// subarray of first K points (due to sorting, this is the closest K points / neighbors)
	return pointDistances.slice(0, K); 
}


/** Function: predictSample 
 * This functions brings everything together to classify any given tumor sample. 
 * 
 * First, it makes a call to getClosestKPoints above. Next, among the returned K nearest 
 * points to the test sample, it should count how many are labeled benign (0) 
 * and how many are labeled malignant (1). Then, it returns the label with the majority. 
 * 
 * Tips: We can use .label to obtain the label attribute of each closest k point. 
 *       To loop over an array, we can write, e.g., for (let point of closestKPoints){...}
 ----------------------------
 * Params: 
 *   > testSample: A Number array, e.g., [1001, 2.0,...,5.0, 1], from testData.
 *   > trainData: Training data, an array of points each identically formatted to testSample
 *   > K: An integer, for number of closest points to obtain 
 * 
 * Returns: 
 * 	 > (Number): predicted label, 0 if benign and 1 if malignant
*/
function predictSample(testSample, trainData, K){

	let closestKPoints = getClosestKPoints(testSample, trainData, K);
	
	// TODO: write your own code here!
	let benign = 0; // counter of label 0
	let malignant = 0; // counter of label 1
	for (let point of closestKPoints){
		if (point.label === 1) malignant++;
		else benign++;
	}
	// voting occurs (picks majority label)
	if (benign > malignant) return 0; // predict benign 
	return 1; // predict malignant label
}


/* no need to modify anything beyond this point! */

function KNN(){
	let numCorrect = 0;
	let numTotal = 0;
	for (let testSample of testData){
		let predLabel = predictSample(testSample, trainData, K);
		let correctLabel = testSample[testSample.length - 1];

		if (correctLabel === predLabel){
			numCorrect++;
		}
		numTotal++;
	}
	let percentAccuracy = numCorrect / numTotal * 100;
	console.log("Accuracy: ", percentAccuracy.toFixed(2), "%");

	// display results on the HTML page
	plotResults(trainData, testData, K);
}

KNN();

