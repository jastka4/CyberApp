/*===============================================================
CALENDAR
===============================================================*/
$(function(){
        $('#datepicker').datepicker({
            dateFormat: 'dd-mm-yy',
            minDate: 0,
            maxDate: '+2m',
            showOtherMonths: true,
            firstDay: 1,
            dayNamesMin: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
            monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
            onSelect: function(date){
                var selected = $(this).val();
                $(".date").html(selected);
                }
            });
        });

/*===============================================================
CONVERSION TO DAY AND MONTH
===============================================================*/
function showDayName(year, month, day){
    var date = new Date(year, month, day);
    var dayName = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    var monthName = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
}
        $('#hours .date').html('<strong>'+dayName[date.getDay()]+'</strong>, '
                                +day + ' ' + monthName[month]);