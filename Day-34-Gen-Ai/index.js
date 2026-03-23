const dotenv = require('dotenv');
dotenv.config();
const readline = require('readline/promises');
const { ChatMistralAI } = require('@langchain/mistralai');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function main() {

    const model = new ChatMistralAI({
        model: "mistral-small-latest"
    })
    while(true){
        const userInput = await rl.question('You: ');
        const response = await model.invoke(userInput);
        console.log('AI:', response.text);
    }

}

main()