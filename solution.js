//to test the program with a file 
FileToCSV("testfile.xml")

function FileToCSV(xmlFilename){
    const fs = require('fs')
    fs.readFile(xmlFilename, "utf8", (err, data) => {
        if(err){
            throw "error reading the file"
        } else {
            parseXML(data)
        }
    });
}

function parseXML(data){
    const fs = require('fs')
    const CSVIntervalData = getCSVIntervalData(data)
    const dataBlocks = CSVIntervalData.split("200,")
    const header = dataBlocks[0].trim().replace(/100[,]|^100$/g, '') + "\n"
    const footer = dataBlocks[dataBlocks.length-1].slice(
        dataBlocks[dataBlocks.length-1].lastIndexOf('\n'),
        dataBlocks[dataBlocks.length-1].length
      ).replace(/900[,]?/g, '').trim();
    for(let i = 1; i < dataBlocks.length; i++){
        const blockLines = dataBlocks[i].split("\n")
        const FirstLineSplit = blockLines[0].split(",")
        const fileName = FirstLineSplit[0] 
        
        let csvContents = FirstLineSplit.toString() + "\n"
        for (let x = 1; x < blockLines.length-1; x++){
            if(blockLines[x].slice(0, 4) == "300,")
                csvContents += (blockLines[x].slice(4, blockLines[x].length)) + "\n"
        }

            fs.writeFile((fileName) + ".csv", header + csvContents + footer, function (err) {
                if (err) throw "error writing to the file"
            });
    }
}

function getCSVIntervalData(xmlString){
    if(!xmlString.includes('<CSVIntervalData>') || !xmlString.includes('</CSVIntervalData>'))
        throw 'no CSVIntervalData element in XML'
    const CSVIntervalData = xmlString.slice(
        xmlString.indexOf('<CSVIntervalData>') + 17,
        xmlString.indexOf('</CSVIntervalData>')
      );
      verifyCSVData(CSVIntervalData.trim())
      
    return CSVIntervalData.trim()
}

function verifyCSVData(CSVIntervalData){
    //these Regex are testing whether it's a number(In situations where the row has no data),
    //or a number followed by a comma(where the row has got data)
    const regex100 = new RegExp('100[,]|^100$');
    const regex200 = new RegExp('200[,]|^200$');
    const regex300 = new RegExp('300[,]|^300$');
    const regex900 = new RegExp('900[,]|^900$');

    const DataLines = CSVIntervalData.split("\n")
    //console.log(DataLines[0].slice(0, 4) + ":" + DataLines[DataLines.length-1].slice(0, 4))
    if(!regex100.test(DataLines[0].slice(0, 4)) || !regex900.test(DataLines[DataLines.length-1].slice(0, 4)))
        throw 'first and last lines not 100/900'
    let has200 = null
    for(let l = 1; l < DataLines.length-1; l++){
        const currentLine = DataLines[l].slice(0, 4)
        if(!regex200.test(currentLine) && !regex300.test(currentLine))
            throw 'content of dataBlock not beginning with 200/300'
        if(regex200.test(currentLine))
            has200 = true
        else if(has200 == true)
            has200 = false
    }
    if (has200 == null || has200 == true)
        throw 'no 200 line or 200 not followed by 300 line'
    
}

module.exports = { parseXML }