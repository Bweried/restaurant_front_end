import axios from "axios";
import router from "@/router"; // 确保引入你的路由实例

const aaxios = axios.create({
    baseURL: "http://127.0.0.1:5000",
    timeout: 5000
});

aaxios.interceptors.request.use((config) => {
    let access_token = localStorage.getItem("token");

    if (access_token) {
        config.headers.token = localStorage.getItem("token");
    }

    return config;
});

aaxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!localStorage.getItem("token")) {
            // 没有 token，重定向到登录页面
            router.push("/login");
        }

        return Promise.reject(error);
    }
);

export default aaxios;