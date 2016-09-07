# Enchiridion #

A roguelike beat-em-up. A game for the Mocs Arcade.

## Getting Started ##

Have node v4 and npm v3.

    $ node --version
    $ npm --version

Build the game.

    $ npm install
    $ node build server

When reading through the code, I'd suggest you start my browsing through the models, since that is where all the juicy code is written. In particular, check out `source/scripts/model/Game.js`, which houses all the other models. The code is loaded and executed from `source/index.js`, but all it really does is connect the models to the render loop.

You may also be interested in reading through this [brief tutorial from our wiki.](https://github.com/mocsarcade/enchiridion/wiki/Getting-Started)

## Reference ##

- [Slack Channel](https://mocsarcade.slack.com)
- [Github Wiki](https://github.com/mocsarcade/enchiridion/wiki)

## License ##

This project is licensed under MIT.
