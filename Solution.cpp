
#include <algorithm>
using namespace std;

class Solution {
    
public:
    int maxValue(int totalInput, int targetIndex, int maxTargetSum) const {
        int lowerLimit = 1;
        int upperLimit = maxTargetSum;
        int maxValueAtTargetIndex = 0;

        while (lowerLimit <= upperLimit) {
            int currentValue = lowerLimit + (upperLimit - lowerLimit) / 2;
            long long sum = getTotalSum(targetIndex, currentValue, totalInput);

            if (sum <= maxTargetSum) {
                maxValueAtTargetIndex = max(maxValueAtTargetIndex, currentValue);
                lowerLimit = currentValue + 1;
            } else {
                upperLimit = currentValue - 1;
            }
        }

        return maxValueAtTargetIndex;
    }

private:
    long long getTotalSum(int targetIndex, int currentValue, int totalInput) const {
        int firstMember = getFirstMemberOfArithmeticProgression(targetIndex, currentValue);
        int lastMember = currentValue;
        int totalMembers = lastMember - firstMember + 1;

        long long firstPartSum = getSumArithmeticProgression(firstMember, lastMember, totalMembers)
                               + getSumElementsOutsideArithmeticProgression(targetIndex, currentValue);

        firstMember = getFirstMemberOfArithmeticProgression(totalInput - targetIndex - 1, currentValue);
        totalMembers = lastMember - firstMember + 1;

        long long secondPartSum = getSumArithmeticProgression(firstMember, lastMember, totalMembers)
                                + getSumElementsOutsideArithmeticProgression(totalInput - targetIndex - 1, currentValue);

        //'currentValue' is contained both in 'firstPartSum' and in 'secondPartSum'
        //therefore, for a correct total sum, subtract 'currentValue' once.
        return firstPartSum + secondPartSum - currentValue;
    }

    int getFirstMemberOfArithmeticProgression(int targetIndex, int currentValue) const {
        return (currentValue <= targetIndex + 1) ? 1 : (currentValue - targetIndex);
    }

    long long getSumArithmeticProgression(int firstMember, int lastMember, int totalMembers) const {
        return (firstMember + lastMember) * static_cast<long long> (totalMembers) / 2;
    }

    int getSumElementsOutsideArithmeticProgression(int targetIndex, int currentValue) const {
        return (currentValue >= targetIndex + 1) ? 0 : (targetIndex - currentValue + 1);
    }
};
