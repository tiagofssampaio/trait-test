const fs = require("fs");

fs.readFile(__dirname + "/metadata.json", (error, data) => {
    if(error) {
        throw error
    }

    let content = JSON.parse(data.toString())

    Object.values(content).forEach((dummy) => {
       // console.log('dummy', dummy.attributes)
        let hasSame = 0;
        console.log('### ' + dummy.name);
        Object.values(content).forEach((dummy2) => {
            if (dummy.name !== dummy2.name) { // para nao comparar com o mesmo
                hasSame = compareTraits(dummy, dummy2)
            }
        })
        if (!hasSame) {
            console.log('SAME DUMMY: NONE');
        }
    })

    console.log('FINISHED');

})


function compareTraits(dummy1, dummy2)
{
    const traits1 = dummy1.attributes;
    const traits2 = dummy2.attributes;
    // se o numero de traits nao for igual são garantidamente diferentes
    if (traits1.length !== traits2.length) {
        return false;
    }

    let isEqual = false;
    let count = 0;
    Object.values(traits1).map((trait1) => {
        let trait1Code = trait1.trait_type + '-' + trait1.value
        Object.values(traits2).map((trait2) => {
            let trait2Code = trait2.trait_type + '-' + trait2.value
            if (trait1Code === trait2Code) {
                count++
            }
        })
    })

    //console.log('count', count)

    // se o count2 for mais que o total de traits de um dos dummies é porque são iguais
    if (count === traits2.length) {
        isEqual = true;
        console.log('#### ', dummy1.name)
        console.log('SAME DUMMY: ', dummy2.name)
    }

    return isEqual;
}