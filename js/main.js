$(function(){
    var reservation = [];
    
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
            $('#people').animate({'opacity' : 1}).removeClass('disabled');
            reservation[1] = selected; //change it to get day, month, year
        }
    });
/*===============================================================
CONVERSION TO DAY AND MONTH
===============================================================*/
    var today = new Date();

    function showDayName(selectedDate){
        var date = new Date(selectedDate);
        var dayName = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        var monthName = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];

        var changedDate = dayName[date.getDay()] + ",<br />" +  date.getDate() + " " + monthName[date.getMonth()];
        return changedDate;
    }
    $(".date").html(showDayName(today));
    
/*===============================================================
NUMBER OF PEOPLE
===============================================================*/
    $("#numP").on('input', function(){
        var numPeople = document.getElementById("numP").value;
        if(numPeople >= 2 && numPeople <= 18){
            reservation[3] = parseInt(numPeople);
            $(".sum1").html(reservation[3]);
            $('#map').animate({'opacity' : 1}).removeClass('disabled');
        }
    });

/*===============================================================
TABLES
===============================================================*/

    
});//end of the ready function
