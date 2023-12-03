import Ws from 'App/Services/Ws'

Ws.start((socket)=>{
  //Usuário se junta a sala
  socket.on('create', (room)=>{
    socket.join(room)
  })
})