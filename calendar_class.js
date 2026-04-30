class RedCalendar {
    //Forrás 
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
            background: linear-gradient(to bottom, var(--cBackL), var(--cBackD));
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
            background: linear-gradient(to bottom, var(--cPrimL), var(--cPrimD));
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
            background: linear-gradient(to bottom, var(--cPrimL), var(--cPrimD))

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
            background: linear-gradient(to bottom, var(--cSecL), var(--cSecD))

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

    // Külső osztály behúzása
    static #ColorClass = class Color {
        // V.0.0216.6
        // Forrás: https://github.com/RedTheGreatWizard/JS-Color-class
        static #look_up = {
            "aliceblue" : "rgb(240, 248, 255)",
            "antiquewhite" : "rgb(250, 235, 215)",
            "aqua" : "rgb(0, 255, 255)",
            "aquamarine" : "rgb(127, 255, 212)",
            "azure" : "rgb(240, 255, 255)",
            "beige" : "rgb(245, 245, 220)",
            "bisque" : "rgb(255, 228, 196)",
            "black" : "rgb(0, 0, 0)",
            "blanchedalmond" : "rgb(255, 235, 205)",
            "blue" : "rgb(0, 0, 255)",
            "blueviolet" : "rgb(138, 43, 226)",
            "brown" : "rgb(165, 42, 42)",
            "burlywood" : "rgb(222, 184, 135)",
            "cadetblue" : "rgb(95, 158, 160)",
            "chartreuse" : "rgb(127, 255, 0)",
            "chocolate" : "rgb(210, 105, 30)",
            "coral" : "rgb(255, 127, 80)",
            "cornflowerblue" : "rgb(100, 149, 237)",
            "cornsilk" : "rgb(255, 248, 220)",
            "crimson" : "rgb(220, 20, 60)",
            "cyan" : "rgb(0, 255, 255)",
            "darkblue" : "rgb(0, 0, 139)",
            "darkcyan" : "rgb(0, 139, 139)",
            "darkgoldenrod" : "rgb(184, 134, 11)",
            "darkgray" : "rgb(169, 169, 169)",
            "darkgreen" : "rgb(0, 100, 0)",
            "darkgrey" : "rgb(169, 169, 169)",
            "darkkhaki" : "rgb(189, 183, 107)",
            "darkmagenta" : "rgb(139, 0, 139)",
            "darkolivegreen" : "rgb(85, 107, 47)",
            "darkorange" : "rgb(255, 140, 0)",
            "darkorchid" : "rgb(153, 50, 204)",
            "darkred" : "rgb(139, 0, 0)",
            "darksalmon" : "rgb(233, 150, 122)",
            "darkseagreen" : "rgb(143, 188, 143)",
            "darkslateblue" : "rgb(72, 61, 139)",
            "darkslategray" : "rgb(47, 79, 79)",
            "darkslategrey" : "rgb(47, 79, 79)",
            "darkturquoise" : "rgb(0, 206, 209)",
            "darkviolet" : "rgb(148, 0, 211)",
            "deeppink" : "rgb(255, 20, 147)",
            "deepskyblue" : "rgb(0, 191, 255)",
            "dimgray" : "rgb(105, 105, 105)",
            "dimgrey" : "rgb(105, 105, 105)",
            "dodgerblue" : "rgb(30, 144, 255)",
            "firebrick" : "rgb(178, 34, 34)",
            "floralwhite" : "rgb(255, 250, 240)",
            "forestgreen" : "rgb(34, 139, 34)",
            "fuchsia" : "rgb(255, 0, 255)",
            "gainsboro" : "rgb(220, 220, 220)",
            "ghostwhite" : "rgb(248, 248, 255)",
            "gold" : "rgb(255, 215, 0)",
            "goldenrod" : "rgb(218, 165, 32)",
            "gray" : "rgb(128, 128, 128)",
            "green" : "rgb(0, 128, 0)",
            "greenyellow" : "rgb(173, 255, 47)",
            "grey" : "rgb(128, 128, 128)",
            "honeydew" : "rgb(240, 255, 240)",
            "hotpink" : "rgb(255, 105, 180)",
            "indianred" : "rgb(205, 92, 92)",
            "indigo" : "rgb(75, 0, 130)",
            "ivory" : "rgb(255, 255, 240)",
            "khaki" : "rgb(240, 230, 140)",
            "lavender" : "rgb(230, 230, 250)",
            "lavenderblush" : "rgb(255, 240, 245)",
            "lawngreen" : "rgb(124, 252, 0)",
            "lemonchiffon" : "rgb(255, 250, 205)",
            "lightblue" : "rgb(173, 216, 230)",
            "lightcoral" : "rgb(240, 128, 128)",
            "lightcyan" : "rgb(224, 255, 255)",
            "lightgoldenrodyellow" : "rgb(250, 250, 210)",
            "lightgray" : "rgb(211, 211, 211)",
            "lightgreen" : "rgb(144, 238, 144)",
            "lightgrey" : "rgb(211, 211, 211)",
            "lightpink" : "rgb(255, 182, 193)",
            "lightsalmon" : "rgb(255, 160, 122)",
            "lightseagreen" : "rgb(32, 178, 170)",
            "lightskyblue" : "rgb(135, 206, 250)",
            "lightslategray" : "rgb(119, 136, 153)",
            "lightslategrey" : "rgb(119, 136, 153)",
            "lightsteelblue" : "rgb(176, 196, 222)",
            "lightyellow" : "rgb(255, 255, 224)",
            "lime" : "rgb(0, 255, 0)",
            "limegreen" : "rgb(50, 205, 50)",
            "linen" : "rgb(250, 240, 230)",
            "magenta" : "rgb(255, 0, 255)",
            "maroon" : "rgb(128, 0, 0)",
            "mediumaquamarine" : "rgb(102, 205, 170)",
            "mediumblue" : "rgb(0, 0, 205)",
            "mediumorchid" : "rgb(186, 85, 211)",
            "mediumpurple" : "rgb(147, 112, 219)",
            "mediumseagreen" : "rgb(60, 179, 113)",
            "mediumslateblue" : "rgb(123, 104, 238)",
            "mediumspringgreen" : "rgb(0, 250, 154)",
            "mediumturquoise" : "rgb(72, 209, 204)",
            "mediumvioletred" : "rgb(199, 21, 133)",
            "midnightblue" : "rgb(25, 25, 112)",
            "mintcream" : "rgb(245, 255, 250)",
            "mistyrose" : "rgb(255, 228, 225)",
            "moccasin" : "rgb(255, 228, 181)",
            "navajowhite" : "rgb(255, 222, 173)",
            "navy" : "rgb(0, 0, 128)",
            "oldlace" : "rgb(253, 245, 230)",
            "olive" : "rgb(128, 128, 0)",
            "olivedrab" : "rgb(107, 142, 35)",
            "orange" : "rgb(255, 165, 0)",
            "orangered" : "rgb(255, 69, 0)",
            "orchid" : "rgb(218, 112, 214)",
            "palegoldenrod" : "rgb(238, 232, 170)",
            "palegreen" : "rgb(152, 251, 152)",
            "paleturquoise" : "rgb(175, 238, 238)",
            "palevioletred" : "rgb(219, 112, 147)",
            "papayawhip" : "rgb(255, 239, 213)",
            "peachpuff" : "rgb(255, 218, 185)",
            "peru" : "rgb(205, 133, 63)",
            "pink" : "rgb(255, 192, 203)",
            "plum" : "rgb(221, 160, 221)",
            "powderblue" : "rgb(176, 224, 230)",
            "purple" : "rgb(128, 0, 128)",
            "rebeccapurple" : "rgb(102, 51, 153)",
            "red" : "rgb(255, 0, 0)",
            "rosybrown" : "rgb(188, 143, 143)",
            "royalblue" : "rgb(65, 105, 225)",
            "saddlebrown" : "rgb(139, 69, 19)",
            "salmon" : "rgb(250, 128, 114)",
            "sandybrown" : "rgb(244, 164, 96)",
            "seagreen" : "rgb(46, 139, 87)",
            "seashell" : "rgb(255, 245, 238)",
            "sienna" : "rgb(160, 82, 45)",
            "silver" : "rgb(192, 192, 192)",
            "skyblue" : "rgb(135, 206, 235)",
            "slateblue" : "rgb(106, 90, 205)",
            "slategray" : "rgb(112, 128, 144)",
            "slategrey" : "rgb(112, 128, 144)",
            "snow" : "rgb(255, 250, 250)",
            "springgreen" : "rgb(0, 255, 127)",
            "steelblue" : "rgb(70, 130, 180)",
            "tan" : "rgb(210, 180, 140)",
            "teal" : "rgb(0, 128, 128)",
            "thistle" : "rgb(216, 191, 216)",
            "tomato" : "rgb(255, 99, 71)",
            "turquoise" : "rgb(64, 224, 208)",
            "violet" : "rgb(238, 130, 238)",
            "wheat" : "rgb(245, 222, 179)",
            "white" : "rgb(255, 255, 255)",
            "whitesmoke" : "rgb(245, 245, 245)",
            "yellow" : "rgb(255, 255, 0)",
            "yellowgreen" : "rgb(154, 205, 50)"
        }

        // Színkódok
        #colors = {
            hue: 0,
            saturation: 0,
            lightness: 0,
            red: 0,
            green: 0,
            blue: 0,
        }

        #type_lu = {
            red: "rgb",
            green: "rgb",
            blue: "rgb",

            hue: "hue",
            saturation: "sl",
            lightness: "sl",
        }

        constructor(color_code){
            
            const picked_color = Color.#look_up[color_code];
            if (picked_color){color_code = picked_color};

            color_code = color_code.replace(/\s/g,"").toLowerCase();
            const regex = /^(rgb|hsl|#)(.*)/;
            const result = color_code.match(regex);
            if (result){
                if (result[1] === "hsl"){ 
                    const hslreg = /^\(([\d\.]+),?([\d\.]+)(%?),?([\d\.]+)(%?)\)/;
                    const hslres = result[2].match(hslreg);
                    if (hslres){
                        this.#colors.hue = this.#normalizer(hslres[1], "hue");
                        this.#colors.saturation = this.#normalizer(hslres[2], "sl", hslres[3]);
                        this.#colors.lightness = this.#normalizer(hslres[4], "sl", hslres[5]);

                        this.#hsl2rgb();
                    }
                }
                else if (result[1] === "rgb"){
                    const rgbreg = /^\(([\d\.]+)(%?),?([\d\.]+)(%?),?([\d\.]+)(%?)\)/;
                    const rgbres = result[2].match(rgbreg);
                    if (rgbres){
                        this.#colors.red =  this.#normalizer(rgbres[1], "rgb", (rgbres[2] === "%"));
                        this.#colors.green =  this.#normalizer(rgbres[3], "rgb", (rgbres[4] === "%"));
                        this.#colors.blue =  this.#normalizer(rgbres[5], "rgb", (rgbres[6] === "%"));

                        this.#rgb2hsl();
                    }
                    
                }
                else if (result[1] === "#"){
                    const hexreg = /^([a-z0-9]{3}|[a-z0-9]{6})/;
                    const hexres = result[2].match(hexreg);
                    if (hexres[1].length === 3){
                        const hex3 = hexres[1];
                        this.#colors.red = Math.round(parseInt(hex3[0],16)/15*255);
                        this.#colors.green = Math.round(parseInt(hex3[1],16)/15*255);
                        this.#colors.blue = Math.round(parseInt(hex3[2],16)/15*255);
                    }
                    else if (hexres[1].length === 6){
                        const hex6 = hexres[1];
                        this.#colors.red = Math.round(parseInt(hex6.slice(0,2), 16));
                        this.#colors.green = Math.round(parseInt(hex6.slice(2,4), 16));
                        this.#colors.blue = Math.round(parseInt(hex6.slice(4,6), 16));
                    }
                    this.#rgb2hsl();
                }
                this.valid = true;
            }
            else{
                this.valid = false;
            }
        }

        get hsl(){
            return `hsl(${this.#colors.hue},${this.#colors.saturation*100}%,${this.#colors.lightness*100}%)`;
        }

        get rgb(){
            return `rgb(${this.#colors.red},${this.#colors.green},${this.#colors.blue})`;
        }

        get hex(){
            const r = this.#colors.red.toString(16).padStart(2, '0');
            const g = this.#colors.green.toString(16).padStart(2, '0');
            const b = this.#colors.blue.toString(16).padStart(2, '0');

            return `#${r}${g}${b}`;
        }

        get hue(){
            return{
                change: (ammount) => {this.#change("hue", ammount, 'change'); return this;},
                increase: (ammount) => {this.#change("hue", ammount, 'inc'); return this;},
                decrease: (ammount) => {this.#change("hue", ammount, 'dec'); return this;},
                get: this.#colors.hue, 
            }
        }

        get saturation(){
            return{
                change: (ammount) => {this.#change("saturation", ammount, 'change'); return this;},
                increase: (ammount) => {this.#change("saturation", ammount, 'inc'); return this;},
                decrease: (ammount) => {this.#change("saturation", ammount, 'dec'); return this;},
                get: this.#colors.saturation, 
            }
        }

        get lightness(){
            return{
                change: (ammount) => {this.#change("lightness", ammount, 'change'); return this;},
                increase: (ammount) => {this.#change("lightness", ammount, 'inc'); return this;},
                decrease: (ammount) => {this.#change("lightness", ammount, 'dec'); return this;},
                get: this.#colors.lightness, 
            }
        }

        get red(){
            return{
                change: (ammount) => {this.#change("red", ammount, 'change'); return this;},
                increase: (ammount) => {this.#change("red", ammount, 'inc'); return this;},
                decrease: (ammount) => {this.#change("red", ammount, 'dec'); return this;},
                get: this.#colors.red, 
            }
        }

        get green(){
            return{
                change: (ammount) => {this.#change("green", ammount, 'change'); return this;},
                increase: (ammount) => {this.#change("green", ammount, 'inc'); return this;},
                decrease: (ammount) => {this.#change("green", ammount, 'dec'); return this;},
                get: this.#colors.green, 
            }
        }

        get blue(){
            return{
                change: (ammount) => {this.#change("blue", ammount, 'change'); return this;},
                increase: (ammount) => {this.#change("blue", ammount, 'inc'); return this;},
                decrease: (ammount) => {this.#change("blue", ammount, 'dec'); return this;},
                get: this.#colors.blue, 
            }
        }

        #change(type, val, operation){
            const valS = val.toString();
            const valreg = /^(\d+\.?\d*|\.\d+)(%?)$/;
            const res = valS.match(valreg);

            const typeN = this.#type_lu[type];
            if(res){
                let resV = parseFloat(res[1]);
                const perc = ("%" === res[2]);
                const NV = this.#normalizer(resV, typeN, perc);
                const CV = this.#colors[type];
                switch (operation){
                    case "change":
                        this.#colors[type] = NV;
                        break;
                        
                    case "inc":                    
                        this.#colors[type] = this.#normalizer((CV + NV), typeN);
                        break;
                        
                    case "dec":
                        this.#colors[type] = this.#normalizer((CV - NV), typeN);
                        break;
                }
                if (type === "hue" ||
                    type === "saturation" ||
                    type === "lightness" )
                {
                    this.#hsl2rgb();
                }
                else if(type === "red" ||
                        type === "green" ||
                        type === "blue")
                {
                    this.#rgb2hsl();
                }
            }
        }

        #hsl2rgb(){
            const H = this.#colors.hue % 360;
            const S = this.#colors.saturation;
            const L = this.#colors.lightness;

            const C = (1 - Math.abs(2*L - 1)) * S;

            const X = C * (1 - Math.abs((H/60)%2 - 1));

            let r = 0,g = 0,b = 0;

            if (0 <= H && H < 60){
                r = C;
                g = X;
                b = 0;
            }
            else if (60 <= H && H < 120){
                r = X;
                g = C;
                b = 0;
            }
            else if (120 <= H && H < 180){
                r = 0;
                g = C;
                b = X;
            }
            else if (180 <= H && H < 240){
                r = 0;
                g = X;
                b = C;
            }
            else if (240 <= H && H < 300){ 
                r = X;
                g = 0;
                b = C;
            }
            else if (300 <= H && H < 360){  
                r = C;
                g = 0;
                b = X;  
            }

            const M = L - (C/2);
            
            this.#colors.red = Math.round((r + M) * 255);
            this.#colors.green = Math.round((g + M) * 255);
            this.#colors.blue = Math.round((b + M) * 255);
        }

        #rgb2hsl(){
            const R = this.#colors.red / 255;
            const G = this.#colors.green / 255;
            const B = this.#colors.blue / 255;

            const min = Math.min(R, G, B);
            const max = Math.max(R, G, B);
            const delta = max - min;

            let H = 0;
            let S = 0;
            let L = (max + min) / 2;

            if (delta !== 0){
                S = delta / (1 - Math.abs(2*L - 1));

                switch(max){
                    case R:
                        H = ((G - B) / delta) % 6;
                        break;
                    case G:
                        H = ((B - R) / delta) + 2;
                        break;
                    case B:
                        H = ((R - G) / delta) + 4;
                        break;
                }

                H = Math.round(H * 60);

                if (H < 0){ H += 360};
            }

            this.#colors.hue = H;
            this.#colors.saturation = S;
            this.#colors.lightness = L;
        }

        #normalizer(input, type, perc = false){
            let val = parseFloat(input);
            if (val < 0) {val = 0};
            switch (type){
                case "hue":
                    return Math.min(val, 360);
                case "sl":
                    if(perc){
                        let slV = Math.min(val, 100);
                        slV /= 100;
                        return slV;
                    }
                    else{
                        return Math.min(val, 1);
                    }
                case "rgb":
                    if(perc){
                        let V = Math.min(val, 100);
                        V /= 100;
                        let rgbV = Math.round(V * 255);
                        return rgbV;
                    }
                    else{
                        return Math.min(val, 255);
                    }

            }
        }
    };

    static #add_css(){
        if(!RedCalendar.#cssAdded){
            const calStyle = document.createElement("style");
            calStyle.innerHTML = RedCalendar.#cssStyleHTML;
            document.head.appendChild(calStyle);
            RedCalendar.#cssAdded = true;
        }
    };

    constructor(
        div, // A div tároló, amibe a naptár kerül.
        {
            title, // A naptár címe
            lang = "magyar", // A naptár nyelve
            monthNamesLength = "long",
            weekDayNamesLength = "short",
            id = null,
            colorPrimary = "hsl(0, 0%, 53%)",
            colorSecondary = "hsl(0, 0%, 67%)",
            colorBack = "hsl(0, 0%, 60%)",
        })
    {
        this.#divCont = div;
        const divHeight = parseFloat(this.#divCont.style.height);
        const ratio = divHeight/300;
        this.#divCont.style.height = `${divHeight - 2*10*ratio}px`;

        function styleSetProperty(element, properties){
            for(const [propertyName, value] of Object.entries(properties)){
                element.style.setProperty(`--${propertyName}`, value);
            };
        };

        // A fő színek generálása
        const colors = {};
        (()=>{
            const cP = new RedCalendar.#ColorClass(colorPrimary);
            const cS = new RedCalendar.#ColorClass(colorSecondary);
            const cB = new RedCalendar.#ColorClass(colorBack);

            colors.primary = {light: cP.hsl, dark: cP.lightness.decrease("30%").hsl};
            colors.secondary = {light: cS.hsl, dark: cS.lightness.decrease("15%").hsl};
            colors.back = {light: cB.hsl, dark: cB.lightness.decrease("15%").hsl};
        })();

        // A css-hez tartozó méretek kiszámolása.
        styleSetProperty(this.#divCont, {
            //Ezek lesznek a méreteket adó tulajdonságok
            fontsize: `${15*ratio}px`,
            border2: `${2*ratio}px`,
            border3: `${3*ratio}px`,
            divpad: `${10*ratio}px`,
            tableradius: `${15*ratio}px`,
            thpad: `${5*ratio}px`,
            titlefont: `${20*ratio}px`,
            thheight: `${25*ratio}px`,
            tdsize: `${30*ratio}px`,
            selrad: `${5*ratio}px`,
            yearselw: `${66*ratio}px`,
            monthselw: `${91*ratio}px`,
            monthlisth: `${150*ratio}px`,
            // Itt a stílust lesz megadva.
            cPrimL: colors.primary.light,
            cPrimD: colors.primary.dark,
            cSecL: colors.secondary.light,
            cSecD: colors.secondary.dark,
            cBackL: colors.back.light,
            cBackD: colors.back.dark,
        });

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


    };

    get selDate(){
        return this.#selected_date;
    };

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
    };

    #change_table(){
        const chMonth = this.#monthSelDiv.dataset.month;
        const chYear = this.#yearSelDisp.value;
        this.#fill_table(chYear,chMonth);
    };

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
    };
};
