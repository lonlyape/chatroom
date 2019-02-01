<template>
    <div id="applylist">
        <div class="showbox" v-on:click="handleIsShow(true)">
            <div>好友请求</div>
        </div>
        <div class="mask" v-if="showList">
            <div class="content">
                <div class="box">
                    <div class="close_box">
                        <span class="icon-close" v-on:click="handleIsShow(false)"></span>
                    </div>
                    <div class="top">
                        <span>请求加你为好友</span>
                    </div>
                    <ul>
                        <li v-for="one in applyList" v-bind:key="one.id">
                            <div class="msgbox">
                                <div class="left">
                                    <p v-text="one.userName">晓月</p>
                                    <span v-text="one.sex">男</span>
                                </div>
                                <div class="right">
                                    <div class="b" v-on:click="reply(one,1)">同意</div>
                                    <div class="b" v-on:click="reply(one,0)">拒绝</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            applyList: [],
            showList: false,
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created() {
        this.getApply();
    },
    methods: {
        getApply() {
            var url = 'applyList';
            var param = {};
            window.util.requestPost(url, param, (data) => {
                data.forEach((item) => {
                    item.sex = item.sex == 0 ? '男' : '女';
                });
                this.applyList = data;
            });
        },
        reply(one, status) {
            var url = 'reply';
            var param = {
                id: one.id,
                status
            };
            window.util.requestPost(url, param, (data) => {
                this.applyList.forEach((item, index) => {
                    if (item.id == one.id) {
                        this.applyList.splice(index, 1);
                    }
                });
            });
        },
        handleIsShow(b) {
            if (b !== undefined) {
                this.showList = b;
            } else {
                this.showList = !this.showList
            }
        },
    },
}

</script>
<style scoped lang="scss">
#applylist {
    .showbox {
        padding: 8px 10px;
        @extend .hand;
    }

    .mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        .content {
            position: fixed;
            width: 400px;
            top: 30%;
            left: 50%;
            color: #333;
            text-align: left;
            margin-left: -200px;
            background: #fff;
            box-shadow: 0px 0px 1px 1px #ccc;

            .box {
                padding: 10px $side;

                .close_box {
                    position: absolute;
                    right: 4px;
                    top: 4px;
                    @extend .hand;
                }

                .top {
                    font-size: 14px;
                    font-weight: bold;
                    padding-bottom: 10px;
                }

                ul {
                    li {
                        padding: 6px 0;
                        border-top: 1px solid $bordercolor;

                        .msgbox {
                            display: flex;
                            align-items: center;

                            .left {
                                flex: 1;

                                p {
                                    font-size: 16px;
                                    margin-bottom: 4px;
                                }
                            }

                            .right {
                                .b {
                                    border: 1px solid $bordercolor;
                                    display: inline-block;
                                    margin-left: 10px;
                                    padding: 4px 10px;
                                    line-height: normal;
                                    @extend .hand;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>
