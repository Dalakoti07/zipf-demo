$('#btnCalculate').click(()=>{
    let text=$('#textArea').val();

    let chars=text.split('');
    let newChars=[];
    let count=0;
    chars.forEach((c) => {
        count++;
        switch(c){
            case `!`: case `’`:
            case `?`: 
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
    let allWords= newText.split(' ');
    console.log(allWords);
})