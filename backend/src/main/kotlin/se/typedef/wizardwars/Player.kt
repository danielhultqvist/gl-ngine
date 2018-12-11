package se.typedef.wizardwars

class Player(val username: String, val id: String) {
    var position: Position = Position()
    var vector: Vector = Vector()
    var animationFrame: Int = 0
    var movementState: Int = 0
    var direction: Int = 0

    fun updatePosition(position: Position) {
        this.position = position
    }

    fun updateVector(vector: Vector) {
        this.vector = vector
    }
}

class Position(var x: Int = 0, var y: Int = 0) {
    fun translate(x: Int, y: Int) {
        this.x = x
        this.y = y
    }
}

class Vector(var dx: Int = 0, var dy: Int = 0) {
    fun translate(dx: Int, dy: Int) {
        this.dx = dx
        this.dy = dy
    }
}
