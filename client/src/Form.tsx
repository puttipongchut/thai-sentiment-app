import { useState, type FormEvent } from 'react';
import './Form.css';
import axios from 'axios';

function Form() {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState<{ label: string; score: number } | null>(null);

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!sentence.trim()) {
        alert("Please input a sentence");
        setResult(null);
        return;
    }

    try {
        const body = { text: sentence };
        const response = await axios.post("http://localhost:5000/api/analyze", body);

        setResult(response.data);
    } catch (err) {
        console.error(err);
    }
  }

  return (
    <div className="card">
        <p className='title'>Thai text sentiment analysis 🇹🇭</p>
        <form onSubmit={handleSubmitForm}>
            <input type="text" name='sentence' value={sentence} onChange={e => {
                setSentence(e.target.value);
            }} />
            <button type='submit'>Submit</button>
        </form>

        { result && (
            <div className='result-container'>
                <p>Result</p>
                <p>Label: {result?.label}</p>
                <p>Score: {result?.score}</p>
            </div>
        )}
    </div>
  )
}

export default Form