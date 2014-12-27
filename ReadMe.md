# Lockets

Node.js application to observe (`tail -f`) a directory of logfiles including a web frontend to display them.

# Modifications:
 - server from /logs/ instead of /
   (did not find how to have /socket.io/ served from a different folder
 - takes a space separated list of files as argument (instead of a folder)

## Installation

    git clone git://github.com/netroy/Lockets.git
    cd Lockets
    npm install
    node . --watch [DIR_NAME]

* `DIR_NAME` is the name of the logs directory
