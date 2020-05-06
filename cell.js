function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.color;

    this.show = function() {
        var x = this.i * w;
        var y = this.j * h;
        
        if (this.color != null) {
            fill(this.color);
            stroke(color(104, 227, 108));
            rect(x, y, w, h);
        }
        stroke(255);
        if (this.visited) {
            if (this.walls[0]) {
                line(x  , y  , x+w, y);
            }
            if (this.walls[1]) {
                line(x+w, y  , x+w, y+h);
            }
            if (this.walls[2]) {
                line(x+w, y+h, x  , y+h);
            }
            if (this.walls[3]) {
                line(x  , y+h, x  , y);
            }
        }
    }

    this.setVisited = function() {
        this.visited = true;
        this.highlight();
    }

    this.highlight = function() {
        this.color = color(104, 227, 108);
    }

    this.removeWall = function(index) {
        this.walls[index] = false;
    }
}