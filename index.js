import express from "express";
const app = express();
app.use(express.json());

const FULL_NAME = "aditya chhabra";
const DOB = "23032004";
const EMAIL = "adityachhabra278@gmail";
const ROLL_NUMBER = "2210990063";

const isNumeric = str => /^\d+$/.test(str);
const isAlphabet = str => /^[a-zA-Z]+$/.test(str);

function toUserId() {
    return FULL_NAME.toLowerCase().replace(/ /g, '_') + "_" + DOB;
}

function alternateCapsReverse(arr) {
    let s = arr.join("").split("").reverse();
    let r = "";
    for (let i = 0; i < s.length; i++) {
        r += i % 2 === 0 ? s[i].toUpperCase() : s[i].toLowerCase();
    }
    return r;
}

app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false });
    }
    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let allAlphaChars = [];
    let sum = 0;
    for (let item of data) {
        item = String(item);
        if (isNumeric(item)) {
            let n = parseInt(item);
            sum += n;
            if (n % 2 === 0) even_numbers.push(item);
            else odd_numbers.push(item);
        } else if (isAlphabet(item)) {
            alphabets.push(item.toUpperCase());
            allAlphaChars.push(...item.match(/[a-zA-Z]/g));
        } else {
            special_characters.push(item);
            let m = item.match(/[a-zA-Z]/g);
            if(m) allAlphaChars.push(...m);
        }
    }
    let concat_string = allAlphaChars.length ? alternateCapsReverse(allAlphaChars) : "";
    res.status(200).json({
        is_success: true,
        user_id: toUserId(),
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: String(sum),
        concat_string
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

