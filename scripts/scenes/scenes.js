'use strict'

// test scene
{
    let scene = new Scene(Game)
    scene.gravity = 0

    let kyle = new Kyle
    kyle.x = 100
    kyle.y = 80
    scene.addEntity(kyle)

    let platforms = []
    for (let i = 0; i < 5; i++) {
        platforms.push(new Platform)
        platforms[i].x = 50 * i + 50
        platforms[i].y = 100 * i + 100
        scene.addEntity(platforms[i])
    }

    let box = new Box
    box.x = 260
    box.y = 140
    scene.addEntity(box)


    //testScene.gravity = 0

    Game.currentScene = scene
}