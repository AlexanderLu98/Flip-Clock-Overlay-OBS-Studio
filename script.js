console.clear();

// CountdownTracker will still be used to show hours, minutes, and seconds in flip-clock format
function CountdownTracker(label, value) {
  var el = document.createElement('span');
  el.className = 'flip-clock__piece';
  // Label is not used in this version
  el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b></span>';

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

// Function to dynamically update the theme and title
function updateTheme() {
    const hour = new Date().getHours();
    const clockElement = document.querySelector('.flip-clock');
    const titleEl = document.querySelector('#timeTitle'); // Referencing the title element

    // Reset the clock and title classes to avoid stacking old themes
    clockElement.className = 'flip-clock';
    titleEl.className = 'title';
  
    // Determine the appropriate theme and title text based on the hour
    let themeClass = '';
    let titleText = '';
    if (hour >= 6 && hour < 12) {
      themeClass = 'theme-morning';
      titleText = 'Morning Grind';
      document.querySelector("#timeTitle").style.color = "#FFA500"; // Bad code practice, but it works
    } else if (hour >= 12 && hour < 18) {
      themeClass = 'theme-afternoon';
      titleText = 'Afternoon Grind';
      document.querySelector("#timeTitle").style.color = "#FF6347" // Bad code practice, but it works
    } else if (hour >= 18 && hour < 21) {
      themeClass = 'theme-evening';
      titleText = 'Evening Grind';
      document.querySelector("#timeTitle").style.color = "#FFD700" // Bad code practice, but it works
    } else {
      themeClass = 'theme-night';
      titleText = 'Late Night Grind';
      document.querySelector("#timeTitle").style.color = "#1E90FF" // Bad code practice, but it works
    }
  
    // Apply the theme to both the clock and title
    clockElement.classList.add(themeClass);
    titleEl.classList.add(themeClass);
  
    // Set the title text
    titleEl.textContent = titleText;
}


  
  // Initialize the title and append it to the document
  const titleEl = document.createElement('div');
  titleEl.id = 'timeTitle';
  titleEl.className = 'title';
  document.body.insertBefore(titleEl, document.body.firstChild);
  
  // Initialize the clock
  var clock = new Clock();
  document.body.appendChild(clock.el);
  
  // Initial theme setup
  updateTheme();

  // Force reflow by accessing offsetHeight (or any other property that forces layout reflow)
  titleEl.offsetHeight;  // Trigger reflow
  // Then reapply the class to force style recalculation
  titleEl.classList.add('theme-morning');
  
  // Update the theme every 15 minutes
  setInterval(updateTheme, 900000); // 15 minutes = 900,000 ms
