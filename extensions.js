/** File: extensions.js
 * ---------------------------
 * Optional extension / challenge -- to classify tumor samples, but without training data this time. 
 * The approach is the powerful K-Means algorithm with K=2 clusters (see slides for visuals). 
 * 
 * The core idea is keeping track of 2 clusters / groups, and each group's center, e.g.,
 *     - benignPoints = [sample1, sample3, ...],    benignCenter = average of benign points
 *     - malignantPoints = [sample2, sample5, ...], malignantCenter = average of malignant points
 * 
 * ALGORITHM: We assign sample points to groups (based on which one is closer), recalculate each group's center 
 * as the average of the new points assigned to it, and repeat these steps several times to refine the groupings. 
 * 
 * Your tasks are the following functions (specifications & TODOs below for each):
 *    - calculateDistance: simply copy over your earlier implementation into the designated TODO space!
 *    - calculateAverage: helper function to complete
 *    - KMeans: core function to implement, actualizing the algorithm described above
 * 
 * NOTE: When you're ready to test, go into index.html, and change the line <script src="classify.js">
 * </script> to <script src="extensions.js"></script>. Then, refresh the Chrome tab on index.html! 
 */

const NUM_ITERATIONS = 20; // number of iterations for K-Means
const BENIGN_LABEL = 0;
const MALIGNANT_LABEL = 1;


/** Function: calculateDistance
 * Identical to the version in classify.js
 */
function calculateDistance(testSample, trainSample){
	/* TODO: delete the line below and copy & paste your earlier implementation here! */
    return -1;
}


/** Function: calculateAverage()
 * Computes the average (i.e. visually the center) of an array of points, e.g., for input 
 * points = [[0,0,0], [2,4,6]], it should return pointsAverage = [1,2,3]. Note for each index j,
 *      
 *   pointsAverage[j] = (avg of index j) = (sum of point[j] over all points) / numPoints;
 * 
 * Tips - To loop over points, can write "for (let point of points){...}", use .push() to add to an array!
 * ----------------------------
 * Params: 
 *   > points: An array of points (each an array of same length / dimension), e.g., [[0,0,0],[2,4,6],...]
 * Returns: 
 *   > Array: The average of the points, i.e. [avg of index 0, avg of index 1, ...]
*/
function calculateAverage(points){
    if (points.length === 0) return [];
    let numDimensions = points[0].length;
    let numPoints = points.length;

    let pointsAverage = [];
    for (let j = 0; j < numDimensions; j++){
        // TODO: calculate the sum of point[j] over each point of points, divide the result 
        // by numPoints to get the average (of index j), and add it to pointsAverage

    }
    return pointsAverage;
}


/** Function KMeans
 * This function repeatedly refines the groupings via these steps:
 *   (1) TODO: For each testSample, add it to benignPoints if it's closer to benignCenter than to malignantCenter; 
 *        otherwise, add it to malignantPoints array. To assess closeness, use calculateDistance()!
 *  
 *   (2) TODO: Update benignCenter to be the new average of benignPoints, and malignantCenter to be the new
 *        average of malignantPoints. Hint - Use calculateAverage()!
 *
 *   (3) Repeat key steps (1) and (2) over numIterations -> loop already in starter code!
 * 
 * Tips - Use .push() to add to array; to loop over testSamples, can write "for (let testSample of testSamples){...}"
 * ----------------------------
 * Params: 
 *    > testSamples: An array of points to classify, e.g., [[101, 2.0,...,5.0, 1],[103, 2.0,...,5.0, 0],...]
 *    > numIterations: The number of times that steps (1) & (2) above are repeated, to help groups converge
 * Returns: 
 *    > [benignPoints, malignantPoints]: The finalized groups at the end (i.e. the model's classifications)
 */
function KMeans(testSamples, numIterations){
    //choose initial values / "guesses" for the centers (typically random points or the 2 farthest samples)
    let [benignCenter, malignantCenter] = initializeCenters(testSamples); // already complete
    let benignPoints = [], malignantPoints = [];

    for (i = 0; i < numIterations; i++){
        // clears both benignPoints and malignantPoints i.e. set them again to empty array []
        benignPoints = [], malignantPoints = [];

        // TODO: write your code here to assign each testSample of testSamples, then update the 
        // benign/malignant centers, as described in Steps (1) and (2) of the strategy above!

    }
    return [benignPoints, malignantPoints];
}


/* no need to modify anything beyond this point! */

evaluateKMeans();

function evaluateKMeans(){
    console.log("Run customTests() in the console to perform automated tests",
        " (please note that they're not comprehensive!)");

    let benignPoints = [], malignantPoints = [];
    [benignPoints, malignantPoints] = KMeans(testData, NUM_ITERATIONS);
    
    let numTotal = testData.length;
    // for clustering algorithms, evaluate if groupings are correct, so also evaluate with labels flipped
    // typically, this should be done manually or heuristically (e.g., based on knowledge of input features)
    let numCorrect = getNumCorrect(benignPoints, malignantPoints);
    let numCorrectFlipped = getNumCorrect(malignantPoints, benignPoints);

    let percentAccuracy = numCorrect / numTotal * 100;
    if (numCorrect < numCorrectFlipped){
        percentAccuracy = 100 - percentAccuracy;
        let tempPoints = malignantPoints.slice();
        malignantPoints = benignPoints, benignPoints = tempPoints;
    }
    
	console.log("Accuracy: ", percentAccuracy.toFixed(2), "%");
    
    // create a plot function for the HTML file as well
    plotResultsExtension(benignPoints, malignantPoints, testData);
}

// helper function for returning the number of samples predicted correctly
function getNumCorrect(benignPoints, malignantPoints){
    let numCorrect = 0;
    for (let benignSample of benignPoints){ // samples predicted as benign
        let correctLabel = benignSample[benignSample.length - 1];
        if (correctLabel === BENIGN_LABEL) numCorrect++
    }
    for (let malignantSample of malignantPoints){ // samples predicted as malignant
        let correctLabel = malignantSample[malignantSample.length - 1];
        if (correctLabel === MALIGNANT_LABEL) numCorrect++
    }
    return numCorrect;
}

// helper function for creating initial values / "guesses" for the cluster centers
function initializeCenters(testSamples){
    // this implementation chooses the two farthest points among the given sample points
    // some implementations pick randomly from the sample points instead, usually also works! 
    
    farthestPoints = [testSamples[0], testSamples[1]]; // initial guess
    farthestDistance = calculateDistance(testSamples[0], testSamples[1])
    if (farthestDistance == -1) return farthestPoints; // checks if calculateDistance() is implemented

    // searches all pairs of points in testSamples, for the ones farthest apart
    for (let i = 0; i < testSamples.length - 1; i++){
        for (let j = i + 1; j < testSamples.length; j++){
            distance = calculateDistance(testSamples[i], testSamples[j]);
            // pair is found with larger distance than current record
            if (distance > farthestDistance){
                farthestPoints = [testSamples[i], testSamples[j]]; // replace current record
                farthestDistance = distance;
            }
        }
    }
    return farthestPoints;
}
