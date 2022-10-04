To use:<br />
Otherwise run function FileToCSV(filelocation) located in solution.js --> example at the top of solution.js<br />
Run test.js using Node, to run the test script. 


What was done:<br />
I programmed this using node.js <br />
I started by writing a quick function to extract the getCSVIntervalData from the file <br />
I then went and extracted all necessary information from the data and processed it, writing the CSV String to the correct file <br />
I then setup functions to check that the data meets the conditions <br />
I used Regex to check whether a row has the row starter followed by a comma or not <br />
I then setup the tests that are run on execution of the test.js file,
    Using "assert.throws" to check that an error is thrown when a condition isn't meant 
    and using assert.doesNotThrow to check that things are working as expected.

I took the assumption that we didn't want to keep the line starters(100, 200, 300, 900) and that after the first 200, we wanted to keep everything after that on the first line below the header. 


Things I didn't do:<br />
I didn't extract the <CSVIntervalData> element in a clean way. I just sliced it from the xml file. This method isn't ideal and I was avoiding using libraries. <br />
I didn't use typescript<br />

    
What would be done with more time:<br />
I would have done this using TypeScript.<br />
I would have liked to incorporate my testing function with the rest of the code instead of having a seperate "verifyCSVData"<br />
I was going to make my own XML Parser so I could get specific elements and their attributes/children, something similar to below class.<br />
    
    
    class element {
        constructor(name) {
            this.name = name
            this.attributes = []
            this.children = []
        }

        get attributes() {
            return this.attributes
        }

        get children(){
            return this.children
        }
    }
