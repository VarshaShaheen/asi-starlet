const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const { Configuration, OpenAIApi } = require('openai');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.post('/openai', (req, res) => {
    const { prompt } = req.body?.body;
    console.log(prompt)
    OpenAi({ prompt }).then((response) => {
        res.send(response);
    });
});
const OpenAi = async (extraParams) => {
    try {
        const openAiConfig = new Configuration({
            apiKey: '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',
        });

        const openAi = new OpenAIApi(openAiConfig);


        // The default params most probably used.
        const defaultParams = {
            model: "text-davinci-003",
            temperature: 0.7,
            max_tokens: 300,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        };

        const response = await openAi.createCompletion({
            ...defaultParams,
            ...extraParams,
        });

        const data = response?.data?.choices[0]?.text;

        return { success: true, message: data };
    } catch (error) {
        console.log("error  @OPenAi :>> ", error);
        return { success: false, message: error?.toString()};
    }
};

