<template>
    <button type="button" class="btn btn-primary"  v-if="!authorized" @click="handleAuthClick">Login</button>
    <button type="button" class="btn btn-primary" v-if="authorized" @click="handleSignOutClick">Sign Out</button>
    <button type="button" class="btn btn-primary" v-if="authorized" @click="getEvents">Get Events</button>
</template>
<script>
const CLIENT_ID = "622408015879-ov5ccb09p50gal13fjoljv6evd8jsge3.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const API_KEY = "AIzaSyDio3tFjcTW4OvFFJGQcyuVSekEfOiq2FE"; //thematic-keel-363816
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
export default {
    setup() {
        
    },
    data () {
        return{
            authorized: false,
            items: undefined,
        }
    },
    created() {
        this.api = gapi;
        this.handleClientLoad();
    },
    methods: {
        handleClientLoad() {
    this.api.load('client:auth2', this.initClient);
    },
    initClient() {
        let vm = this;
        vm.api.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(_ => {
    vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
        });
    },

handleAuthClick(event) {
    Promise.resolve(this.api.auth2.getAuthInstance().signIn())
        .then(_ => {
            this.authorized = true;
        });
},
handleSignOutClick(event) {
    Promise.resolve(this.api.auth2.getAuthInstance().signOut())
        .then(_ => {
            this.authorized = false;
        });
    },
    getEvents() {
        let vm = this;
        vm.api.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (moment(this.filters.start).format('YYYY-MM-DDTHH:mm:ss.SZ')),
            'timeMax': (moment(this.filters.end).format('YYYY-MM-DDTHH:mm:ss.SZ')),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(response => {
            this.items =  response.result.items;
        });
    },
    }
}
</script>
<style scoped>

</style>