<template>
	<div class="login-page">
		<div class="center">
			<div class="log">
				<img :src="logoUrl" />
			</div>
			<div>
				<label>Username</label>
				<editable tabIndex="1" v-model="userName" :errorMessage="userNameErrorMessage"></editable>
			</div>
			<div class="mt28">
				<label>Password</label>
				<editable tabIndex="2" type="password" v-model="password"
						  :errorMessage="passwordErrorMessage"></editable>
			</div>
			<t-button :caption="loginBtnCaption" :clickFn="doLogin" class="mt26"></t-button>
			<div class="version">{{ version }}</div>
		</div>
	</div>
</template>
<style lang="less">
	.login-page {
		font-family: "Bpmonline Open Sans", sans-serif;
		font-size: 14px;
		color: #000;

		* {
			box-sizing: border-box;
		}

		.center {
			position: fixed;
			width: 310px;
			top: 50px;
			left: 50%;
			transform: translate(-50%, 0);
			padding: 0;
		}

		.log {
			margin: 36.5px 18px 64.5px 18px;
		}

		.version {
			color: #999;
			margin-top: 56px;
		}

		.mt28 {
			margin-top: 28px;
		}

		.mt26 {
			margin-top: 26px;
		}

		.button {
			padding: 8.4px 19.6px;
		}
	}
</style>
<script>
	import LoginHelper from './lib/login-helper'
	import Editable from '../../../vue/components/editable.vue' // relative path
	import Button from '@/vue/components/button.vue' // absolute path (alias '@' - configured in webpack.config.js)

	export default {

		components: {
			Editable: Editable,
			TButton: Button
		},

		data: function () {
			return {
				loginBtnCaption: "Log In",
				version: Terrasoft.Resources.LoginPage.Version + " " + window.productVersion,
				userName: "",
				password: "",
				logoUrl: `${Terrasoft.loaderBaseUrl}/terrasoft.axd?s=nui-binary-syssetting&r=Logoimage`,
				userNameErrorMessage: null,
				passwordErrorMessage: null
			};
		},

		methods: {
			doLogin: function() {
				LoginHelper.doLogin({
					userName: this.userName,
					userPassword: this.password
				}).catch(res => console.error(res));
			}
		}
	}
</script>