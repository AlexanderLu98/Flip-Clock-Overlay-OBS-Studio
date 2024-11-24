# Flip Clock Overlay for OBS

This is a simple flip clock animation built using HTML, CSS, and JavaScript, intended to be used as an overlay in OBS (Open Broadcaster Software). It displays the current time in a visually appealing flip-clock style, perfect for live streaming, content creation, or as a time display in OBS scenes.

## Features
- Real-time updating of the time in a flip-clock style.
- Simple and clean design.
- Easy to integrate into OBS as a browser source overlay.
- Customizable font, size, and colors to match your scene’s aesthetics.

## Usage

### 1. **Setting Up in OBS**
To use this flip clock as an overlay in OBS, follow these steps:
1. Open OBS and create a new **Browser Source**.
2. In the **URL** field, point it to the file location of the `index.html` or use a hosted version if you prefer.
3. Set the dimensions to match the resolution you want for the overlay. For instance, 1280x720px works well in most cases, but you can adjust it based on your scene's layout.
4. Optionally, disable the browser source's **"Control Audio via OBS"** setting if the HTML doesn't require sound.

### 2. **Customization**
You can easily modify the clock's appearance by editing the CSS or by customizing the font, colors, and size to fit your needs. You can also adjust the JavaScript interval or animations if you wish to tweak the behavior of the clock.

### 3. **Important Notes**
- Ensure your system’s DPI scaling and display settings are configured properly to prevent any scaling issues in OBS.
- If the clock is not behaving as expected (e.g., pixelation or issues with scaling in OBS), try adjusting the width/height settings of the **Browser Source** in OBS or use the **Fit to Screen** option.

## Acknowledgements

This project was heavily influenced by [Shshaw's Flip Clock Codepen](https://codepen.io/shshaw/pen/vKzoLL), which served as the foundation for the design and functionality of the clock. I would like to give credit to Shshaw for their fantastic work, and I am not trying to take credit for their original design. The goal of this project was to create a simple and effective flip-clock overlay that could be used directly within OBS, and I was inspired by their implementation.

## License

This project is open-source, and you are free to use and modify it as needed for personal or commercial purposes. However, please give credit to the original authors where applicable.

# TODO:

## Font
- Digital font for time display.

## Title
- Integrated title displayed at the top of the clock.

## Time Format
- Automatically detects and adjusts between **military time** or **AM/PM**.

## Animations
- Add animations for specific time ranges:
  - **Late Night Grind**: 24:00 - 06:00
  - **Early Bird/Morning Grind**: 06:00 - 12:00
  - **Afternoon Grind**: 12:00 - 18:00
  - **Evening Grind**: 18:00 - 24:00

## Funny Times
- **04:20**: A fun time for humor.
- **13:37**: LEET time (1337).
- **03:33**: Spooky time.
- **04:04**: Error Not Found.
- **500**: Internal Server Error.
- **12:34:56**: A satisfying sequence of numbers in order.
- **007**: James Bond reference.
- **03:14**: Pi time (3.14).
- **Byte Time**: 256.
- **Palindrome Time**: A time that reads the same forwards and backwards.

## Possibilities
- Option to divide and display each individual digit separately.
