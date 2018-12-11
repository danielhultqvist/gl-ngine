package se.typedef.wizardwars

import io.javalin.Javalin
import io.javalin.websocket.WsSession
import org.json.JSONArray
import org.json.JSONObject
import java.util.*
import java.util.concurrent.CompletableFuture
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.Executors
import kotlin.concurrent.thread

private val userMap = ConcurrentHashMap<WsSession, Player>()
private val UPDATE_RATE = 25L

fun main(args: Array<String>) {
    Javalin.create().apply {
        ws("/join") { ws ->
            ws.onConnect { session ->
                println("Session connected")
            }
            ws.onClose { session, status, message ->
                val player = userMap[session]!!
                userMap.remove(session)
            }
            ws.onMessage { session, message ->
                val json = JSONObject(message)
                val data = json.getJSONObject("data")
                when (json.getString("messageType")) {
                    "register" -> {
                        val username = data.getString("username")
                        userMap[session] = Player(username, UUID.randomUUID().toString());
                    }
                    "update-player" -> {
                        val position =
                                Position(
                                        data.getJSONObject("position").getInt("x"),
                                        data.getJSONObject("position").getInt("y"))
                        val vector =
                                Vector(
                                        data.getJSONObject("vector").getInt("dx"),
                                        data.getJSONObject("vector").getInt("dy"))

                        val player = userMap[session]
                        player?.updatePosition(position)
                        player?.updateVector(vector)
                        player?.animationFrame = data.getInt("animationFrame")
                        player?.movementState = data.getInt("movementState")
                        player?.direction = data.getInt("direction")
                        println("Received update for " + player?.id)
                    }
                    else -> {
                        println("Received unknown message type " + json.get("messageType"))
                    }
                }
            }
        }
        get("/ping") { ctx ->
            ctx.result(CompletableFuture.completedFuture("pong"))
        }
    }.start(8080)

    val updateThreadPool = Executors.newFixedThreadPool(1);
    val updateLoop = thread(block = {
        while (true) {
            val players = JSONArray()
            userMap.values.forEach {

                players.put(JSONObject().put("id", it.id)
                        .put("username", it.username)
                        .put("position",
                                JSONObject()
                                        .put("x", it.position.x)
                                        .put("y", it.position.y)
                        )
                        .put("vector",
                                JSONObject()
                                        .put("dx", it.vector.dx)
                                        .put("dy", it.vector.dy)
                        )
                        .put("animationFrame", it.animationFrame)
                        .put("movementState", it.movementState)
                        .put("direction", it.direction))
            }

            val message = JSONObject()
                    .put("messageType", "player-state")
                    .put("data", JSONObject().put("players", players))
                    .toString()

            broadcastMessage(message)
            println("Sending updates!")
            Thread.sleep(UPDATE_RATE)
        }
    }, isDaemon = true)
    updateThreadPool.submit(updateLoop)

    println("Server started")
}

fun broadcastMessage(message: String) {
    userMap.keys.filter { it.isOpen }.forEach { session ->
        session.send(message)
    }
}