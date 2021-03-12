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
	log.info "Installed with settings: ${settings}"

	initialize()
}

def updated() {
	log.info "Updated with settings: ${settings}"

	unsubscribe()
	initialize()
}

def initialize() {
	// TODO: subscribe to attributes, devices, locations, etc.
    state.token = ""
    state.homeId = ""
    subscribe(lock, "lock.locked", lockListener)
    subscribe(lock, "lock.unlocked", lockListener)
    log.info "Lock currentValue ${lock.currentValue('lock')[0]}"
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
      POST: "lockToggle"
    ]
  }
}

def lockListener(evt) {
	log.debug 'token: ' + state.token
    log.debug 'homeId: ' + state.homeId

    def params = [
        // Server URL (if server run on localhost, use ngrok)
    	uri: "SERVER_URL",
    	path: "/api/v1/smart-api/update-state",
        headers: [
        	authorization: "Bearer " + state.token
        ],
        body: locks.collect{
            [
                id: it.id,
                type: 'lock',
                label: it.label,
                value: lock.currentValue("lock")[0],
                battery: lock.currentValue("battery")[0],
                homeId: state.homeId
            ]
		}

	]

    try {
        httpPostJson(params)
	} catch (e) {
    	log.error "something went wrong: $e"
	}
}

def	getDevices() {
	if (request.JSON.token) {
    	state.token = request.JSON.token
    }

    return [
  		locks: locks.collect{[
        	deviceId: it.id,
            type: 'lock',
            label: it.label,
            value: lock.currentValue("lock")[0],
            battery: lock.currentValue("battery")[0],
            homeId: state.homeId
        ]}
  	]
}

def lockToggle() {
	if (request.JSON.data.token) {
    	state.token = request.JSON.data.token
    }

    if (request.JSON.data.homeId) {
    	state.homeId = request.JSON.data.homeId
    }

	if (lock.currentValue("lock")[0] == "locked") {
    	lock.unlock()
    } else {
    	lock.lock()
    }

    return lock.currentValue("lock")[0]
}
