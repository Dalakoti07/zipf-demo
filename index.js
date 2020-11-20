$('#btnCalculate').click(()=>{
    let text=$('#textArea').val();

    if(text.length<=100){
        //lauch modal
        let modal=$(`#info-model`);
        modal.modal()
        return;
    }

    allWords= getWords(text);
    let wordCount= getWordsCount(allWords);
    let sortedWordCount= sortWordCount(wordCount);
    //console.log(sortedWordCount);
    showDataInTable(sortedWordCount);
    generateChart(sortedWordCount);
})


function getWords(inputText){
    let chars=inputText.split('');
    let newChars=[];
    let count=0;
    chars.forEach((c) => {
        count++;
        switch(c){
            case `  `: case `   `:
            case `!`: case `’`:
            case `?`: case `#`:
            case `'`: case `”`: case `“`:
            case `.`:
            case `-`: case `,`: case `"`:
            case `:`: case `(`: case `)`:
            case `;`: return;
            case '\n': newChars.push(' '); break;

            default: newChars.push(c.toLowerCase()) 
        }
    });

    let newText = newChars.join('');
    // console.log(newText)
    let allWords= newText.split(' ');
    return allWords;
}

function getWordsCount(words){
    let wordCount={};
    words.forEach((word)=>{
        if(wordCount[word]){
            wordCount[word]++;
        }else{
            wordCount[word]=1;
        }
    })
    return wordCount;
}

function sortWordCount(wordCounts){
    let wordCountArray=[];
    Object.keys(wordCounts).forEach((w)=>{
        if(w=="")
            return;
        wordCountArray.push({
            word:w,
            count: wordCounts[w]
        })
    })
    return wordCountArray.sort((a,b)=> b.count-a.count).slice(0,50);
}

function showDataInTable(wordCounts){
    let table= $('#zipf-table');
    table.empty();
    wordCounts.forEach((w)=>{
        table.append($(`<tr>`)
                .append($(`<td>`).text(w.word))
                .append($(`<td>`).text(w.count))
        )
    })
}

function generateChart(wordFrequency){
    let ctx = document.getElementById('chart-canvas').getContext('2d');

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: wordFrequency.map((w)=> w.word),
            datasets: [{
              label: 'Word Freq',
              borderColor: 'rgb(255, 99, 132)',
              data: wordFrequency.map((w)=> w.count)
            },{
                label: 'Ideal Graph',
                borderColor: 'rgb(12, 116, 196)',
                data: getIdealValues(wordFrequency[0].count)
              }
            ]
        }
    });
}

function getIdealValues(highestValue){
    let idealValues=[]
    for(let i=1;i<=50;i++){
        idealValues.push(highestValue/i);
    }
    return idealValues;
}