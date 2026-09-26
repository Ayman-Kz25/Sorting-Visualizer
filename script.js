/* DOM ELEMENTS */

const arrayContainer = document.getElementById("array");

const arrayLengthInput = document.getElementById("array-length");

const generateBtn = document.getElementById("generate-btn");

const sortBtn = document.getElementById("sort-btn");

const resetBtn = document.getElementById("reset-btn");

const comparisonText = document.getElementById("comparison");

const stepText = document.getElementById("step");


/* STATE */

let currentArray = [];

let sorting = false;

let step = 0;

let animationTimer = null;


/* ARRAY GENERATION */

function generateElement() {
    return Math.floor(Math.random() * 100) + 1;
}


function generateArray(size) {

    const array = [];

    for (let i = 0; i < size; i++) {
        array.push(generateElement());
    }

    return array;
}


/* DISPLAY ARRAY */

function displayArray(array) {

    arrayContainer.innerHTML = "";

    array.forEach((value) => {

        const bar = document.createElement("div");

        bar.classList.add("bar");

        /*
         * Convert the value into a bar height.
         */

        bar.style.height = `${value * 4}px`;

        const valueLabel = document.createElement("span");

        valueLabel.classList.add("bar-value");

        valueLabel.textContent = value;

        bar.appendChild(valueLabel);

        arrayContainer.appendChild(bar);

    });
}


/* UPDATE STEP */

function updateStep() {

    stepText.textContent = step;

}


/* UPDATE COMPARISON */

function updateComparison(left, right) {

    if (right === undefined || right === "") {

        comparisonText.textContent = left;

        return;
    }

    comparisonText.textContent = `${left} vs ${right}`;

}


/* CLEAR BAR STATES */

function clearBarStates() {

    const bars = arrayContainer.querySelectorAll(".bar");

    bars.forEach((bar) => {

        bar.classList.remove(
            "comparing",
            "swapping",
            "sorted"
        );

    });

}


/* UPDATE BARS */

function updateBars(array) {

    const bars = arrayContainer.querySelectorAll(".bar");

    array.forEach((value, index) => {

        if (!bars[index]) {
            return;
        }

        bars[index].style.height = `${value * 4}px`;

        const label = bars[index].querySelector(".bar-value");

        if (label) {
            label.textContent = value;
        }

    });
}


/* BUBBLE SORT */

async function bubbleSort() {

    sorting = true;

    generateBtn.disabled = true;

    sortBtn.disabled = true;

    resetBtn.disabled = false;


    const array = [...currentArray];

    const bars = arrayContainer.querySelectorAll(".bar");


    for (let i = 0; i < array.length - 1; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            /*
             * Stop if Reset was clicked.
             */

            if (!sorting) {
                return;
            }


            /*
             * Increase step count.
             */

            step++;

            updateStep();


            /*
             * Show the values being compared.
             */

            updateComparison(
                array[j],
                array[j + 1]
            );


            /*
             * Highlight the two bars
             * being compared.
             */

            clearBarStates();

            bars[j].classList.add("comparing");

            bars[j + 1].classList.add("comparing");


            await wait(400);


            /*
             * Stop if Reset was clicked.
             */

            if (!sorting) {
                return;
            }


            /*
             * Swap if the left value
             * is greater than the right value.
             */

            if (array[j] > array[j + 1]) {

                bars[j].classList.remove("comparing");

                bars[j + 1].classList.remove("comparing");

                bars[j].classList.add("swapping");

                bars[j + 1].classList.add("swapping");


                await wait(300);


                /*
                 * Swap values.
                 */

                const temp = array[j];

                array[j] = array[j + 1];

                array[j + 1] = temp;


                /*
                 * Update the bars.
                 */

                updateBars(array);


                await wait(300);

            }

        }


        /*
         * Mark the last element of
         * this pass as sorted.
         */

        const sortedIndex = array.length - i - 1;

        clearBarStates();

        bars[sortedIndex].classList.add("sorted");


        await wait(150);

    }


    /*
     * Mark the complete array as sorted.
     */

    clearBarStates();

    bars.forEach((bar) => {

        bar.classList.add("sorted");

    });


    /*
     * Show that sorting is complete.
     */

    updateComparison("Complete");


    currentArray = [...array];

    sorting = false;

    generateBtn.disabled = false;

    sortBtn.disabled = false;

    resetBtn.disabled = false;

}


/* WAIT FUNCTION */

function wait(milliseconds) {

    return new Promise((resolve) => {

        animationTimer = setTimeout(() => {

            animationTimer = null;

            resolve();

        }, milliseconds);

    });

}


/* GENERATE ARRAY */

generateBtn.addEventListener("click", () => {

    if (sorting) {
        return;
    }


    const size = Number(arrayLengthInput.value);


    /*
     * Validate array length.
     */

    if (
        !Number.isInteger(size) ||
        size < 2 ||
        size > 15
    ) {

        alert(
            "Please enter a number between 2 and 15."
        );

        return;

    }


    /*
     * Generate the array.
     */

    currentArray = generateArray(size);


    /*
     * Reset steps and comparison.
     */

    step = 0;

    updateStep();

    updateComparison("-");


    /*
     * Display the array.
     */

    displayArray(currentArray);

});


/* SORT ARRAY */

sortBtn.addEventListener("click", () => {

    if (sorting) {
        return;
    }


    /*
     * User must generate an array first.
     */

    if (currentArray.length === 0) {

        alert("Please generate an array first.");

        return;

    }


    /*
     * Reset steps.

     */

    step = 0;

    updateStep();


    /*
     * Start Bubble Sort.
     */

    bubbleSort();

});


/* RESET */

resetBtn.addEventListener("click", () => {

    /*
     * Stop sorting.

     */

    sorting = false;


    /*
     * Cancel current animation.

     */

    if (animationTimer !== null) {

        clearTimeout(animationTimer);

        animationTimer = null;

    }


    /*
     * Reset array.

     */

    currentArray = [];


    /*
     * Reset steps and comparison.

     */

    step = 0;

    updateStep();

    updateComparison("-");


    /*
     * Clear bars.

     */

    arrayContainer.innerHTML = "";


    /*
     * Enable buttons.

     */

    generateBtn.disabled = false;

    sortBtn.disabled = false;

    resetBtn.disabled = false;

});


/* INITIAL STATE */

updateStep();

updateComparison("-");
