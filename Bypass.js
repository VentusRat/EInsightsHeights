// Slightly Messy 0_0

var divs = document.getElementsByTagName("div");
var cancelRedirect = false;
var filterButtons;
var CUButton;
var CFButton;
var SFButton;
var AButton;
var BButton;
var CButton;
var all = false;


function UnHideAllDiff() {
    for (i=0; i<divs.length; i++) {
        if (divs[i].id.includes("question_")) {
            divs[i].removeAttribute("hidden");
        }
    }
}


function changeApplyButton() {
    for(i=0;i<divs.length; i++){
        var children = divs[i].children;
        for (a=0;a<children.length; a++){
            if (children[a].tagName == "BUTTON") {
                if (children[a].getAttribute("value")=="filter") {
                    children[a].remove();
                    var newButton = document.createElement("label");
                    newButton.setAttribute("class", "fs-xs px-4 rounded-1 bg-primary-muted filter-btn text-center my-1");
                    newButton.setAttribute("for","Application");
                    newButton.innerHTML = "Apply";
                    divs[i].appendChild(newButton);
                    newButton.addEventListener("click", onFilterClick);

                }
            }
        }
    }
}

function getFilterButtons() {
    filterButtons = document.getElementsByTagName("label");
    all = false;
    for (a=0;a<filterButtons.length;a++) {
        switch(filterButtons[a].getAttribute('for')){
            case("ComplexUnfamiliar"):
                if (filterButtons[a].getAttribute("class").includes("bg-primary-muted")) {
                    CUButton = true;
                    console.log("CUBUTTON ACTIVE");
                } else {
                    CUButton = false;
                    console.log("CUBUTTON NOT ACTIVE");
                }
                break;
            case("ComplexFamiliar"):
                if (filterButtons[a].getAttribute("class").includes("bg-primary-muted")) {
                    CFButton = true;
                } else {
                    CFButton = false;
                }
                break;
            case("SimpleFamiliar"):
                if (filterButtons[a].getAttribute("class").includes("bg-primary-muted")) {
                    SFButton = true;
                } else {
                    SFButton = false;
                }
                break;
            case("difficultyAll"):
                if (filterButtons[a].getAttribute("class").includes("bg-primary-muted")) {
                    all=true
                }
                break;
        }
        if (all) {
            CUButton = true;
            CFButton = true;
            SFButton = true;
        }
    }
}

function onFilterClick() {
    cancelRedirect = true;
    console.log("Apply Button Pressed!");
    getFilterButtons();
    FilterDifficulty(CUButton,CFButton,SFButton);
    actuallyFilterABCNow(AButton,BButton,CButton);
}

function FilterDifficulty(CU, CF, SF) {
    for (i=0; i<divs.length; i++) {
        if (divs[i].id.includes("question_")) {
            a = divs[i].getAttribute("data-difficulty");
            if (a) {
                switch(a) {
                    case("Simple Familiar"):
                        if (SF == false) {
                            divs[i].setAttribute("hidden",true);
                        } else {
                            divs[i].removeAttribute("hidden");
                        }
                        break;
                    case("Complex Familiar"):
                        if (CF == false){
                            divs[i].setAttribute("hidden", true);
                        } else {
                            divs[i].removeAttribute("hidden");
                        }
                        break;
                    case("Complex Unfamiliar"):
                        if (CU == false) {
                            divs[i].setAttribute("hidden", true);
                        } else {
                            divs[i].removeAttribute("hidden");
                        }
                        break;
                }
            }
        }
    }
}

function removeAllPricingRedirects() {
    var as11 = document.getElementsByTagName("a");
    for (i=0;i<as11.length;i++) {
        if (as11[i].getAttribute("href") == "/pricing/"){
            as11[i].removeAttribute("href");
        }
    }
}

