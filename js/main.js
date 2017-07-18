var reserved = [];
res = {
    available: true,
    hours:
    [ 
        {
            startHour: "1500",         //TODO: database structure???
            endHour: "2030"
        },
        {
            startHour: "2130",
            endHour: "2300"
        }
    ]
}
for(let i = 0; i < 14; i++) {
    reserved.push(res);
}

$(function () {                  //TODO:
                                 //add logic for handling hours in multiple tables reservationDetails and adding tables to the summary
                                 //message on submit
                                 //post - data will be re-submitted (the browser should alert the user that the data are about to be re-submitted)
                                 //https://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
                                 //http://api.jquery.com/jQuery.ajax/
                                 //walidacja posta (musi być wybrany przedział czasowy, a nie jedna godzina)

    var IE = ((navigator.appName == 'Microsoft Internet Explorer'
        ||  !!(navigator.userAgent.match(/Trident/)
        || navigator.userAgent.match(/rv:11/))
        || (typeof $.browser !== "undefined" && $.browser.msie == 1)) ? true : false) //check if IE (add Edge support)

    $('#map, #people, #hours, #summary').addClass('disabled');

    /*===============================================================
    CALENDAR
    ===============================================================*/
    $('#datepicker').datepicker({
        minDate: 0,
        maxDate: '+2m',
        showOtherMonths: true,
        firstDay: 1,
        dayNamesMin: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
        monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
        onSelect: function () {
            var selected = $(this).val();
            $(".date, .sum4").html(showDayName(selected));
            $('#people').removeClass('disabled');
            $("#numP").val("");
            $('#map, #hours, #summary').addClass('disabled');
            $(".sum1").html("");
            resetHours();
            resetTables();
        }
    });
    /*===============================================================
    CONVERSION TO DAY AND MONTH
    ===============================================================*/
    var today = new Date();

    function showDayName(selectedDate) {
        var date = new Date(selectedDate);
        var dayName = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        var monthName = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];

        var changedDate = dayName[date.getDay()] + ", " + date.getDate() + " " + monthName[date.getMonth()];
        return changedDate;
    }
    $(".date").html(showDayName(today));

    /*===============================================================
    TABLE RESERVATION
    ===============================================================*/
    var tableList = document.querySelectorAll("#map li");

    $("#numP").on('input', function (event) {
        var numPeopleElement = document.getElementById("numP"),
            numPeople = Number(numPeopleElement.value);
            resetHours();
            $("#hours").addClass("disabled");
            resetTables();
        if (numPeople >= 2 && numPeople <= 20) {
            $(".sum1").html(numPeople);
            $('#map').removeClass('disabled');
            showAvailableTables(numPeople);
            document.getElementById("errNum").innerHTML = numPeopleElement.validationMessage;
        } else if (numPeople < 2) {
            document.getElementById("errNum").innerHTML = numPeopleElement.validationMessage;
            $('#map').addClass('disabled');
        } else if (numPeople > 20) {
            document.getElementById("errNum").innerHTML = numPeopleElement.validationMessage;
            $('#map').addClass('disabled');
        }
    });

    $("#numP").on('keydown', function(event) {
        var e = event || window.event;
        if((e.keyCode ? e.keyCode : e.which) === 13) {
            e.preventDefault();
        }
    });

    for (let i = 0; i < tableList.length; i++) {
        tableList[i].addEventListener("click", function() {
            console.log(this);
            resetHours();
            markSelectedTable(this);
            if(this.classList.contains("selected"))
                getReservedHours($(this).index());
        }, false);
    }

    function showAvailableTables(num) {
        //console.log(tableList);
        switch (num) {
            case 2:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                showAvailability(tableList[5]); //table6
                break;
            case 3:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                showAvailability(tableList[7]); //table8
                showAvailability(tableList[9]); //table10
                break;
            case 4:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                showAvailability(tableList[6]); //table7
                showAvailability(tableList[7]); //table8
                showAvailability(tableList[9]); //table10
                break;
            case 5:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                showAvailability(tableList[0]); //table1
                showAvailability(tableList[1]); //table2
                showAvailability(tableList[4]); //table5
                showAvailability(tableList[6]); //table7
                showAvailability(tableList[8]); //table9
                break;
            case 6:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                showAvailability(tableList[0]); //table1
                showAvailability(tableList[1]); //table2
                showAvailability(tableList[4]); //table5
                showAvailability(tableList[8]); //table9
                break;
            case 7:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[7], tableList[9]);
                showAvailability(tableList[12]); //table13
                showAvailability(tableList[13]); //table14
                break;
            case 8:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[7], tableList[9]);
                showAvailability(tableList[2]); //table3
                showAvailability(tableList[3]); //table4
                showAvailability(tableList[10]); //table11
                showAvailability(tableList[11]); //table12
                showAvailability(tableList[13]); //table14
                break;
            case 9:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                showAvailability(tableList[10]); //table11
                showAvailability(tableList[11]); //table12
                break;
            case 10:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[6], tableList[8]);
                showAvailability(tableList[10]); //table11
                showAvailability(tableList[11]); //table12
                break;
            case 11:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[6], tableList[8]);
                break;
            case 12:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[0], tableList[1]);
                break;
            case 13:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[0], tableList[1]);
                break;
            case 14:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[0], tableList[1]);
                break;
            case 15:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[0], tableList[1]);
                break;
            case 16:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[12], tableList[13]);
                break;
            case 17:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[12], tableList[13]);
                break;
            case 18:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[12], tableList[13]);
                break;
            case 19:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[12], tableList[13]);
                break;
            case 20:
                disableMultipleHover(tableList);
                $(tableList).removeClass("available");
                enableMultipleHover(tableList[12], tableList[13]);
                break;
            default:
                break;
        }
    }

    function enableMultipleHover(table1, table2) {
        if (checkAvailability(table1) && checkAvailability(table2)) {
            showAvailability(table1); //table13
            showAvailability(table2); //table14
            $(table1).add(table2).hover(function () {
                table1.classList.add("multipleHover");
                table2.classList.add("multipleHover");
            }, function () {
                table1.classList.remove("multipleHover");
                table2.classList.remove("multipleHover");
            });
        }
    }

    function multipleSelection() {
        let multi = document.getElementsByClassName("multipleHover");
        for(let i = 0; i < multi.length; i++) {
            multi[i].classList.add("selected");
        }
    }

    function multipleDeselection() {
        let multi = document.getElementsByClassName("multipleHover");
        for(let i = 0; i < multi.length; i++) {
            multi[i].classList.remove("selected");
        }
    }

    function disableMultipleHover(table) {
        for (let i = 0; i < table.length; i++) {
            $(table[i]).off("mouseenter mouseleave");
        }
    }

    function showAvailability(table) {
        if (checkAvailability(table)) {
            table.classList.add("available");
        }
    }

    function checkAvailability(table) {
        if (table.classList.contains("reserved")) {
            return false;
        } else {
            return true;
        }
    }

    function markSelectedTable(table) {
        var siblings = $(table).siblings();
        if (table.classList.contains("available")) {
            if (table.classList.contains("selected")) {
                table.classList.remove("selected");
                multipleDeselection();
                $('#hours, #summary').addClass('disabled');
                $(".sum2").html("");
            } else {
                if (checkSelection(siblings)) {
                    for (let i = 0; i < siblings.length; i++) {
                        siblings[i].classList.remove("selected");
                        table.classList.add("selected");
                        multipleSelection();
                    }
                } else {
                    table.classList.add("selected");
                    $('#hours').removeClass('disabled');
                    multipleSelection();
                }
                $(".sum2").html(parseInt(table.innerText)); //TODO: fix for multiple tables
            }
        }
    }

    function checkSelection(sib) {
        for (let i = 0; i < sib.length; i++) {
            if (sib[i].classList.contains("selected")) {
                return true;
            }
        }

        return false;
    }

    /*===============================================================
    TABLES
    ===============================================================*/
    for (let i = 1; i < 14; i++) {
        var table = document.getElementById("table" + i);
        table.classList.add("free");
    }
    for (let i = 14; i < 15; i++) {
        var table = document.getElementById("table" + i);
        table.classList.add("reserved");
    }

    function resetTables() {
        for(let i = 0; i < tableList.length; i++) {
            tableList[i].classList.remove("available", "selected");
        }
    }

    /*===============================================================
    HOURS PICKER
    ===============================================================*/
    $("#selectable").bind("mousedown", function (event) {
        event.metaKey = true;
    }).selectable({
        filter: ".unbooked",
        selected: function (event, ui) {
            if (!ui.selected.classList.contains("selected-flag")) {
                ui.selected.classList.add("selected-flag");                             //select
            } else {
                ui.selected.classList.remove("ui-selected", "selected-flag");           //deselect
            }
            //unselect remaining elements if the selected one doesn't boarder other previously selected elements 
            if ((ui.selected.nextElementSibling ? !ui.selected.nextElementSibling.classList.contains("selected-flag") : true)
                && (ui.selected.previousElementSibling ? !ui.selected.previousElementSibling.classList.contains("selected-flag") : true)) {
                var siblings = $(ui.selected).siblings();
                for (let i = 0; i < siblings.length; i++) {
                    siblings[i].classList.remove("ui-selected", "selected-flag");
                }
            }
        },
        unselecting: function (event, ui) {  //unselect all elements that comes after the selected one if the selected one is between other selected elements
            if ((ui.unselecting.nextElementSibling ? ui.unselecting.nextElementSibling.classList.contains("selected-flag") : false)
                && (ui.unselecting.previousElementSibling ? ui.unselecting.previousElementSibling.classList.contains("selected-flag") : false)) {
                var nextSiblings = $(ui.unselecting).nextAll();
                for (let i = 0; i < nextSiblings.length; i++) {
                    nextSiblings[i].classList.remove("ui-selected", "selected-flag");
                }
            }
            if (ui.unselecting.classList.contains("selected-flag")) {
                $('#summary').addClass('disabled');
                ui.unselecting.classList.remove("ui-selected", "selected-flag");            //deselect
            }
        },
        stop: function(event, ui) {
            var startHour = document.querySelector(".selected-flag").children[0].text,
                allHours = document.querySelectorAll(".selected-flag"),
                endHour = allHours[allHours.length-1].textContent;
            if(startHour === endHour){
                $(".sum3").html(startHour); //TODO: must select a period of time
            } else {
                $(".sum3").html(startHour + " - " + endHour);
            }
            $("#summary").removeClass("disabled");
        }
    });

    /*===============================================================
    HOURS
    ===============================================================*/

    function resetHours(){
        var $hours = $("#selectable").children();
        for (let i = 0; i < $hours.length; i++) {
            if($hours[i].classList.contains("booked")) {
                $hours[i].classList.remove("booked");
            }
            $hours[i].classList.add("unbooked");
            $hours[i].classList.remove("ui-selectee", "ui-selected", "selected-flag");
        }
    }

    function getReservedHours(table){
        console.log(table);
        for(let i = 0; i < reserved[table].hours.length; i++) {
            //console.log("table " + table + " " + reserved[table].hours[i].startHour + "-" + reserved[table].hours[i].endHour);
            showReservedHours(reserved[table].hours[i].startHour, reserved[table].hours[i].endHour);
        }
    }

    function showReservedHours (start, end) {
        var $hours = $("#selectable").children();
        var arr = $hours.filter(function(hour){
        var cl = (this.classList)[0].split('-');
            return parseInt(cl[1]) >= parseInt(start) && parseInt(cl[1]) <= parseInt(end);
        })

        for(let i = 0; i < arr.length; i++) {
            arr[i].classList.remove("unbooked");
            arr[i].classList.add("booked");
        }
    }
}); //end of the ready function