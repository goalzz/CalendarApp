$(document).ready(function () {
    //Displaying the current day at the top of the calendar when a user opens the planner.
    function updateCurrentDay() {
      var currentDay = dayjs().format("dddd, MMMM D");
      $("#currentDay").text(currentDay);
    }
  
    function generateTimeBlocks() {
      var container = $("#timeblocks");
  //Timeblocks for 09:00 to 17:00 - standard business hours 
      var startHour = 9;
      var endHour = 17;
  
      for (var hour = startHour; hour <= endHour; hour++) {
        var timeBlock = $("<div>").addClass("row time-block");
        var hourColumn = $("<div>").addClass("col-md-1 hour").text(formatHour(hour));
        var textArea = $("<textarea>").addClass("col-md-10");
        var saveBtn = $("<button>")
          .addClass("col-md-1 saveBtn")
          .html('<i class="fas fa-save"></i>');
  
           //Color-coding each timeblock based on past, present, and future 
        timeBlock.attr("data-hour", hour);
        if (hour < getCurrentHour()) {
          timeBlock.addClass("past");
        } else if (hour === getCurrentHour()) {
          timeBlock.addClass("present");
        } else {
          timeBlock.addClass("future");
        }

        var savedEvent = localStorage.getItem("event_" + hour);
        if (savedEvent) {
          textArea.val(savedEvent);
        }
//allowing user to save events in local storage 
        saveBtn.on("click", function () {
          var eventText = $(this).siblings("textarea").val();
          var eventHour = $(this).parent().attr("data-hour");
          localStorage.setItem("event_" + eventHour, eventText);
        });
  
        timeBlock.append(hourColumn, textArea, saveBtn);
        container.append(timeBlock);
      }
    }
 
    function formatHour(hour) {
      return dayjs().hour(hour).format("hA");
    }
  
    function getCurrentHour() {
      return dayjs().hour();
    }
  
    updateCurrentDay();
    generateTimeBlocks();
  });
  