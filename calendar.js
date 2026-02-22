const nameObj = {
    weekdayNames : {
        short: [
            {
                english: "M",
                magyar: "H"
            },
            {
                english: "Tu",
                magyar: "K"
            },
            {
                english: "W",
                magyar: "Sze"
            },
            {
                english: "Th",
                magyar: "Cs"
            },
            {
                english: "F",
                magyar: "P"
            },
            {
                english: "Sa",
                magyar: "Szo"
            },
            {
                english: "Su",
                magyar: "V"
            },
        ],
        long: [
            {
                english: "Monday",
                magyar: "Hétfő"
            },
            {
                english: "Tuesday",
                magyar: "Kedd"
            },
            {
                english: "Wednesday",
                magyar: "Szerda"
            },
            {
                english: "Thursday",
                magyar: "Csütörtök"
            },
            {
                english: "Friday",
                magyar: "Péntek"
            },
            {
                english: "Saturday",
                magyar: "Szombat"
            },
            {
                english: "Sunday",
                magyar: "Vasárnap"
            },
        ]
    },
    monthNames : {
        short: [
            {
                english: "Jan",
                magyar: "Jan"
            },
            {
                english: "Feb",
                magyar: "Feb"
            },
            {
                english: "Mar",
                magyar: "Már"
            },
            {
                english: "Apr",
                magyar: "Ápr"
            },
            {
                english: "May",
                magyar: "Máj"
            },
            {
                english: "Jun",
                magyar: "Jún"
            },
            {
                english: "Jul",
                magyar: "Júl"
            },
            {
                english: "Aug",
                magyar: "Aug"
            },
            {
                english: "Sep",
                magyar: "Szept"
            },
            {
                english: "Oct",
                magyar: "Okt"
            },
            {
                english: "Nov",
                magyar: "Nov"
            },
            {
                english: "Dec",
                magyar: "Dec"
            }
        ],
        long: [
            {
                english: "January",
                magyar: "Január"
            },
            {
                english: "February",
                magyar: "Február"
            },
            {
                english: "March",
                magyar: "Március"
            },
            {
                english: "April",
                magyar: "Április"
            },
            {
                english: "May",
                magyar: "Május"
            },
            {
                english: "June",
                magyar: "Június"
            },
            {
                english: "July",
                magyar: "Július"
            },
            {
                english: "August",
                magyar: "Augusztus"
            },
            {
                english: "September",
                magyar: "Szeptember"
            },
            {
                english: "October",
                magyar: "Október"
            },
            {
                english: "November",
                magyar: "November"
            },
            {
                english: "December",
                magyar: "December"
            }
        ]
    }
}

const tbldivS = document.querySelectorAll("div.redCalendar");

initialize_calendar(
    tbldivS[0],
    {
        title: "Kezdő dátum",
        lang: "magyar"
    })

