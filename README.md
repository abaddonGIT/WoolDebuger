# WoolDebuger ([DEMO](http://angular.demosite.pro/jsondebug/htdocs/index.html))
Visualization debug information from the server using JSONEditor and sockjs. The application establishes a connection with a Web socket on which receives information from the server for presentation and save her in localStorage.
##Python example debug connection
    from tornado import web, ioloop
    from sockjs.tornado import SockJSRouter, SockJSConnection

    class EchoConnection(SockJSConnection):
        def on_message(self, msg):
            self.send(msg)

    if __name__ == '__main__':
        EchoRouter = SockJSRouter(EchoConnection, '/debug')

        app = web.Application(EchoRouter.urls)
        app.listen(9999)
        ioloop.IOLoop.instance().start()