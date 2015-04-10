based on:

<http://blog.hexacta.com/how-to-listen-to-wifi-with-node-js/>


# dependencies:

    sudo apt-get install libpcap-dev
    sudo npm install
    
Using git version because npm one is old and borked.


# setup:

First shut down the network card.  
We then enable the Monitor Mode.  
And we start up the network card again...

    sudo ifconfig wlan0 down
    sudo iwconfig wlan0 mode Monitor
    sudo ifconfig wlan0 up
        

If we see its state, it should be in monitoring mode:

    sudo iwconfig wlan0


Restore config when done:
    
    sudo ifconfig wlan0 down
    sudo iwconfig wlan0 mode Managed
    sudo ifconfig wlan0 up
