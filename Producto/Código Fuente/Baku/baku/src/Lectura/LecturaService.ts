import axios from 'axios';

export const guardarNota= async (content: String ,highlightAreas: {},quote: String,usuario: String, id: String) => {
    return await axios.post('http://localhost:4000/guardarNota', { content, highlightAreas, quote ,usuario, id});
}