/**
 *  SmartHome
 *
 *  Copyright 2021 mdudko
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License. You may obtain a copy of the License at:
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License
 *  for the specific language governing permissions and limitations under the License.
 *
 */

definition(
    name: "SmartHome",
    namespace: "mdudko",
    author: "Max",
    description: "Smart Home",
    category: "",
    iconUrl: "https://s3.amazonaws.com/smartapp-icons/Convenience/Cat-Convenience.png",
    iconX2Url: "https://s3.amazonaws.com/smartapp-icons/Convenience/Cat-Convenience@2x.png",
    iconX3Url: "https://s3.amazonaws.com/smartapp-icons/Convenience/Cat-Convenience@2x.png"
)

preferences {
	section("Allow these things to be exposed via JSON...") {
    	input "lock", "capability.lock", title: "Lock", multiple: true, required: false
  }
}

def installed() {
	log.debug "Installed with settings: ${settings}"

	initialize()
}

def updated() {
	log.debug "Updated with settings: ${settings}"

	unsubscribe()
	initialize()
}

def initialize() {
	// TODO: subscribe to attributes, devices, locations, etc.
    subscribe(lock, "lock.locked", lockListener)
    subscribe(lock, "lock.unlocked", lockListener)
}

// TODO: implement event handlers
mappings {
  path("/get-devices") {
    action: [
      GET: "getDevices"
    ]
  }
  path("/lock-toggle") {
    action: [
      GET: "lockToggle"
    ]
  }
}

def lockListener(evt) {

    def params = [
        // Server URL (if server run on localhost, use ngrok)
    	uri: SERVER_URL,
    	path: "/smart/update-state",
        body: locks.collect{
            [
                device_id: it.id,
                type: 'lock',
                label: it.label,
                value: lock.currentValue("lock")[0],
                battery: lock.currentValue("battery")[0]
            ]
		}

	]

    try {
        httpPostJson(params) { resp ->
            resp.headers.each {
                log.debug "${it.name} : ${it.value}"
            }
            log.debug "response contentType: ${resp.contentType}"
        }
	} catch (e) {
    	log.debug "something went wrong: $e"
	}
}

def	getDevices() {
  [
  	locks: locks.collect{[label: it.label, type: 'lock', id: it.id, value: lock.currentValue("lock")]}
  ]
}

def lockToggle() {
	if (lock.currentValue("lock")[0] == "locked") {
    	lock.unlock()
    } else {
    	lock.lock()
    }

    return lock.currentValue("lock")[0]
}