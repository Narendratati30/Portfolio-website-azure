import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { NextResponse } from "next/server";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

export async function POST(req){

    const { messages } = await req.json();

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

    messages.unshift({

        role: 'system',
        content: ` You are PortfolioGPT, answering only questions based on the resume provided.
Resume: 
${DATA_RESUME}

Help users learn more about Narendra from his resume.`

    })


    const response = await client.getChatCompletions(model, messages,  {
        maxTokens: 128,
    })

    return NextResponse.json({
        message: response.choices[0].message.content
    }) 

}






const DATA_RESUME = `Narendra Tati
Address: 800N 900W, Salt Lake City, Utah, United States.
Phone: +1 (385)-628-7339
Email: narendratati07@gmail.com
Education
Title of Course [2020-2021]
Name of Training 
Title of Academy
Master's in Information Systems  [2023 – 2024]
University of Utah
Bachelor's Course [2018 – 2021]
Bachelor's in Electrical & Electronics Engineering 
K.L.Univsity
Skills and Competences
Wed Developer 
Front End:  HTML, CSS, JavaScript, React.js, jQuery Bootstrap, REST, API, Responsive Design 
Back End:  NodeJS, MySQL, MongoDB, SQL, noSQL Apache, Express 
Platforms: Amazon AWS, Linux, Windows, Cloud, Automation 
Frameworks: Github  
Employment History
Web Developer [Jan 2022 – Aug 2023] 
Accenture
 Developed a responsive website UI using HTML, CSS, and JavaScript that reduced overall page load speed by
 15%.
 Enhanced the usability of existing applications by applying the latest accessibility standards and best practices.
 Collaborated with project managers to successfully deliver projects on time, resulting in an increase in
 organizational efficiency.

Project Engineer [ Sep 2021 – Jan 2022 ]
Wipro
 Developed features across multiple subsystems within applications, providing engineering support to other
 teams.
 Improved data analysis and report generation efficiency by 20% by integrating data from heterogeneous
 sources using transformations.


Additional Skills and Interests
Language: Fluent in Telugu
Hobbies: Cricket, Reading Books, Photoshop Editing
`