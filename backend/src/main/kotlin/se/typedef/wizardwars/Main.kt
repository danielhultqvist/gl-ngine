package se.typedef.wizardwars

import io.javalin.Javalin
import io.javalin.websocket.WsSession
import org.json.JSONObject
import java.util.concurrent.CompletableFuture
import java.util.concurrent.ConcurrentHashMap

private val userMap = ConcurrentHashMap<WsSession, String>()
private var nextUserNumber = 1;

fun main(args: Array<String>) {
    Javalin.create().apply {
        ws("/join") { ws ->
            ws.onConnect { session ->
                val username = "Player" + nextUserNumber++
                userMap[session] = username;
            }
            ws.onClose { session, status, message ->
                val username = userMap[session]
                userMap.remove(session)
                broadcastMessage(username + "has left the chat")
            }
            ws.onMessage { session, message ->
                broadcastMessage(userMap[session]!! + ": " + message)
            }
        }
        get("/ping") { ctx ->
            ctx.result(CompletableFuture.completedFuture("pong"))
        }
    }.start(8080)

    println("Server started")
}

fun broadcastMessage(message: String) {
    userMap.keys.filter { it.isOpen }.forEach { session ->
        session.send(JSONObject().put("message", message).toString())
    }
}