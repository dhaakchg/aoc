const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid")

const findTrailheads = (grid) => grid.findAll(0)

const validPointSteps = (compass) => {
    return Object.keys(compass).filter(key => key !== 'origin').reduce((acc, dir) => {
        if(compass[dir].val !== null && compass[dir].val === compass.origin.val + 1) {
            acc.push(compass[dir].coord)
        }
        return acc
    }, [])
}

const heightIsGoal = (coord, grid) => grid.get(coord) === 9

const pointHasBeenVisited = (coord, trails) => trails.reduce((acc, trail) => {
    return acc || trail.has(coord.toString())
}, false)

const exploreTrailhead = (grid, trailheadCoord) => {
    const trails = []
    let stickyStack = [{ coord: trailheadCoord, trail: new Set() }] // stack
    while (stickyStack.length) {
        const { coord: currentCoord, trail }  = stickyStack.pop()
        const currentTrail = new Set([...trail, currentCoord.toString()])
        // if the current coord is the end, add the trail to the trails
        if( heightIsGoal(currentCoord, grid) ) {
            trails.push(currentTrail)
        }
        let compass = grid.getCardinalDirsFromPoint(currentCoord)
        const possibleSteps = validPointSteps(compass)
        if (possibleSteps.length > 0) {
            possibleSteps.forEach(step => {
                // this will dedup, solved part2 first :/
                // if(!pointHasBeenVisited(step, trails)) {
                    stickyStack.push({ coord: step, trail: currentTrail })
                // }
            })
        }
    }
    return trails
}

const printTrail = (grid, trail) => {
    const trailGrid = new Grid({ rows: grid.rows, cols: grid.cols });
    [...trail].forEach(coord => {
        const [ row, col ] = coord.split(',').map(Number)
        trailGrid.set({ row, col }, grid.get({ row, col }))
    })
    return trailGrid
}
// 89010123
// 78121874
// 87430965
// 96549874
// 45678903
// 32019012
// 01329801
// 10456732


// for each trailhead
// check each adjacent cell.
//  if sequential from 0, start a new trail
//
// tracepath(grid, trailheadCoord, currenttrail)
// check each adjacent cell from current coordinate
// if cell is a step, add it to the current trail, and move to that cell
// if there are no more cells, return the trail


module.exports = (input) => {
    const topo = new Grid({ data: splitClean(input), primitiveType: Number })
    const trailHeads = findTrailheads(topo)
    let part1 = 0
    let part2 = 0
    trailHeads.map(trailHead => {
        const trails = exploreTrailhead(topo, trailHead)
        const distinctSummits = new Set(trails.map(trail => Array.from(trail)[trail.size - 1]))
        console.log(`Trailhead: ${trailHead.toString()}, summits: ${distinctSummits.size}`)
        part1 += distinctSummits.size
        part2 += trails.length
    })
    return { part1, part2 }
}
