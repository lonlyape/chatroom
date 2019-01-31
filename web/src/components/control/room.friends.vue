<template>
    <div class="friends">
        <ul>
            <li v-for="one in friends" v-bind:key="one.id" v-on:click="selectFriend(one)" v-bind:class="{'active':one.select}">
                <h3 v-text="one.userName">name</h3>
                <span v-text="one.sex">sex</span>
                <div class="prompt" v-if="one.temporaryChat" v-text="one.temporaryChat"></div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            friends: [],
            temporaryChat: [],
        }
    },
    created() {
        console.log('friendList');
        this.getFriends();
    },
    computed: {
        ...mapState(['chatList']),
    },
    methods: {
        getFriends() {
            var url = 'friendList';
            window.util.requestPost(url, {}, (data) => {
                data.forEach((one) => {
                    one.sex = one.sex == 0 ? '男' : '女';
                    one.select = false;
                    one.temporaryChat = 0;
                });
                this.friends = data;
                this.getTemporaryChat();
            });
        },
        getTemporaryChat() {
            var url = 'temporaryChat';
            window.util.requestPost(url, {}, (data) => {
                data.forEach((item) => {
                    this.friends.forEach((one) => {
                        if (item.fromId == one.id) {
                            one.temporaryChat++;
                        }
                    })
                });
                this.temporaryChat = data;
            });
        },
        deleteTemporaryChat(ids) {
            if (!ids) {
                return
            }
            var url = 'temporaryChatDelete';
            var param = {
                ids
            };
            window.util.requestPost(url, param);
        },
        selectFriend(one) {
            var ids = '';
            this.friends.forEach((item) => {
                item.select = false;
            });
            one.select = true;
            one.temporaryChat = 0;
            this.temporaryChat = this.temporaryChat.filter((item) => {
                if (item.fromId == one.id) {
                    ids += item.id + ',';
                } else {
                    return true;
                }
            });

            this.$emit('setChatFriend', one);
            ids = ids.replace(/,$/, '');
            this.deleteTemporaryChat(ids);
        }
    },
}

</script>
<style scoped lang="scss">
.friends {
    ul {
        li {
            font-size: 14px;
            padding: 10px;
            background: #eee;
            border-bottom: 1px solid #ddd;
            position: relative;
            @extend .hand;

            &:hover {
                background: #f0f0f0;
            }

            &.active {
                background: #bababa;
            }

            .prompt {
                position: absolute;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color: #fff;
                top: 50%;
                margin-top: -10px;
                right: 20px;
                border-radius: 50%;
                background: #f00;
            }
        }
    }
}

</style>
