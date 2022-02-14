import axios from 'axios';

function GetWords(group: number, page: string) {
  const apiUrl = `https://react-rslang-str.herokuapp.com/words?group=${group}&page=${page}`;
  axios.get(apiUrl).then((resp) => {
    const allPersons = resp.data;
    console.log(allPersons);
  });
}

export default GetWords;
