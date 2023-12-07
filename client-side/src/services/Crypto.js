 
import axios from 'axios';
 
export const cryto = async () => {
    const data = await axios.get(
       `http://localhost:4000/list`
    );
      
    return data;
  };
  export const convert = async (amount,fromCurrency,toCurrency) => {
    const data = await axios.get(
      `http://localhost:4000/convert?&amount=${amount}&symbol=${fromCurrency}&convert=${toCurrency}`
    );
          return data;
  };

 