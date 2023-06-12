
/**
 * @param {number} totalInput
 * @param {number} targetIndex
 * @param {number} maxTargetSum
 * @return {number}
 */
var maxValue = function (totalInput, targetIndex, maxTargetSum) {
    let lowerLimit = 1;
    let upperLimit = maxTargetSum;
    let maxValueAtTargetIndex = 0;

    while (lowerLimit <= upperLimit) {
        const currentValue = lowerLimit + Math.floor((upperLimit - lowerLimit) / 2);
        const sum = getTotalSum(targetIndex, currentValue, totalInput);

        if (sum <= maxTargetSum) {
            maxValueAtTargetIndex = Math.max(maxValueAtTargetIndex, currentValue);
            lowerLimit = currentValue + 1;
        } else {
            upperLimit = currentValue - 1;
        }
    }

    return maxValueAtTargetIndex;
};

/**
 * @param {number} targetIndex
 * @param {number} currentValue
 * @param {number} totalInput
 * @return {number}
 */
function getTotalSum(targetIndex, currentValue, totalInput) {
    let firstMember = getFirstMemberOfArithmeticProgression(targetIndex, currentValue);
    const lastMember = currentValue;
    let totalMembers = lastMember - firstMember + 1;

    const firstPartSum = getSumArithmeticProgression(firstMember, lastMember, totalMembers)
            + getSumElementsOutsideArithmeticProgression(targetIndex, currentValue);

    firstMember = getFirstMemberOfArithmeticProgression(totalInput - targetIndex - 1, currentValue);
    totalMembers = lastMember - firstMember + 1;

    const secondPartSum = getSumArithmeticProgression(firstMember, lastMember, totalMembers)
            + getSumElementsOutsideArithmeticProgression(totalInput - targetIndex - 1, currentValue);

    //'currentValue' is contained both in 'firstPartSum' and in 'secondPartSum'
    //therefore, for a correct total sum, subtract 'currentValue' once.
    return firstPartSum + secondPartSum - currentValue;
}

/**
 * @param {number} targetIndex
 * @param {number} currentValue
 * @return {number}
 */
function getFirstMemberOfArithmeticProgression(targetIndex, currentValue) {
    return currentValue <= targetIndex + 1 ? 1 : currentValue - targetIndex;
}

/**
 * @param {number} firstMember
 * @param {number} lastMember
 * @param {number} totalMembers
 * @return {number}
 */
function getSumArithmeticProgression(firstMember, lastMember, totalMembers) {
    return (firstMember + lastMember) * totalMembers / 2;
}

/**
 * @param {number} targetIndex
 * @param {number} currentValue
 * @return {number}
 */
function getSumElementsOutsideArithmeticProgression(targetIndex, currentValue) {
    return currentValue >= targetIndex + 1 ? 0 : targetIndex - currentValue + 1;
}
