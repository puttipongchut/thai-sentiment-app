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

  const printResult = (label: String): String => {
    if (label === 'pos') return '😀';
    else if (label === 'neg') return '😟';
    else return '😐';
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
                <p className='title'>Result</p>
                <p>Feeling: {printResult(result?.label)}</p>
                <p>Score: {result?.score.toFixed(3)}</p>
            </div>
        )}
    </div>
  )
}

export default Form