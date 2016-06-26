// if(this.monsters) {
//     if(this.monsters.length < 4) {
//         this.add("monsters", undefined, new Monster({
//             protomonster: getRandomMonster(),
//             position: getRandomPosition(),
//         }))
//     }
// }

// var index = 0
// function getRandomMonster() {
//     return MONSTERS[Object.keys(MONSTERS)[++index % Object.keys(MONSTERS).length]]
// }
//
// function getRandomPosition() {
//     if(Math.random() < 0.5) {
//         return {
//             x: Math.random() < 0.5 ? -1 : DATA.FRAME.WIDTH,
//             y: Math.floor(Math.random() * DATA.FRAME.HEIGHT),
//         }
//     } else {
//         return {
//             x: Math.floor(Math.random() * DATA.FRAME.WIDTH),
//             y: Math.random() < 0.5 ? -1 : DATA.FRAME.HEIGHT,
//         }
//     }
// }
