var app = {
  count: 0,
  bud_num: 0,
  deleteBud: function () {
    $(".budilnik").on("click touchstart", "#del", function () {
      //Выбирает число-ключ из класса элемента
      var key = this.parentNode.parentNode.className.split(" ").pop();
      //Убирает будильник из Local Storage
      localStorage.removeItem(key);
      //Удаляет сам будильник из списка
      this.parentNode.parentNode.remove();
      //Уменьшает количество будильников в переменной
      app.bud_num = app.bud_num - 1;
    });
  },
  updateBudList: function () {
    //Запись будильников из Local Storage в список
    for (var i = 0; i <= localStorage.length; i++) {
      var textnode = localStorage.getItem(i);
     if (textnode !== null) {
      var node = document.createElement("li");
      node.className = "budilnik " + i;
      
      node.innerHTML = textnode;
      document.getElementById("spisokBud").appendChild(node);
      app.bud_num = localStorage.length;
      setOptions();
      }
    }
    alarm();
    app.deleteBud();
  },
  saveBud: function () {
    let deleteBtn = document.createElement("button");
    let textInBtn = document.createTextNode("Удалить");
    deleteBtn.setAttribute("id", "del");
    deleteBtn.appendChild(textInBtn);
    let li = document.createElement("li");
    li.setAttribute("class", "budilnik " + app.bud_num);
    let switcher = document.createElement("input");
    switcher.setAttribute("type", "checkbox");
    switcher.classList.add("onOff");
    let timerOutPlace = document.createElement("h2");
    timerOutPlace.setAttribute("id", "time");
    let timeHasLeft_p = document.createElement("p");
    timeHasLeft_p.setAttribute("id", "info");
    let timeHasLeft_span = document.createElement("span");
    timeHasLeft_span.setAttribute("id", "time_left");
    timeHasLeft_p.appendChild(timeHasLeft_span);
    app.bud_num = app.bud_num + 1;
    li.innerHTML =
      "<div class='bud_header'> <h2 id='time'>05:45</h2> <p id='info'>Вам осталось спать <span id='time_left'></span></p>  </div> <label class='switch'> <input type='checkbox' name='onOff' class='onOff'> <span class='slider round'></span></label><div class='expanded_div'><div class='bud_footer'><h2 id='za_skolko_text'><span>За</span><select class='hr_offset'></select><select class='min_offset'></select><span>до</span><select class='para' id='para'></select> <span>пары</span></h2></div></div><div id='delete_dropdown' class='arrow-4'><span class='arrow-4-left'></span><span class='arrow-4-right'></span></div>";
    /*следущая строка добавляет сам новый будильник */

    $("#spisokBud").append(li);
    let container = document.querySelectorAll(".expanded_div");
    let lastChild = container[container.length - 1];
    lastChild.append(deleteBtn);

    var key = li.className.split(" ");
    key = key.pop();
    var value = li.innerHTML;
    localStorage.setItem(key, value);
    alarm();
    app.deleteBud();
    changeTheme(); // Для стилизации только что созданных будильников
  },
};

//Подгрузка будильников из Local Storage
document.addEventListener("DOMContentLoaded", app.updateBudList);

$("#add_timer").on("click touchstart", function () {
  app.saveBud();
  setOptions();
});

$("ul").on("click touchstart", ".arrow-4", function () {
  $(this).toggleClass("open");

  if ($(this).parent().height() <= 60) {
    $(this).parent().animate(
      {
        height: "150px",
      },
      500
    );
    $(this).parent().find(".expanded_div")
    .css({display: "flex",})
    .hide()
    .fadeIn('slow');
  } else if ($(this).parent().height() > 60) {
    $(this).parent().find(".expanded_div")
    //.css({display: "none",})
    .fadeOut('fast');
    $(this).parent().animate(
     {
       height: "60px",
     },
      600
    );
  }
});

function setOptions() {
  function setPara() {
    var select = document.getElementsByClassName("para");
    var x = select.length - 1;
    var numOfPara = 6;
    for (i = 1; i <= numOfPara; i++) {
      select[x].options[select[x].options.length] = new Option(i);
    }
  }

  setPara();

  function hoursMenu() {
    var select = document.getElementsByClassName("hr_offset");
    var x = select.length - 1;
    var hrs = 6;

    for (i = 0; i <= hrs; i++) {
      select[x].options[select[x].options.length] = new Option(
        i < 10 ? "0" + i : i,
        i
      );

    }
  }
  hoursMenu();

  function minMenu() {
    var select = document.getElementsByClassName("min_offset");
    var x = select.length - 1;
    var min = 59;

    for (i = 0; i <= min; i++) {
      select[x].options[select[x].options.length] = new Option(
        i < 10 ? "0" + i : i,
        i
      );
    }
  }
  minMenu();
} 

