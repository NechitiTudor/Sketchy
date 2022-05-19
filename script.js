const DEFAULT_COLOR = 'black'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

let mouseDown = false
document.body.onmousedown = () => { mouseDown = true }
document.body.onmouseup = () => { mouseDown = false }

const colorChanger = document.getElementById('changeColorBtn');
const colorBtn = document.getElementById('colorBtn');
const eraserBtn = document.getElementById('eraserBtn');
const deleteBtn = document.getElementById('deleteBtn');
const grid = document.getElementById('grid');

colorChanger.onchange = (e) => setColor(e.target.value)
colorBtn.onclick = () => setMode('color')
eraserBtn.onclick = () => setMode('eraser')
deleteBtn.onclick = () => clearGrid()

function setColor(color) {
    currentColor = color
}

function setMode(mode) {
    activateButton(mode)
    currentMode = mode
}

function setSize(size) {
    currentSize = size
}

function clearGrid() {
    grid.innerHTML = ''
    createGrid(DEFAULT_SIZE)
}

function activateButton(newMode) {
    if (currentMode === 'color') {
        colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (newMode === 'color') {
        colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    }
}

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#F8F8FF'
    }
}


window.onload = () => {
    activateButton(DEFAULT_MODE)
    createGrid(DEFAULT_SIZE)
}