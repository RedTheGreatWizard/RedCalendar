/**
 * Ez a rész végig megy a létrehozott kalendárokon és implementálja a hónap/év kiválasztó funkcióit.
 * Egyszer kell csak meghívni.
 */
const tbldivS = document.querySelectorAll("div.redCalendar");
for (const tbldiv of tbldivS){
    const thead = tbldiv.querySelector("table thead");

    // A Hónap kiválasztó elem implementálása:
    const monthSelDiv = thead.querySelector("tr th div.month-selector");

    const monthSelDisp = monthSelDiv.querySelector("div.month-selector-disp");
    const monthSelText = monthSelDisp.querySelector("span");

    const monthSelListDiv = monthSelDiv.querySelector("div.month-selector-list");
    const monthSelList = monthSelDiv.querySelector("ul");

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

        // Levesszük a selected class-t az előzőleg kiválasztott elemről.
        const prevSel = monthSelList.querySelector("ul li.selected"); 
        if(prevSel){
            prevSel.classList.remove("selected")
        }

        li.classList.add("selected");
        monthSelListDiv.classList.remove("open");
    });

    // Az év kiválasztás implementációja
    const yearSelDiv = thead.querySelector("tr th div.year-selector");
    const yearSelDisp = yearSelDiv.querySelector("input.year-selector-disp");

    yearSelDisp.addEventListener("input", function (){
        // Ezzel csak számot és maximum 4-et fogad be a bemeneti mező.
        this.value = this.value.replace(/\D/g, '').slice(0,4);
    });
}


