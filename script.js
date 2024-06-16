let animationId = null;
let isAnimating = false;
let currentLeft = 0; // Track the current left pointer position
let maxLen = 0; // Track the maximum length of subarray found

async function visualize() {
  const numsInput = document.getElementById('nums').value.trim();
  const k = parseInt(document.getElementById('k').value);

  if (!numsInput) {
    alert('Please enter an array of 0s and 1s.');
    return;
  }

  const nums = numsInput.split(',').map(num => parseInt(num.trim()));

  const visualizationDiv = document.getElementById('visualization');
  visualizationDiv.innerHTML = '';

  // Use currentLeft to start visualization from where it left off
  maxLen = await findLongestOnes(nums, k, currentLeft);

  document.getElementById('result').textContent = maxLen;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function findLongestOnes(nums, k, startLeft) {
  let left = startLeft; // Start from currentLeft
  let maxLength = 0;
  let zeroCount = 0;

  for (let right = left; right < nums.length; right++) { // Start from currentLeft
    if (nums[right] === 0) {
      zeroCount++;
    }

    while (zeroCount > k) {
      if (nums[left] === 0) {
        zeroCount--;
      }
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);

    // Visualize the current window state
    visualizeWindow(nums, left, right, maxLength, zeroCount);
    await delay(1000); // Delay for visualization (1 second)

    if (!isAnimating) {
      break;
    }
  }

  // Update currentLeft and maxLen at the end
  currentLeft = left;
  maxLen = maxLength;

  return maxLength;
}

function visualizeWindow(nums, left, right, maxLength, zeroCount) {
  const visualizationDiv = document.getElementById('visualization');
  visualizationDiv.innerHTML = '';

  const animationInfo = document.getElementById('animation-info');
  document.getElementById('zeroCount').textContent = zeroCount;
  document.getElementById('left').textContent = left;
  document.getElementById('right').textContent = right;
  document.getElementById('maxLen').textContent = maxLength;

  for (let i = 0; i < nums.length; i++) {
    const span = document.createElement('span');
    span.textContent = nums[i];
    if (i >= left && i <= right) {
      span.classList.add('current');
    }
    if (i >= right - maxLength + 1 && i <= right) {
      span.classList.add('number');
    }
    if (nums[i] === 0) {
      span.classList.add('zero');
    }
    visualizationDiv.appendChild(span);
  }
}

function stopAnimation() {
  isAnimating = false;
  document.getElementById('stopBtn').disabled = true;
  document.getElementById('playBtn').disabled = false;
}

function playAnimation() {
  isAnimating = true;
  document.getElementById('stopBtn').disabled = false;
  document.getElementById('playBtn').disabled = true;
  visualize(); // Start visualization from currentLeft
}

function continueAnimation() {
  if (isAnimating) return; // Animation is already running

  isAnimating = true;
  document.getElementById('stopBtn').disabled = false;
  document.getElementById('playBtn').disabled = true;
  visualize(); // Start visualization from currentLeft
}
