import axios from 'axios';

export async function getLanguages(): Promise<Array<string>> {
    try {
        let response = await axios.get("https://vh7.uk/api/languages");

        return response.data.map((lang: any) => lang["id"]);
    } catch (error) {
        console.error("Error fetching languages", error);
        throw error;
    }
}

export async function paste(content: string, language: string): Promise<string> {
    let languages = await getLanguages();
    if (!languages.includes(language)) {
        console.log(`The language '${language}' is not supported, falling back to 'plaintext'.`);
        language = "plaintext";
    }

    try {
        let response = await axios.post("https://vh7.uk/api/paste", {
            code: content,
            language: language
        });

        return "https://vh7.uk" + response.data.link;
    } catch (error) {
        console.error("Error pasting", error);
        throw error;
    }
}
