/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    /** Sets the search term of the result JSON object. */

    for (const book of scannedTextObj){                                                                 // First iterates the array of books in scannedTextObj.
        for (const section of book.Content){                                                            // Next iterates through the array of contents for a single book.
            var text = section.Text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(" ");             // All punctuation is removed all words are split into an array.
            var words = text.filter(function (el) {                                                     // All null and empty strings are filtered out of the array.
                return el != null && el != "";
              });
            if (words.includes(searchTerm)){                                                            // If the array of words contain the searchTerm, then added to result object.
                var addedResult = {
                    "ISBN": book.ISBN,
                    "Page": section.Page,
                    "Line": section.Line,
                }
                result.Results.push(addedResult);
            }
        }
    }

    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Example input for multiple books. */
const fourtyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Fourty Thousand Leagues Above the Sea",
        "ISBN": "1358250200879",
        "Content": [
            {
                "Page": 13,
                "Line": 4,
                "Text": "whispering clouds embraced the aeronautical marvels"
            },
            {
                "Page": 13,
                "Line": 5,
                "Text": "then skyward echoes of forgotten realms"
            },
            {
                "Page": 13,
                "Line": 6,
                "Text": "symphony of celestial wonders unfolded beyond any run-of-the-mill aero-domes."
            } 
        ] 
    }
];
    
const testsInEmpty = [];

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Example output object for multiple texts. */
const fourtyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "1358250200879",
            "Page": 13,
            "Line": 4
        },
        {
            "ISBN": "1358250200879",
            "Page": 13,
            "Line": 6
        }
    ]
};

/** Example output for no results */
const testsOutEmpty = {
    "SearchTerm": "Thousand",
    "Results": []
};
/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1, Sample Known Output");
} else {
    console.log("FAIL: Test 1, Sample Known Output");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2, Sample Known 1 Total Result");
} else {
    console.log("FAIL: Test 2, Sample Known 1 Total Result");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** This is a negative test, where it should not return any results. Compares to expected empty output*/
const test3result = findSearchTermInBooks("Thousand", twentyLeaguesIn);
if (JSON.stringify(testsOutEmpty) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3, Negative Test Known Output");
} else {
    console.log("FAIL: Test 3, Negative Test Known Output");
    console.log("Expected:", testsOutEmpty);
    console.log("Received:", test3result);
}

/** This is a negative test, where it should contain 0 total results. */
const test4result = findSearchTermInBooks("Thousand", twentyLeaguesIn); 
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4, Negative Test Known 0 Total Results");
} else {
    console.log("FAIL: Test 4, Negative Test Known 0 Total Results");
    console.log("Expected:", testsOutEmpty.Results.length);
    console.log("Received:", test4result.Results.length);
}

/** This is a case-sensitive test, where it should contain 1 total results. */
const test5result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (test5result.Results.length == 1) {
    console.log("PASS: Test 5, Case-sensitive Test Known 1 Total Result");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 1);
    console.log("Received:", test5result.Results.length);
}

/** This is a case-sensitive test, where it should contain 0 total results. */
const test6result = findSearchTermInBooks("thE", twentyLeaguesIn); 
if (test6result.Results.length == 0) {
    console.log("PASS: Test 6, Case-sensitive Test Known 0 Total Results");
} else {
    console.log("FAIL: Test 6, Case-sensitive Test Known 0 Total Results");
    console.log("Expected:", 0);
    console.log("Received:", test5result.Results.length);
}

/** This is a test for multiple book inputs, where it should return 3 results, 1 from one book and 2 from the other.
 *  Also words like "then" should not count towards the search term "the". Terms with punctuation like
 *  "run-of-the-mill" should count towards the search term "the".
 */
const test7result = findSearchTermInBooks("the", fourtyLeaguesIn);
if (JSON.stringify(fourtyLeaguesOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7, Multi Books Test Known Output");
} else {
    console.log("FAIL: Test 7, Multi Books Test Known Output");
    console.log("Expected:", fourtyLeaguesOut);
    console.log("Received:", test7result);
}

/** This is a test for when the text inputs is empty, where it should contain 0 total results. */
const test8result = findSearchTermInBooks("the", testsInEmpty); 
if (test8result.Results.length == 0) {
    console.log("PASS: Test 8, No Books Test Known 0 Total Results");
} else {
    console.log("FAIL: Test 8, No Books Test Known 0 Total Results");
    console.log("Expected:", testsOutEmpty.Results.length);
    console.log("Received:", test8result.Results.length);
}

/** This is a test for when the search term is empty, where it should contain 0 total results. */
const test9result = findSearchTermInBooks("", fourtyLeaguesIn); 
if (test9result.Results.length == 0) {
    console.log("PASS: Test 9, No Search Term Test Known 0 Total Results");
} else {
    console.log("FAIL: Test 9, No Search Term Test Known 0 Total Results");
    console.log("Expected:", testsOutEmpty.Results.length);
    console.log("Received:", test9result.Results.length);
}