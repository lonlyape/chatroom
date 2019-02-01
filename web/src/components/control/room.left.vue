<template>
    <div class="room_left">
        <div class="user_name">
            <p v-for="one in userNameList" v-bind:key="one" v-text="one"></p>
        </div>
        <div class="add">
            <span class="icon-yonghukaihu" v-on:click="isShowItems()"></span>
            <div class="items" v-if="itemsIsShow">
                <ul>
                    <li>
                        <apply v-if="true"></apply>
                    </li>
                    <li>
                        <friend-add v-if="true"></friend-add>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import roomAppliy from './room.applyList.vue'
import roomFriendAdd from './room.friend.add.vue'
export default {
    data() {
        return {
            itemsIsShow: false,
        }
    },
    components: {
        friendAdd: roomFriendAdd,
        apply: roomAppliy
    },
    computed: {
        ...mapState(['userInfo']),
        userNameList: function() {
            var arr = [];
            if (this.userInfo.userName) {
                arr = this.userInfo.userName.split('');
            }
            return arr;
        },
    },
    methods: {
        isShowItems(b) {
            if (b === undefined) {
                this.itemsIsShow = !this.itemsIsShow;
            } else {
                this.itemsIsShow = b;
            }
        },
    },
}

</script>
<style scoped lang="scss">
.room_left {
    height: 100%;
    color: #fff;
    text-align: center;
    position: relative;

    .user_name {
        padding: 30px 10px;
        font-size: 16px;
    }

    .add {
        position: absolute;
        bottom: 30px;
        text-align: center;
        width: 100%;

        .items {
            position: absolute;
            left: 102%;
            top: -40px;

            ul {

                li {
                    background: rgba(0, 0, 0, .6);
                    width: 100px;

                    &:hover {
                        background: rgba(0, 0, 0, .7)
                    }
                }
            }
        }

        >span {
            font-size: 28px;
            @extend .hand;
        }
    }
}

</style>
