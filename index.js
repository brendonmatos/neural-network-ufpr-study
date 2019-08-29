const { createNet, getFormattedContent } = require("./createNet");

const net = createNet('./idiomas_training.dat');

console.log( 'Ready!' )

const formattedTestData = getFormattedContent('./idiomas_test.dat')

const result = { errors: 0, success: 0 }

for( const data of formattedTestData ){ 

    const output = net.run( data.input )

    // Mudar isso pelamor 
    let biggerKey = ''
    let biggerResult = 0
    for( const keyResult in output ) {
        if( output[keyResult] > biggerResult ) {
            biggerResult = output[keyResult]
            biggerKey = keyResult
        }
    }

    const [correctKey] = Object.entries( data.output ).find( ( [key, data] ) => data )


    if( correctKey === biggerKey ) {
        result.success++
    } else {
        result.errors++
    }

} 


console.log( result )
console.log( ( result.success * 100 ) / ( result.success + result.errors ) )
