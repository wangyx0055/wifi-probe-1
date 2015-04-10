'use strict';



var pcap = require('pcap');



// network interface, filter rule
var session = pcap.createSession('wlan0', 'wlan type mgt subtype probe-req');

session.on('packet', function(rawPkt) {
    console.log('\n----\n');
    try {
        var pkt = pcap.decode.packet(rawPkt);
        //return console.log(pkt);

        var pl = pkt.payload;
        var fr = pl.ieee802_11Frame;

        console.log('from:', fr.shost+''); // mac address
        //console.log('to:',   fr.dhost+'');

        if (pl.presentFields.signalStrength) {
            console.log('signal strength:', pl.signalStrength);
        }

        if (pl.presentFields.antenna) {
            console.log('antenna:', pl.antenna);
        }

        console.log('frequency:', pl.frequency);

        //console.log(fr.probe);
        fr.probe.tags.forEach(function(tag) {
            switch (tag.type) {
                case 'ssid':
                    var ssid = tag.ssid.toString();
                    if (ssid) {
                        console.log('ssid:', ssid);
                    }
                    break;

                case 'rates':
                    //console.log('rates:', tag.value.toString());
                    break;

                case 'extended_rates':
                    //console.log('extended_rates:', tag.value.toString());
                    break;

                case 'channel':
                    console.log('channel:', tag.channel);
                    break;

                case 'vendor_specific':
                    //console.log('vendor_specific:', tag);
                    break;

                case 'unknown':
                    break;

                default:
                    console.log('> ' + tag.type);
            }


        });

        //console.log('link_type: ', pkt.link_type);
        //console.log('pcap_header: ', pkt.pcap_header);
    } catch (ex) {
        console.log( ex.stack );
    }
});
