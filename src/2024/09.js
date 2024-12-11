const getDiskMap = (input) => {
    const files = []
    const diskMap = []
    const parsed = [...input.matchAll(/(?<blocks>\d)(?<free>\d?)/g)].map(m => m.groups)
    parsed.forEach((group, diskId) => {
        const { blocks, free } = group
        const size = parseInt(blocks)
        const freeBlocks = parseInt(free) || 0
        files.push({ diskId, size })
        for(let i = 0; i < size; i++) {
            diskMap.push(diskId)
        }
        for(let j = 0; j < freeBlocks; j++) {
            diskMap.push('.')
        }
    })
    return { diskMap, files }
}

const findFree = (diskMap) => {
    const freeChunks = [];
    [...diskMap.join('').matchAll(/\.+/g)].forEach(m => {
        freeChunks.push({ startBlock: m.index, size: m[0].length })
    })
    return freeChunks
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

const compact2 = (diskMap, files) => {
    const compacted = [...diskMap]
    files.toReversed().forEach((file) => {
        const freeChunks = findFree(compacted)
        const fileStart = compacted.findIndex(b => b === file.diskId)
        const chunk = freeChunks.find(chunk => chunk.startBlock < fileStart && chunk.size >= file.size)
        if(chunk) {
            // change file to free
            for(let i = fileStart; i < fileStart + file.size; i++) {
                compacted[i] = '.'
            }
            // change free to file
            for(let i = chunk.startBlock; i < chunk.startBlock + file.size; i++) {
                compacted[i] = file.diskId
            }
        }
    })
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
    const { diskMap, files } = getDiskMap(input)
    const compacted = compact(diskMap)
    const compacted2 = compact2(diskMap, files)
    return { part1: checksum(compacted), part2: checksum(compacted2) }
}