function FilterDifficultyABC(){
    var updDivs = [];
    for(i=0; i<divs.length; i++){
        if(divs[i].id.includes("question_")) {
            a = divs[i].getAttribute("data-difficulty");
                if (a) {
                    updDivs.push(divs[i]);
                }
        }
    }
    for (i=0;i<updDivs.length;i++) {
        var descendants = updDivs[i].querySelectorAll("*");
        for (a=0;a<descendants.length;a++) {
            if (descendants[a].tagName=="SPAN") {
                if (descendants[a].innerHTML == "lock") {
                    descendants[a].remove();
                }
            }
            diffic = updDivs[i].getAttribute("data-difficulty");

            if (descendants[a].tagName=="A") {
                if (descendants[a].parentElement.getAttribute("class") == "pb-1") {
                    descendants[a].parentElement.innerHTML = "Difficulty: "+diffic;
                    descendants[a].remove();
                }
            }
//<div class="progress-bar bg-danger" role="progressbar" style="width: 85%; border-radius: 0.25rem;" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
            if (descendants[a].getAttribute("class")) {

            
                if (descendants[a].getAttribute("class").includes("progress-bar bg-dark")) {
                    var parent = descendants[a].parentElement;
                    descendants[a].remove();
                    var newProgressBar = document.createElement("div");
                    switch(diffic) {
                        case("C"):
                            console.log("Should've created a new progress bar for C");
                            newProgressBar.setAttribute("class","progress-bar");
                            newProgressBar.setAttribute("style","width: 25%; border-radius: 0.25rem;");
                            newProgressBar.setAttribute("aria-valuenow","25");
                            break;
                        case("B"):
                            newProgressBar.setAttribute("class","progress-bar bg-warning");
                            newProgressBar.setAttribute("style","width: 55%; border-radius: 0.25rem;");
                            newProgressBar.setAttribute("aria-valuenow","55");
                            break;
                        case("A"):
                            newProgressBar.setAttribute("class","progress-bar bg-danger");
                            newProgressBar.setAttribute("style","width: 85%; border-radius: 0.25rem;");
                            newProgressBar.setAttribute("aria-valuenow","85");
                            break;
                        case("Complex Unfamiliar"):
                            newProgressBar.setAttribute("class","progress-bar bg-danger");
                            newProgressBar.setAttribute("style","width: 85%; border-radius: 0.25rem;");
                            newProgressBar.setAttribute("aria-valuenow","85");
                            break;
                        case("Complex Familiar"):
                            newProgressBar.setAttribute("class","progress-bar bg-warning");
                            newProgressBar.setAttribute("style","width: 55%; border-radius: 0.25rem;");
                            newProgressBar.setAttribute("aria-valuenow","55");
                            break;
                        case("Simple Familiar"):
                            console.log("Should've created a new progress bar for C");
                            newProgressBar.setAttribute("class","progress-bar");
                            newProgressBar.setAttribute("style","width: 25%; border-radius: 0.25rem;");
                            newProgressBar.setAttribute("aria-valuenow","25");
                            ;
                            
                            break;
                    }
                    newProgressBar.setAttribute("role","progressbar");
                    newProgressBar.setAttribute("aria-valuemin","0");
                    newProgressBar.setAttribute("aria-valuemax","100")
                    parent.appendChild(newProgressBar);
                    
                }
            }  
        }
    }

}

function actuallyFilterABCNow(A,B,C) {
    filterButtons = document.getElementsByTagName("label");
    all = false;
    for (a=0;a<filterButtons.length;a++) {
        switch(filterButtons[a].getAttribute('for')){
            case("A"):
                if (filterButtons[a].getAttribute("class").includes("bg-primary-muted")) {
                    AButton = true;
                } else {
                    AButton = false;
                }
                break;
            case("B"):
                if (filterButtons[a].getAttribute("class").includes("bg-primary-muted")) {
                    BButton = true;
                } else {
                    BButton = false;
                }
                break;
            case("C"):
                if (filterButtons[a].getAttribute("class").includes("bg-primary-muted")) {
                    CButton = true;
                } else {
                    CButton = false;
                }
                break;
            case("difficultyAll"):
                if (filterButtons[a].getAttribute("class").includes("bg-primary-muted")) {
                    all=true
                }
                break;
        }
        if (all) { 
            AButton = true;
            BButton = true;
            CButton = true;
        }
    }
    for (i=0; i<divs.length; i++) {
        if (divs[i].id.includes("question_")) {
            a = divs[i].getAttribute("data-difficulty");
            if (a) {
                switch(a) {
                    case("C"):
                        if (C == false) {
                            divs[i].setAttribute("hidden",true);
                        } else {
                            divs[i].removeAttribute("hidden");
                        }
                        break;
                    case("B"):
                        if (B == false){
                            divs[i].setAttribute("hidden", true);
                        } else {
                            divs[i].removeAttribute("hidden");
                        }
                        break;
                    case("A"):
                        if (A == false) {
                            divs[i].setAttribute("hidden", true);
                        } else {
                            divs[i].removeAttribute("hidden");
                        }
                        break;
                }
            }
        }
    }
}

function unblurDifficulty() {
    for (i=0;i<divs.length;i++) {
        if (divs[i].getAttribute("class")) {
            if (divs[i].getAttribute("class").includes("filters-tab-pane") && divs[i].getAttribute("id")=="Difficulty") {
                console.log("Found difficulty filter pane.");
                var descendants = divs[i].querySelectorAll("*");
                for (a=0;a<descendants.length;a++) {
                    if (descendants[a].getAttribute("class")=="opacity-50") {
                        descendants[a].setAttribute("class","");
                        descendants[a].setAttribute("style","");
                    }
                }
            }
        }
    }
}

changeApplyButton();
FilterDifficultyABC();
removeAllPricingRedirects();
unblurDifficulty();
