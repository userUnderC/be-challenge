'use strict'
const MinHeap = require('heap-min-max').MinHeap

async function loadHeap (source, heap) {
    const entry = await source.pop()
    entry && heap.push(entry.date, {source, entry})
}

module.exports = async (logSources, printer) => {
    const heap = new MinHeap()
    await Promise.all(logSources.map(source => loadHeap(source, heap)))
    let nextEntry = heap.pop()
    while (nextEntry !== undefined) {
        const { source, entry } = nextEntry[1]
        printer.print(entry)
        await loadHeap(source, heap)
        nextEntry = heap.pop()
    }
    printer.done()
}

