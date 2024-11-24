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
    'Hours': t.getHours() % 12, // Use 12-hour format
    'Minutes': t.getMinutes(),
    'Seconds': t.getSeconds()
  };
}

// Clock function: Shows the current time (no countdown)
function Clock(callback) {
  callback = callback || function() {};

  this.el = document.createElement('div');
  this.el.className = 'flip-clock';

  var trackers = {},
      t = getTime(),
      key, timeinterval;

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
document.body.appendChild(clock.el);
