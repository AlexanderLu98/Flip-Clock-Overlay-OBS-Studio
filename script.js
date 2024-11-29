console.clear();

// CountdownTracker will still be used to show hours, minutes, and seconds in flip-clock format
function CountdownTracker(label, value) {
  var el = document.createElement('span');
  el.className = 'flip-clock__piece';
  el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' + label + '</span>';

  this.el = el;

  var top = el.querySelector('.card__top'),
      bottom = el.querySelector('.card__bottom'),
      back = el.querySelector('.card__back'),
      backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function(val) {
    val = ('0' + val).slice(-2);
    if (val !== this.currentValue) {
      if (this.currentValue >= 0) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth;  // Trigger reflow to enable flip animation
      this.el.classList.add('flip');
    }
  }

  this.update(value);
}

// Function to get current time
function getTime() {
  var t = new Date();
  return {
    'Total': t,
    'Hours': t.getHours(), // Use 12-hour format:add %12
    'Minutes': t.getMinutes(),
    'Seconds': t.getSeconds()
  };
}

// Function for title color change
function updateTextColor(hours) {
    let color;
    let title;
  
    if (hours >= 6 && hours < 12) {
      color = '#fcbf49'; // Morning
      title = "Early Bird Grind";
    } else if (hours >= 12 && hours < 18) {
      color = '#f77f00'; // Afternoon
      title = "Afternoon Grind";
    } else if (hours >= 18 && hours < 21) {
      color = '#d62828'; // Evening
      title = "Evening Grind";
    } else {
      color = '#003049'; // Night
      title = "Late Night Grind"
    }
  
    // Apply the color to the title
    return {
        'color': color,
        'title': title
    };
  }

// Clock function: Shows the current time (no countdown)
function Clock(callback) {
  callback = callback || function() {};

  var trackers = {},
      t = getTime(),
      key, timeinterval;

  var theme = updateTextColor(t.Hours);

  this.title = document.createElement('h1');
  this.title.className = "title";
  this.title.innerHTML = theme.title;
  // Update the title color based on the current hour
  this.title.style.color = theme.color;
//   this.title.style.color = 'orange';
  this.el = document.createElement('div');
  this.el.className = 'flip-clock';

  // Create the clock elements for hours, minutes, and seconds
  for (key in t) {
    if (key === 'Total') { continue; }
    trackers[key] = new CountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }

  var i = 0;
  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);

    // throttle so it's not constantly updating the time.
    if (i++ % 10) { return; }

    var t = getTime(); // Get current time
    for (key in trackers) {
      trackers[key].update(t[key]); // Update the clock's time
    }
  }

  setTimeout(updateClock, 500);
}

// Initialize the regular clock
var clock = new Clock();
document.body.appendChild(clock.title);
document.body.appendChild(clock.el);
