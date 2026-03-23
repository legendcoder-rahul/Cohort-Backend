const dotenv = require('dotenv');
dotenv.config();
const readline = require('readline/promises');
const { ChatMistralAI } = require('@langchain/mistralai');
const { sendEmail } = require('./mail.service.js');
const {HumanMessage, tool, createAgent} = require('langchain');
const { z } = require('zod');


const emailTool = tool(
    sendEmail,
    {
        name: 'emailTool',
        description: 'Use this tool to send an Email',
        schema: z.object({
            to: z.string().describe('The email address of the recipient'),
            html: z.string().describe('The HTML content of the email'),
            subject: z.string().describe('the subject of the email')
        })
    }
)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function main() {

    const model = new ChatMistralAI({
        model: "mistral-small-latest"
    })

    const agent = createAgent({
        model,
        tools: [emailTool]
    })

    const messages = []
    while(true){
        const userInput = await rl.question('You: ');
        messages.push(new HumanMessage(userInput));
        const response = await agent.invoke({
            messages
        });
        messages.push(response)
        // console.log(response.message[response.message.length - 1].text)

    }

}

main()