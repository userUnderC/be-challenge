'use strict'
const MinHeap = require('heap-min-max').MinHeap

function loadHeap (source, heap) {
    const entry = source.pop()
    entry && heap.push(entry.date, {source, entry})
}

module.exports = (logSources, printer) => {
    const heap = new MinHeap()
    logSources.forEach( source => {
        loadHeap(source, heap)
    })
    let nextEntry = heap.pop()
    while (nextEntry !== undefined) {
        const { source, entry } = nextEntry[1]
        printer.print(entry)
        loadHeap(source, heap)
        nextEntry = heap.pop()
    }
    printer.done()
}

