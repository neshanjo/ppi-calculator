# ppi-calculator

A small webapp to calculate the ppi of a screen, written with the help of GPT 3.5 and GitHub Copilot.

Open [neshanjo.github.io/ppi-calculator/](https://neshanjo.github.io/ppi-calculator/index.html?x=3840&y=2160&diagonal=27&retina=0>) to see it in action.

## Why I made this app

When I got my first MacBook, I was surprised to learn that, when you connect an external monitor, there are no independent settings for resolution and scaling (dpi) in Mac OS. You can only set a resolution, and graphics and text are then scaled to the monitor's native resolution. This only leads to sharp text when the exact native resolution or an integer fraction is used. For instance, if you have a typical 27 inch 4K monitor with a native resolution, you have the native resolution of 3840x2160 and the "retina" resolution (1 pixel on the screen is made of four actual pixels) of 1920x1080 which produces pixel-sharp text. However, the native resulution leads to a pixel per inch density of 163, while the retina resolution has 82 ppi. The former is much too small (at least for my eyes), the latter already to large - a ppi of 90 to 110 being a good value for desktop monitors.

I then used some PPI calculations tools to see which external monitors would provide a good viewing experience (scaling-wise).

This all is further explained in [this excellent stack exchange answer](https://apple.stackexchange.com/a/392000).

## How I made this app

There are already other apps like this available (e.g. search for *Sven's PPI calculator*). However, I used this as a test case for how well ChatGPT can generate code in this slightly more complicated use case than the other examples I've tested so far - in particular regarding the usage of local storage which is something I haven't done before. The code is ~95% from ChatGPT 3.5 with ~3% additions made with GitHub Copilot and some ~2% manual tweeking. The design is what ChatGPT came up with - I did not change it except from adding some more spacing before the labels.

## License

The code of this project is distributed under the [MIT License](LICENSE.md).
