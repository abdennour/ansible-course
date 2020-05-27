#!/usr/local/bin/node
const { execSync } = require('child_process');
const sh = cmd => execSync(cmd, { encoding: 'utf8' });
// --list or --host
const option = process.argv[2]
const hostname = process.argv[3]

const result = JSON.parse(sh('aws ec2 describe-instances'))
// console.log(result)
// const hosts = {
//   web1: {ansible_host: '192.168.1.3'},
//   web2: {ansible_host: '192.168.1.4'},
//   db1: {ansible_host: '192.168.1.5'}
// }

// const groups = {
//   web: ['web1', 'web2'],
//   db: ['db1']
// }
const hosts = {}
const groups = {}

result.Reservations.forEach(({ Instances}) => {
  Instances.forEach(Instance => {
    let inventoryHostname =Instance.Tags.find(({Key, Value}) => Key === 'Name').Value
    hosts[inventoryHostname] = {
      ansible_host: Instance.PublicIpAddress
    }

    if(!groups['all']) {
      groups['all']= []
    }
    groups['all'] = [...groups['all'], inventoryHostname]

  })
})
// --host <hostname> option
if (option === '--host' ) {
  console.log(JSON.stringify(hosts[hostname]))
}
// --list option
if (option === '--list' ) {
  console.log(JSON.stringify(groups))
}