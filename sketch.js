
let cols = 10;
let rows = 10;
let w;
let h;
let grid = [];
let current;
let stack = [];
var maze;

// GUI Variables

function rerunMG() {
    if (validateWH()) {
        grid = [];
        cols = document.getElementById("cols").value;
        rows = document.getElementById("rows").value;
        setup();
        console.log(rows);
    }
}

function validateWH() {
    var cols = document.getElementById("cols").value;
    var rows = document.getElementById("rows").value;
    var test = new RegExp("[0-9]");
    if(!cols.match(test) || !rows.match(test)) {
        alert("ERROR: Input must be numeric.")
        return false;
    } else if (cols < 1 || cols > 99 || rows < 1 || rows > 99) {
        alert("ERROR: Input must be within 1-99.")
        return false;
    }
    return true;
}

function setup() {
    maze = createCanvas(windowHeight * 0.85, windowHeight * 0.85);
    

    maze.parent('maze-container');

    w = maze.width / cols;
    h = maze.height / rows;

    for (var i = 0; i < cols; i++) {
        var temp = [];
        for (var j = 0; j < rows; j++) {
            var cell = new Cell(i, j);
            temp.push(cell);
        }
        grid.push(temp);
    }

    current = grid[0][0];
    current.setVisited();

}

function draw() {
    
    redrawGrid();

    generateMaze();

    image(maze, 0, 0, maze.width, maze.height);
    
}

function redrawGrid() {
    background(255);
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            grid[i][j].show();
        }
    }
}

function windowResized() {
    resizeCanvas(windowHeight * 0.85, windowHeight * 0.85);
    w = maze.width / cols;
    h = maze.height / rows;
    redrawGrid();
}

function generateMaze() {
    let next = nextCell();
    if (next != null) {
        moveTo(next)
    } else if (stack.length != 0) {
        current.color = color(104, 227, 108);
        current = stack.pop();
        current.color = color(255, 102, 0);
    } 
}

function nextCell() {
    // returns next cell to visit
    let cells = checkNeighbors();
    if (cells == null) {
        return null;
    }

    let index = Math.round(Math.random() * (cells.length - 1));
    
    return cells[index];
}

function checkNeighbors() {
    // returns list of unvisited neighbors
    let neighbors = [];
    let i = current.i;
    let j = current.j;
    console.log(current);

    if (j != 0) {
        if (!grid[i][j - 1].visited) {
            neighbors.push(grid[i][j - 1]);
        }
    }
    if (i != cols - 1) {
        if (!grid[i + 1][j].visited) {
            neighbors.push(grid[i + 1][j]);
        }
    }
    if (j != rows - 1) {
        if (!grid[i][j + 1].visited) {
            neighbors.push(grid[i][j + 1]);
        }
    }
    if (i != 0) {
        if (!grid[i - 1][j].visited) {
            neighbors.push(grid[i - 1][j]);
        }
    }
    if (neighbors.length == 0) {
        return null;
    }
    return neighbors;
}

function moveTo(next) {
    if (current.j > next.j) {
        // next is above
        current.removeWall(0);
        next.removeWall(2);

    } else if (current.i < next.i) {
        // next is to the right
        current.removeWall(1);
        next.removeWall(3);

    } else if (current.j < next.j) {
        // next is below
        current.removeWall(2);
        next.removeWall(0);

    } else if (current.i > next.i) {
        // next is to the left
        current.removeWall(3);
        next.removeWall(1);;
    }
    current.color = color(104, 227, 108);
    stack.push(current);
    current = next;
    current.setVisited();
    current.color = color(255, 102, 0);
}
