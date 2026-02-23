class RedCalendar {
    static #nameObj = {
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
    static #cssStyleHTML = `

        /* Az egész táblázat szülő eleme. Itt az egésznek hátteret, valamint lekerekítést lehet adni.*/
        div.redCalendar { 
            padding: var(--divpad);
            margin: 0;
            border-radius: calc(var(--tableradius) + var(--divpad));
            border: 0px solid #000;
            background: linear-gradient(to bottom, #999, #777);
            overflow: hidden;
            width: max-content;
        }

        /* Táblázat stílusa*/
        table.redCalendar { 
            padding: 0;
            margin: 0;
            border-spacing: 0;
            border-radius: var(--tableradius);
            overflow: hidden;
            color: #000;
            font-weight: bold;
            font-family: sans-serif;
            text-align: center;
            user-select: none;
        }


        /* Itt foglalnak helyet a táblázat címe és a hónap/év kiválasztó*/
        table.redCalendar thead { 
            padding: 0;
            margin: 0;
            background: linear-gradient(to bottom, #888, #444);
        }
        table.redCalendar thead th { 
            padding: var(--thpad) 0px var(--thpad) 0px;
            margin: 0;
            color: #000;
        }
        table.redCalendar thead tr {
            padding: 0;
            margin: 0;
        }

        /* Itt specifikusan lehet módosítani a táblázat címe cellát*/
        table.redCalendar thead th.table-title{
            font-size: var(--titlefont);
            margin: 0;
            height: var(--thheight);
        }

        /* Itt specifikusan lehet módosítani a kiválasztó cellákat*/
        table.redCalendar thead th.selector{
            margin: 0;
            height: var(--thheight);
        }



        /* A táblázat két <tbody> elemet tartalmaz. A bodyWeek részben van kiíratva a hét napjainak elnevezései*/
        table.redCalendar tbody.bodyWeek { 
            padding: 0;
            margin: 0;
            background: linear-gradient(to bottom, #888, #444)

        }
        table.redCalendar tbody.bodyWeek tr {
            padding: 0;
            margin: 0;
            font-size: var(--fontsize);
            color: black;
        }
        table.redCalendar tbody.bodyWeek td {
            padding: 0;
            margin: 0;
            font-weight:bolder;
            box-sizing: border-box;
            height: var(--tdsize);
            width: var(--tdsize);
        }


        /* A táblázat két <tbody> elemet tartalmaz. A bodyDates részben van kiíratva a hónap napjai*/
        table.redCalendar tbody.bodyDates { 
            padding: 0;
            margin: 0;
            background: linear-gradient(to bottom, #aaa, #888)

        }
        table.redCalendar tbody.bodyDates tr {
            padding: 0;
            margin: 0;

        }
        table.redCalendar tbody.bodyDates td {
            padding: 0;
            margin: 0;
            cursor: pointer;
            box-sizing: border-box;
            font-size: var(--fontsize);
            height: var(--tdsize);
            width: var(--tdsize);
        }

        /*A hónap/év kiválasztó cellák beállításai*/
        table.redCalendar thead th.selector {
            vertical-align: middle;
            text-align: center;
        }

        /*A hónap kiválasztó stílusai*/
        table.redCalendar thead div.month-selector{
            position:relative; /*Ez által a gyermek elemei ennek a felső sarkát fogják kezdőpontnak venni (0,0)*/ 
            height: var(--thheight);
            user-select: none; /*Az ezen az elemen belül lévő szövegeket nem lehet dupplakattintással kijelölni (kék kijelölés)*/
            /*Ez fog felelni azért, hogy a cellában középre legyen igazítva*/
            display: inline-block; /*Ez által inline elemként fog rá tekinteni. Ez azért fontos, mert így a "text-align: center" utasítás hatni fog rá.*/
        }
        table.redCalendar thead div.month-selector-disp{
            display: flex; /*Ez által nem egymás alá rakja az elemeket, mint alapesetben, hanem flexibilisen megpróbálja kitölteni a rendelkezésre álló helyet. Ha elfér a sorban a másik elem, akkor mellé rakja és nem alá.*/
            justify-content: space-between; /*Megadjuk a "display: flex" szabályát. Ez megmondja, hogy próbálja meg a két elemet minél távolabb elhelyezni egymástól. Két elem esetén ez azt jelenti, hogy az egyiket bal szélre a másikat pedig jobb szélre igazítja.*/
            padding: 0 0 0 var(--thpad);
            background-color: #aaa;
            border: var(--border2) solid #000;
            border-radius: var(--selrad);
            width: var(--monthselw);
            height: calc(var(--thheight) - 2*var(--border2));
            font-size: var(--fontsize);
            align-items: center;
            cursor: pointer; /*Ha rávisszük az elemre az egeret, akkor az mutatóujjasá válik*/
            overflow: hidden; /*Az elemből kilógó elemeket eltűnteti. Ha van lekerekítése, akkor az azon kilógó elemeket is eltűnteti.*/
            vertical-align: middle;
        }
        table.redCalendar thead div.month-selector-list{
            position: absolute; /*Itt a korábban megadott "position: relative"-hez képest fogunk pozíciót megadni.*/
            top: 100%; /*Ha %-ban adjuk meg akkor a "position: relative"-hez képest vesszük %-ban a magasságát (top esetén). "top: 100%" esetén azt mondjuk, hogy tolja el a "position: relative" elem magasságával megegyező mértékben lefelé.*/
            left: 0; /*Ezzel a jobbra irányú eltolást adjuk meg. Mivel szeretnénk, hogy illeszkedjen a szülő elemhez, így 0-át adunk meg.*/
            right: 0; /*Ezzel is a szülő elmhez való illeszkedést adjuk meg, de másképpen működik. Amikor megadjuk, hogy "right:0", akkor az elemet arra kényszerítjük, hogy vegyen fel akkora szélességet mint a szülő elem. Ha bármi mást adunk meg, vagy nem írjuk ki, akkor elsőkörben a tartalma alapján határozza meg a szélességét.*/
            background-color: #aaa;
            border: var(--border2) solid #000;
            border-radius: var(--selrad);
            font-size: var(--fontsize);
            
            /*Ezzel érjük el, hogy legyen egy maximális mérete a legördülő listának és az görgethető legyen*/
            max-height: var(--monthlisth);
            overflow-y: auto; /*Görgetés engedélyezése, ha a tartalom kilóg*/

            display: none; /*Alapból eltüntetjük*/

            z-index: 100; /*Ezáltal minden elem főlé kerül, így mindenféleképpen látható lesz. !Ha létezik egy olyan elem, aminek nagyobb a z indexe és pont ennek az elemnek a helyén van akkor az fog látszódni és kitakarja ezt az elemet!*/
        }
        table.redCalendar thead div.month-selector-list.open{ /*Ha ez az elem megkapja pluszba az open class nevet, akkor ez a rész felülírja az alapbeállítását.*/
            display: block; /*Léthatóvá teszi*/
        }
        table.redCalendar thead div.month-selector-list ul{
            padding: 0;
            margin: 0;
            list-style-type:none;
            text-align: left;
        }
        table.redCalendar thead div.month-selector-list ul li.selected{
            background-color: #ff0;
        }
        table.redCalendar thead div.month-selector-list li:hover{
            /*Ha az egyik lista elem fölé visszük az egeret, akkor az legyen valamilyen formában kijelölve*/
            background-color: #777;
        }


        /*Az év kiválasztó stílusai*/
        table.redCalendar thead div.year-selector{
            user-select: none; /*Az ezen az elemen belül lévő szövegeket nem lehet dupplakattintással kijelölni (kék kijelölés)*/
            height: var(--thheight);
            /*Ez fog felelni azért, hogy a cellában középre legyen igazítva*/
            display: inline-block; /*Ez által inline elemként fog rá tekinteni. Ez azért fontos, mert így a "text-align: center" utasítás hatni fog rá.*/
        }
        table.redCalendar thead input.year-selector-disp{
            padding: 0;
            background-color: #aaa;
            border: var(--border2) solid #000;
            border-radius: var(--selrad);
            width: var(--yearselw);
            height: calc(var(--thheight) - 2*var(--border2));
            font-family: sans-serif;
            font-size: var(--fontsize);
            font-weight: bold;
            color: #000;
            text-align: center;
            
            /* Eltünteti a kattintáskor megjelenő alapértelmezett kék körvonalat */
            outline: none;
        }
        table.redCalendar thead input.year-selector-disp:focus{
            /*A stílusa, amikor rákattintanak erre az elemre*/
            background-color: #ccc;
        }
        /* A nyilak eltüntetése Chrome, Safari, Edge, Opera böngészőkben */
        table.redCalendar thead input.year-selector-disp::-webkit-outer-spin-button,
        table.redCalendar thead input.year-selector-disp::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        /* A nyilak eltüntetése Firefox böngészőben */
        table.redCalendar thead input.year-selector-disp {
            -moz-appearance: textfield;
        }


        /* Az egyedi stílust igénylő css-ek*/
        .redCalendar-today {
            box-shadow: inset 0 0 0 var(--border3) red;
        }
        .redCalendar-selected {
            background-color: #cc0;
        }
        .redCalendar-otherMonth {
            color: #444;
        }
        .redCalendar-weekendDay {
            color: #c00;
        }
        .redCalendar-weekendDay.redCalendar-otherMonth {
            color: #822;
        }
    `;
    static #tableHTML = `
        <table class="redCalendar">
            <thead>
                <tr>
                    <th class="table-title" colspan="7">
                        
                    </th>
                </tr>
                <tr>
                    <th class="selector" colspan="4">
                        <div class="month-selector">
                            <div class="month-selector-disp">
                                <span>...</span>
                                <svg widht="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>    
                            </div>
                            <div class="month-selector-list">
                                <ul>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="selector" colspan="3">
                        <div class="year-selector">
                            <input type="number" class="year-selector-disp" value="" min="1900" max="2100">
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody class="bodyWeek">
                <tr>
                </tr>
            </tbody>
            <tbody class="bodyDates">

            </tbody>
        </table>
    `;
    static #id_iterator = 1;

    static #cssAdded = false;

    #selected_date;
    #divCont;
    #monthSelDiv;
    #yearSelDisp;
    #tDateS;
    #tBodyDates;

    static #add_css(){
        if(!RedCalendar.#cssAdded){
            const calStyle = document.createElement("style");
            calStyle.innerHTML = RedCalendar.#cssStyleHTML;
            document.head.appendChild(calStyle);
            RedCalendar.#cssAdded = true;
        }
    }

    constructor(
        div, // A div tároló, amibe a naptár kerül.
        {
            title, // A naptár címe
            lang = "magyar", // A naptár nyelve
            monthNamesLength = "long",
            weekDayNamesLength = "short",
            id = null,
        })
    {
        this.#divCont = div;
        const divHeight = parseFloat(this.#divCont.style.height);
        const ratio = divHeight/300;
        this.#divCont.style.height = `${divHeight - 2*10*ratio}px`;

        // A css-hez tartozó méretek kiszámolása.
        this.#divCont.style.setProperty('--fontsize', `${15*ratio}px`);
        this.#divCont.style.setProperty('--border2', `${2*ratio}px`);
        this.#divCont.style.setProperty('--border3', `${3*ratio}px`);
        this.#divCont.style.setProperty('--divpad', `${10*ratio}px`);
        this.#divCont.style.setProperty('--tableradius', `${15*ratio}px`);
        this.#divCont.style.setProperty('--thpad', `${5*ratio}px`);
        this.#divCont.style.setProperty('--titlefont', `${20*ratio}px`);
        this.#divCont.style.setProperty('--thheight', `${25*ratio}px`);
        this.#divCont.style.setProperty('--tdsize', `${30*ratio}px`);
        this.#divCont.style.setProperty('--selrad', `${5*ratio}px`);
        this.#divCont.style.setProperty('--yearselw', `${66*ratio}px`);
        this.#divCont.style.setProperty('--monthselw', `${91*ratio}px`);
        this.#divCont.style.setProperty('--monthlisth', `${150*ratio}px`);

        // Beillesztjük a táblázat sablonunkat a kiszemelt divhez.
        this.#divCont.classList.add("redCalendar");
        this.#divCont.setAttribute("id", id || `redCalendar-${RedCalendar.#id_iterator}`); // Ha van megadott id név, akkor azt rakja bele, vagy ha nincs, akkor generál egyet.
        if(!id) RedCalendar.#id_iterator++; 
        this.#divCont.innerHTML = RedCalendar.#tableHTML;

        RedCalendar.#add_css();

        // Main nap legenerálása
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const todayO = this.#date_conv(today);

        this.#tDateS = todayO.string.string; 
        
        const thead = this.#divCont.querySelector("table thead");

        // A táblázat címének megadása
        const titleTh = thead.querySelector("tr th.table-title");
        titleTh.textContent = title || "";

        // A Hónap kiválasztó elem implementálása:
        this.#monthSelDiv = thead.querySelector("tr th div.month-selector");

        const monthSelDisp = this.#monthSelDiv.querySelector("div.month-selector-disp");
        const monthSelText = monthSelDisp.querySelector("span");

        const monthSelListDiv = this.#monthSelDiv.querySelector("div.month-selector-list");
        const monthSelList = this.#monthSelDiv.querySelector("ul");

        // A hónap lista feltöltése
        const fragUl = document.createDocumentFragment();
        for(const [i,month] of RedCalendar.#nameObj.monthNames[monthNamesLength].entries()){
            const monthName = month[lang];
            const li = document.createElement("li");
            li.dataset.value = i;
            li.textContent = monthName;
            if (todayO.num.month === i){
                li.classList.add("selected");
                monthSelText.textContent = monthName;
                this.#monthSelDiv.dataset.month = (i+1).toString().padStart(2,"0");
            }
            fragUl.appendChild(li);
        }
        monthSelList.appendChild(fragUl);

        // A dokumentumon vett kattintás figyelő.
        document.addEventListener("click", (event)=>{
            const clickInside = this.#monthSelDiv.contains(event.target);
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
            this.#monthSelDiv.dataset.month = (li.value+1).toString().padStart(2,"0");

            // Levesszük a selected class-t az előzőleg kiválasztott elemről.
            const prevSel = monthSelList.querySelector("ul li.selected"); 
            if(prevSel){
                prevSel.classList.remove("selected")
            }

            li.classList.add("selected");
            monthSelListDiv.classList.remove("open");
            this.#change_table();
        });

        // Az év kiválasztás implementációja
        const yearSelDiv = thead.querySelector("tr th div.year-selector");
        this.#yearSelDisp = yearSelDiv.querySelector("input.year-selector-disp");

        this.#yearSelDisp.value = todayO.num.year;

        this.#yearSelDisp.addEventListener("input", function (){
            // Ezzel csak számot és maximum 4-et fogad be a bemeneti mező.
            this.value = this.value.replace(/\D/g, '').slice(0,4);
        });
        // Amikor kilépünk belőle
        this.#yearSelDisp.addEventListener("blur", () => {
            this.#change_table();
        });

        // A hét napjainak legenerálása.
        const fragWeeks = document.createDocumentFragment();
        for(const wd of RedCalendar.#nameObj.weekdayNames[weekDayNamesLength]){
            const wdName = wd[lang];
            const td = document.createElement("td");
            td.textContent = wdName;
            fragWeeks.appendChild(td);
        }
        const tBodyWeekRow = this.#divCont.querySelector("tbody.bodyWeek tr");
        tBodyWeekRow.innerHTML = "";
        tBodyWeekRow.appendChild(fragWeeks);

        // A naptár napjainak legenerálása a hónap alapján.
        this.#tBodyDates = this.#divCont.querySelector("tbody.bodyDates");

        this.#fill_table(todayO.string.year,todayO.string.month);

        this.#tBodyDates.addEventListener("click", (event)=>{
            const td = event.target.closest("td");
            if(td){
                const monthSel = this.#monthSelDiv.dataset.month;
                const regex = /\d{1,4}-(\d{2})-\d{2}/
                const tdDate = td.dataset.date;
                this.#divCont.dataset.date = tdDate;
                this.#selected_date = tdDate;
                const res = tdDate.match(regex);
                if(res && res[1]){
                    const monthTd = res[1];
                    if(monthTd !== monthSel){
                        const tempDate = new Date(tdDate);
                        tempDate.setHours(0,0,0,0);
                        const tempDO = this.#date_conv(tempDate);
                        this.#fill_table(tempDO.string.year,tempDO.string.month,tempDO.string.string);
                        const prevSelMonth = monthSelList.querySelector("ul li.selected"); 
                        if(prevSelMonth){
                            prevSelMonth.classList.remove("selected")
                        }
                        const nextSelMonth = monthSelList.querySelector(`li[data-value="${tempDO.num.month}"]`);
                        nextSelMonth.classList.add("selected");
                        monthSelText.textContent = nextSelMonth.textContent;
                        this.#monthSelDiv.dataset.month = tempDO.string.month;
                        this.#yearSelDisp.value = tempDO.num.year;
                    }
                    else{
                        const prevSel = this.#tBodyDates.querySelector("td.redCalendar-selected");
                        if(prevSel) prevSel.classList.remove("redCalendar-selected");
                        td.classList.add("redCalendar-selected");
                    }
                }
            }
        });


    }

    get selDate(){
        return this.#selected_date;
    }

    #fill_table(year,month,selectedDate = null){
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
                const diO = this.#date_conv(dateIterator);
                
                const dateS = diO.string.string;
                tData.textContent = diO.num.date;

                tData.dataset.date = dateS;

                if (c > 4){ // Hétvégi nap
                    tData.classList.add("redCalendar-weekendDay");
                }
                if(currMonth !== diO.num.month){
                    tData.classList.add("redCalendar-otherMonth");
                }
                if(this.#tDateS === dateS){
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
        this.#tBodyDates.innerHTML = "";
        this.#tBodyDates.appendChild(fragDates);
    }

    #change_table(){
        const chMonth = this.#monthSelDiv.dataset.month;
        const chYear = this.#yearSelDisp.value;
        this.#fill_table(chYear,chMonth);
    }

    #date_conv(date_class){
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
