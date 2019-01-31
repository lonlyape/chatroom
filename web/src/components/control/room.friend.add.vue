<template>
    <div id="add">
        <div class="mask" v-if="isShow">
            <div class="box">
                <div class="close_box">
                    <span class="icon-close" v-on:click="handleIsShow(false)"></span>
                </div>
                <div class="input_box">
                    <input type="text" v-model="userName" v-on:keyup.13="seach()" placeholder="输入用户名">
                </div>
                <div class="ul_box" v-bind:class="{'scroll':hasScroll}">
                    <div class="mind" v-if="!userList.length">输完用户名，回车进行查询</div>
                    <ul v-else>
                        <li v-for="(one,key) in userList" v-bind:key="key">
                            <div class="item">
                                <div class="left">
                                    <p v-text="one.userName">小明</p>
                                    <span v-text="one.sex">男</span>
                                </div>
                                <div class="right">
                                    <span v-on:click="add(one)">添加</span>
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
import { mapState } from 'vuex'
export default {
    data() {
        return {
            userList: [],
            hasScroll: false,
            isShow: false,
            userName: '',
        }
    },
    watch: {
        userList: function(val) {
            this.scrollFun();
        },
        isShow: function(val) {
            this.userList = [];
            this.userName = '';
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created() {
        this.scrollFun();
    },
    methods: {
        handleIsShow(b) {
            if (b !== undefined) {
                this.isShow = b;
            } else {
                this.isShow = !this.isShow
            }
        },
        scrollFun() {
            if (!this.isShow) {
                return;
            }
            this.$nextTick(() => {
                var box = this.$el.querySelector('.ul_box');
                var clientHeight = box.clientHeight;
                var scrollHeight = box.scrollHeight;
                // this.hasScroll = clientHeight < scrollHeight;
                this.hasScroll = true;
            });
        },
        seach() {
            var userName = this.userName;
            if (/^\s*$/.test(userName)) {
                window.alert('输入内容不能为空');
                return;
            }
            var url = 'seachByUserName';
            var param = {
                userName,
                id: this.userInfo.id
            };
            window.util.requestPost(url, param, (data) => {
                data.forEach((one) => {
                    one.sex = one.sex == 0 ? '男' : '女';
                });
                this.userList = data;
            })
        },
        add(one) {
            console.log(one.userName)
            var url = 'friendApply';
            var param = {
                applyId: this.userInfo.id,
                replyId: one.id
            };
            window.util.requestPost(url, param, (data) => {
                window.alert('添加成功,等待对方答应');
                this.userList.forEach((item, index) => {
                    if (item.id == one.id) {
                        this.userList.splice(index, 1);
                    }
                })
            });
        }
    },
}

</script>
<style scoped lang="scss">
#add {
    .mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        .box {
            position: absolute;
            top: 200px;
            bottom: 200px;
            width: 40%;
            left: 30%;
            background: #fff;
            overflow: hidden;

            .close_box {
                position: absolute;
                right: 4px;
                top: 4px;
                @extend .hand;
            }

            .input_box {
                padding: 30px;

                input {
                    width: 94%;
                    margin-left: -2px;
                    line-height: 30px;
                    padding: 0 3%;
                }
            }

            .ul_box {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 92px;
                overflow-y: scroll;

                &.scroll {
                    right: -18px;
                }

                .mind {
                    text-align: center;
                }

                ul {
                    padding: 30px;
                    padding-top: 0;
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        width: 50%;

                        .item {
                            margin: 10px;
                            display: flex;
                            background: #dfdfdf;
                            align-items: center;

                            .left {
                                padding: 10px;
                                flex: 1;

                                p {
                                    font-size: 14px;
                                    margin-bottom: 4px;
                                }
                            }

                            .right {
                                width: 40px;

                                span {
                                    @extend .hand;
                                }
                            }
                        }
                    }

                }
            }

            @media screen and (max-width: 800px) {
                .ul_box {
                    ul {
                        li {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
}

</style>
