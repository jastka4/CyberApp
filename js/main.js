$(function() {
    var reservation = [],
        reserved = [];

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
        onSelect: function() {
            var selected = $(this).val();
            $(".date, .sum4").html(showDayName(selected));
            $('#people').removeClass('disabled');
            reservation[1] = selected; //change it to get day, month, year
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

    $("#numP").on('change', function() {
        var numPeopleElement = document.getElementById("numP"),
            numPeople = Number(numPeopleElement.value);
        if (numPeople >= 2 && numPeople <= 20) {
            reservation[3] = parseInt(numPeople);
            $(".sum1").html(reservation[3]);
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

    for (var i = 0; i< tableList.length; i++) {
        tableList[i].onclick = markSelectedTable;
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
				showAvailability(tableList[14]); //table15
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

    function enableMultipleHover(table1, table2){
        if(checkAvailability(table1) && checkAvailability(table2)){
            showAvailability(table1); //table13
		    showAvailability(table2); //table14
            $(table1).add(table2).hover(function() {
                $(table1).addClass("multipleHover");
                $(table2).addClass("multipleHover");
            }, function() {
                $(table1).removeClass("multipleHover");
                $(table2).removeClass("multipleHover");
            });
        }
    }

    function disableMultipleHover(table){
        for(var i = 0; i < table.length; i++){
            $(table[i]).off("mouseenter mouseleave");
        }
    }

    function showAvailability(table){
        if(checkAvailability(table)){
            table.className += " available";
        }
    }

    function checkAvailability(table) {
        if(table.classList.contains("reserved")){
            return false;
        } else{
            return true;
        }
    }

    function markSelectedTable(){
        var siblings = $(this).siblings();
        if(this.classList.contains("available")) {
            if(this.classList.contains("selected")){
                $(this).removeClass("selected");
                $('#hours').addClass('disabled');
                $(".sum2").html("");
            } else {
                if(checkSelection(siblings)){
                    for(var i = 0; i < siblings.length; i++){
                        $(siblings[i]).removeClass("selected");
                        this.className += " selected";
                    }
                } else {
                    this.className += " selected";
                    $('#hours').removeClass('disabled');
                }
                reservation[4] = parseInt(this.innerText);
                $(".sum2").html(reservation[4]);
            }
        }
    }

    function checkSelection(sib) {
        for(var i = 0; i < sib.length; i++) {
            if(sib[i].classList.contains("selected")) {
               return true;
            }
        }

        return false;
    }
    
    /*===============================================================
    TABLES
    ===============================================================*/
    for (var i = 1; i < 14; i++) {
        var table = document.getElementById("table" + i);
        table.className += " free";
    }
    for (var i = 14; i < 15; i++) {
        var table = document.getElementById("table" + i);
        table.className += " reserved";
    }

}); //end of the ready function