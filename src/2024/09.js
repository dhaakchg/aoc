const getDiskMap = (input) => {
    const files = new Map()
    const diskMap = []
    const parsed = [...input.matchAll(/(?<blocks>\d)(?<free>\d?)/g)].map(m => m.groups)
    parsed.forEach((group, diskId) => {
        const { blocks, free } = group
        const fileblocks = parseInt(blocks)
        const freeBlocks = parseInt(free) || 0
        files.set(diskId, { fileblocks })
        for(let i = 0; i < fileblocks; i++) {
            diskMap.push(diskId)
        }
        for(let j = 0; j < freeBlocks; j++) {
            diskMap.push('.')
        }
    })
    return { diskMap, files }
}

const compact = (diskMap) => {
    const compacted = [...diskMap]
    const availableFree = diskMap.filter(block => block === '.').length
    let movedBlocks = 0
    do {
        const firstFreeIdx = compacted.findIndex(b => b === '.')
        const firstBlockIdx = compacted.findLastIndex(b => b !== '.')
        compacted[firstFreeIdx] = compacted[firstBlockIdx]
        compacted[firstBlockIdx] = '.'
        movedBlocks++
    } while (movedBlocks < availableFree)
    return compacted
}

const checksum = (diskMap) => {
    const blockSums = []
    diskMap.forEach((block, idx) => {
        if(block !== '.') {
            blockSums.push(idx * block)
        }
    })
    return blockSums.reduce((a, c) => a + c)
}

module.exports = (input) => {
    const { diskMap } = getDiskMap(input)
    const compacted = compact(diskMap)
    return { part1: checksum(compacted), part2: 0 }
}