function alarm() {
  function ifClicked() {
    $(document).on("click touchstart", ".onOff", function () {
      let time_left = $(this)
        .parent()
        .parent()
        .children(".bud_header")
        .children("#info")
        .children("#time_left");
      time_left.text(" ");
      var intervalUpdate = setInterval(() => {
        if (this.checked) {
          let alarmTimeOut = $(this)
            .parent()
            .parent()
            .children(".bud_header")
            .children("#time");
          let hr = $(this)
            .parent()
            .parent()
            .children(".expanded_div")
            .children('.bud_footer')
            .children('#za_skolko_text')
            .children('.hr_offset')
            .val();
          let min = $(this)
            .parent()
            .parent()
            .children(".expanded_div")
            .children('.bud_footer')
            .children('#za_skolko_text')
            .children(".min_offset")
            .val();
          let para = $(this)
            .parent()
            .parent()
            .children(".expanded_div")
            .children('.bud_footer')
            .children('#za_skolko_text')
            .children(".para")
            .val();
          function alarmSet() {
            var deadline = {
              hours: 8,
              minutes: 0,
            };
            switch (para) {
              case "1":
                deadline.hours = 8;
                deadline.minutes = 0;
                break;
              case "2":
                deadline.hours = 9;
                deadline.minutes = 45;
                break;
              case "3":
                deadline.hours = 11;
                deadline.minutes = 30;
                break;
              case "4":
                deadline.hours = 13;
                deadline.minutes = 30;
                break;
              case "5":
                deadline.hours = 15;
                deadline.minutes = 10;
                break;
              case "6":
                deadline.hours = 16;
                deadline.minutes = 50;
                break;
            }

            var selectedHour = deadline.hours - hr;
            var selectedMin = deadline.minutes - min;
            if (selectedMin < 0) {
              selectedHour = selectedHour - 1;
              selectedMin += 60;
            }
            var selectedSec = 0;

            alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin);
            alarmTimeOut.text(alarmTime);
            /* подсчет текущего времени, выбор строки, выводимой в качестве времени до звонка
             */
            var date = new Date();

            var hours = date.getHours();

            var minutes = date.getMinutes();

            var seconds = date.getSeconds();

            if (selectedHour - hours < 0 && selectedMin - minutes < 0) {
              time_left.text(
                selectedHour - hours + 23 + ":" + (selectedMin - minutes + 60)
              );
            } else if (selectedMin - minutes < 0) {
              if (selectedHour - hours <= 0) {
                time_left.text("00" + ":" + (selectedMin - minutes + 60));
              } else {
                time_left.text(
                  selectedHour - hours - 1 +":" + (selectedMin - minutes + 60)
                );
              }
            } else if (selectedHour - hours < 0) {
              time_left.text(
                selectedHour - hours + 24 + ":" + (selectedMin - minutes)
              );
            } else if (this.checked == false) {
              time_left.text("   ");
            } else {
              time_left.text(
                selectedHour - hours + ":" + (selectedMin - minutes)
              );
            }
            //когда alarmTime совпадает с текущим, звучит сигнал
            alarmTime =
              addZero(selectedHour) +
              ":" +
              addZero(selectedMin) +
              ":" +
              addZero(selectedSec);
            var currentTime =
              addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
            if (alarmTime == currentTime) {
              musicc();
            }
          }
          alarmSet();
        } else {
          clearInterval(intervalUpdate);
          time_left.text("");
        }
      }, 1000);
    });
  }
  ifClicked();
}
var sound = new Audio("alarm.mp3");
function addZero(time) {
  return time < 10 ? "0" + time : time;
}

function musicc() {
  setTimeout(function () {
    sound.play();
  });
}


// Смена темы путем замены стилей на заготовленные варианты
function changeTheme() {
  let check = localStorage.getItem("app.count");
  if (check != undefined) {
    app.count = check;
  }
  let images = [
    "url(jpg/app_background_1.png)",
    "url(jpg/app_background_2.png)",
    "url(jpg/app_background.png)",
  ];
  let fonts = [
    'Reef',
    'Reef',
    'Rtl'
  ];
  let buttCust = [
    "rgba(83,136,173,0.5)",
    "rgba(35,43,86,0.8)",
    "rgba(91, 91, 91, 0.3)",
  ];
  let theme = [
    "rgba(83,136,173,0.5)",
    "rgba(35,43,86,0.8)",
    "rgba(91, 91, 91, 0.3)",
  ];
  let main = [
    "rgba(83,136,173,0.5)",
    "rgba(35,43,86,0.8)",
    "rgba(91, 91, 91, 0.3)",
  ];
  let addTimer = [
    "rgba(83,136,173,0.5)",
    "rgba(35,43,86,0.8)",
    "rgba(91, 91, 91, 0.3)",
  ];
  let point1 = [
    "#ffffff",
    "rgba(0, 0, 0, 0)",
    "rgba(0, 0, 0, 0)",
  ];
  let point2 = [
    "rgba(0, 0, 0, 0)",
    "#ffffff",
    "rgba(0, 0, 0, 0)",
  ];
  let point0 = [
    "rgba(0, 0, 0, 0)",
    "rgba(0, 0, 0, 0)",
    "#ffffff",
  ];
  $("body").css("background-image", images[app.count]);
  $("*").css("font-family", fonts[app.count]);
  $(".buttCust").css("background-color", buttCust[app.count]);
  $(".theme").css("background-color", theme[app.count]);
  $(".point0").css("background-color", point0[app.count]);
  $(".point1").css("background-color", point1[app.count]);
  $(".point2").css("background-color", point2[app.count]);
  $(".budilnik").css("background-color", main[app.count]);
  $(".addTimer").css("background-color", addTimer[app.count]);
}


// Подгружаем ранее выбранную тему после загрузки страницы
$(changeTheme);


// По клику на кнопку "Сменить тему" устанавливаем порядок темы и запускаем changeTheme()
$(".theme").click(function () {
  app.count++;

  if (app.count > 2) {
    app.count = 0;
  }
  localStorage.setItem("app.count", app.count);
  changeTheme();
});

function opentab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();