function initialize_calendar(
    div, // A div tároló, amibe a naptár kerül.
    {
        title, // A naptár címe
        lang = "magyar", // A naptár nyelve
        monthNamesLength = "long",
        weekDayNamesLength = "short",
    })
{
    // Main nap legenerálása
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const todayO = date_conv(today);

    const tDateS = todayO.string.string; 
    
    const thead = div.querySelector("table thead");

    // A táblázat címének megadása
    const titleTh = thead.querySelector("tr th.table-title");
    titleTh.textContent = title || "";

    // A Hónap kiválasztó elem implementálása:
    const monthSelDiv = thead.querySelector("tr th div.month-selector");

    const monthSelDisp = monthSelDiv.querySelector("div.month-selector-disp");
    const monthSelText = monthSelDisp.querySelector("span");

    const monthSelListDiv = monthSelDiv.querySelector("div.month-selector-list");
    const monthSelList = monthSelDiv.querySelector("ul");

    // A hónap lista feltöltése
    const fragUl = document.createDocumentFragment();
    for(const [i,month] of nameObj.monthNames[monthNamesLength].entries()){
        const monthName = month[lang];
        const li = document.createElement("li");
        li.dataset.value = i;
        li.textContent = monthName;
        if (todayO.num.month === i){
            li.classList.add("selected");
            monthSelText.textContent = monthName;
            monthSelDiv.dataset.month = (i+1).toString().padStart(2,"0");
        }
        fragUl.appendChild(li);
    }
    monthSelList.appendChild(fragUl);

    // A dokumentumon vett kattintás figyelő.
    document.addEventListener("click", (event)=>{
        const clickInside = monthSelDiv.contains(event.target);
        // Ha a kattintás nem a teljes hónap választó div-en belül történt, akkor ki kattintás esete van, azaz zárjuk be a listát.
        if(!clickInside){
            monthSelListDiv.classList.remove("open");
        }

    });

    // A legördülő menü megnyitásának implementációja
    monthSelDisp.addEventListener("click", ()=>{
        monthSelListDiv.classList.toggle("open");
        if(monthSelListDiv.classList.contains("open")){ // Ha az átkapcsolás után tartalmazza, akkor most nyitottuk meg.
            const selEl = monthSelList.querySelector("ul li.selected");
            // Ekkor ha van kiválasztott eleme a listának, akkor szépen odagörgetünk az elemre.
            if(selEl){
                selEl.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }   
        }
    });

    // A kiválasztás implementációja
    monthSelList.addEventListener("click", (event)=>{
        const li = event.target.closest("li");
        if(!li){
            return;
        }
        // A kiválasztott elem szövegének átadása a kijelzett résznek.
        monthSelText.textContent = li.textContent;
        monthSelDiv.dataset.month = (li.value+1).toString().padStart(2,"0");

        // Levesszük a selected class-t az előzőleg kiválasztott elemről.
        const prevSel = monthSelList.querySelector("ul li.selected"); 
        if(prevSel){
            prevSel.classList.remove("selected")
        }

        li.classList.add("selected");
        monthSelListDiv.classList.remove("open");
        change_table();
    });

    // Az év kiválasztás implementációja
    const yearSelDiv = thead.querySelector("tr th div.year-selector");
    const yearSelDisp = yearSelDiv.querySelector("input.year-selector-disp");

    yearSelDisp.value = todayO.num.year;

    yearSelDisp.addEventListener("input", function (){
        // Ezzel csak számot és maximum 4-et fogad be a bemeneti mező.
        this.value = this.value.replace(/\D/g, '').slice(0,4);
    });
    // Amikor kilépünk belőle
    yearSelDisp.addEventListener("blur", change_table);

    // A hét napjainak legenerálása.
    const fragWeeks = document.createDocumentFragment();
    for(const wd of nameObj.weekdayNames[weekDayNamesLength]){
        const wdName = wd[lang];
        const td = document.createElement("td");
        td.textContent = wdName;
        fragWeeks.appendChild(td);
    }
    const tBodyWeekRow = div.querySelector("tbody.bodyWeek tr");
    tBodyWeekRow.innerHTML = "";
    tBodyWeekRow.appendChild(fragWeeks);

    // A naptár napjainak legenerálása a hónap alapján.
    const tBodyDates = div.querySelector("tbody.bodyDates");

    fill_table(todayO.string.year,todayO.string.month);

    function fill_table(year,month,selectedDate = null){
        const dateIterator = new Date(`${year}-${month}-01`); // Ez lesz a dátumiterátor amivel végig megyünk a naptáron
        dateIterator.setHours(0,0,0,0);
        const currMonth = dateIterator.getMonth();
        const weekDay = dateIterator.getDay(); // Mivel a naptár hetes beosztású, ezért kell alkalmazni egy kis matekot. A hét napjainak számozását Vasárnaptól indítja, ezért az lesz a 0 értékű, hogy visszaállítsuk a mi hétbeosztásunkra, ezért hozzá kell adni 6-ot, majd 7-es maradékosztást végezni rajta, így megkapjuk, hogy hétfő az 0 lesz és a vasárnap pedig 6.
        const prevMonthDays = (weekDay + 6) % 7;
        // Ezt az értéket kivonjuk a iterációs dátumunkból, hogy megkapjuk az előző hónapból belógó adatokat.
        dateIterator.setDate(1-prevMonthDays);
        // Most végig iterálunk a táblázaton
        const fragDates = document.createDocumentFragment();
        for(let r = 0; r < 6; r++){
            const tRow = document.createElement("tr")
            for(let c = 0; c < 7; c++){
                const tData = document.createElement("td");
                const diO = date_conv(dateIterator);
                
                const dateS = diO.string.string;
                tData.textContent = diO.num.date;

                tData.dataset.date = dateS;

                if (c > 4){ // Hétvégi nap
                    tData.classList.add("redCalendar-weekendDay");
                }
                if(currMonth !== diO.num.month){
                    tData.classList.add("redCalendar-otherMonth");
                }
                if(tDateS === dateS){
                    tData.classList.add("redCalendar-today");
                }
                if(selectedDate && (selectedDate === dateS)){
                    tData.classList.add("redCalendar-selected");
                }

                tRow.appendChild(tData);
                dateIterator.setDate(dateIterator.getDate()+1);
            }
            fragDates.appendChild(tRow);
        }
        tBodyDates.innerHTML = "";
        tBodyDates.appendChild(fragDates);
    }

    tBodyDates.addEventListener("click", (event)=>{
        const td = event.target.closest("td");
        if(td){
            const monthSel = monthSelDiv.dataset.month;
            const regex = /\d{1,4}-(\d{2})-\d{2}/
            const tdDate = td.dataset.date;
            div.dataset.date = tdDate;
            const res = tdDate.match(regex);
            if(res && res[1]){
                const monthTd = res[1];
                if(monthTd !== monthSel){
                    const tempDate = new Date(tdDate);
                    tempDate.setHours(0,0,0,0);
                    const tempDO = date_conv(tempDate);
                    fill_table(tempDO.string.year,tempDO.string.month,tempDO.string.string);
                    const prevSelMonth = monthSelList.querySelector("ul li.selected"); 
                    if(prevSelMonth){
                        prevSelMonth.classList.remove("selected")
                    }
                    const nextSelMonth = monthSelList.querySelector(`li[data-value="${tempDO.num.month}"]`);
                    nextSelMonth.classList.add("selected");
                    monthSelText.textContent = nextSelMonth.textContent;
                    monthSelDiv.dataset.month = tempDO.string.month;
                    yearSelDisp.value = tempDO.num.year;
                }
                else{
                    const prevSel = tBodyDates.querySelector("td.redCalendar-selected");
                    if(prevSel) prevSel.classList.remove("redCalendar-selected");
                    td.classList.add("redCalendar-selected");
                }
            }
        }
    });

    function change_table(){
        const chMonth = monthSelDiv.dataset.month;
        const chYear = yearSelDisp.value;
        fill_table(chYear,chMonth);
    }



    function date_conv(date_class){
        
        const dcYear = parseInt(date_class.getFullYear(),10);
        const dcMonth = parseInt(date_class.getMonth(),10);
        const dcDate = parseInt(date_class.getDate(),10);

        const dcYearS = dcYear.toString().padStart(2,"0");
        const dcMonthS = (dcMonth+1).toString().padStart(2,"0");
        const dcDateS = dcDate.toString().padStart(2,"0");

        return {
            num:{
                year: dcYear,
                month: dcMonth,
                date: dcDate,
            },
            string:{
                string: `${dcYearS}-${dcMonthS}-${dcDateS}`,
                year: dcYearS,
                month: dcMonthS,
                date: dcDateS,
            },
        };
    }
}   
