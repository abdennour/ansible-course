#!/usr/local/bin/node

// --list or --host
const option = process.argv[2]
const hostname = process.argv[3]

const hosts = {
  web1: {ansible_host: '192.168.1.3'},
  web2: {ansible_host: '192.168.1.4'},
  db1: {ansible_host: '192.168.1.5'}
}

const groups = {
  web: ['web1', 'web2'],
  db: ['db1']
}


// --host <hostname> option
if (option === '--host' ) {
  console.log(JSON.stringify(hosts[hostname]))
}
// --list option
if (option === '--list' ) {
  console.log(JSON.stringify(groups))
}