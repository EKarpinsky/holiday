import React, {useState} from 'react';
import './App.css';

function App() {
    const API_KEY = "cbbf11bf-0029-4a8b-ad64-0e547dd7cf1d";
    let [country, setCountry] = useState("");
    let [holiday, setHoliday] = useState("");
    let [date, setDate] = useState("");

    // let date = (new Date()).toISOString().split('T')[0]; (today's date)

    async function fetchHolidayData() {
        try {
            await fetch(`https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${country}&year=2019`)
                .then(res => res.json())
                .then(res => {
                    if (res.status !== 200)
                        setHoliday(`Error finding data. Here's the API call: https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${country}&year=2019`);
                    else {
                        console.log(`https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${country}&year=2019`);
                        let todaysHoliday = res["holidays"].filter(holiday => {
                            return holiday.date === date;
                        });
                        setHoliday(todaysHoliday[0].name);
                    }
                });
        } catch (e) {
            setHoliday(`Error finding data. Here's the API call: https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${country}&year=2019`);
        }
    }

    return (
        <div className="App">
            <input type={"text"} placeholder={"Input country (two letters)"}
                   onChange={e => setCountry(e.target.value)}/> <input type={"text"}
                                                                       placeholder={"Input date (2019-MM-DD)"}
                                                                       onChange={e => setDate(e.target.value)}/>
            <button type={"button"} onClick={fetchHolidayData}>FIND HOLIDAY</button>
            {holiday}
        </div>
    );
}

export default App;
