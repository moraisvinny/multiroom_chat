/* Importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(8080, function(){
    console.log("Servidor ONLINE");
});

var io = require('socket.io').listen(server);
app.set('io', io);

/* Criar a conexão por websocket */
io.on('connection', function(socket){

    console.log("Usuário conectou");

    socket.on('disconnect', function(){
        console.log("Usuário desconectou");
    })

    socket.on('msgParaServidor', function(data){
        
        /* mensagens */
        socket.emit(
            'msgParaCliente',
            { apelido: data.apelido,
              mensagem: data.mensagem
            });    

        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido,
                mensagem: data.mensagem
            });        

        /* Participantes */
        if(parseInt(data.apelido_existente) == 0) {

            socket.emit(
                'participanteParaCliente',
                { apelido: data.apelido
                });    
    
            socket.broadcast.emit(
                'participanteParaCliente',
                { apelido: data.apelido
                });        
        }
            
    });

});
