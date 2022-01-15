# ClamAV API Server

This repo is based on [`kylefarris/clamscan`](https://github.com/kylefarris/clamscan).

This API server will help you to scan urls and files remotely.

Before you use this API you need to install ClamAV on your server.

## ClamAV Installation

There are several Linux distros. You can install ClamAV like that;

### Fedora Based Distros

`sudo yum install clamav`

I didn't test this manual on other Linux distros but you may edit this file;

`/etc/clamav/clamd.conf`

After that, you need to put this line at the beginning of this file.

`TCPSocket 3310`

### Debian Based Distros

`sudo apt-get install clamav clamav-daemon`

### OS X

`sudo brew install clamav`

Once you install ClamAV to your favorite distro, you need to open a TCP socket.

If you use Debian based distros, you can follow these commands;

`sudo dpkg-reconfigure clamav-daemon`

Then you have to allow port you set for clamav socket using ufw;

`sudo ufw allow 3310/tcp`

Finally, you need to restart the ClamAV daemon.

## Running Up API Server

To run the API server, you have to install dependencies.

`npm i`

Then you need to change some variables to create a connection between the server and ClamAV

```dotenv
CLAM_HOST=YOURT_HOST
CLAM_PORT=3310
CLAM_DEBUG=false
RELOAD_DB=true
SERVER_PORT=80
```

**CLAM_HOST**

IP address of your ClamAV server

**CLAM_PORT**

TCP port for your ClamAV daemon

**CLAM_DEBUG**

If you set this true, you'll see debug logs from `clamscan` library.

**RELOAD_DB**

If you set this true, your ClamAV database will be updated but it may work slow.

**SERVER_PORT**

The port for your API server

When you finished the configuration, you just need to run this command

`npm run serve`